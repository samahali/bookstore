import { Button } from "react-bootstrap";
import { Trash } from "react-bootstrap-icons";
import { useTranslation } from "../../context/TranslationContext";
import "./Cart.css"

export default function Cart({ cartItems, removeFromCart, updateQuantity }) {
  const { language, t } = useTranslation();

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const getItemTitle = (item) => {
    return language === "en" ? item.titleEn : item.titleAr;
  };

  if (cartItems.length === 0) {
    return (
      <div className="cart-container">
        <h3 className="cart-title">{t("yourCart")}</h3>
        <div className="cart-empty">
          <p>{t("emptyCart")}</p>
          <Button variant="outline-success">{t("continueShopping")}</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-container">
      <h3 className="cart-title">{t("yourCart")}</h3>

      {cartItems.map((item) => (
        <div key={item.id} className="cart-item">
          <div className="d-flex justify-content-between">
            <div>
              <h6>{getItemTitle(item)}</h6>
              <div className="text-muted">${item.price.toFixed(2)}</div>
            </div>
            <Button
              variant="link"
              className="text-danger p-0"
              onClick={() => removeFromCart(item.id)}
            >
              <Trash />
            </Button>
          </div>

          <div className="mt-2 d-flex justify-content-between align-items-center">
            <div className="quantity-control">
              <Button
                size="sm"
                variant="outline-secondary"
                onClick={() => updateQuantity(item.id, item.quantity - 1)}
              >
                -
              </Button>
              <input
                type="number"
                className="form-control mx-2 w-25"
                value={item.quantity}
                onChange={(e) =>
                  updateQuantity(item.id, Number.parseInt(e.target.value) || 1)
                }
                min="1"
              />
              <Button
                size="sm"
                variant="outline-secondary"
                onClick={() => updateQuantity(item.id, item.quantity + 1)}
              >
                +
              </Button>
            </div>
            <div className="fw-bold">
              ${(item.price * item.quantity).toFixed(2)}
            </div>
          </div>
        </div>
      ))}

      <div className="cart-total d-flex justify-content-between">
        <span>{t("total")}:</span>
        <span>${total.toFixed(2)}</span>
      </div>

      <Button variant="success" className="w-100 mt-3">
        {t("checkout")}
      </Button>
    </div>
  );
}
