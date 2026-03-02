const { Client } = require('pg');
const client = new Client({ host: 'db.ycwbumsmlikiquplkdln.supabase.co', port: 5432, database: 'postgres', user: 'postgres', password: process.env.DBPASS });

const RECIPES = [
  // More breakfast
  { slug: 'avocado-toast', title: 'Avocado Toast', description: 'Creamy avocado on toasted bread', prep: 10, cook: 5, total: 15, yield: 2, cuisine: 'american', cat: 'breakfast', img: 'https://images.unsplash.com/photo-1541519227354-08fa5d50c44d?w=800' },
  { slug: 'acai-bowl', title: 'Acai Bowl', description: 'Frozen berry smoothie bowl', prep: 15, cook: 0, total: 15, yield: 1, cuisine: 'american', cat: 'breakfast', img: 'https://images.unsplash.com/photo-1590301157890-4810ed352733?w=800' },
  { slug: 'oatmeal', title: 'Oatmeal with Berries', description: 'Warm oats with fresh berries', prep: 5, cook: 10, total: 15, yield: 1, cuisine: 'american', cat: 'breakfast', img: 'https://images.unsplash.com/photo-1517673400267-0251440c45dc?w=800' },
  { slug: 'omelette', title: 'Veggie Omelette', description: 'Eggs with vegetables', prep: 10, cook: 8, total: 18, yield: 1, cuisine: 'french', cat: 'breakfast', img: 'https://images.unsplash.com/photo-1510693206972-df098062cb71?w=800' },
  { slug: 'smoothie-bowl', title: 'Tropical Smoothie Bowl', description: 'Mango and pineapple smoothie', prep: 10, cook: 0, total: 10, yield: 1, cuisine: 'american', cat: 'breakfast', img: 'https://images.unsplash.com/photo-1590301157890-4810ed352733?w=800' },
  
  // More lunch
  { slug: 'club-sandwich', title: 'Club Sandwich', description: 'Triple-decker sandwich', prep: 15, cook: 5, total: 20, yield: 1, cuisine: 'american', cat: 'lunch', img: 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=800' },
  { slug: 'caesar-wrap', title: 'Chicken Caesar Wrap', description: 'Grilled chicken wrap', prep: 15, cook: 10, total: 25, yield: 1, cuisine: 'american', cat: 'lunch', img: 'https://images.unsplash.com/photo-1626700051175-6818013e1d4f?w=800' },
  { slug: 'pasta-salad', title: 'Italian Pasta Salad', description: 'Cold pasta with vegetables', prep: 20, cook: 10, total: 30, yield: 6, cuisine: 'italian', cat: 'lunch', img: 'https://images.unsplash.com/photo-1473093295043-cdd812d0e601?w=800' },
  { slug: 'tuna-salad', title: 'Tuna Salad Sandwich', description: 'Classic tuna salad', prep: 10, cook: 0, total: 10, yield: 2, cuisine: 'american', cat: 'lunch', img: 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=800' },
  { slug: 'sushi-bowl', title: 'Sushi Bowl', description: 'Deconstructed sushi', prep: 20, cook: 0, total: 20, yield: 2, cuisine: 'japanese', cat: 'lunch', img: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800' },
  
  // More appetizers
  { slug: 'hummus', title: 'Classic Hummus', description: 'Chickpea dip', prep: 10, cook: 0, total: 10, yield: 8, cuisine: 'indian', cat: 'appetizers', img: 'https://images.unsplash.com/photo-1577805947697-89e18249d767?w=800' },
  { slug: 'stuffed-mushrooms', title: 'Stuffed Mushrooms', description: 'Cheese-filled mushrooms', prep: 15, cook: 20, total: 35, yield: 6, cuisine: 'italian', cat: 'appetizers', img: 'https://images.unsplash.com/photo-1506354666786-959d6d497f1a?w=800' },
  { slug: 'caprese-skewers', title: 'Caprese Skewers', description: 'Mozzarella and tomato', prep: 10, cook: 0, total: 10, yield: 8, cuisine: 'italian', cat: 'appetizers', img: 'https://images.unsplash.com/photo-1608897013039-887f21d8c804?w=800' },
  { slug: 'spinach-dip', title: 'Spinach Artichoke Dip', description: 'Creamy baked dip', prep: 15, cook: 25, total: 40, yield: 8, cuisine: 'american', cat: 'appetizers', img: 'https://images.unsplash.com/photo-1576506295286-5cda18df43e7?w=800' },
  { slug: 'egg-rolls', title: 'Crispy Egg Rolls', description: 'Fried vegetable rolls', prep: 30, cook: 15, total: 45, yield: 8, cuisine: 'chinese', cat: 'appetizers', img: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=800' },
  
  // More soups
  { slug: 'chicken-tortilla-soup', title: 'Chicken Tortilla Soup', description: 'Mexican soup with tortillas', prep: 15, cook: 30, total: 45, yield: 4, cuisine: 'mexican', cat: 'soups', img: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=800' },
  { slug: 'clam-chowder', title: 'New England Clam Chowder', description: 'Creamy seafood soup', prep: 15, cook: 30, total: 45, yield: 6, cuisine: 'american', cat: 'soups', img: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=800' },
  { slug: 'vegetable-soup', title: 'Hearty Vegetable Soup', description: 'Farm-style vegetable soup', prep: 20, cook: 40, total: 60, yield: 8, cuisine: 'french', cat: 'soups', img: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=800' },
  { slug: 'ramen-soup', title: 'Shoyu Ramen', description: 'Soy sauce ramen', prep: 20, cook: 30, total: 50, yield: 2, cuisine: 'japanese', cat: 'soups', img: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=800' },
  
  // More salads
  { slug: 'waldorf-salad', title: 'Waldorf Salad', description: 'Apple celery walnut salad', prep: 15, cook: 0, total: 15, yield: 4, cuisine: 'american', cat: 'salads', img: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800' },
  { slug: 'niçoise-salad', title: 'Salade Niçoise', description: 'French tuna salad', prep: 20, cook: 10, total: 30, yield: 4, cuisine: 'french', cat: 'salads', img: 'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=800' },
  { slug: 'asian-salad', title: 'Sesame Ginger Salad', description: 'Asian-style salad', prep: 15, cook: 0, total: 15, yield: 4, cuisine: 'chinese', cat: 'salads', img: 'https://images.unsplash.com/photo-1546793665-c74683f339c1?w=800' },
  { slug: 'couscous-salad', title: 'Mediterranean Couscous', description: 'Couscous with veggies', prep: 15, cook: 10, total: 25, yield: 6, cuisine: 'french', cat: 'salads', img: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800' },
  
  // More side dishes
  { slug: 'roasted-vegetables', title: 'Roasted Mediterranean Vegetables', description: 'Mixed roasted veggies', prep: 15, cook: 35, total: 50, yield: 6, cuisine: 'french', cat: 'side-dishes', img: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=800' },
  { slug: 'stuffing', title: 'Classic Stuffing', description: 'Bread stuffing', prep: 15, cook: 45, total: 60, yield: 8, cuisine: 'american', cat: 'side-dishes', img: 'https://images.unsplash.com/photo-1585238342024-78d387f4a707?w=800' },
  { slug: 'mac-cheese', title: 'Baked Mac and Cheese', description: 'Creamy baked pasta', prep: 15, cook: 30, total: 45, yield: 8, cuisine: 'american', cat: 'side-dishes', img: 'https://images.unsplash.com/photo-1543339494-b4cd4f7ba686?w=800' },
  { slug: 'risotto-mushroom', title: 'Mushroom Risotto', description: 'Creamy Italian rice', prep: 10, cook: 30, total: 40, yield: 4, cuisine: 'italian', cat: 'side-dishes', img: 'https://images.unsplash.com/photo-1476124369491-e7addf5db371?w=800' },
  { slug: 'pilaf', title: 'Herbed Rice Pilaf', description: 'Fluffy spiced rice', prep: 10, cook: 25, total: 35, yield: 6, cuisine: 'indian', cat: 'side-dishes', img: 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=800' },
  
  // More desserts
  { slug: 'baklava', title: 'Baklava', description: 'Honey pastry', prep: 30, cook: 45, total: 75, yield: 24, cuisine: 'indian', cat: 'desserts', img: 'https://images.unsplash.com/photo-1519676867240-f03562e64548?w=800' },
  { slug: 'flan', title: 'Caramel Flan', description: 'Egg custard with caramel', prep: 15, cook: 45, total: 180, yield: 8, cuisine: 'mexican', cat: 'desserts', img: 'https://images.unsplash.com/photo-1470124182917-cc6e71b22ecc?w=800' },
  { slug: 'mochi', title: 'Mochi Ice Cream', description: 'Japanese ice cream balls', prep: 20, cook: 0, total: 20, yield: 12, cuisine: 'japanese', cat: 'desserts', img: 'https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=800' },
  { slug: 'profiteroles', title: 'Profiteroles', description: 'Choux pastry with cream', prep: 30, cook: 25, total: 55, yield: 8, cuisine: 'french', cat: 'desserts', img: 'https://images.unsplash.com/photo-1464305795204-6f5bbfc7fb81?w=800' },
  { slug: 'affogato', title: 'Affogato', description: 'Coffee with ice cream', prep: 5, cook: 0, total: 5, yield: 1, cuisine: 'italian', cat: 'desserts', img: 'https://images.unsplash.com/photo-1590301157890-4810ed352733?w=800' },
];

async function main() {
  await client.connect();
  
  const cuisineResult = await client.query('SELECT name, id FROM cuisine');
  const catResult = await client.query('SELECT name, slug, id FROM category');
  
  const cuisineMap = {};
  cuisineResult.rows.forEach(r => cuisineMap[r.name.toLowerCase()] = r.id);
  
  const catMap = {};
  catResult.rows.forEach(r => catMap[r.slug.toLowerCase()] = r.id);
  
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
