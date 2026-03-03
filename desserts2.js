const { Client } = require('pg');
const client = new Client({ host: 'db.ycwbumsmlikiquplkdln.supabase.co', port: 5432, database: 'postgres', user: 'postgres', password: process.env.DBPASS });

const recipes = [
  { title: 'Tiramisu', slug: 'tiramisu', description: 'Italian coffee dessert', cuisine_id: 'f51d9e26-ace3-4b36-9d0c-6364877d3d94' },
  { title: 'Panna Cotta', slug: 'panna-cotta', description: 'Italian cream dessert', cuisine_id: 'f51d9e26-ace3-4b36-9d0c-6364877d3d94' },
];

const RECIPES = {
  'tiramisu': {
    ingredients: [
      { name: 'Mascarpone', quantity: 500, unit: 'g' },
      { name: 'Ladyfingers', quantity: 200, unit: 'g' },
      { name: 'Espresso', quantity: 250, unit: 'ml' },
    ],
    steps: [
      { stepNumber: 1, instruction: 'Mix mascarpone with sugar.', michelinNote: 'The cream.' },
      { stepNumber: 2, instruction: 'Dip ladyfingers in coffee.', michelinNote: 'The assembly.' },
      { stepNumber: 3, instruction: 'Layer and chill.', michelinNote: 'The setting.' },
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
