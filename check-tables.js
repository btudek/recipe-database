const { Pool } = require('pg');
const pool = new Pool({
  host: 'db.ycwbumsmlikiquplkdln.supabase.co',
  port: 5432,
  database: 'postgres',
  user: 'postgres',
  password: 'HailMaryFullOfGrace1$'
});

async function checkTables() {
  const result = await pool.query(`
    SELECT table_name 
    FROM information_schema.tables 
    WHERE table_schema = 'public' 
    ORDER BY table_name
  `);
  console.log('All tables:', result.rows.map(x => x.table_name).join(', '));
  
  // Check ingredient table columns
  const ingCols = await pool.query(`
    SELECT column_name 
    FROM information_schema.columns 
    WHERE table_name = 'ingredient' AND table_schema = 'public' 
    ORDER BY ordinal_position
  `);
  console.log('\nIngredient columns:', ingCols.rows.map(x => x.column_name).join(', '));
  
  pool.end();
}

checkTables().catch(console.error);
