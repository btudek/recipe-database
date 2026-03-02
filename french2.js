const { Client } = require('pg');
const client = new Client({ host: 'db.ycwbumsmlikiquplkdln.supabase.co', port: 5432, database: 'postgres', user: 'postgres', password: process.env.DBPASS });

const recipes = [
  { title: 'Lamb Chops', slug: 'lamb-chops', description: 'Grilled lamb', cuisine_id: '2f76ffd5-3152-4ed6-bb2a-5d4b1c09b07b' },
  { title: 'Coq au Vin', slug: 'coq-au-vin', description: 'French chicken stew', cuisine_id: '2f76ffd5-3152-4ed6-bb2a-5d4b1c09b07b' },
  { title: 'Ratatouille', slug: 'ratatouille', description: 'French vegetable stew', cuisine_id: '2f76ffd5-3152-4ed6-bb2a-5d4b1c09b07b' },
];

const RECIPES = {
  'lamb-chops': {
    ingredients: [
      { name: 'Lamb chops', quantity: 600, unit: 'g' },
      { name: 'Rosemary', quantity: 2, unit: 'sprigs' },
      { name: 'Garlic', quantity: 4, unit: 'cloves' },
      { name: 'Olive oil', quantity: 45, unit: 'ml' },
    ],
    steps: [
      { stepNumber: 1, instruction: 'Season lamb with salt and pepper.', michelinNote: 'Let come to room temp.' },
      { stepNumber: 2, instruction: 'Sear on high heat.', michelinNote: '2 min per side.' },
      { stepNumber: 3, instruction: 'Rest 5 minutes.', michelinNote: 'Serve medium-rare.' },
    ]
  },
  'ratatouille': {
    ingredients: [
      { name: 'Zucchini', quantity: 2, unit: 'medium' },
      { name: 'Eggplant', quantity: 1, unit: 'large' },
      { name: 'Bell peppers', quantity: 2, unit: 'pcs' },
      { name: 'Tomatoes', quantity: 4, unit: 'medium' },
      { name: 'Herbs de Provence', quantity: 2, unit: 'tsp' },
    ],
    steps: [
      { stepNumber: 1, instruction: 'Slice all vegetables.', michelinNote: 'Even slices.' },
      { stepNumber: 2, instruction: 'Layer in baking dish.', michelinNote: 'Overlapping.' },
      { stepNumber: 3, instruction: 'Drizzle with oil, herbs. Bake 375F for 45 min.', michelinNote: 'Until tender.' },
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
