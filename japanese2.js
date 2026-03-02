const { Client } = require('pg');
const client = new Client({ host: 'db.ycwbumsmlikiquplkdln.supabase.co', port: 5432, database: 'postgres', user: 'postgres', password: process.env.DBPASS });

const recipes = [
  { title: 'Gyoza', slug: 'gyoza', description: 'Japanese pan-fried dumplings', cuisine_id: 'a3cb4471-db63-434e-a2e2-255242ffaca0' },
  { title: 'Udon Noodle Soup', slug: 'udon-noodle-soup', description: 'Japanese thick noodle soup', cuisine_id: 'a3cb4471-db63-434e-a2e2-255242ffaca0' },
  { title: 'Chicken Teriyaki', slug: 'chicken-teriyaki', description: 'Japanese glazed chicken', cuisine_id: 'a3cb4471-db63-434e-a2e2-255242ffaca0' },
  { title: 'Tempura', slug: 'tempura', description: 'Japanese battered and fried seafood', cuisine_id: 'a3cb4471-db63-434e-a2e2-255242ffaca0' },
  { title: 'Ramen', slug: 'ramen', description: 'Japanese noodle soup with pork', cuisine_id: 'a3cb4471-db63-434e-a2e2-255242ffaca0' },
  { title: 'Katsu Curry', slug: 'katsu-curry', description: 'Japanese curry with fried cutlet', cuisine_id: 'a3cb4471-db63-434e-a2e2-255242ffaca0' },
];

const RECIPES = {
  'gyoza': {
    ingredients: [
      { name: 'Ground pork', quantity: 300, unit: 'g' },
      { name: 'Cabbage', quantity: 200, unit: 'g' },
      { name: 'Gyoza wrappers', quantity: 50, unit: 'pcs' },
      { name: 'Soy sauce', quantity: 45, unit: 'ml' },
      { name: 'Sesame oil', quantity: 15, unit: 'ml' },
      { name: 'Ginger', quantity: 1, unit: 'tbsp' },
    ],
    steps: [
      { stepNumber: 1, instruction: 'Mix pork with shredded cabbage, ginger, soy, sesame oil.', michelinNote: 'Season well.' },
      { stepNumber: 2, instruction: 'Place filling on wrapper, wet edges, fold and pleat.', michelinNote: '8-10 pleats.' },
      { stepNumber: 3, instruction: 'Pan-fry in oil until bottoms golden.', michelinNote: 'Medium heat.' },
      { stepNumber: 4, instruction: 'Add water, cover, steam until water evaporates.', michelinNote: 'Serve with dipping sauce.' },
    ]
  },
  'udon-noodle-soup': {
    ingredients: [
      { name: 'Udon noodles', quantity: 400, unit: 'g' },
      { name: 'Dashi stock', quantity: 1000, unit: 'ml' },
      { name: 'Soy sauce', quantity: 60, unit: 'ml' },
      { name: 'Mirin', quantity: 30, unit: 'ml' },
      { name: 'Green onions', quantity: 3, unit: 'stalks' },
      { name: 'Tempura flakes', quantity: 30, unit: 'g' },
    ],
    steps: [
      { stepNumber: 1, instruction: 'Make dashi or use instant.', michelinNote: 'Dashi is the foundation.' },
      { stepNumber: 2, instruction: 'Season dashi with soy and mirin.', michelinNote: 'Taste and adjust.' },
      { stepNumber: 3, instruction: 'Cook udon according to package.', michelinNote: 'Don\'t overcook.' },
      { stepNumber: 4, instruction: 'Serve noodles in broth, top with green onions and tempura flakes.', michelinNote: 'Serve immediately.' },
    ]
  },
  'chicken-teriyaki': {
    ingredients: [
      { name: 'Chicken thighs', quantity: 600, unit: 'g' },
      { name: 'Soy sauce', quantity: 120, unit: 'ml' },
      { name: 'Mirin', quantity: 60, unit: 'ml' },
      { name: 'Sake', quantity: 60, unit: 'ml' },
      { name: 'Sugar', quantity: 60, unit: 'g' },
      { name: 'Ginger', quantity: 1, unit: 'tbsp' },
    ],
    steps: [
      { stepNumber: 1, instruction: 'Mix soy, mirin, sake, sugar for sauce.', michelinNote: 'Heat to dissolve sugar.' },
      { stepNumber: 2, instruction: 'Pan-fry chicken thighs skin-side down until golden.', michelinNote: 'Flip and cook through.' },
      { stepNumber: 3, instruction: 'Pour sauce over chicken, reduce to glaze.', michelinNote: 'Baste frequently.' },
      { stepNumber: 4, instruction: 'Slice and serve with rice.', michelinNote: 'Garnish with sesame.' },
    ]
  },
  'tempura': {
    ingredients: [
      { name: 'Shrimp', quantity: 300, unit: 'g' },
      { name: 'Squid', quantity: 200, unit: 'g' },
      { name: 'Vegetables', quantity: 200, unit: 'g', notes: 'sweet potato, eggplant' },
      { name: 'Flour', quantity: 150, unit: 'g' },
      { name: 'Ice water', quantity: 250, unit: 'ml' },
      { name: 'Egg', quantity: 1, unit: 'pcs' },
    ],
    steps: [
      { stepNumber: 1, instruction: 'Make batter: mix flour, egg, ice water - don\'t overmix.', michelinNote: 'Lumpy is fine.' },
      { stepNumber: 2, instruction: 'Heat oil to 350F.', michelinNote: 'Tempura needs high heat.' },
      { stepNumber: 3, instruction: 'Dip items briefly in batter, fry until golden.', michelinNote: 'Don\'t crowd.' },
      { stepNumber: 4, instruction: 'Serve immediately with dipping sauce.', michelinNote: 'Light and crispy.' },
    ]
  },
  'ramen': {
    ingredients: [
      { name: 'Ramen noodles', quantity: 400, unit: 'g' },
      { name: 'Pork bones', quantity: 500, unit: 'g' },
      { name: 'Pork belly', quantity: 200, unit: 'g' },
      { name: 'Soft-boiled eggs', quantity: 4, unit: 'pcs' },
      { name: 'Green onions', quantity: 4, unit: 'stalks' },
      { name: 'Nori', quantity: 4, unit: 'pcs' },
    ],
    steps: [
      { stepNumber: 1, instruction: 'Make tonkotsu broth: boil bones 8 hours.', michelinNote: 'Vigorous boil emulsifies fat.' },
      { stepNumber: 2, instruction: 'Marinate eggs in soy mixture.', michelinNote: 'The soy eggs are key.' },
      { stepNumber: 3, instruction: 'Cook noodles according to package.', michelinNote: 'Don\'t overcook.' },
      { stepNumber: 4, instruction: 'Assemble: noodles, broth, chashu, egg, nori.', michelinNote: 'Serve immediately.' },
    ]
  },
  'katsu-curry': {
    ingredients: [
      { name: 'Pork cutlet', quantity: 2, unit: 'pcs' },
      { name: 'Japanese curry roux', quantity: 200, unit: 'g' },
      { name: 'Onion', quantity: 2, unit: 'medium' },
      { name: 'Carrots', quantity: 2, unit: 'medium' },
      { name: 'Potatoes', quantity: 2, unit: 'medium' },
      { name: 'Rice', quantity: 400, unit: 'g' },
    ],
    steps: [
      { stepNumber: 1, instruction: 'Cook pork cutlet: bread and fry until golden.', michelinNote: 'The katsu.' },
      { stepNumber: 2, instruction: 'Sauté vegetables, add water, simmer until soft.', michelinNote: 'The curry base.' },
      { stepNumber: 3, instruction: 'Add curry roux, stir until thickened.', michelinNote: 'Let it coat the spoon.' },
      { stepNumber: 4, instruction: 'Serve curry over rice with sliced katsu on top.', michelinNote: 'Classic Japanese comfort food.' },
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
