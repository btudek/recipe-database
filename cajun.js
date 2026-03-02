const { Client } = require('pg');
const client = new Client({ host: 'db.ycwbumsmlikiquplkdln.supabase.co', port: 5432, database: 'postgres', user: 'postgres', password: process.env.DBPASS });

const recipes = [
  { title: 'Shrimp Po Boy', slug: 'shrimp-po-boy', description: 'New Orleans sandwich', cuisine_id: '813587ed-24eb-421d-97be-f5f2d1740e86' },
  { title: 'Jambalaya', slug: 'jambalaya', description: 'Louisiana rice dish', cuisine_id: '813587ed-24eb-421d-97be-f5f2d1740e86' },
  { title: 'Gumbo', slug: 'gumbo', description: 'Louisiana stew', cuisine_id: '813587ed-24eb-421d-97be-f5f2d1740e86' },
  { title: 'Beignets', slug: 'beignets', description: 'French donuts', cuisine_id: '813587ed-24eb-421d-97be-f5f2d1740e86' },
  { title: 'Crawfish Etouffee', slug: 'crawfish-etouffee', description: 'Crawfish in sauce', cuisine_id: '813587ed-24eb-421d-97be-f5f2d1740e86' },
];

const RECIPES = {
  'shrimp-po-boy': {
    ingredients: [
      { name: 'Shrimp', quantity: 500, unit: 'g' },
      { name: 'French bread', quantity: 1, unit: 'pcs' },
      { name: 'Flour', quantity: 150, unit: 'g' },
      { name: 'Mayonnaise', quantity: 60, unit: 'ml' },
      { name: 'Lettuce', quantity: 4, unit: 'leaves' },
      { name: 'Tomato', quantity: 1, unit: 'medium' },
    ],
    steps: [
      { stepNumber: 1, instruction: 'Bread shrimp with seasoned flour.', michelinNote: 'Double-dip for extra crunch.' },
      { stepNumber: 2, instruction: 'Fry until golden.', michelinNote: 'Hot oil.' },
      { stepNumber: 3, instruction: 'Toast bread, spread mayo.', michelinNote: 'The base.' },
      { stepNumber: 4, instruction: 'Layer shrimp, lettuce, tomato.', michelinNote: 'Add pickles.' },
    ]
  },
  'jambalaya': {
    ingredients: [
      { name: 'Andouille sausage', quantity: 200, unit: 'g' },
      { name: 'Chicken thighs', quantity: 400, unit: 'g' },
      { name: 'Shrimp', quantity: 300, unit: 'g' },
      { name: 'Rice', quantity: 400, unit: 'g' },
      { name: 'Tomatoes', quantity: 400, unit: 'g' },
      { name: 'Creole seasoning', quantity: 2, unit: 'tbsp' },
    ],
    steps: [
      { stepNumber: 1, instruction: 'Brown sausage and chicken.', michelinNote: 'Set aside.' },
      { stepNumber: 2, instruction: 'Sauté onion, pepper, celery.', michelinNote: 'The holy trinity.' },
      { stepNumber: 3, instruction: 'Add tomatoes, seasoning, stock.', michelinNote: 'The base.' },
      { stepNumber: 4, instruction: 'Add rice, simmer until done.', michelinNote: 'Add shrimp near end.' },
    ]
  },
  'gumbo': {
    ingredients: [
      { name: 'Shrimp', quantity: 400, unit: 'g' },
      { name: 'Okra', quantity: 200, unit: 'g' },
      { name: 'File powder', quantity: 2, unit: 'tbsp' },
      { name: 'Stock', quantity: 1500, unit: 'ml' },
      { name: 'Roux', quantity: 60, unit: 'g' },
    ],
    steps: [
      { stepNumber: 1, instruction: 'Make dark roux - cook until peanut butter color.', michelinNote: 'Stir constantly.' },
      { stepNumber: 2, instruction: 'Add onion, celery, pepper.', michelinNote: 'The aromatics.' },
      { stepNumber: 3, instruction: 'Add stock, simmer 1 hour.', michelinNote: 'The flavor base.' },
      { stepNumber: 4, instruction: 'Add okra and shrimp. Finish with file powder.', michelinNote: 'Serve over rice.' },
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
