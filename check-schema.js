const { Pool } = require('pg');
const pool = new Pool({
  host: 'db.ycwbumsmlikiquplkdln.supabase.co',
  port: 5432,
  database: 'postgres',
  user: 'postgres',
  password: 'HailMaryFullOfGrace1$'
});

async function checkSchema() {
  const r = await pool.query("SELECT column_name FROM information_schema.columns WHERE table_name = 'recipe_step'");
  console.log('recipe_step columns:', r.rows);
  
  const r2 = await pool.query("SELECT column_name FROM information_schema.columns WHERE table_name = 'ingredient'");
  console.log('ingredient columns:', r2.rows);
  
  await pool.end();
}

checkSchema().catch(console.error);
