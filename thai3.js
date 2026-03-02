const { Client } = require('pg');
const client = new Client({ host: 'db.ycwbumsmlikiquplkdln.supabase.co', port: 5432, database: 'postgres', user: 'postgres', password: process.env.DBPASS });

const recipes = [
  { title: 'Tom Yum Goong', slug: 'tom-yum-goong', description: 'Thai hot and sour soup', cuisine_id: 'a3cb4471-db63-434e-a2e2-255242ffaca0' },
  { title: 'Pad Thai', slug: 'pad-thai', description: 'Thai stir-fried noodles', cuisine_id: 'a3cb4471-db63-434e-a2e2-255242ffaca0' },
  { title: 'Massaman Curry', slug: 'massaman-curry', description: 'Thai Muslim curry', cuisine_id: 'a3cb4471-db63-434e-a2e2-255242ffaca0' },
  { title: 'Khao Pad', slug: 'khao-pad', description: 'Thai fried rice', cuisine_id: 'a3cb4471-db63-434e-a2e2-255242ffaca0' },
  { title: 'Som Tam', slug: 'som-tam', description: 'Thai papaya salad', cuisine_id: 'a3cb4471-db63-434e-a2e2-255242ffaca0' },
];

const RECIPES = {
  'tom-yum-goong': {
    ingredients: [
      { name: 'Shrimp', quantity: 300, unit: 'g' },
      { name: 'Mushrooms', quantity: 150, unit: 'g' },
      { name: 'Lemongrass', quantity: 2, unit: 'stalks' },
      { name: 'Galangal', quantity: 3, unit: 'slices' },
      { name: 'Lime juice', quantity: 60, unit: 'ml' },
      { name: 'Fish sauce', quantity: 30, unit: 'ml' },
      { name: 'Thai chilies', quantity: 4, unit: 'pcs' },
    ],
    steps: [
      { stepNumber: 1, instruction: 'Boil water with lemongrass, galangal, lime leaves.', michelinNote: 'The aromatics.' },
      { stepNumber: 2, instruction: 'Add mushrooms, cook 5 minutes.', michelinNote: 'Don\'t overcook.' },
      { stepNumber: 3, instruction: 'Add shrimp, cook until pink.', michelinNote: 'Quick cooking.' },
      { stepNumber: 4, instruction: 'Season with fish sauce. Add lime juice at end.', michelinNote: 'Don\'t boil lime.' },
    ]
  },
  'khao-pad': {
    ingredients: [
      { name: 'Day-old rice', quantity: 400, unit: 'g' },
      { name: 'Shrimp', quantity: 200, unit: 'g' },
      { name: 'Eggs', quantity: 2, unit: 'pcs' },
      { name: 'Garlic', quantity: 4, unit: 'cloves' },
      { name: 'Soy sauce', quantity: 30, unit: 'ml' },
      { name: 'Tomato', quantity: 1, unit: 'medium' },
    ],
    steps: [
      { stepNumber: 1, instruction: 'Stir-fry garlic until fragrant.', michelinNote: 'The base.' },
      { stepNumber: 2, instruction: 'Add shrimp, cook until pink.', michelinNote: 'Set aside.' },
      { stepNumber: 3, instruction: 'Add rice, stir-fry on high heat.', michelinNote: 'Press and toss.' },
      { stepNumber: 4, instruction: 'Add eggs, soy sauce, tomato.', michelinNote: 'Serve with cucumber.' },
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
