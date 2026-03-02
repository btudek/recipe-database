const { Client } = require('pg');
const client = new Client({ host: 'db.ycwbumsmlikiquplkdln.supabase.co', port: 5432, database: 'postgres', user: 'postgres', password: process.env.DBPASS });

async function testAPI() {
  await client.connect();
  
  // Test if we can get recipe data directly from DB
  const result = await client.query('SELECT slug, title, image_url FROM recipe LIMIT 5');
  console.log('Direct DB query works:');
  console.log(JSON.stringify(result.rows, null, 2));
  
  await client.end();
}

testAPI().catch(console.error);
