import { productPhoto } from "../data/photos";

// Every product shows a real photo — see productPhoto() for how one is picked.
// `big` renders the larger detail-page version.
export default function ProductImage({ product, big = false }) {
  return (
    <div className={big ? "product-image big" : "product-image"}>
      <img
        src={productPhoto(product)}
        alt={product.name}
        loading="lazy"
        className="product-photo"
      />
    </div>
  );
}
