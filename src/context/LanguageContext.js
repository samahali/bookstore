import { createContext } from "react"

const LanguageContext = createContext({
  language: "en",
  toggleLanguage: () => {},
  t: (key) => key,
})

export default LanguageContext
