const { Client } = require('pg');
const client = new Client({ host: 'db.ycwbumsmlikiquplkdln.supabase.co', port: 5432, database: 'postgres', user: 'postgres', password: process.env.DBPASS });

const recipes = [
  { title: 'Fish Tacos', slug: 'fish-tacos', description: 'Mexican fish tacos', cuisine_id: '539d04d6-e193-4f0f-930a-90553fb21704' },
  { title: 'Shrimp Tacos', slug: 'shrimp-tacos', description: 'Mexican shrimp tacos', cuisine_id: '539d04d6-e193-4f0f-930a-90553fb21704' },
  { title: 'Carne Asada', slug: 'carne-asada', description: 'Grilled steak', cuisine_id: '539d04d6-e193-4f0f-930a-90553fb21704' },
];

const RECIPES = {
  'fish-tacos': {
    ingredients: [
      { name: 'White fish', quantity: 400, unit: 'g' },
      { name: 'Corn tortillas', quantity: 8, unit: 'pcs' },
      { name: 'Cabbage', quantity: 200, unit: 'g' },
      { name: 'Lime', quantity: 2, unit: 'pcs' },
      { name: 'Cilantro', quantity: 30, unit: 'g' },
    ],
    steps: [
      { stepNumber: 1, instruction: 'Season fish with cumin and chili.', michelinNote: 'The spices.' },
      { stepNumber: 2, instruction: 'Grill or pan-fry.', michelinNote: 'Flake into chunks.' },
      { stepNumber: 3, instruction: 'Warm tortillas.', michelinNote: 'The base.' },
      { stepNumber: 4, instruction: 'Assemble with cabbage, cilantro, lime.', michelinNote: 'Serve with salsa.' },
    ]
  },
  'carne-asada': {
    ingredients: [
      { name: 'Flank steak', quantity: 750, unit: 'g' },
      { name: 'Lime', quantity: 3, unit: 'pcs' },
      { name: 'Garlic', quantity: 6, unit: 'cloves' },
      { name: 'Cilantro', quantity: 60, unit: 'g' },
      { name: 'Onion', quantity: 1, unit: 'medium' },
    ],
    steps: [
      { stepNumber: 1, instruction: 'Marinate steak with lime, garlic, cilantro.', michelinNote: '2 hours min.' },
      { stepNumber: 2, instruction: 'Grill to medium-rare.', michelinNote: 'High heat.' },
      { stepNumber: 3, instruction: 'Slice thin against grain.', michelinNote: 'The key.' },
      { stepNumber: 4, instruction: 'Serve with tortillas and salsa.', michelinNote: 'Classic.' },
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
