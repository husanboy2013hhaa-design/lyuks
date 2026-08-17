import { useState } from "react";
import { useCart } from "../context/CartContext";
import { formatPrice } from "../data/products";

// The bot's /order endpoint, e.g. https://lyuks-bot.onrender.com
// Set VITE_ORDER_API in .env.local (and in Vercel's env vars).
// Unset -> the old alert-only behaviour, so local testing still works.
// Trailing slashes are trimmed: "http://host:10000/" would otherwise build
// "http://host:10000//order", which Flask answers with a 404.
const ORDER_API = (import.meta.env.VITE_ORDER_API || "").replace(/\/+$/, "");

export default function Checkout() {
  const { items, total, clear } = useCart();
  const [form, setForm] = useState({
    name: "",
    phone: "",
    address: "",
    comment: "",
  });
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");

  const update = (field) => (e) =>
    setForm((f) => ({ ...f, [field]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();

    const order = {
      customer: form,
      // id travels too so the bot can price the order from its own data
      // instead of trusting numbers that came out of a browser.
      items: items.map(({ id, name, qty, price }) => ({ id, name, qty, price })),
      total,
    };

    if (!ORDER_API) {
      // No endpoint configured — local testing fallback.
      console.log("Order:", order);
      alert("Buyurtma (test):\n" + JSON.stringify(order, null, 2));
      clear();
      setSent(true);
      return;
    }

    setSending(true);
    setError("");
    try {
      const res = await fetch(`${ORDER_API}/order`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(order),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data.ok) throw new Error(data.error || `HTTP ${res.status}`);
      clear();
      setSent(true);
    } catch (err) {
      // Never show "sent" unless the bot actually confirmed it.
      setError(
        "Buyurtma yuborilmadi. Internetni tekshiring va qayta urinib ko'ring."
      );
      console.error("Order failed:", err);
    } finally {
      setSending(false);
    }
  };

  if (sent) {
    return <p className="empty-note">Buyurtma yuborildi! ✅</p>;
  }

  return (
    <form className="checkout" onSubmit={handleSubmit}>
      <label>
        Ismingiz
        <input
          required
          value={form.name}
          onChange={update("name")}
          placeholder="Aziz"
        />
      </label>

      <label>
        Telefon raqamingiz
        <input
          required
          type="tel"
          value={form.phone}
          onChange={update("phone")}
          placeholder="+998 90 123 45 67"
        />
      </label>

      <label>
        Yetkazib berish manzili
        <input
          required
          value={form.address}
          onChange={update("address")}
          placeholder="Toshkent sh., Chilonzor tumani..."
        />
      </label>

      <label>
        Izoh (ixtiyoriy)
        <textarea
          value={form.comment}
          onChange={update("comment")}
          placeholder="Eshik qo'ng'irog'i ishlamaydi, telefon qiling"
          rows={2}
        />
      </label>

      <div className="cart-total">
        <span>Jami:</span>
        <b>{formatPrice(total)}</b>
      </div>

      {error && <p className="form-error">{error}</p>}

      <button type="submit" className="btn-primary" disabled={sending}>
        {sending ? "Yuborilmoqda..." : "✅ Buyurtmani tasdiqlash"}
      </button>
    </form>
  );
}
