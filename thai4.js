const { Client } = require('pg');
const client = new Client({ host: 'db.ycwbumsmlikiquplkdln.supabase.co', port: 5432, database: 'postgres', user: 'postgres', password: process.env.DBPASS });

const recipes = [
  { title: 'Chicken Satay', slug: 'chicken-satay', description: 'Thai grilled chicken skewers', cuisine_id: 'a3cb4471-db63-434e-a2e2-255242ffaca0' },
  { title: 'Pad See Ew', slug: 'pad-see-ew', description: 'Thai stir-fried noodles', cuisine_id: 'a3cb4471-db63-434e-a2e2-255242ffaca0' },
  { title: 'Thai Iced Tea', slug: 'thai-iced-tea', description: 'Sweet Thai tea', cuisine_id: 'a3cb4471-db63-434e-a2e2-255242ffaca0' },
  { title: 'Thai Iced Coffee', slug: 'thai-iced-coffee', description: 'Sweet Thai coffee', cuisine_id: 'a3cb4471-db63-434e-a2e2-255242ffaca0' },
  { title: 'Sticky Rice with Mango', slug: 'sticky-rice-mango', description: 'Thai dessert', cuisine_id: 'a3cb4471-db63-434e-a2e2-255242ffaca0' },
];

const RECIPES = {
  'chicken-satay': {
    ingredients: [
      { name: 'Chicken breast', quantity: 500, unit: 'g' },
      { name: 'Coconut milk', quantity: 120, unit: 'ml' },
      { name: 'Curry powder', quantity: 2, unit: 'tbsp' },
      { name: 'Peanut sauce', quantity: 120, unit: 'ml' },
    ],
    steps: [
      { stepNumber: 1, instruction: 'Slice chicken thin, marinate in coconut milk and curry.', michelinNote: 'The marination.' },
      { stepNumber: 2, instruction: 'Thread onto skewers.', michelinNote: 'The threading.' },
      { stepNumber: 3, instruction: 'Grill until charred.', michelinNote: 'The cooking.' },
      { stepNumber: 4, instruction: 'Serve with peanut sauce.', michelinNote: 'The dipping.' },
    ]
  },
  'pad-see-ew': {
    ingredients: [
      { name: 'Rice noodles', quantity: 400, unit: 'g' },
      { name: 'Chicken', quantity: 300, unit: 'g' },
      { name: 'Soy sauce', quantity: 60, unit: 'ml' },
      { name: 'Oyster sauce', quantity: 30, unit: 'ml' },
    ],
    steps: [
      { stepNumber: 1, instruction: 'Soak noodles in warm water.', michelinNote: 'The prep.' },
      { stepNumber: 2, instruction: 'Stir-fry chicken, set aside.', michelinNote: 'The cooking.' },
      { stepNumber: 3, instruction: 'Stir-fry noodles with sauces.', michelinNote: 'The tossing.' },
      { stepNumber: 4, instruction: 'Add chicken, serve.', michelinNote: 'The serving.' },
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
