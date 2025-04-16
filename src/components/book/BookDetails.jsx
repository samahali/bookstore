import { useContext, useState } from "react";
import { Row, Col, Button, Badge, Tabs, Tab } from "react-bootstrap";
import {
  Star,
  StarFill,
  Heart,
  HeartFill,
  Share,
  Cart,
  CartFill,
  Facebook,
  Twitter,
  Linkedin,
  Clock,
} from "react-bootstrap-icons";
import TranslationContext from "../../context/TranslationContext";
import "./BookDetails.css"

export default function BookDetails({
  product,
  addToCart,
  isInCartItems,
  toggleWishlist,
  isInWishlist,
  toggleReadingList,
  isInReadingList,
}) {
  const {
    language,
    t,
    translateBookTitle,
    translateAuthor,
    translateDescription,
    translateCategory,
  } = useContext(TranslationContext);
  const [quantity, setQuantity] = useState(1);
  const [showShareOptions, setShowShareOptions] = useState(false);
  const [isWishListHovered, setWishListHovered] = useState(false);
  const [isCartHovered, setCartHovered] = useState(false);
  const title =
    language === "en"
      ? product.titleEn
      : translateBookTitle(product.titleEn, { translation: product.titleAr });
  const author =
    language === "en"
      ? product.authorEn
      : translateAuthor(product.authorEn, { translation: product.authorAr });
  const description =
    language === "en"
      ? product.descriptionEn
      : translateDescription(product.descriptionEn, {
          translation: product.descriptionAr,
        });
  const category = translateCategory(product.category);

  // Estimate reading time (average reading speed: 250 words per minute)
  const wordCount = description.split(/\s+/).length;
  const readingTimeMinutes = Math.ceil(wordCount / 250);

  const handleAddToCart = () => {
    // Pass the quantity to the addToCart function
    const productWithQuantity = { ...product, quantity };
    addToCart(productWithQuantity);
  };

  const incrementQuantity = () => setQuantity(quantity + 1);
  const decrementQuantity = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  const shareOnSocial = (platform) => {
    const url = window.location.href;
    const text = `${t("checkOutThisBook")}: ${title} ${t("by")} ${author}`;

    let shareUrl = "";

    switch (platform) {
      case "facebook":
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
          url
        )}&quote=${encodeURIComponent(text)}`;
        break;
      case "twitter":
        shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
          text
        )}&url=${encodeURIComponent(url)}`;
        break;
      case "linkedin":
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
          url
        )}&title=${encodeURIComponent(title)}&summary=${encodeURIComponent(
          description
        )}`;
        break;
      default:
        return;
    }

    window.open(shareUrl, "_blank", "width=600,height=400");
  };

  return (
    <div className="book-details-container">
      <Row>
        <Col md={5}>
          <div className="book-image-container">
            <div className="book-badges">
              {product.featured && (
                <Badge className="featured-badge">{t("featured")}</Badge>
              )}
              <Badge className="language-badge">
                {translateCategory(product.language)}
              </Badge>
            </div>
            <img
              src={product.image || "/placeholder.svg"}
              alt={title}
              className="img-fluid rounded book-cover-image"
            />
            <div className="book-image-overlay">
              <div className="share-container">
                <Button
                  variant="light"
                  className="btn-icon"
                  onClick={() => setShowShareOptions(!showShareOptions)}
                >
                  <Share size={20} />
                </Button>

                {showShareOptions && (
                  <div className="share-options">
                    <Button
                      variant="primary"
                      className="share-btn facebook-btn"
                      onClick={() => shareOnSocial("facebook")}
                    >
                      <Facebook size={18} />
                    </Button>
                    <Button
                      variant="info"
                      className="share-btn twitter-btn"
                      onClick={() => shareOnSocial("twitter")}
                    >
                      <Twitter size={18} />
                    </Button>
                    <Button
                      variant="primary"
                      className="share-btn linkedin-btn"
                      onClick={() => shareOnSocial("linkedin")}
                    >
                      <Linkedin size={18} />
                    </Button>
                  </div>
                )}
              </div>

              <Button
                variant={isInWishlist ? "danger" : "light"}
                className="btn-icon"
                onClick={() => toggleWishlist(product.id)}
              >
                {isInWishlist ? <HeartFill size={20} /> : <Heart size={20} />}
              </Button>
            </div>
          </div>
        </Col>
        <Col md={7}>
          <Badge className="category-badge mb-3">{category}</Badge>
          <h1 className="book-title-large mb-2">{title}</h1>
          <h5 className="book-description mb-3">
            {t("by")} {author}
          </h5>

          <div className="d-flex align-items-center mb-2">
            <div className={`rating ${language === "en" ? "me-3" : "ms-3"}`}>

              {[...Array(5)].map((_, i) => (
                
                i < Math.floor(product.rating.rate) 
                ? <StarFill
                  key={i}
                  className={"text-warning"}
                /> 
                : <Star key={i} className={"book-description"} />
              ))}
            </div>
            <span>
              {product.rating.rate} ({product.rating.count} {t("reviews")})
            </span>
          </div>

          <div className="reading-time mb-4 d-flex align-items-center">
            <Clock className={`${language === "en" ? "me-2" : "ms-2"}`} />
            <span>
              {t("estimatedReadingTime")}: {readingTimeMinutes} {t("minutes")}
            </span>
          </div>

          <div className="price-container mb-4">
            <h3 className="product-price">${product.price.toFixed(2)}</h3>
            <span className={`text-success ${language === "en" ? "me-2" : "ms-2"}`}>{t("inStock")}</span>
          </div>

          <div className="book-description mb-4">{description}</div>

          <div className="d-flex flex-wrap align-items-center mb-4 gap-3">
            <div className="quantity-control">
              <Button
                size="sm"
                variant="outline-secondary"
                onClick={decrementQuantity}
              >
                -
              </Button>
              <input
                type="number"
                className="form-control"
                value={quantity}
                onChange={(e) =>
                  setQuantity(Math.max(1, Number.parseInt(e.target.value) || 1))
                }
                min="1"
              />
              <Button
                size="sm"
                variant="outline-secondary"
                onClick={incrementQuantity}
              >
                +
              </Button>
            </div>

            <Button
              variant={isInCartItems ? "primary" : "outline-primary" }
              className="px-4 d-flex align-items-center gap-2"
              onMouseEnter={()=> setCartHovered(!isCartHovered)}
              onMouseOut={()=> setCartHovered(!isCartHovered)}
              onClick={handleAddToCart}
            >
              {isCartHovered ? <CartFill size={16} /> : <Cart size={16} />}
              {t("addToCart")}
            </Button>
            <Button
              variant={isInWishlist ? "danger" : "outline-danger"}
              onMouseEnter={() => setWishListHovered(!isWishListHovered)}
              onMouseOut={() => setWishListHovered(!isWishListHovered)}
              className="d-flex align-items-center gap-2"
              onClick={() => toggleWishlist(product.id)}
            >
              {isWishListHovered || isInWishlist ? <HeartFill size={16} /> : <Heart size={16} />}
              {isInWishlist ? t("removeFromWishlist") : t("addToWishlist")}
            </Button>
            <Button
              variant={isInReadingList ? "success" : "outline-success"}
              className="d-flex align-items-center gap-2"
              onClick={() => toggleReadingList(product)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                viewBox="0 0 16 16"
              >
                <path d="M8.5 2.687c.654-.689 1.782-.886 3.112-.752 1.234.124 2.503.523 3.388.893v9.923c-.918-.35-2.107-.692-3.287-.81-1.094-.111-2.278-.039-3.213.492V2.687zM8 1.783C7.015.936 5.587.81 4.287.94c-1.514.153-3.042.672-3.994 1.105A.5.5 0 0 0 0 2.5v11a.5.5 0 0 0 .707.455c.882-.4 2.303-.881 3.68-1.02 1.409-.142 2.59.087 3.223.877a.5.5 0 0 0 .78 0c.633-.79 1.814-1.019 3.222-.877 1.378.139 2.8.62 3.681 1.02A.5.5 0 0 0 16 13.5v-11a.5.5 0 0 0-.293-.455c-.952-.433-2.48-.952-3.994-1.105C10.413.809 8.985.936 8 1.783z" />
              </svg>
              {isInReadingList
                ? t("removeFromReadingList")
                : t("addToReadingList")}
            </Button>
          </div>

          <Tabs defaultActiveKey="details" className="mb-4 book-tabs">
            <Tab eventKey="details" title={t("details")}>
              <div className="py-3">
                <div className="book-meta">
                  <p>
                    <strong>{t("language")}:</strong>{" "}
                    {translateCategory(product.language)}
                  </p>
                  <p>
                    <strong>{t("category")}:</strong> {category}
                  </p>
                  <p>
                    <strong>{t("rating")}:</strong> {product.rating.rate}/5 (
                    {product.rating.count} {t("reviews")})
                  </p>
                </div>
              </div>
            </Tab>
            <Tab eventKey="reviews" title={t("reviews")}>
              <div className="py-3">
                <p>{t("customerReviews")}</p>
                <div className="review-placeholder">
                  <p className="book-description">{t("noReviewsYet")}</p>
                </div>
              </div>
            </Tab>
          </Tabs>
        </Col>
      </Row>
    </div>
  );
}
