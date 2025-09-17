
const rand = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

const CATEGORIES = ["Road / Racing", "Gravel", "MTB", "City", "Racing"];
const SELLERS    = ["Retailer", "Private", "Certified"];

export function makeProducts(n = 120) {
  const items = [];
  for (let i = 1; i <= n; i++) {
    items.push({
      id: i,
      title: `Bike Model ${i}`,
      category: CATEGORIES[i % CATEGORIES.length],
      seller: SELLERS[i % SELLERS.length],
      price: rand(60, 2000), 
      createdAt: new Date(Date.now() - rand(0, 180) * 86400000).toISOString(),
    });
  }
  return items;
}

export const PRODUCTS = makeProducts();
