const { Client } = require('pg');

const client = new Client({
  host: 'db.ycwbumsmlikiquplkdln.supabase.co',
  port: 5432,
  database: 'postgres',
  user: 'postgres',
  password: process.env.DBPASS
});

async function main() {
  try {
    await client.connect();
    
    const result = await client.query('SELECT * FROM recipe WHERE status = $1', ['published']);
    console.log('Recipes in DB:', result.rows.length);
    console.log(result.rows.map(r => r.title).join(', '));
    
  } catch (err) { console.error(err.message); }
  finally { await client.end(); }
}

main();
