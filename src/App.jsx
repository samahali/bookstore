// App.jsx
import "./App.css";
import Footer from "./components/layout/Footer";
import Header from "./components/layout/Header";
import ProductList from "./components/product/ProductList";
import { Container } from "react-bootstrap";
import { useRef } from "react";
import Cart from "./components/cart/Cart";
import ThemeContext from "./context/ThemeContext";
import { TranslationProvider, useTranslation } from "./context/TranslationContext";
import BookDetails from "./components/book/BookDetails";
import ReadingList from "./components/reading/ReadingList";
import BookQuote from "./components/book/BookQuote";
import ReadingMoodSelector from "./components/reading/ReadingMoodSelector";
import { products } from "./data/products";
import { useAppState } from "./hooks/useAppState";
import {BoxArrowRight, BoxArrowLeft} from "react-bootstrap-icons"

function AppContent() {
  const {language, t } = useTranslation();
  
  // Refs for scrolling to sections
  const homeRef = useRef(null);
  const categoriesRef = useRef(null);
  const bestSellersRef = useRef(null);
  
  // Use our custom hook for state management
  const { 
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
  } = useAppState({ homeRef, categoriesRef, bestSellersRef });

  // Helper functions
  const isInWishlist = (productId) => state.wishlist.includes(productId);
  const isInCartItems = (productId) => state.cartItems.some((item) => item.id === productId);
  const isInReadingList = (productId) => state.readingList.some((item) => item.id === productId);
  const cartItemCount = state.cartItems.reduce((sum, item) => sum + item.quantity, 0);
  
  return (
    <ThemeContext.Provider value={{ theme: state.theme, toggleTheme }}>
      <div className={`app-container ${state.theme === "dark" ? "dark-theme" : ""}`}>
        <Header
          cartItemCount={cartItemCount}
          wishlistCount={state.wishlist.length}
          readingListCount={state.readingList.length}
          activeSection={activeSection}
          scrollToSection={scrollToSection}
          onSearch={handleSearch}
        />
        <main className="main-content">
          <Container>
            {state.selectedBook ? (
              <div className="mb-4">
                <button onClick={closeBookDetails} className="btn-back">
                  <span className="back-arrow">
                   {language === 'ar' ? <BoxArrowRight/> : <BoxArrowLeft/>}
                  </span>{" "}
                  <span>{t("backToBooks")}</span>
                </button>
                <BookDetails
                  product={state.selectedBook}
                  addToCart={addToCart}
                  isInCartItems={isInCartItems(state.selectedBook.id)}
                  toggleWishlist={toggleWishlist}
                  isInWishlist={isInWishlist(state.selectedBook.id)}
                  toggleReadingList={toggleReadingList}
                  isInReadingList={isInReadingList(state.selectedBook.id)}
                />
              </div>
            ) : (
              <>
                <BookQuote />

                <ReadingMoodSelector
                  onMoodSelect={handleMoodSelect}
                  selectedMood={state.selectedMood}
                />

                {state.readingList.length > 0 && (
                  <ReadingList
                    books={state.readingList}
                    updateProgress={updateReadingProgress}
                    viewBookDetails={(bookId) => {
                      const book = products.find((p) => p.id === bookId);
                      if (book) viewBookDetails(book);
                    }}
                  />
                )}

                <div className="row my-4">
                  <div className="col-lg-8">
                    <ProductList
                      addToCart={addToCart}
                      cartItems={state.cartItems}
                      viewBookDetails={viewBookDetails}
                      toggleWishlist={toggleWishlist}
                      wishlist={state.wishlist}
                      searchQuery={state.searchQuery}
                      selectedCategory={state.selectedCategory}
                      onCategorySelect={handleCategorySelect}
                      refs={{ homeRef, categoriesRef, bestSellersRef }}
                      selectedMood={state.selectedMood}
                      toggleReadingList={toggleReadingList}
                      readingList={state.readingList}
                    />
                  </div>
                  <div className="col-lg-4">
                    <Cart
                      cartItems={state.cartItems}
                      removeFromCart={removeFromCart}
                      updateQuantity={updateQuantity}
                    />
                  </div>
                </div>
              </>
            )}
          </Container>
        </main>
        <Footer />
      </div>
    </ThemeContext.Provider>
  );
}

function App() {
  return (
    <TranslationProvider>
      <AppContent />
    </TranslationProvider>
  );
}

export default App;