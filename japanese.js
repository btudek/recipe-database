const { Client } = require('pg');
const client = new Client({ host: 'db.ycwbumsmlikiquplkdln.supabase.co', port: 5432, database: 'postgres', user: 'postgres', password: process.env.DBPASS });

const RECIPES = {
  'yakitori': {
    ingredients: [
      { name: 'Chicken thighs', quantity: 400, unit: 'g', notes: 'boneless' },
      { name: 'Soy sauce', quantity: 60, unit: 'ml' },
      { name: 'Mirin', quantity: 60, unit: 'ml' },
      { name: 'Sake', quantity: 30, unit: 'ml' },
      { name: 'Sugar', quantity: 30, unit: 'g' },
      { name: 'Bamboo skewers', quantity: 8, unit: 'pcs' },
    ],
    steps: [
      { stepNumber: 1, instruction: 'Cut chicken into 1-inch cubes.', michelinNote: 'Uniform size ensures even cooking.' },
      { stepNumber: 2, instruction: 'Soak skewers in water 30 minutes.', michelinNote: 'Prevents burning on grill.' },
      { stepNumber: 3, instruction: 'Mix soy sauce, mirin, sake, and sugar for glaze.', michelinNote: 'Heat slightly to dissolve sugar.' },
      { stepNumber: 4, instruction: 'Thread chicken onto skewers.', michelinNote: 'Don\'t crowd - leaves space.' },
      { stepNumber: 5, instruction: 'Grill, turning, brushing with glaze.', michelinNote: 'Caramelize for char flavor.' },
    ]
  },
  'tonkotsu-ramen': {
    ingredients: [
      { name: 'Pork bones', quantity: 1000, unit: 'g' },
      { name: 'Pork belly', quantity: 300, unit: 'g' },
      { name: 'Ramen noodles', quantity: 400, unit: 'g' },
      { name: 'Soy sauce', quantity: 60, unit: 'ml' },
      { name: 'Garlic', quantity: 6, unit: 'cloves' },
      { name: 'Ginger', quantity: 3, unit: 'inch' },
      { name: 'Green onions', quantity: 4, unit: 'stalks' },
      { name: 'Soft-boiled eggs', quantity: 4, unit: 'pcs' },
    ],
    steps: [
      { stepNumber: 1, instruction: 'Blanch pork bones, drain, rinse.', michelinNote: 'Removes impurities for clear broth.' },
      { stepNumber: 2, instruction: 'Boil bones vigorously for 8 hours.', michelinNote: 'High heat emulsifies fat into broth.' },
      { stepNumber: 3, instruction: 'Make tare: simmer soy sauce, garlic, ginger.', michelinNote: 'This is the flavor base.' },
      { stepNumber: 4, instruction: 'Cook noodles according to package.', michelinNote: 'Don\'t overcook - they continue in bowl.' },
      { stepNumber: 5, instruction: 'Assemble: noodles, broth, tare, toppings.', michelinNote: 'Serve immediately.' },
    ]
  },
  'okonomiyaki': {
    ingredients: [
      { name: 'Cabbage', quantity: 300, unit: 'g' },
      { name: 'Flour', quantity: 150, unit: 'g' },
      { name: 'Eggs', quantity: 2, unit: 'pcs' },
      { name: 'Dashi', quantity: 150, unit: 'ml' },
      { name: 'Pork belly', quantity: 150, unit: 'g' },
      { name: 'Okonomiyaki sauce', quantity: 60, unit: 'ml' },
      { name: 'Mayonnaise', quantity: 30, unit: 'ml' },
    ],
    steps: [
      { stepNumber: 1, instruction: 'Mix flour, eggs, dashi into batter.', michelinNote: 'Let rest 15 minutes.' },
      { stepNumber: 2, instruction: 'Shred cabbage finely. Mix with batter.', michelinNote: 'Don\'t overmix - keep cabbage texture.' },
      { stepNumber: 3, instruction: 'Cook on griddle, add pork on top.', michelinNote: 'Medium heat - don\'t burn.' },
      { stepNumber: 4, instruction: 'Flip when bottom is golden.', michelinNote: 'Press down to set.' },
      { stepNumber: 5, instruction: 'Top with sauce and mayo.', michelinNote: 'Add bonito flakes if desired.' },
    ]
  },
  'mochi-ice-cream': {
    ingredients: [
      { name: 'Glutinous rice flour', quantity: 200, unit: 'g' },
      { name: 'Sugar', quantity: 50, unit: 'g' },
      { name: 'Water', quantity: 180, unit: 'ml' },
      { name: 'Ice cream', quantity: 8, unit: 'scoops', notes: 'various flavors' },
      { name: 'Cornstarch', quantity: 50, unit: 'g', notes: 'for dusting' },
    ],
    steps: [
      { stepNumber: 1, instruction: 'Mix rice flour, sugar, water until smooth.', michelinNote: 'No lumps for smooth mochi.' },
      { stepNumber: 2, instruction: 'Steam for 20 minutes until translucent.', michelinNote: 'Cover with damp cloth.' },
      { stepNumber: 3, instruction: 'Dust work surface with cornstarch.', michelinNote: 'Hot mochi is very sticky.' },
      { stepNumber: 4, instruction: 'Roll out, cut circles, wrap ice cream.', michelinNote: 'Work quickly - ice cream melts.' },
      { stepNumber: 5, instruction: 'Freeze until set.', michelinNote: 'Serve frozen for best texture.' },
    ]
  },
  'pork-belly-buns': {
    ingredients: [
      { name: 'Pork belly', quantity: 500, unit: 'g' },
      { name: 'Chinese buns', quantity: 8, unit: 'pcs' },
      { name: 'Hoisin sauce', quantity: 30, unit: 'ml' },
      { name: 'Cucumber', quantity: 1, unit: 'medium' },
      { name: 'Green onions', quantity: 4, unit: 'stalks' },
      { name: 'Five spice', quantity: 1, unit: 'tsp' },
    ],
    steps: [
      { stepNumber: 1, instruction: 'Rub pork with five spice, soy, hoisin.', michelinNote: 'Marinate overnight is best.' },
      { stepNumber: 2, instruction: 'Braise pork in sauce for 2 hours until tender.', michelinNote: 'Low and slow breaks down collagen.' },
      { stepNumber: 3, instruction: 'Slice pork belly thinly.', michelinNote: 'Steam buns while slicing.' },
      { stepNumber: 4, instruction: 'Steam buns until fluffy.', michelinNote: '2-3 minutes - don\'t overcook.' },
      { stepNumber: 5, instruction: 'Assemble: bun, pork, cucumber, green onion.', michelinNote: 'Serve immediately.' },
    ]
  },
  'chicken-katsu': {
    ingredients: [
      { name: 'Chicken breast', quantity: 2, unit: 'pcs' },
      { name: 'Panko breadcrumbs', quantity: 200, unit: 'g' },
      { name: 'Flour', quantity: 100, unit: 'g' },
      { name: 'Eggs', quantity: 2, unit: 'pcs' },
      { name: 'Salt', quantity: 1, unit: 'tsp' },
      { name: 'Oil', quantity: 500, unit: 'ml', notes: 'for frying' },
    ],
    steps: [
      { stepNumber: 1, instruction: 'Pound chicken breasts to even thickness.', michelinNote: 'Ensures even cooking.' },
      { stepNumber: 2, instruction: 'Dredge in flour, egg, then panko.', michelinNote: 'Press panko for extra crispiness.' },
      { stepNumber: 3, instruction: 'Fry at 350F until golden, about 5 minutes.', michelinNote: 'Don\'t crowd the pan.' },
      { stepNumber: 4, instruction: 'Rest 2 minutes before slicing.', michelinNote: 'Keeps juices in.' },
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
