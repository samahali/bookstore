import { Container, Row, Col } from "react-bootstrap";
import { Facebook, Twitter, Instagram, Linkedin } from "react-bootstrap-icons";
import { useTranslation } from "../../context/TranslationContext";
import "./Footer.css"

export default function Footer() {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer mt-auto py-4">
      <Container>
        <Row>
          <Col md={4} className="mb-4 mb-md-0">
            <h5 className="mb-3 fw-bold">BookStore</h5>
            <p className="mb-3">{t("bookstoreDesc")}</p>
            <div className="d-flex gap-3">
              <a href="#" className="text-white social-icon">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-white social-icon">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-white social-icon">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-white social-icon">
                <Linkedin size={20} />
              </a>
            </div>
          </Col>
          <Col md={2} className="mb-4 mb-md-0">
            <h5 className="mb-3 fw-bold">{t("shop")}</h5>
            <ul className="list-unstyled footer-links">
              <li className="mb-2">
                <a
                  href="#"
                  className="text-decoration-none text-white-50 footer-link"
                >
                  {t("newArrivals")}
                </a>
              </li>
              <li className="mb-2">
                <a
                  href="#"
                  className="text-decoration-none text-white-50 footer-link"
                >
                  {t("bestSellers")}
                </a>
              </li>
              <li className="mb-2">
                <a
                  href="#"
                  className="text-decoration-none text-white-50 footer-link"
                >
                  {t("discounts")}
                </a>
              </li>
              <li className="mb-2">
                <a
                  href="#"
                  className="text-decoration-none text-white-50 footer-link"
                >
                  {t("giftCards")}
                </a>
              </li>
            </ul>
          </Col>
          <Col md={2} className="mb-4 mb-md-0">
            <h5 className="mb-3 fw-bold">{t("support")}</h5>
            <ul className="list-unstyled footer-links">
              <li className="mb-2">
                <a
                  href="#"
                  className="text-decoration-none text-white-50 footer-link"
                >
                  {t("contactUs")}
                </a>
              </li>
              <li className="mb-2">
                <a
                  href="#"
                  className="text-decoration-none text-white-50 footer-link"
                >
                  {t("faq")}
                </a>
              </li>
              <li className="mb-2">
                <a
                  href="#"
                  className="text-decoration-none text-white-50 footer-link"
                >
                  {t("shipping")}
                </a>
              </li>
              <li className="mb-2">
                <a
                  href="#"
                  className="text-decoration-none text-white-50 footer-link"
                >
                  {t("returns")}
                </a>
              </li>
            </ul>
          </Col>
          <Col md={4}>
            <h5 className="mb-3 fw-bold">{t("stayConnected")}</h5>
            <p className="mb-3 text-white-50">{t("newsletter")}</p>
            <div className="d-flex newsletter-form">
              <input
                type="email"
                className="form-control"
                placeholder={t("emailPlaceholder")}
              />
              <button className="btn btn-light subscribe-btn">
                {t("subscribe")}
              </button>
            </div>
          </Col>
        </Row>
        <hr className="my-4 bg-white opacity-25" />
        <div className="text-center text-white-50">
          <small>
            {t("allRights")} &copy; {currentYear}
          </small>
        </div>
      </Container>
    </footer>
  );
}
