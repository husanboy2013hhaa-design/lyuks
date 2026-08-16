import { useCart } from "../context/CartContext";
import { formatPrice } from "../data/products";
import { productPhoto } from "../data/photos";
import { haptic } from "../haptic";

export default function Cart() {
  const { items, total, add, remove, atStockLimit } = useCart();

  if (items.length === 0) {
    return <p className="empty-note">Savat bo'sh 🛒</p>;
  }

  return (
    <div className="cart">
      {items.map((item) => (
        <div key={item.id} className="cart-row">
          <img className="cart-thumb" src={productPhoto(item)} alt="" />
          <div className="cart-info">
            <div className="cart-name">{item.name}</div>
            <div className="cart-price">
              {formatPrice(item.price)} × {item.qty} ={" "}
              <b>{formatPrice(item.price * item.qty)}</b>
            </div>
          </div>
          <div className="qty-controls small">
            <button
              className="btn-qty"
              onClick={() => {
                haptic();
                remove(item.id);
              }}
            >
              −
            </button>
            <span className="qty-value">{item.qty}</span>
            <button
              className="btn-qty"
              disabled={atStockLimit(item.id)}
              onClick={() => {
                haptic();
                add(item.id);
              }}
            >
              +
            </button>
          </div>
        </div>
      ))}

      <div className="cart-total">
        <span>Jami:</span>
        <b>{formatPrice(total)}</b>
      </div>
    </div>
  );
}
