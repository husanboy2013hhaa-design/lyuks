// Writes the bot's copy of the price list.
//
// The bot must never trust the prices a browser sends, so it re-derives every
// order from its own products.json. That file is generated from src/data/products.js
// by this script — otherwise the two drift and the bot quietly charges old prices.
//
// Destination defaults to the sibling bot checkout; override with BOT_DIR:
//   BOT_DIR=../some/other/bot npm run gen-products
import { writeFileSync, existsSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { products } from "../src/data/products.js";

const here = dirname(fileURLToPath(import.meta.url));
const botDir = resolve(
  here,
  "..",
  process.env.BOT_DIR || "../lyuks bot 2/bot"
);

if (!existsSync(botDir)) {
  // Not an error: the site builds fine on Vercel, where the bot isn't checked
  // out. Only a local build can refresh the bot's copy.
  console.warn(
    `gen-products-json: bot folder not found at ${botDir} — skipping.\n` +
      "  Set BOT_DIR if it lives somewhere else."
  );
  process.exit(0);
}

// Only what the bot needs to price an order: name, price, stock — keyed by id.
const catalog = Object.fromEntries(
  products.map((p) => [p.id, { name: p.name, price: p.price, stock: p.stock }])
);

const outFile = join(botDir, "products.json");
writeFileSync(outFile, JSON.stringify(catalog, null, 1));
console.log(
  `gen-products-json: ${products.length} products -> ${outFile}`
);
