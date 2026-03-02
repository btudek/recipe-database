const { Client } = require('pg');
const client = new Client({ host: 'db.ycwbumsmlikiquplkdln.supabase.co', port: 5432, database: 'postgres', user: 'postgres', password: process.env.DBPASS });

async function main() {
  await client.connect();
  
  // Add foreign key columns
  try {
    await client.query('ALTER TABLE recipe ADD COLUMN cuisine_id UUID REFERENCES cuisine(id)');
    console.log('Added cuisine_id');
  } catch(e) { console.log('cuisine_id already exists or error:', e.message); }
  
  try {
    await client.query('ALTER TABLE recipe ADD COLUMN category_id UUID REFERENCES category(id)');
    console.log('Added category_id');
  } catch(e) { console.log('category_id already exists or error:', e.message); }
  
  try {
    await client.query('ALTER TABLE recipe ADD COLUMN image_url TEXT');
    console.log('Added image_url');
  } catch(e) { console.log('image_url already exists or error:', e.message); }
  
  await client.end();
  console.log('Done!');
}
main();
