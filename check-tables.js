const { Pool } = require('pg');
const pool = new Pool({
  host: 'db.ycwbumsmlikiquplkdln.supabase.co',
  port: 5432,
  database: 'postgres',
  user: 'postgres',
  password: 'HailMaryFullOfGrace1$'
});

async function test() {
  // Check Recipe table
  const r = await pool.query('SELECT COUNT(*) as count FROM "Recipe"');
  console.log('Recipe (capital) count:', r.rows[0].count);
  
  // Check recipe table
  const r2 = await pool.query('SELECT COUNT(*) as count FROM recipe');
  console.log('recipe (lowercase) count:', r2.rows[0].count);
  
  // Get sample from Recipe
  const r3 = await pool.query('SELECT * FROM "Recipe" LIMIT 2');
  console.log('Recipe sample:', r3.rows);
  
  // Get sample from recipe
  const r4 = await pool.query('SELECT id::text, title, slug FROM recipe LIMIT 2');
  console.log('recipe sample:', r4.rows);
  
  await pool.end();
}

test().catch(console.error);
