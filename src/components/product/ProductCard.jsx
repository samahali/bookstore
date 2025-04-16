import { useContext, useState } from "react";
import { Card, Button, Badge } from "react-bootstrap";
import { StarFill, Cart, CartFill, Eye, EyeFill, Heart, HeartFill } from "react-bootstrap-icons";
import TranslationContext from "../../context/TranslationContext";
import "./ProductCard.css"
export default function ProductCard({
  product,
  addToCart,
  isInCartItems,
  viewBookDetails,
  toggleWishlist,
  isInWishlist,
  toggleReadingList,
  isInReadingList
}) {
  const { language, translateBookTitle, translateAuthor, translateCategory } =
    useContext(TranslationContext);

  const title =
    language === "en"
      ? product.titleEn
      : translateBookTitle(product.titleEn, { translation: product.titleAr });
  const author =
    language === "en"
      ? product.authorEn
      : translateAuthor(product.authorEn, { translation: product.authorAr });
  const category = translateCategory(product.category);
  const [isWishListHovered, setWishListHovered] = useState(false);
  const [isCartHovered, setCartHovered] = useState(false);
  const [isEyeHovered, setEyeHovered] = useState(false);

  return (
    <Card className="product-card">
      {product.featured && (
        <div className="featured-label">{translateCategory("featured")}</div>
      )}
      <div className="book-language">{translateCategory(product.language)}</div>
      <Card.Img variant="top" src={product.image} alt={title} />
      <Card.Body className="d-flex flex-column">
        <div className="d-flex justify-content-between align-items-start mb-2">
          <Badge className="category-badge">{category}</Badge>
          <div className="d-flex align-items-center">
            <StarFill className={`text-warning ${language === "en" ? "me-1" : "ms-1"}`} />
            <small>
              {product.rating.rate} ({product.rating.count})
            </small>
          </div>
        </div>
        <h5 className="book-title">{title}</h5>
        <p className="author-name">{author}</p>
        <div className="d-flex justify-content-between align-items-center mt-auto">
          <span className="product-price">${product.price.toFixed(2)}</span>
          <div className="d-flex gap-2">
            <Button
              variant={isInReadingList ? "success" : "outline-success"}
              onClick={() => toggleReadingList(product)}
              className="btn-icon"
              title={
                isInReadingList
                  ? translateCategory("removeFromReadingList")
                  : translateCategory("addToReadingList")
              }
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
            </Button>
            <Button
              variant={isInWishlist ? "danger" : "outline-danger"}
              onClick={() => toggleWishlist(product.id)}
              onMouseEnter={() => setWishListHovered(!isWishListHovered)}
              onMouseLeave={() => setWishListHovered(!isWishListHovered)}
              className="btn-icon wishlist-btn"
              title={
                isInWishlist
                  ? translateCategory("removeFromWishlist")
                  : translateCategory("addToWishlist")
              }
            >
              {isInWishlist || isWishListHovered ? <HeartFill size={16} /> : <Heart size={16} />}
            </Button>
            <Button
              variant="outline-secondary"
              onClick={() => viewBookDetails(product)}
              onMouseEnter={() => setEyeHovered(!isEyeHovered)}
              onMouseLeave={() => setEyeHovered(!isEyeHovered)}
              className="btn-icon"
              title={translateCategory("viewDetails")}
            >
              {isEyeHovered ? <EyeFill size={16} /> : <Eye size={16} />}
            </Button>
            <Button
              variant={isInCartItems ? "primary" : "outline-primary"}
              onClick={() => addToCart(product)}
              onMouseEnter={()=> setCartHovered(!isCartHovered)}
              onMouseLeave={() => setCartHovered(!isCartHovered)}
              className="btn-icon"
              title={translateCategory("addToCart")}
            >
              {isInCartItems || isCartHovered ? <CartFill size={16} /> : <Cart size={16} />}
            </Button>
          </div>
        </div>
      </Card.Body>
    </Card>
  );
}
