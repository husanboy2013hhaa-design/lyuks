import { categories } from "../data/products";
import { categoryPhoto } from "../data/photos";
import { haptic } from "../haptic";

export default function CategoryBar({ active, onSelect }) {
  return (
    <div className="category-bar">
      {categories.map((cat) => (
        <button
          key={cat.id}
          className={`category-chip ${active === cat.id ? "active" : ""}`}
          onClick={() => {
            haptic();
            onSelect(cat.id);
          }}
        >
          {/* alt="" — the category name is right next to it */}
          <img
            className="category-thumb"
            src={categoryPhoto(cat.id)}
            alt=""
            loading="lazy"
          />
          {cat.name}
        </button>
      ))}
    </div>
  );
}
