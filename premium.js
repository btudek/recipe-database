const { Client } = require('pg');
const client = new Client({ host: 'db.ycwbumsmlikiquplkdln.supabase.co', port: 5432, database: 'postgres', user: 'postgres', password: process.env.DBPASS });

const RECIPES = {
  'onigiri': {
    ingredients: [
      { name: 'Sushi rice', quantity: 300, unit: 'g' },
      { name: 'Nori sheets', quantity: 3, unit: 'pcs' },
      { name: 'Salmon', quantity: 100, unit: 'g', notes: 'sashimi grade' },
      { name: 'Salt', quantity: 1, unit: 'tsp' },
      { name: 'Rice vinegar', quantity: 30, unit: 'ml' },
    ],
    steps: [
      { stepNumber: 1, instruction: 'Cook sushi rice. Season with rice vinegar and salt.', michelinNote: 'Let rice cool slightly before shaping.' },
      { stepNumber: 2, instruction: 'Wet hands with salted water. Form rice into oval shapes.', michelinNote: 'Wet hands prevent sticking.' },
      { stepNumber: 3, instruction: 'Add salmon to center. Wrap with nori strip.', michelinNote: 'Nori adds flavor and holds shape.' },
    ]
  },
  'matcha-cheesecake': {
    ingredients: [
      { name: 'Cream cheese', quantity: 450, unit: 'g' },
      { name: 'Sugar', quantity: 100, unit: 'g' },
      { name: 'Eggs', quantity: 3, unit: 'pcs' },
      { name: 'Matcha powder', quantity: 2, unit: 'tbsp' },
      { name: 'Heavy cream', quantity: 120, unit: 'ml' },
      { name: 'Graham crackers', quantity: 150, unit: 'g' },
    ],
    steps: [
      { stepNumber: 1, instruction: 'Mix crushed graham crackers with melted butter. Press into pan.', michelinNote: 'Firm press for crust.' },
      { stepNumber: 2, instruction: 'Beat cream cheese and sugar until smooth.', michelinNote: 'Room temp cheese is essential.' },
      { stepNumber: 3, instruction: 'Add eggs, matcha, and cream. Pour over crust.', michelinNote: 'Don\'t overmix.' },
      { stepNumber: 4, instruction: 'Bake at 325F for 50 minutes. Chill overnight.', michelinNote: 'Slow cool prevents cracks.' },
    ]
  },
  'affogato': {
    ingredients: [
      { name: 'Espresso', quantity: 60, unit: 'ml', notes: 'strong' },
      { name: 'Vanilla ice cream', quantity: 2, unit: 'scoops' },
      { name: 'Amaretto', quantity: 15, unit: 'ml', notes: 'optional' },
    ],
    steps: [
      { stepNumber: 1, instruction: 'Scoop ice cream into glass or cup.', michelinNote: 'Use high-quality ice cream.' },
      { stepNumber: 2, instruction: 'Pour hot espresso over ice cream.', michelinNote: 'The contrast is key.' },
      { stepNumber: 3, instruction: 'Serve immediately.', michelinNote: 'Don\'t let it melt!' },
    ]
  },
  'miso-soup': {
    ingredients: [
      { name: 'Miso paste', quantity: 3, unit: 'tbsp' },
      { name: 'Tofu', quantity: 150, unit: 'g', notes: 'cubed' },
      { name: 'Green onions', quantity: 2, unit: 'stalks' },
      { name: 'Wakame seaweed', quantity: 1, unit: 'tbsp', notes: 'dried' },
      { name: 'Dashi', quantity: 800, unit: 'ml' },
    ],
    steps: [
      { stepNumber: 1, instruction: 'Rehydrate wakame in warm water.', michelinNote: 'Softens in minutes.' },
      { stepNumber: 2, instruction: 'Heat dashi in pot. Add tofu and wakame.', michelinNote: 'Don\'t boil after adding miso.' },
      { stepNumber: 3, instruction: 'Remove from heat. Whisk in miso paste.', michelinNote: 'Miso loses nutrients if boiled.' },
      { stepNumber: 4, instruction: 'Serve topped with green onions.', michelinNote: 'Add just before serving.' },
    ]
  },
  'wagyu-steak': {
    ingredients: [
      { name: 'Wagyu beef', quantity: 300, unit: 'g', notes: 'A5 grade' },
      { name: 'Sea salt', quantity: 1, unit: 'tsp' },
      { name: 'Black pepper', quantity: 1, unit: 'tsp' },
      { name: 'Garlic', quantity: 2, unit: 'cloves', notes: 'crushed' },
      { name: 'Rosemary', quantity: 2, unit: 'sprigs' },
    ],
    steps: [
      { stepNumber: 1, instruction: 'Bring steak to room temperature.', michelinNote: 'Room temp ensures even cooking.' },
      { stepNumber: 2, instruction: 'Season generously with salt and pepper.', michelinNote: 'Salt enhances marbling.' },
      { stepNumber: 3, instruction: 'Sear in hot pan 2 minutes per side.', michelinNote: 'High heat creates crust.' },
      { stepNumber: 4, instruction: 'Rest for 5 minutes before slicing.', michelinNote: 'Resting redistributes juices.' },
    ]
  },
  'beef-wellington': {
    ingredients: [
      { name: 'Beef tenderloin', quantity: 750, unit: 'g' },
      { name: 'Puff pastry', quantity: 500, unit: 'g' },
      { name: 'Mushrooms', quantity: 300, unit: 'g', notes: 'finely diced' },
      { name: 'Prosciutto', quantity: 150, unit: 'g' },
      { name: 'Egg', quantity: 1, unit: 'pcs', notes: 'for wash' },
    ],
    steps: [
      { stepNumber: 1, instruction: 'Sear beef on all sides. Cool completely.', michelinNote: 'Cold beef is easier to wrap.' },
      { stepNumber: 2, instruction: 'Make duxelles: cook mushrooms until dry.', michelinNote: 'Dry filling prevents soggy pastry.' },
      { stepNumber: 3, instruction: 'Wrap beef in prosciutto, then duxelles, then pastry.', michelinNote: 'Tight wrap is essential.' },
      { stepNumber: 4, instruction: 'Brush with egg wash. Bake at 400F for 25 minutes.', michelinNote: 'Rest 10 min before slicing.' },
    ]
  },
};

async function main() {
  await client.connect();
  const recipeResult = await client.query('SELECT id, slug FROM recipe');
  const recipeMap = {};
  recipeResult.rows.forEach(r => recipeMap[r.slug] = r.id);
  
  for (const [slug, data] of Object.entries(RECIPES)) {
    const recipeId = recipeMap[slug];
    if (!recipeId) { console.log('Not found:', slug); continue; }
    
    const existingIng = await client.query('SELECT COUNT(*) FROM ingredient WHERE recipe_id = $1', [recipeId]);
    if (parseInt(existingIng.rows[0].count) === 0) {
      for (let i = 0; i < data.ingredients.length; i++) {
        await client.query(
          'INSERT INTO ingredient (recipe_id, name, quantity, unit, notes, order_index) VALUES ($1, $2, $3, $4, $5, $6)',
          [recipeId, data.ingredients[i].name, data.ingredients[i].quantity, data.ingredients[i].unit, data.ingredients[i].notes || null, i]
        );
      }
      console.log('Added:', slug);
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
