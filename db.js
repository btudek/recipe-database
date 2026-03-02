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
    console.log('Connected!');
    
    await client.query(`CREATE TABLE IF NOT EXISTS cuisine (id UUID PRIMARY KEY DEFAULT gen_random_uuid(), name TEXT UNIQUE NOT NULL, slug TEXT UNIQUE NOT NULL)`);
    await client.query(`CREATE TABLE IF NOT EXISTS category (id UUID PRIMARY KEY DEFAULT gen_random_uuid(), name TEXT UNIQUE NOT NULL, slug TEXT UNIQUE NOT NULL)`);
    await client.query(`CREATE TABLE IF NOT EXISTS recipe (id UUID PRIMARY KEY DEFAULT gen_random_uuid(), slug TEXT UNIQUE NOT NULL, title TEXT NOT NULL, description TEXT, prep_time INT DEFAULT 0, cook_time INT DEFAULT 0, total_time INT DEFAULT 0, yield INT DEFAULT 4, status TEXT DEFAULT 'draft', published_at TIMESTAMP)`);
    
    const cuisines = [['Italian','italian'],['Mexican','mexican'],['Japanese','japanese'],['French','french'],['Chinese','chinese'],['Indian','indian']];
    for (const [n,s] of cuisines) await client.query('INSERT INTO cuisine (name, slug) VALUES ($1, $2) ON CONFLICT (slug) DO NOTHING', [n,s]);
    
    const categories = [['Dinner','dinner'],['Lunch','lunch'],['Breakfast','breakfast'],['Desserts','desserts']];
    for (const [n,s] of categories) await client.query('INSERT INTO category (name, slug) VALUES ($1, $2) ON CONFLICT (slug) DO NOTHING', [n,s]);
    
    const recipes = [['spaghetti-carbonara','Spaghetti Carbonara','Classic Italian pasta',15,20,35,4,'published'],['chicken-tacos','Chicken Tacos','Mexican tacos',20,15,35,6,'published'],['sushi-rolls','Sushi Rolls','Japanese sushi',30,10,40,4,'published'],['beef-bourguignon','Beef Bourguignon','French stew',30,180,210,8,'published'],['pad-thai','Pad Thai','Thai noodles',15,10,25,2,'published'],['margherita-pizza','Margherita Pizza','Italian pizza',20,15,35,4,'published'],['chocolate-lava-cake','Chocolate Lava Cake','Chocolate dessert',10,12,22,4,'published']];
    for (const [s,t,d,p,c,tt,y,st] of recipes) await client.query('INSERT INTO recipe (slug, title, description, prep_time, cook_time, total_time, yield, status, published_at) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,NOW()) ON CONFLICT (slug) DO NOTHING', [s,t,d,p,c,tt,y,st]);
    
    console.log('Done!');
  } catch (err) { console.error(err.message); }
  finally { await client.end(); }
}

main();
