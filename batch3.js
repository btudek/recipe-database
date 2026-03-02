const { Client } = require('pg');
const client = new Client({ host: 'db.ycwbumsmlikiquplkdln.supabase.co', port: 5432, database: 'postgres', user: 'postgres', password: process.env.DBPASS });

const RECIPES = [
  // More Italian
  { slug: 'lasagna', title: 'Classic Lasagna', description: 'Layers of pasta with meat sauce and cheese', prep: 30, cook: 45, total: 75, yield: 8, cuisine: 'italian', cat: 'dinner', img: 'https://images.unsplash.com/photo-1574894709920-11b28e7367e3?w=800' },
  { slug: 'fettuccine-alfredo', title: 'Fettuccine Alfredo', description: 'Creamy parmesan pasta', prep: 10, cook: 15, total: 25, yield: 4, cuisine: 'italian', cat: 'dinner', img: 'https://images.unsplash.com/photo-1645112411341-6c4fd023714a?w=800' },
  { slug: 'caprese-salad', title: 'Caprese Salad', description: 'Fresh mozzarella with tomatoes and basil', prep: 10, cook: 0, total: 10, yield: 4, cuisine: 'italian', cat: 'salads', img: 'https://images.unsplash.com/photo-1608897013039-887f21d8c804?w=800' },
  { slug: 'tiramisu-original', title: 'Tiramisu', description: 'Coffee-flavored Italian dessert', prep: 30, cook: 0, total: 30, yield: 8, cuisine: 'italian', cat: 'desserts', img: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=800' },
  
  // More Mexican
  { slug: 'quesadilla', title: 'Cheese Quesadilla', description: 'Crispy tortilla with melted cheese', prep: 10, cook: 10, total: 20, yield: 2, cuisine: 'mexican', cat: 'dinner', img: 'https://images.unsplash.com/photo-1618040996337-56904b7850b9?w=800' },
  { slug: 'salsa-verde', title: 'Salsa Verde', description: 'Green tomatillo salsa', prep: 10, cook: 15, total: 25, yield: 8, cuisine: 'mexican', cat: 'appetizers', img: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=800' },
  { slug: 'margarita', title: 'Classic Margarita', description: 'Tequila lime cocktail', prep: 5, cook: 0, total: 5, yield: 1, cuisine: 'mexican', cat: 'desserts', img: 'https://images.unsplash.com/photo-1556855810-ac404aa91e85?w=800' },
  
  // More Japanese
  { slug: 'tempura', title: 'Tempura', description: 'Japanese fried shrimp and vegetables', prep: 20, cook: 15, total: 35, yield: 4, cuisine: 'japanese', cat: 'dinner', img: 'https://images.unsplash.com/photo-1617204460846-86e37959a6d5?w=800' },
  { slug: 'teriyaki-chicken', title: 'Teriyaki Chicken', description: 'Glazed chicken with teriyaki sauce', prep: 15, cook: 20, total: 35, yield: 4, cuisine: 'japanese', cat: 'dinner', img: 'https://images.unsplash.com/photo-1609183480237-ccf21ec13f9e?w=800' },
  { slug: 'onigiri', title: 'Onigiri', description: 'Japanese rice balls', prep: 20, cook: 0, total: 20, yield: 6, cuisine: 'japanese', cat: 'lunch', img: 'https://images.unsplash.com/photo-1536304993881-ff6e9eefa2a6?w=800' },
  { slug: 'matcha-cheesecake', title: 'Matcha Cheesecake', description: 'Green tea flavored cheesecake', prep: 25, cook: 50, total: 180, yield: 8, cuisine: 'japanese', cat: 'desserts', img: 'https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=800' },
  
  // More French
  { slug: 'coq-au-vin', title: 'Coq au Vin', description: 'Chicken in red wine', prep: 30, cook: 60, total: 90, yield: 6, cuisine: 'french', cat: 'dinner', img: 'https://images.unsplash.com/photo-1518779578993-ec3579fee39f?w=800' },
  { slug: 'quiche-lorraine', title: 'Quiche Lorraine', description: 'Egg custard with bacon', prep: 20, cook: 35, total: 55, yield: 6, cuisine: 'french', cat: 'lunch', img: 'https://images.unsplash.com/photo-1527515545081-5db817172677?w=800' },
  { slug: 'souffle', title: 'Chocolate Souffle', description: 'Light airy chocolate dessert', prep: 15, cook: 12, total: 27, yield: 4, cuisine: 'french', cat: 'desserts', img: 'https://images.unsplash.com/photo-1470124182917-cc6e71b22ecc?w=800' },
  { slug: 'french-toast', title: 'French Toast', description: 'Classic breakfast dish', prep: 10, cook: 10, total: 20, yield: 4, cuisine: 'french', cat: 'breakfast', img: 'https://images.unsplash.com/photo-1484723091739-30a097e8f929?w=800' },
  { slug: 'onion-soup', title: 'French Onion Soup', description: 'Caramelized onion soup with cheese', prep: 20, cook: 60, total: 80, yield: 4, cuisine: 'french', cat: 'soups', img: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=800' },
  
  // More Chinese
  { slug: 'sweet-sour-pork', title: 'Sweet and Sour Pork', description: 'Crispy pork with tangy sauce', prep: 25, cook: 20, total: 45, yield: 4, cuisine: 'chinese', cat: 'dinner', img: 'https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?w=800' },
  { slug: 'dumplings', title: 'Chinese Dumplings', description: 'Pork and vegetable dumplings', prep: 45, cook: 15, total: 60, yield: 4, cuisine: 'chinese', cat: 'dinner', img: 'https://images.unsplash.com/photo-1496116218417-1a781b1c416c?w=800' },
  { slug: 'egg-fried-rice', title: 'Egg Fried Rice', description: 'Classic fried rice', prep: 10, cook: 10, total: 20, yield: 2, cuisine: 'chinese', cat: 'dinner', img: 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=800' },
  { slug: 'spring-rolls-chinese', title: 'Chinese Spring Rolls', description: 'Crispy vegetable rolls', prep: 30, cook: 15, total: 45, yield: 8, cuisine: 'chinese', cat: 'appetizers', img: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=800' },
  { slug: 'hot-and-sour-soup', title: 'Hot and Sour Soup', description: 'Spicy and tangy soup', prep: 15, cook: 15, total: 30, yield: 4, cuisine: 'chinese', cat: 'soups', img: 'https://images.unsplash.com/photo-1548943487-a2e4e43b4853?w=800' },
  
  // More Indian
  { slug: 'biryani', title: 'Chicken Biryani', description: 'Aromatic rice with spices', prep: 30, cook: 45, total: 75, yield: 6, cuisine: 'indian', cat: 'dinner', img: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=800' },
  { slug: 'samosa', title: 'Samosa', description: 'Crispy pastry with spiced potatoes', prep: 40, cook: 20, total: 60, yield: 8, cuisine: 'indian', cat: 'appetizers', img: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=800' },
  { slug: 'naan-bread', title: 'Garlic Naan', description: 'Indian flatbread with garlic', prep: 15, cook: 10, total: 25, yield: 4, cuisine: 'indian', cat: 'side-dishes', img: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=800' },
  { slug: 'tikka-masala', title: 'Chicken Tikka Masala', description: 'Creamy curry with tender chicken', prep: 20, cook: 30, total: 50, yield: 4, cuisine: 'indian', cat: 'dinner', img: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=800' },
  { slug: 'palak-paneer', title: 'Palak Paneer', description: 'Spinach curry with cheese', prep: 15, cook: 25, total: 40, yield: 4, cuisine: 'indian', cat: 'dinner', img: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=800' },
  { slug: 'dal-makhani', title: 'Dal Makhani', description: 'Creamy black lentil curry', prep: 15, cook: 45, total: 60, yield: 6, cuisine: 'indian', cat: 'dinner', img: 'https://images.unsplash.com/photo-1546833999-b9f581a1996f?w=800' },
  
  // American
  { slug: 'bbq-ribs', title: 'BBQ Ribs', description: 'Slow-cooked ribs with sauce', prep: 20, cook: 180, total: 200, yield: 4, cuisine: 'american', cat: 'dinner', img: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=800' },
  { slug: 'mac-cheese', title: 'Mac and Cheese', description: 'Creamy pasta with cheese', prep: 10, cook: 25, total: 35, yield: 6, cuisine: 'american', cat: 'dinner', img: 'https://images.unsplash.com/photo-1543339494-b4cd4f7ba686?w=800' },
  { slug: 'buffalo-wings', title: 'Buffalo Wings', description: 'Spicy fried chicken wings', prep: 15, cook: 25, total: 40, yield: 4, cuisine: 'american', cat: 'appetizers', img: 'https://images.unsplash.com/photo-1608039829572-9c8ee9be4d43?w=800' },
  { slug: 'blt-sandwich', title: 'BLT Sandwich', description: 'Bacon lettuce tomato', prep: 10, cook: 5, total: 15, yield: 2, cuisine: 'american', cat: 'lunch', img: 'https://images.unsplash.com/photo-1619096252214-23b1ea1e1618?w=800' },
  { slug: 'pancakes', title: 'Fluffy Pancakes', description: 'Classic breakfast pancakes', prep: 10, cook: 15, total: 25, yield: 4, cuisine: 'american', cat: 'breakfast', img: 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=800' },
  { slug: 'waffles', title: 'Belgian Waffles', description: 'Crispy waffles', prep: 10, cook: 15, total: 25, yield: 4, cuisine: 'american', cat: 'breakfast', img: 'https://images.unsplash.com/photo-1562376552-0d160a2f238d?w=800' },
  { slug: 'brownies', title: 'Fudgy Brownies', description: 'Chocolate brownie', prep: 10, cook: 25, total: 35, yield: 16, cuisine: 'american', cat: 'desserts', img: 'https://images.unsplash.com/photo-1564355808539-22fda35bed7e?w=800' },
  { slug: 'apple-pie', title: 'Apple Pie', description: 'Classic American dessert', prep: 30, cook: 50, total: 80, yield: 8, cuisine: 'american', cat: 'desserts', img: 'https://images.unsplash.com/photo-1535920527002-b35e96722eb9?w=800' },
];

async function main() {
  await client.connect();
  
  const cuisineResult = await client.query('SELECT name, id FROM cuisine');
  const catResult = await client.query('SELECT name, slug, id FROM category');
  
  const cuisineMap = {};
  cuisineResult.rows.forEach(r => cuisineMap[r.name.toLowerCase()] = r.id);
  
  const catMap = {};
  catResult.rows.forEach(r => catMap[r.slug.toLowerCase()] = r.id);
  
  // Add American cuisine if not exists
  if (!cuisineMap['american']) {
    await client.query('INSERT INTO cuisine (name, slug) VALUES ($1, $2) ON CONFLICT (slug) DO NOTHING', ['American', 'american']);
    const res = await client.query('SELECT id FROM cuisine WHERE slug = $1', ['american']);
    cuisineMap['american'] = res.rows[0].id;
  }
  
  for (const r of RECIPES) {
    const cuisineId = cuisineMap[r.cuisine] || cuisineMap['american'];
    const catId = catMap[r.cat] || catMap['dinner'];
    await client.query(
      `INSERT INTO recipe (slug, title, description, prep_time, cook_time, total_time, yield, cuisine_id, category_id, image_url, status, published_at) 
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,'published',NOW()) 
       ON CONFLICT (slug) DO UPDATE SET cuisine_id = $8, category_id = $9, image_url = $10`,
      [r.slug, r.title, r.description, r.prep, r.cook, r.total, r.yield, cuisineId, catId, r.img]
    );
    console.log('Added:', r.title);
  }
  
  const count = await client.query('SELECT COUNT(*) FROM recipe');
  console.log('Total recipes:', count.rows[0].count);
  
  await client.end();
}

main().catch(console.error);
