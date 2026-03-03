const { Client } = require('pg');
const client = new Client({ host: 'db.ycwbumsmlikiquplkdln.supabase.co', port: 5432, database: 'postgres', user: 'postgres', password: process.env.DBPASS });

const recipes = [
  { title: 'Chinese Kung Pao Chicken', slug: 'kung-pao-chicken-2', description: 'Spicy stir-fry', cuisine_id: '8232ae82-2fa2-4f95-a9f1-bc7ddd817d28' },
  { title: 'Chinese General Tso Chicken', slug: 'general-tso-2', description: 'Crispy chicken', cuisine_id: '8232ae82-2fa2-4f95-a9f1-bc7ddd817d28' },
];

const RECIPES = {
  'kung-pao-chicken-2': {
    ingredients: [
      { name: 'Chicken', quantity: 400, unit: 'g' },
      { name: 'Dried chilies', quantity: 10, unit: 'pcs' },
      { name: 'Peanuts', quantity: 60, unit: 'g' },
    ],
    steps: [
      { stepNumber: 1, instruction: 'Marinate and fry chicken.', michelinNote: 'The prep.' },
      { stepNumber: 2, instruction: 'Stir-fry with chilies.', michelinNote: 'The cooking.' },
      { stepNumber: 3, instruction: 'Add peanuts and sauce.', michelinNote: 'The finish.' },
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
      console.log('Added:', r.title);
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
