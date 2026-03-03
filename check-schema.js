const { Client } = require('pg');
const client = new Client({ 
  host: 'db.ycwbumsmlikiquplkdln.supabase.co', 
  port: 5432, 
  database: 'postgres', 
  user: 'postgres', 
  password: 'HailMaryFullOfGrace1$' 
});

client.connect()
  .then(() => client.query('SELECT column_name FROM information_schema.columns WHERE table_name = $1', ['recipe']))
  .then(r => {
    console.log('Recipe columns:', r.rows.map(x => x.column_name).join(', '));
    return client.query('SELECT column_name FROM information_schema.columns WHERE table_name = $1', ['ingredient']);
  })
  .then(r => {
    console.log('Ingredient columns:', r.rows.map(x => x.column_name).join(', '));
    return client.query('SELECT column_name FROM information_schema.columns WHERE table_name = $1', ['step']);
  })
  .then(r => {
    console.log('Step columns:', r.rows.map(x => x.column_name).join(', '));
    client.end();
  })
  .catch(e => { console.error(e); client.end(); });
