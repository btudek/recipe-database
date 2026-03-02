const { Client } = require('pg');
const client = new Client({ host: 'db.ycwbumsmlikiquplkdln.supabase.co', port: 5432, database: 'postgres', user: 'postgres', password: process.env.DBPASS });

const recipes = [
  { title: 'Greek Salad', slug: 'greek-salad', description: 'Mediterranean salad', cuisine_id: '2f76ffd5-3152-4ed6-bb2a-5d4b1c09b07b' },
  { title: 'Hummus', slug: 'hummus', description: 'Chickpea dip', cuisine_id: '2f76ffd5-3152-4ed6-bb2a-5d4b1c09b07b' },
  { title: 'Falafel', slug: 'falafel', description: 'Fried chickpeas', cuisine_id: '2f76ffd5-3152-4ed6-bb2a-5d4b1c09b07b' },
];

const RECIPES = {
  'hummus': {
    ingredients: [
      { name: 'Chickpeas', quantity: 400, unit: 'g' },
      { name: 'Tahini', quantity: 120, unit: 'ml' },
      { name: 'Lemon', quantity: 2, unit: 'pcs' },
      { name: 'Garlic', quantity: 2, unit: 'cloves' },
    ],
    steps: [
      { stepNumber: 1, instruction: 'Blend chickpeas with tahini.', michelinNote: 'Until smooth.' },
      { stepNumber: 2, instruction: 'Add lemon and garlic.', michelinNote: 'Season to taste.' },
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
