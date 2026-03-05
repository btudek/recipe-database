const { Pool } = require('pg');
const pool = new Pool({
  host: 'db.ycwbumsmlikiquplkdln.supabase.co',
  port: 5432,
  database: 'postgres',
  user: 'postgres',
  password: 'HailMaryFullOfGrace1$'
});

async function check() {
  const client = await pool.connect();
  const tables = ['Recipe', 'Ingredient', 'RecipeStep'];
  for (const t of tables) {
    const r = await client.query(`SELECT column_name, data_type FROM information_schema.columns WHERE table_name = '${t}'`);
    console.log(`\n=== ${t} ===`);
    console.log(r.rows.map(x => x.column_name).join(', '));
  }
  client.release();
  await pool.end();
}

check();
