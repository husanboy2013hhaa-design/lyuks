import { products } from "../data/products";
import ProductCard from "./ProductCard";

export default function ProductList({ category, search, onOpen }) {
  const query = search.trim().toLowerCase();

  const visible = products.filter((p) => {
    if (query) return p.name.toLowerCase().includes(query);
    return p.category === category;
  });

  if (visible.length === 0) {
    return <p className="empty-note">Hech narsa topilmadi 😕</p>;
  }

  return (
    <div className="product-grid">
      {visible.map((p) => (
        <ProductCard key={p.id} product={p} onOpen={onOpen} />
      ))}
    </div>
  );
}
