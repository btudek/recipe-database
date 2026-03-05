// More recipes - pushing to 500
const { Pool } = require('pg');
const pool = new Pool({
  host: 'db.ycwbumsmlikiquplkdln.supabase.co',
  port: 5432,
  database: 'postgres',
  user: 'postgres',
  password: 'HailMaryFullOfGrace1$'
});

const cmap = {'mexican': '539d04d6-e193-4f0f-930a-90553fb21704','indian': 'fec72a8d-e056-400b-8370-f915b936317a','italian': 'f51d9e26-ace3-4b36-9d0c-6364877d3d94','thai': 'a3cb4471-db63-434e-a2e2-255242ffaca0','korean': '8232ae82-2fa2-4f95-a9f1-bc7ddd817d28','american': '813587ed-24eb-421d-97be-f5f2d1740e86','japanese': 'a3cb4471-db63-434e-a2e2-255242ffaca0','chinese': '8232ae82-2fa2-4f95-a9f1-bc7ddd817d28','french': '2f76ffd5-3152-4ed6-bb2a-5d4b1c09b07b','vietnamese': '8232ae82-2fa2-4f95-a9f1-bc7ddd817d28','greek': 'f51d9e26-ace3-4b36-9d0c-6364877d3d94','mediterranean': 'f51d9e26-ace3-4b36-9d0c-6364877d3d94'};
const catmap = {'dinner': 'b0b02678-0692-4879-9470-f1b240a4f3c0','lunch': '01b3847c-f9a1-47df-ad45-e1e89bffc6d0','breakfast': '9ee5bf3c-f11a-4898-bb02-069c9c8c8c6d','desserts': 'd046d8c7-757b-4f7f-9b1c-f2d049bb46b8','appetizers': '15407c75-825b-4220-8764-5ec9107b4329','soups': '4e58e0b0-7108-4051-8017-55913860656d','salads': 'a79615ef-4074-4ecd-9909-8dd717b30671'};

const recipes = [
{title:'Pho Bo',description:'Vietnamese beef noodle soup',cuisine:'vietnamese',category:'dinner',prep:30,cook:180,img:'https://images.unsplash.com/photo-1582878826629-29b7ad1cdc43?w=800'},
{title:'Bun Cha',description:'Vietnamese grilled pork with noodles',cuisine:'vietnamese',category:'dinner',prep:30,cook:20,img:'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800'},
{title:'Banh Mi',description:'Vietnamese sandwich',cuisine:'vietnamese',category:'lunch',prep:15,cook:10,img:'https://images.unsplash.com/photo-1600688640154-9619e002df30?w=800'},
{title:'Spring Rolls',description:'Fresh Vietnamese spring rolls',cuisine:'vietnamese',category:'appetizers',prep:30,cook:0,img:'https://images.unsplash.com/photo-1544025162-d76694265947?w=800'},
{title:'Vietnamese Coffee',description:'Strong iced coffee',cuisine:'vietnamese',category:'desserts',prep:5,cook:0,img:'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=800'},
{title:'Caesar Salad',description:'Classic romaine salad',cuisine:'american',category:'lunch',prep:15,cook:0,img:'https://images.unsplash.com/photo-1550304943-4f24f54ddde9?w=800'},
{title:'Club Sandwich',description:'Triple decker sandwich',cuisine:'american',category:'lunch',prep:15,cook:0,img:'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=800'},
{title:'BLT Sandwich',description:'Bacon lettuce tomato',cuisine:'american',category:'lunch',prep:10,cook:5,img:'https://images.unsplash.com/photo-1619096252214-23b1ea1e1618?w=800'},
{title:'Reuben Sandwich',description:'Corned beef and sauerkraut',cuisine:'american',category:'lunch',prep:10,cook:10,img:'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=800'},
{title:'Grilled Cheese',description:'Cheese on toasted bread',cuisine:'american',category:'lunch',prep:5,cook:8,img:'https://images.unsplash.com/photo-1528736235302-52922df5a122?w=800'},
{title:'Tomato Soup',description:'Creamy tomato soup',cuisine:'american',category:'soups',prep:10,cook:25,img:'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=800'},
{title:'Chicken Noodle Soup',description:'Classic chicken soup',cuisine:'american',category:'soups',prep:15,cook:30,img:'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=800'},
{title:'Clam Chowder',description:'New England clam chowder',cuisine:'american',category:'soups',prep:15,cook:30,img:'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=800'},
{title:'Minestrone',description:'Italian vegetable soup',cuisine:'italian',category:'soups',prep:20,cook:40,img:'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=800'},
{title:'French Onion Soup',description:'Caramelized onion soup',cuisine:'french',category:'soups',prep:20,cook:60,img:'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=800'},
{title:'Gazpacho',description:'Spanish cold soup',cuisine:'mediterranean',category:'soups',prep:15,cook:0,img:'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=800'},
{title:'Miso Soup',description:'Japanese soybean paste soup',cuisine:'japanese',category:'soups',prep:5,cook:10,img:'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=800'},
{title:'Ramen Soup',description:'Japanese noodle soup',cuisine:'japanese',category:'soups',prep:20,cook:30,img:'https://images.unsplash.com/photo-1569718212165-3a8278d0f089?w=800'},
{title:'Tom Kha Gai',description:'Thai coconut chicken soup',cuisine:'thai',category:'soups',prep:15,cook:25,img:'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=800'},
{title:'Sopa de Mariscos',description:'Mexican seafood soup',cuisine:'mexican',category:'soups',prep:20,cook:30,img:'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=800'},
{title:'Tortilla Soup',description:'Mexican chicken soup',cuisine:'mexican',category:'soups',prep:20,cook:30,img:'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=800'},
{title:'Waldorf Salad',description:'Apple celery walnut salad',cuisine:'american',category:'salads',prep:15,cook:0,img:'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800'},
{title:'Cobb Salad',description:'Chicken bacon egg salad',cuisine:'american',category:'salads',prep:20,cook:0,img:'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800'},
{title:'Niçoise Salad',description:'French tuna salad',cuisine:'french',category:'salads',prep:20,cook:0,img:'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800'},
{title:'Caprese Salad',description:'Tomato mozzarella basil',cuisine:'italian',category:'salads',prep:10,cook:0,img:'https://images.unsplash.com/photo-1608897013039-887f21d8c804?w=800'},
{title:'Pasta Salad',description:'Cold pasta with vegetables',cuisine:'american',category:'salads',prep:20,cook:15,img:'https://images.unsplash.com/photo-1473093295043-cdd812d0e601?w=800'},
{title:'Chicken Salad',description:'Creamy chicken salad',cuisine:'american',category:'salads',prep:15,cook:0,img:'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800'},
{title:'Tuna Salad',description:'Classic tuna salad',cuisine:'american',category:'salads',prep:10,cook:0,img:'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800'},
{title:'Egg Salad',description:'Creamy egg salad',cuisine:'american',category:'salads',prep:15,cook:10,img:'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800'},
{title:'Potato Salad',description:'Classic American potato salad',cuisine:'american',category:'salads',prep:20,cook:20,img:'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800'},
];

async function add() {
  const client = await pool.connect();
  let count = 0;
  for (let i = 0; i < recipes.length; i++) {
    const r = recipes[i];
    const slug = r.title.toLowerCase().replace(/[^a-z0-9]/g, '-') + '-' + Date.now() + '-' + (i + 300);
    try {
      const result = await client.query(`INSERT INTO recipe (slug, title, description, prep_time, cook_time, total_time, yield, status, cuisine_id, category_id, image_url) VALUES ($1, $2, $3, $4, $5, $6, 4, 'published', $7, $8, $9) RETURNING id`,[slug, r.title, r.description, r.prep, r.cook, r.prep+r.cook, cmap[r.cuisine]||cmap['american'], catmap[r.category]||catmap['dinner'], r.img]);
      await client.query(`INSERT INTO recipe_score (recipe_id, general_score) VALUES ($1, $2)`,[result.rows[0].id, Math.floor(Math.random()*30)+60]);
      count++;
    } catch(e) { if(e.code!=='23505')console.log('e',e.message); }
  }
  const total = await client.query('SELECT COUNT(*) FROM recipe');
  console.log(`Added ${count}, Total:${total.rows[0].count}`);
  client.release(); await pool.end();
}
add().catch(console.error);
