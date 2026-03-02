const { Client } = require('pg');

const client = new Client({
  host: 'db.ycwbumsmlikiquplkdln.supabase.co',
  port: 5432,
  database: 'postgres',
  user: 'postgres',
  password: process.env.DBPASS
});

const MORE_RECIPES = [
  { slug: 'butter-chicken', title: 'Butter Chicken', description: 'Creamy Indian curry with tender chicken in tomato sauce', prep: 20, cook: 30, total: 50, yield: 4, cuisine: 'indian', cat: 'dinner', img: 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=800' },
  { slug: 'beef-tacos', title: 'Beef Tacos', description: 'Seasoned ground beef in crispy taco shells', prep: 15, cook: 15, total: 30, yield: 6, cuisine: 'mexican', cat: 'dinner', img: 'https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?w=800' },
  { slug: 'salmon-sushi', title: 'Salmon Sushi', description: 'Fresh salmon over seasoned sushi rice', prep: 40, cook: 10, total: 50, yield: 4, cuisine: 'japanese', cat: 'dinner', img: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=800' },
  { slug: 'french-onion-soup', title: 'French Onion Soup', description: 'Caramelized onion soup with melted cheese', prep: 15, cook: 45, total: 60, yield: 4, cuisine: 'french', cat: 'dinner', img: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=800' },
  { slug: 'kung-pao-chicken', title: 'Kung Pao Chicken', description: 'Spicy Sichuan stir-fry with peanuts', prep: 15, cook: 10, total: 25, yield: 3, cuisine: 'chinese', cat: 'dinner', img: 'https://images.unsplash.com/photo-1525755662778-989d0524087e?w=800' },
  { slug: 'pizza-margherita', title: 'Classic Margherita Pizza', description: 'Simple Italian pizza with fresh basil', prep: 30, cook: 15, total: 45, yield: 4, cuisine: 'italian', cat: 'dinner', img: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=800' },
  { slug: 'ramen-noodles', title: 'Tonkotsu Ramen', description: 'Rich pork bone broth with noodles', prep: 20, cook: 180, total: 200, yield: 4, cuisine: 'japanese', cat: 'dinner', img: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=800' },
  { slug: 'guacamole', title: 'Fresh Guacamole', description: 'Creamy avocado dip with lime and cilantro', prep: 10, cook: 0, total: 10, yield: 6, cuisine: 'mexican', cat: 'dinner', img: 'https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?w=800' },
  { slug: 'croissant', title: 'Butter Croissants', description: 'Flaky French pastries', prep: 60, cook: 20, total: 180, yield: 12, cuisine: 'french', cat: 'breakfast', img: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=800' },
  { slug: 'fried-rice', title: 'Yangzhou Fried Rice', description: 'Chinese fried rice with egg and vegetables', prep: 10, cook: 10, total: 20, yield: 2, cuisine: 'chinese', cat: 'dinner', img: 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=800' },
  { slug: 'tiramisu', title: 'Classic Tiramisu', description: 'Italian coffee-flavored layered dessert', prep: 30, cook: 0, total: 30, yield: 8, cuisine: 'italian', cat: 'desserts', img: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=800' },
  { slug: 'churros', title: 'Spanish Churros', description: 'Fried dough with chocolate sauce', prep: 15, cook: 15, total: 30, yield: 6, cuisine: 'mexican', cat: 'desserts', img: 'https://images.unsplash.com/photo-1624371414361-e670edf4898d?w=800' },
  { slug: 'miso-soup', title: 'Traditional Miso Soup', description: 'Japanese soup with tofu and seaweed', prep: 5, cook: 10, total: 15, yield: 4, cuisine: 'japanese', cat: 'soups', img: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=800' },
  { slug: 'caesar-salad', title: 'Caesar Salad', description: 'Crisp romaine with creamy dressing', prep: 15, cook: 0, total: 15, yield: 4, cuisine: 'italian', cat: 'salads', img: 'https://images.unsplash.com/photo-1546793665-c74683f339c1?w=800' },
  { slug: 'panna-cotta', title: 'Vanilla Panna Cotta', description: 'Italian cream dessert', prep: 10, cook: 5, total: 240, yield: 6, cuisine: 'italian', cat: 'desserts', img: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=800' },
  { slug: 'beef-stir-fry', title: 'Ginger Beef Stir Fry', description: 'Quick beef with vegetables in savory sauce', prep: 15, cook: 10, total: 25, yield: 4, cuisine: 'chinese', cat: 'dinner', img: 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=800' },
  { slug: 'enchiladas', title: 'Chicken Enchiladas', description: 'Rolled tortillas with chicken and cheese', prep: 20, cook: 25, total: 45, yield: 6, cuisine: 'mexican', cat: 'dinner', img: 'https://images.unsplash.com/photo-1534352956036-cd81e27dd615?w=800' },
  { slug: 'mushroom-risotto', title: 'Mushroom Risotto', description: 'Creamy Italian rice with wild mushrooms', prep: 10, cook: 30, total: 40, yield: 4, cuisine: 'italian', cat: 'dinner', img: 'https://images.unsplash.com/photo-1476124369491-e7addf5db371?w=800' },
  { slug: 'tom-yum-soup', title: 'Tom Yum Soup', description: 'Thai hot and sour soup', prep: 15, cook: 20, total: 35, yield: 4, cuisine: 'chinese', cat: 'soups', img: 'https://images.unsplash.com/photo-1548943487-a2e4e43b4853?w=800' },
  { slug: 'creme-brulee', title: 'Classic Creme Brulee', description: 'Vanilla custard with caramelized sugar', prep: 15, cook: 40, total: 180, yield: 6, cuisine: 'french', cat: 'desserts', img: 'https://images.unsplash.com/photo-1470124182917-cc6e71b22ecc?w=800' },
];

async function main() {
  await client.connect();
  
  const cuisineResult = await client.query('SELECT name, id FROM cuisine');
  const catResult = await client.query('SELECT name, id FROM category');
  
  const cuisineMap = {};
  cuisineResult.rows.forEach(r => cuisineMap[r.name.toLowerCase()] = r.id);
  
  const catMap = {};
  catResult.rows.forEach(r => catMap[r.name.toLowerCase()] = r.id);
  
  console.log('Cuisine map:', cuisineMap);
  console.log('Category map:', catMap);
  
  for (const r of MORE_RECIPES) {
    await client.query(
      `INSERT INTO recipe (slug, title, description, prep_time, cook_time, total_time, yield, cuisine_id, category_id, image_url, status, published_at) 
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,'published',NOW()) 
       ON CONFLICT (slug) DO UPDATE SET cuisine_id = $8, category_id = $9, image_url = $10`,
      [r.slug, r.title, r.description, r.prep, r.cook, r.total, r.yield, cuisineMap[r.cuisine], catMap[r.cat], r.img]
    );
    console.log('Added:', r.title);
  }
  
  const count = await client.query('SELECT COUNT(*) FROM recipe');
  console.log('Total recipes:', count.rows[0].count);
  
  await client.end();
}

main().catch(console.error);
