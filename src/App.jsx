import { useState } from "react";
import { categories, formatPrice } from "./data/products";
import { useCart } from "./context/CartContext";
import CategoryBar from "./components/CategoryBar";
import ProductList from "./components/ProductList";
import ProductDetail from "./components/ProductDetail";
import Cart from "./components/Cart";
import Checkout from "./components/Checkout";

const TITLES = {
  home: "Lyuks Do'kon 🛍",
  detail: "Mahsulot 📦",
  cart: "Savat 🛒",
  checkout: "Buyurtma berish 📦",
};

export default function App() {
  const [view, setView] = useState("home"); // home | detail | cart | checkout
  const [category, setCategory] = useState(categories[0].id);
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState(null); // product for detail view
  const { total, count } = useCart();

  // Where "back" goes from each inner screen.
  const backTo = { detail: "home", cart: "home", checkout: "cart" };

  const openProduct = (product) => {
    setSelected(product);
    setView("detail");
  };

  return (
    <div className="app">
      <header className="header">
        {view !== "home" && (
          <button
            className="btn-back"
            onClick={() => setView((v) => backTo[v] || "home")}
          >
            ←
          </button>
        )}
        <h1>{TITLES[view]}</h1>
      </header>

      {view === "home" && (
        <>
          <input
            className="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="🔍 Qidirish..."
          />
          {!search && <CategoryBar active={category} onSelect={setCategory} />}
          <ProductList
            category={category}
            search={search}
            onOpen={openProduct}
          />

          {count > 0 && (
            <button className="btn-primary sticky" onClick={() => setView("cart")}>
              Savat · {formatPrice(total)}
            </button>
          )}
        </>
      )}

      {view === "detail" && selected && (
        <ProductDetail product={selected} onBack={() => setView("home")} />
      )}

      {view === "cart" && (
        <>
          <Cart />
          {count > 0 && (
            <button
              className="btn-primary sticky"
              onClick={() => setView("checkout")}
            >
              Buyurtma berish
            </button>
          )}
        </>
      )}

      {view === "checkout" && <Checkout />}
    </div>
  );
}
