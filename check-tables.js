const { Pool } = require('pg');
const pool = new Pool({
  host: 'db.ycwbumsmlikiquplkdln.supabase.co',
  port: 5432,
  database: 'postgres',
  user: 'postgres',
  password: 'HailMaryFullOfGrace1$'
});

async function checkTables() {
  const tables = await pool.query(`
    SELECT table_name 
    FROM information_schema.tables 
    WHERE table_schema = 'public' 
    AND table_name LIKE '%ingredient%'
  `);
  console.log('Ingredient tables:', JSON.stringify(tables.rows, null, 2));
  
  // Get all tables
  const allTables = await pool.query(`
    SELECT table_name 
    FROM information_schema.tables 
    WHERE table_schema = 'public'
  `);
  console.log('\nAll tables:', allTables.rows.map(t => t.table_name));
  
  pool.end();
}
checkTables();
