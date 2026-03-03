const { Client } = require('pg');
const client = new Client({ 
  host: 'db.ycwbumsmlikiquplkdln.supabase.co', 
  port: 5432, 
  database: 'postgres', 
  user: 'postgres', 
  password: 'HailMaryFullOfGrace1$' 
});

client.connect()
  .then(() => client.query('SELECT table_name FROM information_schema.tables WHERE table_schema = $1', ['public']))
  .then(r => {
    console.log('Tables:', r.rows.map(x => x.table_name).join(', '));
    client.end();
  })
  .catch(e => { console.error(e); client.end(); });
