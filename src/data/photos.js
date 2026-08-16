// Where the app gets a real photo for a product or a category.
// The category files live in public/categories/ — see the README there for
// where they came from and how to swap one out.
import { productImages } from "./images";

const BASE = import.meta.env.BASE_URL;

const CATEGORY_IDS = [
  "muzqaymoq",
  "sut",
  "ichimlik",
  "kofe_choy",
  "souslar",
  "shirinlik",
  "snack",
  "yongoq",
  "bakaleya",
  "non_tuxum",
  "meva",
  "kolbasa",
  "gigiena",
  "uy_kimyo",
  "bolalar",
  "idish",
  "boshqa",
  "parfumeriya",
];

export const categoryPhotos = Object.fromEntries(
  CATEGORY_IDS.map((id) => [id, `${BASE}categories/${id}.jpg`])
);

// "boshqa" (a shopping basket) stands in for any category we have no photo for.
export function categoryPhoto(categoryId) {
  return categoryPhotos[categoryId] || categoryPhotos.boshqa;
}

// Preference order:
//   1. product.photo — an explicit full URL set on the product itself
//   2. public/images/<id>.<ext> — a photo of this exact product, when one has
//      been added (the build-time manifest says which ones exist, so the
//      browser never requests a missing file)
//   3. the category photo, so nothing ever falls back to an emoji
export function productPhoto(product) {
  if (product.photo) return product.photo;
  const ext = productImages[product.id];
  if (ext) return `${BASE}images/${product.id}.${ext}`;
  return categoryPhoto(product.category);
}
