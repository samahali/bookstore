import { useContext, useState } from "react";
import { Container, Navbar, Nav, Form, Button, Badge } from "react-bootstrap";
import {
  Cart,
  Heart,
  Book,
  Search,
  Globe,
  Moon,
  Sun,
} from "react-bootstrap-icons";
import { useTranslation } from "../../context/TranslationContext";
import ThemeContext from "../../context/ThemeContext";
import "./Header.css"
export default function Header({
  cartItemCount,
  wishlistCount,
  readingListCount,
  activeSection,
  scrollToSection,
  onSearch,
}) {
  const { language, toggleLanguage, t } = useTranslation();
  const { theme, toggleTheme } = useContext(ThemeContext);
  const [searchValue, setSearchValue] = useState("");

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    onSearch(searchValue);
  };

  return (
    <header className="fixed-header">
      <Navbar expand="lg" className="custom-navbar py-3" fixed="top">
        <Container>
          <Navbar.Brand
            href="#"
            className="d-flex align-items-center text-white"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection("home");
            }}
          >
            <Book size={30} className={`${language === "en" ? "me-2" : "ms-2"}`} />
            BookStore
          </Navbar.Brand>

          <div className="d-flex order-lg-3">
            <Button
              variant="link"
              className="theme-toggle"
              onClick={toggleTheme}
              aria-label={
                theme === "light"
                  ? t("switchToDarkMode")
                  : t("switchToLightMode")
              }
            >
              {theme === "light" ? <Moon size={18} /> : <Sun size={18} />}
            </Button>

            <Button
              variant="link"
              className="language-toggle"
              onClick={toggleLanguage}
              aria-label={
                language === "en" ? t("switchToArabic") : t("switchToEnglish")
              }
            >
              <Globe size={16} className={`${language === "en" ? "me-1" : "ms-1"}`} />
              {language === "en" ? "العربية" : "English"}
            </Button>
          </div>

          <Navbar.Toggle aria-controls="navbarScroll" className="ms-2" />

          <Navbar.Collapse id="navbarScroll">
            <Nav className="me-auto">
              <Nav.Link
                href="#home"
                active={activeSection === "home"}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection("home");
                }}
              >
                {t("home")}
              </Nav.Link>
              <Nav.Link
                href="#categories"
                active={activeSection === "categories"}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection("categories");
                }}
              >
                {t("categories")}
              </Nav.Link>
              <Nav.Link
                href="#bestSellers"
                active={activeSection === "bestSellers"}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection("bestSellers");
                }}
              >
                {t("bestSellers")}
              </Nav.Link>
            </Nav>

            <Form className={`d-flex ${language === "en" ? "me-3" : "ms-3"}`} onSubmit={handleSearchSubmit}>
              <div className="search-container">
                <Form.Control
                  type="search"
                  placeholder={t("searchPlaceholder")}
                  className="search-input"
                  aria-label="Search"
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                />
                <Button
                  variant="outline-light"
                  className="search-button"
                  type="submit"
                >
                  <Search size={16} />
                </Button>
              </div>
            </Form>

            <Nav className="d-flex flex-row">
              <Nav.Link href="#" className={`${language === "en" ? "me-2" : "ms-2"} position-relative`}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  fill="currentColor"
                  viewBox="0 0 16 16"
                >
                  <path d="M8.5 2.687c.654-.689 1.782-.886 3.112-.752 1.234.124 2.503.523 3.388.893v9.923c-.918-.35-2.107-.692-3.287-.81-1.094-.111-2.278-.039-3.213.492V2.687zM8 1.783C7.015.936 5.587.81 4.287.94c-1.514.153-3.042.672-3.994 1.105A.5.5 0 0 0 0 2.5v11a.5.5 0 0 0 .707.455c.882-.4 2.303-.881 3.68-1.02 1.409-.142 2.59.087 3.223.877a.5.5 0 0 0 .78 0c.633-.79 1.814-1.019 3.222-.877 1.378.139 2.8.62 3.681 1.02A.5.5 0 0 0 16 13.5v-11a.5.5 0 0 0-.293-.455c-.952-.433-2.48-.952-3.994-1.105C10.413.809 8.985.936 8 1.783z" />
                </svg>
                {readingListCount > 0 && (
                  <Badge
                    pill
                    bg="success"
                    className="position-absolute top-0 start-100 translate-middle"
                  >
                    {readingListCount}
                  </Badge>
                )}
              </Nav.Link>
              <Nav.Link href="#" className={`${language === "en" ? "me-2" : "ms-2"} position-relative`}>
                <Heart size={20} />
                {wishlistCount > 0 && (
                  <Badge
                    pill
                    bg="danger"
                    className="position-absolute top-0 start-100 translate-middle"
                  >
                    {wishlistCount}
                  </Badge>
                )}
              </Nav.Link>
              <Nav.Link href="#" className="position-relative">
                <Cart size={20} />
                {cartItemCount > 0 && (
                  <Badge
                    pill
                    bg="danger"
                    className="position-absolute top-0 start-100 translate-middle"
                  >
                    {cartItemCount}
                  </Badge>
                )}
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
}
