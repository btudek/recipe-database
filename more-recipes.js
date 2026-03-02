const { Client } = require('pg');
const client = new Client({ host: 'db.ycwbumsmlikiquplkdln.supabase.co', port: 5432, database: 'postgres', user: 'postgres', password: process.env.DBPASS });

const NEW_CATS = [
  { name: 'Appetizers', slug: 'appetizers' },
  { name: 'Soups', slug: 'soups' },
  { name: 'Salads', slug: 'salads' },
  { name: 'Side Dishes', slug: 'side-dishes' },
];

const MORE_RECIPES = [
  { slug: 'spring-rolls', title: 'Fresh Spring Rolls', description: 'Vietnamese rice paper rolls with shrimp', prep: 30, cook: 0, total: 30, yield: 8, cuisine: 'chinese', cat: 'appetizers', img: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=800' },
  { slug: 'bruschetta', title: 'Tomato Bruschetta', description: 'Italian toasted bread with fresh tomatoes', prep: 15, cook: 5, total: 20, yield: 6, cuisine: 'italian', cat: 'appetizers', img: 'https://images.unsplash.com/photo-1572695157366-5e585ab2b69f?w=800' },
  { slug: 'shrimp-cocktail', title: 'Classic Shrimp Cocktail', description: 'Chilled shrimp with cocktail sauce', prep: 15, cook: 5, total: 20, yield: 6, cuisine: 'mexican', cat: 'appetizers', img: 'https://images.unsplash.com/photo-1565680018093-ebb6b9c8ee7b?w=800' },
  { slug: 'gazpacho', title: 'Spanish Gazpacho', description: 'Chilled tomato soup', prep: 15, cook: 0, total: 15, yield: 4, cuisine: 'mexican', cat: 'soups', img: 'https://images.unsplash.com/photo-1529566652340-2c41a1eb6ddf?w=800' },
  { slug: 'chicken-noodle-soup', title: 'Chicken Noodle Soup', description: 'Classic comfort soup', prep: 15, cook: 30, total: 45, yield: 6, cuisine: 'italian', cat: 'soups', img: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=800' },
  { slug: 'minestrone', title: 'Italian Minestrone', description: 'Hearty vegetable soup', prep: 20, cook: 40, total: 60, yield: 8, cuisine: 'italian', cat: 'soups', img: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=800' },
  { slug: 'greek-salad', title: 'Greek Salad', description: 'Fresh Mediterranean salad', prep: 15, cook: 0, total: 15, yield: 4, cuisine: 'italian', cat: 'salads', img: 'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=800' },
  { slug: 'cobb-salad', title: 'Cobb Salad', description: 'American classic with chicken and bacon', prep: 20, cook: 10, total: 30, yield: 4, cuisine: 'american', cat: 'salads', img: 'https://images.unsplash.com/photo-1550304943-4f24f54ddde9?w=800' },
  { slug: 'thai-salad', title: 'Thai Green Papaya Salad', description: 'Spicy shredded papaya salad', prep: 20, cook: 0, total: 20, yield: 4, cuisine: 'chinese', cat: 'salads', img: 'https://images.unsplash.com/photo-1559314809-0d155014e29e?w=800' },
  { slug: 'garlic-bread', title: 'Garlic Bread', description: 'Crispy Italian garlic bread', prep: 10, cook: 10, total: 20, yield: 8, cuisine: 'italian', cat: 'side-dishes', img: 'https://images.unsplash.com/photo-1619535860434-ba1d8fa12536?w=800' },
  { slug: 'mashed-potatoes', title: 'Creamy Mashed Potatoes', description: 'Butter mashed potatoes', prep: 10, cook: 25, total: 35, yield: 6, cuisine: 'french', cat: 'side-dishes', img: 'https://images.unsplash.com/photo-1585238342024-78d387f4a707?w=800' },
  { slug: 'grilled-asparagus', title: 'Grilled Asparagus', description: 'Lemon garlic asparagus', prep: 5, cook: 8, total: 13, yield: 4, cuisine: 'french', cat: 'side-dishes', img: 'https://images.unsplash.com/photo-1515516969-d4008cc6241a?w=800' },
  { slug: 'chocolate-mousse', title: 'Chocolate Mousse', description: 'Rich French chocolate dessert', prep: 20, cook: 0, total: 120, yield: 6, cuisine: 'french', cat: 'desserts', img: 'https://images.unsplash.com/photo-1541783245831-57d6fb0926d3?w=800' },
  { slug: 'pavlova', title: 'Meringue Pavlova', description: 'Crispy meringue with cream and fruit', prep: 20, cook: 60, total: 180, yield: 8, cuisine: 'french', cat: 'desserts', img: 'https://images.unsplash.com/photo-1464305795204-6f5bbfc7fb81?w=800' },
  { slug: 'macarons', title: 'French Macarons', description: 'Delicate almond meringue cookies', prep: 40, cook: 15, total: 180, yield: 24, cuisine: 'french', cat: 'desserts', img: 'https://images.unsplash.com/photo-1569864358642-9d1684040f43?w=800' },
  { slug: 'cheesecake', title: 'New York Cheesecake', description: 'Creamy classic cheesecake', prep: 20, cook: 60, total: 240, yield: 12, cuisine: 'american', cat: 'desserts', img: 'https://images.unsplash.com/photo-1533134242443-d4fd215305ad?w=800' },
  { slug: 'bibimbap', title: 'Korean Bibimbap', description: 'Rice bowl with vegetables and egg', prep: 30, cook: 15, total: 45, yield: 2, cuisine: 'japanese', cat: 'dinner', img: 'https://images.unsplash.com/photo-1553163147-622ab57be1c7?w=800' },
  { slug: 'gyoza', title: 'Japanese Gyoza', description: 'Pan-fried dumplings', prep: 40, cook: 15, total: 55, yield: 4, cuisine: 'japanese', cat: 'dinner', img: 'https://images.unsplash.com/photo-1496116218417-1a781b1c416c?w=800' },
  { slug: 'pho', title: 'Vietnamese Pho', description: 'Beef noodle soup', prep: 20, cook: 180, total: 200, yield: 6, cuisine: 'chinese', cat: 'soups', img: 'https://images.unsplash.com/photo-1582878826629-29b7ad1cdc43?w=800' },
  { slug: 'chicken-curry', title: 'Indian Chicken Curry', description: 'Spicy curry with spices', prep: 20, cook: 35, total: 55, yield: 4, cuisine: 'indian', cat: 'dinner', img: 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=800' },
];

async function main() {
  await client.connect();
  
  // Insert new categories
  for (const c of NEW_CATS) {
    await client.query('INSERT INTO category (name, slug) VALUES ($1, $2) ON CONFLICT (slug) DO NOTHING', [c.name, c.slug]);
    console.log('Added category:', c.name);
  }
  
  // Get IDs
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
