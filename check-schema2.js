const { Pool } = require('pg');
const pool = new Pool({
  host: 'db.ycwbumsmlikiquplkdln.supabase.co',
  port: 5432,
  database: 'postgres',
  user: 'postgres',
  password: 'HailMaryFullOfGrace1$'
});

async function checkSchema() {
  // Get RecipeStep columns
  const cols = await pool.query(`
    SELECT column_name, data_type 
    FROM information_schema.columns 
    WHERE table_name = 'RecipeStep'
  `);
  console.log('RecipeStep columns:', JSON.stringify(cols.rows, null, 2));
  
  await pool.end();
}

checkSchema().catch(console.error);
