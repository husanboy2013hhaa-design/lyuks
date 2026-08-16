import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { products } from "../data/products";

const CartContext = createContext(null);

const STORAGE_KEY = "lyuks-cart";

// Look-up table so add() can check stock without scanning 1500 products
// on every tap.
const byId = new Map(products.map((p) => [p.id, p]));

// A cart saved by an older visit may name products that no longer exist,
// or hold more than we now have in stock — clamp it on the way in.
function loadCart() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
    const clean = {};
    for (const [id, qty] of Object.entries(saved)) {
      const product = byId.get(Number(id));
      if (!product || product.stock <= 0) continue;
      const n = Math.min(Math.floor(Number(qty)) || 0, product.stock);
      if (n > 0) clean[id] = n;
    }
    return clean;
  } catch {
    return {}; // corrupt or unavailable storage — start empty
  }
}

export function CartProvider({ children }) {
  // { [productId]: quantity }
  const [quantities, setQuantities] = useState(loadCart);

  // Survive a refresh, a back button, or a reopened tab.
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(quantities));
    } catch {
      // private mode / storage full — the cart just won't persist
    }
  }, [quantities]);

  const add = (id) =>
    setQuantities((q) => {
      const stock = byId.get(id)?.stock ?? 0;
      const next = (q[id] || 0) + 1;
      // Never let the basket exceed what we actually have.
      if (next > stock) return q;
      return { ...q, [id]: next };
    });

  const remove = (id) =>
    setQuantities((q) => {
      const next = { ...q };
      if (next[id] > 1) next[id] -= 1;
      else delete next[id];
      return next;
    });

  const clear = () => setQuantities({});

  const { items, total, count } = useMemo(() => {
    const items = Object.entries(quantities)
      .map(([id, qty]) => {
        const product = byId.get(Number(id));
        return product ? { ...product, qty } : null;
      })
      .filter(Boolean); // a product pulled from the catalogue leaves no ghost row
    const total = items.reduce((sum, item) => sum + item.price * item.qty, 0);
    const count = items.reduce((sum, item) => sum + item.qty, 0);
    return { items, total, count };
  }, [quantities]);

  // True when the basket already holds everything we have of this product,
  // so the "+" button can show as disabled instead of silently doing nothing.
  const atStockLimit = (id) => (quantities[id] || 0) >= (byId.get(id)?.stock ?? 0);

  const value = {
    quantities,
    add,
    remove,
    clear,
    items,
    total,
    count,
    atStockLimit,
  };
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  return useContext(CartContext);
}
