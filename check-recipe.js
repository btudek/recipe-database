const { Client } = require('pg');
const client = new Client({ host: 'db.ycwbumsmlikiquplkdln.supabase.co', port: 5432, database: 'postgres', user: 'postgres', password: process.env.DBPASS });

async function main() {
  await client.connect();
  const result = await client.query('SELECT column_name FROM information_schema.columns WHERE table_name = \'recipe\'');
  console.log(result.rows.map(x => x.column_name).join(', '));
  await client.end();
}

main().catch(console.error);
