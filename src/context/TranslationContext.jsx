import {
  createContext,
  useState,
  useEffect,
  useCallback,
  useContext,
} from "react";
import { defaultTranslations } from "../translations";
import { literaryTerms } from "../translations/literary-terms";
import { culturalAdaptations } from "../translations/cultural-adaptations";
import { authorTransliterations } from "../translations/author-transliterations";

// Create the context
const TranslationContext = createContext({
  language: "en",
  toggleLanguage: () => {},
  t: (key, options) => key,
  translateBookTitle: (title, options) => title,
  translateAuthor: (author) => author,
  translateDescription: (description) => description,
  translateCategory: (category) => category,
});

// Create the provider component
export const TranslationProvider = ({ children }) => {
  const [language, setLanguage] = useState("en");
  const [translations, setTranslations] = useState(defaultTranslations);

  // Load language preference from localStorage
  useEffect(() => {
    const savedLanguage = localStorage.getItem("bookstore-language");
    if (savedLanguage) {
      setLanguage(savedLanguage);
    }
  }, []);

  // Save language preference to localStorage
  useEffect(() => {
    localStorage.setItem("bookstore-language", language);
  }, [language]);

  // Toggle language between English and Arabic
  const toggleLanguage = useCallback(() => {
    setLanguage(language === "en" ? "ar" : "en");
    const dir = language === "en" ? "rtl" : "ltr"
    document.querySelector("html").setAttribute("dir", dir)
  }, [language]);

  // Basic translation function with support for variables
  const t = useCallback(
    (key, options = {}) => {
      // Get the translation from the current language
      const translation = translations[language][key] || key;

      // Replace variables in the translation
      if (options.variables) {
        return Object.entries(options.variables).reduce(
          (acc, [varKey, varValue]) => {
            return acc.replace(new RegExp(`{{${varKey}}}`, "g"), varValue);
          },
          translation
        );
      }

      return translation;
    },
    [language, translations]
  );

  // Specialized function for translating book titles with cultural context
  const translateBookTitle = useCallback(
    (title, options = {}) => {
      if (language === "en" || !title) return title;

      // Check if we have a cultural adaptation for this title
      const culturalTitle = culturalAdaptations.titles[title];
      if (culturalTitle && culturalTitle[language]) {
        return culturalTitle[language];
      }

      // If no cultural adaptation, return the provided translation or the original
      return options.translation || title;
    },
    [language]
  );

  // Specialized function for translating author names with proper transliteration
  const translateAuthor = useCallback(
    (author) => {
      if (language === "en" || !author) return author;

      // Check if we have a transliteration for this author
      const transliteration = authorTransliterations[author];
      if (transliteration && transliteration[language]) {
        return transliteration[language];
      }

      return author;
    },
    [language]
  );

  // Specialized function for translating book descriptions with literary terminology
  const translateDescription = useCallback(
    (description, options = {}) => {
      if (language === "en" || !description) return description;

      // If a direct translation is provided, use it
      if (options.translation) return options.translation;

      // Otherwise, use the original description
      // In a real app, this would use a more sophisticated translation API
      return description;
    },
    [language]
  );

  // Specialized function for translating categories with literary context
  const translateCategory = useCallback(
    (category) => {
      if (!category) return "";

      // Check if we have a literary term for this category
      const literaryTerm = literaryTerms[category];
      if (literaryTerm && literaryTerm[language]) {
        return literaryTerm[language];
      }

      // Fall back to basic translation
      return t(category);
    },
    [language, t]
  );

  // Create the context value
  const contextValue = {
    language,
    toggleLanguage,
    t,
    translateBookTitle,
    translateAuthor,
    translateDescription,
    translateCategory,
  };

  return (
    <TranslationContext.Provider value={contextValue}>
      {children}
    </TranslationContext.Provider>
  );
};

// Export the useTranslation hook
export const useTranslation = () => {
  const context = useContext(TranslationContext);
  if (context === undefined) {
    throw new Error("useTranslation must be used within a TranslationProvider");
  }
  return context;
};

export default TranslationContext;
