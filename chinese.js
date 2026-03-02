const { Client } = require('pg');
const client = new Client({ host: 'db.ycwbumsmlikiquplkdln.supabase.co', port: 5432, database: 'postgres', user: 'postgres', password: process.env.DBPASS });

const RECIPES = {
  'beef-stir-fry': {
    ingredients: [
      { name: 'Beef sirloin', quantity: 400, unit: 'g', notes: 'thinly sliced' },
      { name: 'Bell peppers', quantity: 2, unit: 'pcs', notes: 'sliced' },
      { name: 'Broccoli', quantity: 200, unit: 'g', notes: 'florets' },
      { name: 'Soy sauce', quantity: 60, unit: 'ml' },
      { name: 'Oyster sauce', quantity: 30, unit: 'ml' },
      { name: 'Ginger', quantity: 2, unit: 'tbsp', notes: 'minced' },
      { name: 'Garlic', quantity: 4, unit: 'cloves', notes: 'minced' },
      { name: 'Vegetable oil', quantity: 30, unit: 'ml' },
    ],
    steps: [
      { stepNumber: 1, instruction: 'Slice beef against the grain into thin strips.', michelinNote: 'The grain direction matters - cutting against it makes meat tender.' },
      { stepNumber: 2, instruction: 'Mix soy sauce and oyster sauce for sauce.', michelinNote: 'Have everything ready before you start cooking.' },
      { stepNumber: 3, instruction: 'Heat wok until smoking. Add oil, then beef. Stir-fry until browned.', michelinNote: 'High heat is essential - don\'t crowd the wok.' },
      { stepNumber: 4, instruction: 'Remove beef. Stir-fry vegetables until crisp-tender.', michelinNote: 'Keep vegetables slightly crunchy.' },
      { stepNumber: 5, instruction: 'Return beef, add sauce. Toss until coated.', michelinNote: 'Serve immediately over rice.' },
    ]
  },
  'sweet-sour-pork': {
    ingredients: [
      { name: 'Pork shoulder', quantity: 500, unit: 'g', notes: 'cubed' },
      { name: 'Pineapple', quantity: 200, unit: 'g', notes: 'chunks' },
      { name: 'Bell pepper', quantity: 1, unit: 'pcs', notes: 'chunked' },
      { name: 'Sugar', quantity: 60, unit: 'g' },
      { name: 'Rice vinegar', quantity: 60, unit: 'ml' },
      { name: 'Ketchup', quantity: 60, unit: 'ml' },
      { name: 'Soy sauce', quantity: 30, unit: 'ml' },
    ],
    steps: [
      { stepNumber: 1, instruction: 'Deep fry pork cubes until golden and crispy.', michelinNote: 'Double-fry for extra crispiness.' },
      { stepNumber: 2, instruction: 'Make sauce: combine sugar, vinegar, ketchup, and soy sauce.', michelinNote: 'Taste and adjust - balance sweet and sour.' },
      { stepNumber: 3, instruction: 'Stir-fry pineapple and peppers briefly.', michelinNote: 'Keep them slightly crisp.' },
      { stepNumber: 4, instruction: 'Add sauce and pork. Toss until coated and bubbling.', michelinNote: 'The sauce should cling to the pork.' },
    ]
  },
  'dumplings': {
    ingredients: [
      { name: 'Ground pork', quantity: 400, unit: 'g' },
      { name: 'Cabbage', quantity: 200, unit: 'g', notes: 'minced' },
      { name: 'Green onions', quantity: 4, unit: 'stalks', notes: 'minced' },
      { name: 'Ginger', quantity: 1, unit: 'tbsp', notes: 'minced' },
      { name: 'Soy sauce', quantity: 30, unit: 'ml' },
      { name: 'Dumpling wrappers', quantity: 50, unit: 'pcs' },
    ],
    steps: [
      { stepNumber: 1, instruction: 'Salt cabbage, let sit 15 min, squeeze out water.', michelinNote: 'This prevents soggy dumplings.' },
      { stepNumber: 2, instruction: 'Mix pork, cabbage, onions, ginger, and soy sauce.', michelinNote: 'Stir in one direction for better texture.' },
      { stepNumber: 3, instruction: 'Place filling in wrapper, wet edges, fold and pleat.', michelinNote: '8-10 pleats look professional.' },
      { stepNumber: 4, instruction: 'Pan-fry dumplings in oiled pan until bottoms golden.', michelinNote: 'The pan-fry creates signature bottom texture.' },
      { stepNumber: 5, instruction: 'Add water, cover, steam until water evaporates.', michelinNote: 'The steam cooks the filling.' },
    ]
  },
  'egg-fried-rice': {
    ingredients: [
      { name: 'Day-old rice', quantity: 400, unit: 'g' },
      { name: 'Eggs', quantity: 3, unit: 'pcs' },
      { name: 'Green peas', quantity: 100, unit: 'g' },
      { name: 'Soy sauce', quantity: 30, unit: 'ml' },
      { name: 'Sesame oil', quantity: 15, unit: 'ml' },
      { name: 'Green onions', quantity: 3, unit: 'stalks' },
    ],
    steps: [
      { stepNumber: 1, instruction: 'Beat eggs. Scramble in hot wok, break into pieces.', michelinNote: 'Set eggs aside - they\'ll go back in later.' },
      { stepNumber: 2, instruction: 'Add cold rice to wok. Press and stir to separate grains.', michelinNote: 'Cold rice works best - fresh rice is too sticky.' },
      { stepNumber: 3, instruction: 'Add peas and egg. Season with soy sauce.', michelinNote: 'The wok should be smoky hot.' },
      { stepNumber: 4, instruction: 'Finish with sesame oil and green onions.', michelinNote: 'Serve immediately while hot.' },
    ]
  },
  'tom-yum-soup': {
    ingredients: [
      { name: 'Shrimp', quantity: 300, unit: 'g' },
      { name: 'Mushrooms', quantity: 150, unit: 'g' },
      { name: 'Lemongrass', quantity: 2, unit: 'stalks' },
      { name: 'Galangal', quantity: 3, unit: 'slices' },
      { name: 'Kaffir lime leaves', quantity: 4, unit: 'pcs' },
      { name: 'Fish sauce', quantity: 30, unit: 'ml' },
      { name: 'Lime juice', quantity: 60, unit: 'ml' },
      { name: 'Thai chilies', quantity: 4, unit: 'pcs' },
    ],
    steps: [
      { stepNumber: 1, instruction: 'Boil water with lemongrass, galangal, and lime leaves.', michelinNote: 'Let aromatics infuse the broth.' },
      { stepNumber: 2, instruction: 'Add mushrooms and chilies. Simmer 5 minutes.', michelinNote: 'Don\'t overcook the mushrooms.' },
      { stepNumber: 3, instruction: 'Add shrimp, cook until pink.', michelinNote: 'Shrimp cook quickly - don\'t overcook.' },
      { stepNumber: 4, instruction: 'Season with fish sauce. Add lime juice at the end.', michelinNote: 'Lime juice loses potency if boiled.' },
    ]
  },
  'hot-and-sour-soup': {
    ingredients: [
      { name: 'Tofu', quantity: 200, unit: 'g', notes: 'silken, cubed' },
      { name: 'Mushrooms', quantity: 100, unit: 'g' },
      { name: 'Eggs', quantity: 2, unit: 'pcs' },
      { name: 'Rice vinegar', quantity: 60, unit: 'ml' },
      { name: 'Soy sauce', quantity: 15, unit: 'ml' },
      { name: 'Sesame oil', quantity: 15, unit: 'ml' },
      { name: 'White pepper', quantity: 1, unit: 'tsp' },
    ],
    steps: [
      { stepNumber: 1, instruction: 'Bring broth to boil. Add tofu and mushrooms.', michelinNote: 'Silken tofu holds together better.' },
      { stepNumber: 2, instruction: 'Mix vinegar, soy sauce, and cornstarch for slurry.', michelinNote: 'This thickens the soup.' },
      { stepNumber: 3, instruction: 'Stir in slurry. Soup will thicken immediately.', michelinNote: 'Add more if you want thicker soup.' },
      { stepNumber: 4, instruction: 'Drizzle eggs in while stirring to create ribbons.', michelinNote: 'Pour in thin stream while stirring.' },
      { stepNumber: 5, instruction: 'Finish with sesame oil and white pepper.', michelinNote: 'White pepper has more bite than black.' },
    ]
  },
  'spring-rolls-chinese': {
    ingredients: [
      { name: 'Spring roll wrappers', quantity: 20, unit: 'pcs' },
      { name: 'Cabbage', quantity: 300, unit: 'g', notes: 'shredded' },
      { name: 'Carrots', quantity: 2, unit: 'medium', notes: 'julienned' },
      { name: 'Glass noodles', quantity: 100, unit: 'g', notes: 'soaked' },
      { name: 'Soy sauce', quantity: 30, unit: 'ml' },
      { name: 'Sesame oil', quantity: 15, unit: 'ml' },
    ],
    steps: [
      { stepNumber: 1, instruction: 'Stir-fry cabbage and carrots until wilted.', michelinNote: 'Don\'t overcook - they should stay crisp.' },
      { stepNumber: 2, instruction: 'Add soaked glass noodles and seasonings.', michelinNote: 'Mix everything while still hot.' },
      { stepNumber: 3, instruction: 'Cool filling completely before wrapping.', michelinNote: 'Hot filling makes wrappers soggy.' },
      { stepNumber: 4, instruction: 'Roll tightly, seal with water.', michelinNote: 'Don\'t overfill - they\'ll burst.' },
      { stepNumber: 5, instruction: 'Fry at 350F until golden, about 4-5 minutes.', michelinNote: 'Serve immediately with sweet chili sauce.' },
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
