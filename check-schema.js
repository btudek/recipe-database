const { Client } = require('pg');

const client = new Client({
  host: 'db.ycwbumsmlikiquplkdln.supabase.co',
  port: 5432,
  database: 'postgres',
  user: 'postgres',
  password: 'HailMaryFullOfGrace1$'
});

async function main() {
  try {
    await client.connect();
    const cols = await client.query("SELECT column_name FROM information_schema.columns WHERE table_name = 'recipe'");
    console.log('Recipe columns:', cols.rows.map(x => x.column_name).join(', '));
    
    const stepCols = await client.query("SELECT column_name FROM information_schema.columns WHERE table_name = 'recipe_step'");
    console.log('Recipe step columns:', stepCols.rows.map(x => x.column_name).join(', '));
    
    const ingCols = await client.query("SELECT column_name FROM information_schema.columns WHERE table_name = 'ingredient'");
    console.log('Ingredient columns:', ingCols.rows.map(x => x.column_name).join(', '));
  } finally {
    await client.end();
  }
}

main().catch(console.error);
