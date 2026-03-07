const { Client } = require('pg');

const client = new Client({
  host: 'db.ycwbumsmlikiquplkdln.supabase.co',
  port: 5432,
  database: 'postgres',
  user: 'postgres',
  password: 'HailMaryFullOfGrace1$'
});

async function checkSchema() {
  await client.connect();
  
  const steps = await client.query(`
    SELECT column_name, data_type 
    FROM information_schema.columns 
    WHERE table_name = 'recipe_step'
  `);
  
  const ings = await client.query(`
    SELECT column_name, data_type 
    FROM information_schema.columns 
    WHERE table_name = 'ingredient'
  `);
  
  console.log("recipe_step columns:", steps.rows);
  console.log("\ningredient columns:", ings.rows);
  
  await client.end();
}

checkSchema().catch(console.error);
