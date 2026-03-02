const { Client } = require('pg');
const client = new Client({ host: 'db.ycwbumsmlikiquplkdln.supabase.co', port: 5432, database: 'postgres', user: 'postgres', password: process.env.DBPASS });

const recipes = [
  { title: 'Butter Chicken', slug: 'butter-chicken', description: 'Indian creamy tomato curry', cuisine_id: 'fec72a8d-e056-400b-8370-f915b936317a' },
  { title: 'Palak Paneer', slug: 'palak-paneer', description: 'Spinach curry', cuisine_id: 'fec72a8d-e056-400b-8370-f915b936317a' },
  { title: 'Chicken Tikka', slug: 'chicken-tikka', description: 'Spiced grilled chicken', cuisine_id: 'fec72a8d-e056-400b-8370-f915b936317a' },
  { title: 'Dal', slug: 'dal', description: 'Indian lentil curry', cuisine_id: 'fec72a8d-e056-400b-8370-f915b936317a' },
];

const RECIPES = {
  'dal': {
    ingredients: [
      { name: 'Red lentils', quantity: 300, unit: 'g' },
      { name: 'Onion', quantity: 1, unit: 'medium' },
      { name: 'Tomatoes', quantity: 2, unit: 'medium' },
      { name: 'Cumin', quantity: 1, unit: 'tsp' },
      { name: 'Turmeric', quantity: 1, unit: 'tsp' },
    ],
    steps: [
      { stepNumber: 1, instruction: 'Cook lentils until soft.', michelinNote: 'About 20 min.' },
      { stepNumber: 2, instruction: 'Sauté onion and spices.', michelinNote: 'The tadka.' },
      { stepNumber: 3, instruction: 'Add to lentils, simmer.', michelinNote: 'Serve with rice.' },
    ]
  },
};

async function main() {
  await client.connect();
  
  for (const r of recipes) {
    const check = await client.query('SELECT id FROM recipe WHERE slug = $1', [r.slug]);
    if (check.rows.length === 0) {
      await client.query(
        'INSERT INTO recipe (title, slug, description, cuisine_id, published_at) VALUES ($1, $2, $3, $4, now())',
        [r.title, r.slug, r.description, r.cuisine_id]
      );
      console.log('Added recipe:', r.title);
    }
  }
  
  const recipeResult = await client.query('SELECT id, slug FROM recipe');
  const recipeMap = {};
  recipeResult.rows.forEach(r => recipeMap[r.slug] = r.id);
  
  for (const [slug, data] of Object.entries(RECIPES)) {
    const recipeId = recipeMap[slug];
    if (!recipeId) continue;
    
    const existingIng = await client.query('SELECT COUNT(*) FROM ingredient WHERE recipe_id = $1', [recipeId]);
    if (parseInt(existingIng.rows[0].count) === 0) {
      for (let i = 0; i < data.ingredients.length; i++) {
        await client.query(
          'INSERT INTO ingredient (recipe_id, name, quantity, unit, notes, order_index) VALUES ($1, $2, $3, $4, $5, $6)',
          [recipeId, data.ingredients[i].name, data.ingredients[i].quantity, data.ingredients[i].unit, data.ingredients[i].notes || null, i]
        );
      }
      console.log('Added ingredients:', slug);
    }
    
    const existingSteps = await client.query('SELECT COUNT(*) FROM recipe_step WHERE recipe_id = $1', [recipeId]);
    if (parseInt(existingSteps.rows[0].count) === 0) {
      for (const step of data.steps) {
        await client.query(
          'INSERT INTO recipe_step (recipe_id, step_number, instruction, michelin_note) VALUES ($1, $2, $3, $4)',
          [recipeId, step.stepNumber, step.instruction, step.michelinNote || null]
        );
      }
    }
  }
  console.log('Done!');
  await client.end();
}

main().catch(console.error);
