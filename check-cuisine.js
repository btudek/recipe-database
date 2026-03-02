const { Client } = require('pg');
const client = new Client({ host: 'db.ycwbumsmlikiquplkdln.supabase.co', port: 5432, database: 'postgres', user: 'postgres', password: process.env.DBPASS });

async function main() {
  await client.connect();
  const result = await client.query('SELECT id, name FROM cuisine LIMIT 10');
  console.log(JSON.stringify(result.rows, null, 2));
  await client.end();
}

main().catch(console.error);
