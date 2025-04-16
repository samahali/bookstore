// hooks/useAppState.js
import { useReducer, useEffect, useState } from 'react';

// Initial state
const initialState = {
  cartItems: [],
  selectedBook: null,
  wishlist: [],
  activeSection: "home",
  searchQuery: "",
  selectedCategory: null,
  theme: "dark",
  readingList: [],
  selectedMood: null,
};

// Action types
const ACTION_TYPES = {
  ADD_TO_CART: 'ADD_TO_CART',
  REMOVE_FROM_CART: 'REMOVE_FROM_CART',
  UPDATE_QUANTITY: 'UPDATE_QUANTITY',
  VIEW_BOOK_DETAILS: 'VIEW_BOOK_DETAILS',
  CLOSE_BOOK_DETAILS: 'CLOSE_BOOK_DETAILS',
  TOGGLE_WISHLIST: 'TOGGLE_WISHLIST',
  TOGGLE_READING_LIST: 'TOGGLE_READING_LIST',
  UPDATE_READING_PROGRESS: 'UPDATE_READING_PROGRESS',
  TOGGLE_THEME: 'TOGGLE_THEME',
  SET_SEARCH_QUERY: 'SET_SEARCH_QUERY',
  SET_CATEGORY: 'SET_CATEGORY',
  SET_MOOD: 'SET_MOOD',
  SET_ACTIVE_SECTION: 'SET_ACTIVE_SECTION',
  INIT_STATE: 'INIT_STATE',
};

// Reducer function
function appReducer(state, action) {
  switch (action.type) {
    case ACTION_TYPES.INIT_STATE:
      return { ...state, ...action.payload };
      
    case ACTION_TYPES.ADD_TO_CART: {
      const product = action.payload;
      const quantity = product.quantity || 1;
      const existingItem = state.cartItems.find(item => item.id === product.id);
      
      if (existingItem) {
        return {
          ...state,
          cartItems: state.cartItems.map(item => 
            item.id === product.id 
              ? { ...item, quantity: item.quantity + quantity } 
              : item
          ),
        };
      } else {
        return {
          ...state,
          cartItems: [...state.cartItems, { ...product, quantity }],
        };
      }
    }
    
    case ACTION_TYPES.REMOVE_FROM_CART:
      return {
        ...state,
        cartItems: state.cartItems.filter(item => item.id !== action.payload),
      };
      
    case ACTION_TYPES.UPDATE_QUANTITY: {
      const { productId, newQuantity } = action.payload;
      
      if (newQuantity < 1) {
        return {
          ...state,
          cartItems: state.cartItems.filter(item => item.id !== productId),
        };
      }
      
      return {
        ...state,
        cartItems: state.cartItems.map(item => 
          item.id === productId 
            ? { ...item, quantity: newQuantity } 
            : item
        ),
      };
    }
    
    case ACTION_TYPES.VIEW_BOOK_DETAILS:
      return {
        ...state,
        selectedBook: action.payload,
      };
      
    case ACTION_TYPES.CLOSE_BOOK_DETAILS:
      return {
        ...state,
        selectedBook: null,
      };
      
    case ACTION_TYPES.TOGGLE_WISHLIST: {
      const productId = action.payload;
      
      if (state.wishlist.includes(productId)) {
        return {
          ...state,
          wishlist: state.wishlist.filter(id => id !== productId),
        };
      } else {
        return {
          ...state,
          wishlist: [...state.wishlist, productId],
        };
      }
    }
    
    case ACTION_TYPES.TOGGLE_READING_LIST: {
      const product = action.payload;
      const existingIndex = state.readingList.findIndex(item => item.id === product.id);
      
      if (existingIndex >= 0) {
        return {
          ...state,
          readingList: state.readingList.filter((_, index) => index !== existingIndex),
        };
      } else {
        const newReadingItem = {
          id: product.id,
          title: product.titleEn,
          titleAr: product.titleAr,
          author: product.authorEn,
          authorAr: product.authorAr,
          image: product.image,
          progress: 0,
          totalPages: Math.floor(Math.random() * 300) + 150, // Random page count
        };
        
        return {
          ...state,
          readingList: [...state.readingList, newReadingItem],
        };
      }
    }
    
    case ACTION_TYPES.UPDATE_READING_PROGRESS: {
      const { bookId, progress } = action.payload;
      
      return {
        ...state,
        readingList: state.readingList.map(book => 
          book.id === bookId 
            ? { ...book, progress } 
            : book
        ),
      };
    }
    
    case ACTION_TYPES.TOGGLE_THEME:
      return {
        ...state,
        theme: state.theme === 'light' ? 'dark' : 'light',
      };
      
    case ACTION_TYPES.SET_SEARCH_QUERY:
      return {
        ...state,
        searchQuery: action.payload,
        selectedBook: null, // Close book details when searching
      };
      
    case ACTION_TYPES.SET_CATEGORY:
      return {
        ...state,
        selectedCategory: action.payload,
        selectedBook: null, // Close book details when changing category
      };
      
    case ACTION_TYPES.SET_MOOD:
      return {
        ...state,
        selectedMood: action.payload,
        selectedCategory: null,
        selectedBook: null, // Close book details when changing mood
      };
      
    case ACTION_TYPES.SET_ACTIVE_SECTION:
      return {
        ...state,
        activeSection: action.payload,
      };
      
    default:
      return state;
  }
}

export function useAppState({ homeRef, categoriesRef, bestSellersRef }) {
  // Initialize state from localStorage
  const getInitialState = () => {
    const savedState = { ...initialState };
    
    try {
      const savedWishlist = localStorage.getItem("bookstore-wishlist");
      if (savedWishlist) {
        savedState.wishlist = JSON.parse(savedWishlist);
      }

      const savedTheme = localStorage.getItem("bookstore-theme");
      if (savedTheme) {
        savedState.theme = savedTheme;
      }

      const savedReadingList = localStorage.getItem("bookstore-reading-list");
      if (savedReadingList) {
        savedState.readingList = JSON.parse(savedReadingList);
      }

      const savedCart = localStorage.getItem("bookstore-cart");
      if (savedCart) {
        savedState.cartItems = JSON.parse(savedCart);
      }
    } catch (error) {
      console.error("Error loading data from localStorage:", error);
    }
    
    return savedState;
  };

  const [state, dispatch] = useReducer(appReducer, getInitialState());
  const [activeSection, setActiveSection] = useState("home");

  // Save state to localStorage when it changes
  useEffect(() => {
    localStorage.setItem("bookstore-wishlist", JSON.stringify(state.wishlist));
  }, [state.wishlist]);

  useEffect(() => {
    localStorage.setItem("bookstore-theme", state.theme);
    document.body.className = state.theme === "dark" ? "dark-theme" : "";
  }, [state.theme]);

  useEffect(() => {
    localStorage.setItem("bookstore-reading-list", JSON.stringify(state.readingList));
  }, [state.readingList]);

  useEffect(() => {
    localStorage.setItem("bookstore-cart", JSON.stringify(state.cartItems));
  }, [state.cartItems]);

  // Handle scroll to update active section
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 100; // Offset for fixed header

      if (
        homeRef.current &&
        scrollPosition < homeRef.current.offsetTop + homeRef.current.offsetHeight
      ) {
        setActiveSection("home");
      } else if (
        categoriesRef.current &&
        scrollPosition >= categoriesRef.current.offsetTop &&
        scrollPosition < categoriesRef.current.offsetTop + categoriesRef.current.offsetHeight
      ) {
        setActiveSection("categories");
      } else if (
        bestSellersRef.current &&
        scrollPosition >= bestSellersRef.current.offsetTop
      ) {
        setActiveSection("bestSellers");
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [homeRef, categoriesRef, bestSellersRef]);

  // Action creators
  const addToCart = (product) => {
    dispatch({ type: ACTION_TYPES.ADD_TO_CART, payload: product });
  };

  const removeFromCart = (productId) => {
    dispatch({ type: ACTION_TYPES.REMOVE_FROM_CART, payload: productId });
  };

  const updateQuantity = (productId, newQuantity) => {
    dispatch({ 
      type: ACTION_TYPES.UPDATE_QUANTITY, 
      payload: { productId, newQuantity } 
    });
  };

  const viewBookDetails = (book) => {
    dispatch({ type: ACTION_TYPES.VIEW_BOOK_DETAILS, payload: book });
    window.scrollTo(0, 0);
  };

  const closeBookDetails = () => {
    dispatch({ type: ACTION_TYPES.CLOSE_BOOK_DETAILS });
  };

  const toggleWishlist = (productId) => {
    dispatch({ type: ACTION_TYPES.TOGGLE_WISHLIST, payload: productId });
  };

  const toggleReadingList = (product) => {
    dispatch({ type: ACTION_TYPES.TOGGLE_READING_LIST, payload: product });
  };

  const updateReadingProgress = (bookId, progress) => {
    dispatch({ 
      type: ACTION_TYPES.UPDATE_READING_PROGRESS, 
      payload: { bookId, progress } 
    });
  };

  const toggleTheme = () => {
    dispatch({ type: ACTION_TYPES.TOGGLE_THEME });
  };

  const handleSearch = (query) => {
    dispatch({ type: ACTION_TYPES.SET_SEARCH_QUERY, payload: query });
  };

  const handleCategorySelect = (category) => {
    dispatch({ type: ACTION_TYPES.SET_CATEGORY, payload: category });
    scrollToSection("home");
  };

  const handleMoodSelect = (mood) => {
    dispatch({ type: ACTION_TYPES.SET_MOOD, payload: mood });
  };

  const scrollToSection = (section) => {
    setActiveSection(section);
    dispatch({ type: ACTION_TYPES.SET_ACTIVE_SECTION, payload: section });

    let ref;
    switch (section) {
      case "home":
        ref = homeRef;
        break;
      case "categories":
        ref = categoriesRef;
        break;
      case "bestSellers":
        ref = bestSellersRef;
        break;
      default:
        ref = homeRef;
    }

    if (ref && ref.current) {
      window.scrollTo({
        top: ref.current.offsetTop - 80, // Offset for fixed header
        behavior: "smooth",
      });
    }
  };

  return {
    state,
    addToCart,
    removeFromCart,
    updateQuantity,
    viewBookDetails,
    closeBookDetails,
    toggleWishlist,
    toggleReadingList,
    updateReadingProgress,
    toggleTheme,
    handleSearch,
    handleCategorySelect,
    handleMoodSelect,
    activeSection,
    scrollToSection
  };
}