import telebot
from flask import Flask, flask, request, jsonify
import os

app = Flask(__name__)
bot = telebot.TeleBot("8200740675:AAH7LHrQVQWCqyYf3xlrgPDMPt9wbLVX7zk")
ADMIN_IDS = [8708233476]
@bot.message_handler(commands=['start'])
def check_admin(message):
    if message.from_user.id in ADMIN_IDS:
        bot.send_message(message.chat.id, "Assalomu aleykum admin")
    else:
        bot.send_message(message.chat.id, "tur naxxuy bu bu yerda")
# ---------------------------------------------------- shared formatting
def order_text(order):
    text = "🛒 Yangi buyurtma!\n\n"
    for item in order["items"]:
        line_total = item["price"] * item["qty"]
        text += f"• {item['name']} × {item['qty']} = {line_total:,} so'm\n"
    text += f"\n💰 Jami: {order['total']:,} so'm\n\n"
    c = order["customer"]
    text += f"👤 {c['name']}\n📞 {c['phone']}\n📍 {c['address']}\n"
    if c.get("comment"):
        text += f"💬 {c['comment']}\n"
    return text
# --------------------------------------------------- order from website
SITE_ORIGIN = os.getenv("SITE_ORIGIN", "*")   # https://mini-app-five-indol.vercel.app

def _cors(resp):
    resp.headers["Access-Control-Allow-Origin"] = SITE_ORIGIN
    resp.headers["Access-Control-Allow-Headers"] = "Content-Type"
    resp.headers["Access-Control-Allow-Methods"] = "POST, OPTIONS"
    return resp


@app.route("/order", methods=["POST", "OPTIONS"])
def site_order():
    if request.method == "OPTIONS":          # browser preflight — must answer
        return _cors(app.make_default_options_response())

    order = request.get_json(silent=True) or {}
    if not order.get("items") or not order.get("customer"):
        return _cors(jsonify(ok=False, error="bad order")), 400

    # Tagged so nobody tries to send a courier location to a web customer —
    # they have no Telegram id, so the location relay can't reach them.
    text = "🌐 SAYTDAN buyurtma (Telegram emas)\n\n" + order_text(order)

    for admin_id in ADMIN_IDS:
        try:
            bot.send_message(admin_id, text)
        except Exception as e:
            print(f"admin {admin_id} ga yuborilmadi: {e}")

    return _cors(jsonify(ok=True))

bot.polling(none_stop=True)
