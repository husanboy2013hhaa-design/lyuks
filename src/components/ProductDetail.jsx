import { useCart } from "../context/CartContext";
import { formatPrice } from "../data/products";
import { haptic } from "../haptic";
import ProductImage from "./ProductImage";

export default function ProductDetail({ product, onBack }) {
  const { quantities, add, remove, atStockLimit } = useCart();
  const qty = quantities[product.id] || 0;
  const soldOut = product.stock <= 0;
  const maxed = atStockLimit(product.id);

  return (
    <div className="detail">
      <ProductImage product={product} big />

      <h2 className="detail-name">{product.name}</h2>
      <div className="detail-price">{formatPrice(product.price)}</div>

      <div className={`detail-stock ${soldOut ? "out" : ""}`}>
        {soldOut ? "❌ Hozircha tugagan" : `✅ Mavjud: ${product.stock} dona`}
      </div>

      {soldOut ? (
        <button className="btn-primary disabled" disabled>
          Tugagan
        </button>
      ) : qty === 0 ? (
        <button
          className="btn-primary"
          onClick={() => {
            haptic();
            add(product.id);
          }}
        >
          🛒 Savatga qo'shish
        </button>
      ) : (
        <div className="detail-qty">
          <button
            className="btn-qty big"
            onClick={() => {
              haptic();
              remove(product.id);
            }}
          >
            −
          </button>
          <span className="qty-value">{qty}</span>
          <button
            className="btn-qty big"
            disabled={maxed}
            onClick={() => {
              haptic();
              add(product.id);
            }}
          >
            +
          </button>
        </div>
      )}

      <button className="btn-secondary" onClick={onBack}>
        ← Do'konga qaytish
      </button>
    </div>
  );
}
