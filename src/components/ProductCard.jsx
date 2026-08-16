import { useCart } from "../context/CartContext";
import { formatPrice } from "../data/products";
import { haptic } from "../haptic";
import ProductImage from "./ProductImage";

export default function ProductCard({ product, onOpen }) {
  const { quantities, add, remove, atStockLimit } = useCart();
  const qty = quantities[product.id] || 0;
  const soldOut = product.stock <= 0;
  const maxed = atStockLimit(product.id);

  const open = () => {
    haptic();
    onOpen(product);
  };

  return (
    <div className={`product-card ${soldOut ? "sold-out" : ""}`}>
      {/* Tapping the photo or name opens the detail page */}
      <div className="product-tap" onClick={open}>
        <ProductImage product={product} />
        <div className="product-name">{product.name}</div>
      </div>
      <div className="product-price">{formatPrice(product.price)}</div>

      {soldOut ? (
        <button className="btn-add disabled" disabled>
          Tugagan
        </button>
      ) : qty === 0 ? (
        <button
          className="btn-add"
          onClick={() => {
            haptic();
            add(product.id);
          }}
        >
          Qo'shish
        </button>
      ) : (
        <div className="qty-controls">
          <button
            className="btn-qty"
            onClick={() => {
              haptic();
              remove(product.id);
            }}
          >
            −
          </button>
          <span className="qty-value">{qty}</span>
          <button
            className="btn-qty"
            disabled={maxed}
            title={maxed ? `Omborda ${product.stock} dona bor` : undefined}
            onClick={() => {
              haptic();
              add(product.id);
            }}
          >
            +
          </button>
        </div>
      )}
    </div>
  );
}
