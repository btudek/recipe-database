const { Client } = require('pg');
const client = new Client({ host: 'db.ycwbumsmlikiquplkdln.supabase.co', port: 5432, database: 'postgres', user: 'postgres', password: process.env.DBPASS });

const recipes = [
  { title: 'Banh Mi', slug: 'banh-mi', description: 'Vietnamese sandwich', cuisine_id: 'a3cb4471-db63-434e-a2e2-255242ffaca0' },
  { title: 'Pho', slug: 'pho', description: 'Vietnamese noodle soup', cuisine_id: 'a3cb4471-db63-434e-a2e2-255242ffaca0' },
  { title: 'Spring Rolls', slug: 'spring-rolls', description: 'Fresh Vietnamese rolls', cuisine_id: 'a3cb4471-db63-434e-a2e2-255242ffaca0' },
];

const RECIPES = {
  'banh-mi': {
    ingredients: [
      { name: 'Baguette', quantity: 1, unit: 'pcs' },
      { name: 'Grilled pork', quantity: 150, unit: 'g' },
      { name: 'Pickled carrots', quantity: 50, unit: 'g' },
      { name: 'Cilantro', quantity: 20, unit: 'g' },
      { name: 'Jalapeño', quantity: 1, unit: 'pcs' },
    ],
    steps: [
      { stepNumber: 1, instruction: 'Warm and split baguette.', michelinNote: 'The base.' },
      { stepNumber: 2, instruction: 'Layer pork, pickles, cilantro, jalapeño.', michelinNote: 'The fillings.' },
      { stepNumber: 3, instruction: 'Add mayo and soy sauce.', michelinNote: 'The condiments.' },
    ]
  },
  'pho': {
    ingredients: [
      { name: 'Rice noodles', quantity: 400, unit: 'g' },
      { name: 'Beef bones', quantity: 500, unit: 'g' },
      { name: 'Star anise', quantity: 4, unit: 'pcs' },
      { name: 'Bean sprouts', quantity: 150, unit: 'g' },
      { name: 'Basil', quantity: 30, unit: 'g' },
    ],
    steps: [
      { stepNumber: 1, instruction: 'Simmer bones with spices for hours.', michelinNote: 'The broth.' },
      { stepNumber: 2, instruction: 'Cook noodles separately.', michelinNote: 'The base.' },
      { stepNumber: 3, instruction: 'Serve with raw beef slices that cook in hot broth.', michelinNote: 'The key.' },
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
