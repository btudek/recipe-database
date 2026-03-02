const { Client } = require('pg');
const client = new Client({ host: 'db.ycwbumsmlikiquplkdln.supabase.co', port: 5432, database: 'postgres', user: 'postgres', password: process.env.DBPASS });

const recipes = [
  { title: 'Chicken Katsu', slug: 'chicken-katsu', description: 'Japanese breaded chicken', cuisine_id: 'a3cb4471-db63-434e-a2e2-255242ffaca0' },
  { title: 'Beef Teriyaki', slug: 'beef-teriyaki', description: 'Japanese glazed beef', cuisine_id: 'a3cb4471-db63-434e-a2e2-255242ffaca0' },
  { title: 'Udon Soup', slug: 'udon-soup', description: 'Japanese noodle soup', cuisine_id: 'a3cb4471-db63-434e-a2e2-255242ffaca0' },
  { title: 'Yakisoba', slug: 'yakisoba', description: 'Japanese stir-fried noodles', cuisine_id: 'a3cb4471-db63-434e-a2e2-255242ffaca0' },
];

const RECIPES = {
  'chicken-katsu': {
    ingredients: [
      { name: 'Chicken breast', quantity: 2, unit: 'pcs' },
      { name: 'Panko breadcrumbs', quantity: 200, unit: 'g' },
      { name: 'Flour', quantity: 100, unit: 'g' },
      { name: 'Eggs', quantity: 2, unit: 'pcs' },
    ],
    steps: [
      { stepNumber: 1, instruction: 'Pound chicken to even thickness.', michelinNote: 'Even cooking.' },
      { stepNumber: 2, instruction: 'Dredge in flour, egg, panko.', michelinNote: 'Press panko.' },
      { stepNumber: 3, instruction: 'Fry at 350F until golden.', michelinNote: '5 minutes.' },
    ]
  },
  'beef-teriyaki': {
    ingredients: [
      { name: 'Beef ribeye', quantity: 400, unit: 'g' },
      { name: 'Soy sauce', quantity: 120, unit: 'ml' },
      { name: 'Mirin', quantity: 60, unit: 'ml' },
      { name: 'Sugar', quantity: 60, unit: 'g' },
    ],
    steps: [
      { stepNumber: 1, instruction: 'Slice beef thin.', michelinNote: 'Against grain.' },
      { stepNumber: 2, instruction: 'Sear quickly.', michelinNote: 'High heat.' },
      { stepNumber: 3, instruction: 'Add sauce, reduce to glaze.', michelinNote: 'Serve with rice.' },
    ]
  },
  'udon-soup': {
    ingredients: [
      { name: 'Udon noodles', quantity: 400, unit: 'g' },
      { name: 'Dashi stock', quantity: 1000, unit: 'ml' },
      { name: 'Soy sauce', quantity: 60, unit: 'ml' },
      { name: 'Green onions', quantity: 4, unit: 'stalks' },
    ],
    steps: [
      { stepNumber: 1, instruction: 'Make dashi.', michelinNote: 'The base.' },
      { stepNumber: 2, instruction: 'Cook noodles.', michelinNote: 'Don\'t overcook.' },
      { stepNumber: 3, instruction: 'Serve in hot broth.', michelinNote: 'Top with onions.' },
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
