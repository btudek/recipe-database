const { Client } = require('pg');
const client = new Client({ host: 'db.ycwbumsmlikiquplkdln.supabase.co', port: 5432, database: 'postgres', user: 'postgres', password: process.env.DBPASS });

const recipes = [
  { title: 'Tacos', slug: 'tacos', description: 'Mexican street tacos', cuisine_id: '539d04d6-e193-4f0f-930a-90553fb21704' },
  { title: 'Burritos', slug: 'burritos', description: 'Mexican wrapped burritos', cuisine_id: '539d04d6-e193-4f0f-930a-90553fb21704' },
  { title: 'Quesadilla', slug: 'quesadilla', description: 'Cheese filled tortilla', cuisine_id: '539d04d6-e193-4f0f-930a-90553fb21704' },
  { title: 'Nachos', slug: 'nachos', description: 'Chips with toppings', cuisine_id: '539d04d6-e193-4f0f-930a-90553fb21704' },
  { title: 'Enchiladas', slug: 'enchiladas', description: 'Rolled tortillas with sauce', cuisine_id: '539d04d6-e193-4f0f-930a-90553fb21704' },
];

const RECIPES = {
  'tacos': {
    ingredients: [
      { name: 'Corn tortillas', quantity: 8, unit: 'pcs' },
      { name: 'Carne asada', quantity: 300, unit: 'g' },
      { name: 'Onion', quantity: 1, unit: 'medium' },
      { name: 'Cilantro', quantity: 30, unit: 'g' },
      { name: 'Lime', quantity: 2, unit: 'pcs' },
      { name: 'Salsa verde', quantity: 120, unit: 'ml' },
    ],
    steps: [
      { stepNumber: 1, instruction: 'Grill steak, slice thin.', michelinNote: 'Char the meat.' },
      { stepNumber: 2, instruction: 'Warm tortillas on grill.', michelinNote: 'Softens them.' },
      { stepNumber: 3, instruction: 'Fill with steak, onion, cilantro.', michelinNote: 'The toppings.' },
      { stepNumber: 4, instruction: 'Squeeze lime, add salsa.', michelinNote: 'Serve immediately.' },
    ]
  },
  'burritos': {
    ingredients: [
      { name: 'Flour tortillas', quantity: 4, unit: 'pcs' },
      { name: 'Rice', quantity: 300, unit: 'g' },
      { name: 'Black beans', quantity: 200, unit: 'g' },
      { name: 'Carnitas', quantity: 300, unit: 'g' },
      { name: 'Cheese', quantity: 150, unit: 'g' },
      { name: 'Sour cream', quantity: 120, unit: 'ml' },
    ],
    steps: [
      { stepNumber: 1, instruction: 'Warm tortillas.', michelinNote: 'Makes them pliable.' },
      { stepNumber: 2, instruction: 'Layer: rice, beans, meat, cheese.', michelinNote: 'The fillings.' },
      { stepNumber: 3, instruction: 'Add sour cream and salsa.', michelinNote: 'The sauces.' },
      { stepNumber: 4, instruction: 'Roll tightly, tucking ends in.', michelinNote: 'Wrap in foil to serve.' },
    ]
  },
  'quesadilla': {
    ingredients: [
      { name: 'Flour tortilla', quantity: 2, unit: 'pcs' },
      { name: 'Cheddar cheese', quantity: 200, unit: 'g' },
      { name: 'Butter', quantity: 30, unit: 'g' },
    ],
    steps: [
      { stepNumber: 1, instruction: 'Place cheese on tortilla.', michelinNote: 'Cover half.' },
      { stepNumber: 2, instruction: 'Fold, cook in buttered pan.', michelinNote: 'Medium heat.' },
      { stepNumber: 3, instruction: 'Flip when golden.', michelinNote: 'Both sides.' },
      { stepNumber: 4, instruction: 'Cut into wedges.', michelinNote: 'Serve with salsa.' },
    ]
  },
  'nachos': {
    ingredients: [
      { name: 'Tortilla chips', quantity: 300, unit: 'g' },
      { name: 'Cheddar cheese', quantity: 200, unit: 'g' },
      { name: 'Black beans', quantity: 150, unit: 'g' },
      { name: 'Jalapeños', quantity: 2, unit: 'pcs' },
      { name: 'Sour cream', quantity: 60, unit: 'ml' },
    ],
    steps: [
      { stepNumber: 1, instruction: 'Spread chips on baking sheet.', michelinNote: 'Single layer.' },
      { stepNumber: 2, instruction: 'Top with beans, cheese, jalapeños.', michelinNote: 'Even distribution.' },
      { stepNumber: 3, instruction: 'Bake at 400F until cheese melts.', michelinNote: 'About 8 minutes.' },
      { stepNumber: 4, instruction: 'Top with sour cream and guacamole.', michelinNote: 'Serve immediately.' },
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
