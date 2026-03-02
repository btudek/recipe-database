const { Client } = require('pg');
const client = new Client({ host: 'db.ycwbumsmlikiquplkdln.supabase.co', port: 5432, database: 'postgres', user: 'postgres', password: process.env.DBPASS });

const recipes = [
  { title: 'Thai Green Curry', slug: 'thai-green-curry', description: 'Spicy Thai coconut curry with vegetables', cuisine_id: 'a3cb4471-db63-434e-a2e2-255242ffaca0' },
  { title: 'Pad Thai', slug: 'pad-thai', description: 'Thai stir-fried rice noodles', cuisine_id: 'a3cb4471-db63-434e-a2e2-255242ffaca0' },
  { title: 'Tom Kha Gai', slug: 'tom-kha-gai', description: 'Thai coconut chicken soup', cuisine_id: 'a3cb4471-db63-434e-a2e2-255242ffaca0' },
  { title: 'Massaman Curry', slug: 'massaman-curry', description: 'Thai Muslim curry with potatoes', cuisine_id: 'a3cb4471-db63-434e-a2e2-255242ffaca0' },
  { title: 'Laab', slug: 'laab', description: 'Thai minced meat salad', cuisine_id: 'a3cb4471-db63-434e-a2e2-255242ffaca0' },
  { title: 'Khao Soi', slug: 'khao-soi', description: 'Northern Thai curry noodles', cuisine_id: 'a3cb4471-db63-434e-a2e2-255242ffaca0' },
];

const RECIPES = {
  'thai-green-curry': {
    ingredients: [
      { name: 'Chicken thighs', quantity: 400, unit: 'g' },
      { name: 'Green curry paste', quantity: 60, unit: 'g' },
      { name: 'Coconut milk', quantity: 400, unit: 'ml' },
      { name: 'Thai basil', quantity: 30, unit: 'g' },
      { name: 'Bamboo shoots', quantity: 150, unit: 'g' },
      { name: 'Fish sauce', quantity: 30, unit: 'ml' },
      { name: 'Palm sugar', quantity: 20, unit: 'g' },
    ],
    steps: [
      { stepNumber: 1, instruction: 'Fry curry paste in coconut cream until fragrant.', michelinNote: 'The oil separates - that\'s when it\'s ready.' },
      { stepNumber: 2, instruction: 'Add chicken, stir-fry until sealed.', michelinNote: 'Sealing keeps meat juicy.' },
      { stepNumber: 3, instruction: 'Add coconut milk, bamboo shoots.', michelinNote: 'Simmer, don\'t boil vigorously.' },
      { stepNumber: 4, instruction: 'Season with fish sauce and palm sugar.', michelinNote: 'Balance salty, sweet, spicy.' },
      { stepNumber: 5, instruction: 'Finish with Thai basil.', michelinNote: 'Add at end to preserve flavor.' },
    ]
  },
  'pad-thai': {
    ingredients: [
      { name: 'Rice noodles', quantity: 300, unit: 'g' },
      { name: 'Shrimp', quantity: 200, unit: 'g' },
      { name: 'Eggs', quantity: 2, unit: 'pcs' },
      { name: 'Tofu', quantity: 150, unit: 'g' },
      { name: 'Bean sprouts', quantity: 100, unit: 'g' },
      { name: 'Tamarind paste', quantity: 60, unit: 'ml' },
      { name: 'Fish sauce', quantity: 45, unit: 'ml' },
      { name: 'Peanuts', quantity: 50, unit: 'g' },
    ],
    steps: [
      { stepNumber: 1, instruction: 'Soak rice noodles in warm water until pliable.', michelinNote: 'Don\'t over-soak or they\'ll get mushy.' },
      { stepNumber: 2, instruction: 'Make sauce: tamarind paste, fish sauce, sugar.', michelinNote: ' Taste and adjust.' },
      { stepNumber: 3, instruction: 'Stir-fry tofu until golden. Set aside.', michelinNote: 'Crispy tofu adds texture.' },
      { stepNumber: 4, instruction: 'Scramble eggs, add noodles and sauce.', michelinNote: 'High heat is essential.' },
      { stepNumber: 5, instruction: 'Add shrimp, tofu, bean sprouts. Toss.', michelinNote: 'Don\'t overcook shrimp.' },
    ]
  },
  'tom-kha-gai': {
    ingredients: [
      { name: 'Chicken breast', quantity: 300, unit: 'g' },
      { name: 'Coconut milk', quantity: 500, unit: 'ml' },
      { name: 'Galangal', quantity: 5, unit: 'slices' },
      { name: 'Lemongrass', quantity: 2, unit: 'stalks' },
      { name: 'Kaffir lime leaves', quantity: 4, unit: 'pcs' },
      { name: 'Mushrooms', quantity: 150, unit: 'g' },
      { name: 'Lime juice', quantity: 45, unit: 'ml' },
    ],
    steps: [
      { stepNumber: 1, instruction: 'Simmer coconut milk with galangal, lemongrass, lime leaves.', michelinNote: 'Let aromatics infuse.' },
      { stepNumber: 2, instruction: 'Add mushrooms, cook 5 minutes.', michelinNote: 'Don\'t overcook mushrooms.' },
      { stepNumber: 3, instruction: 'Add chicken, cook until done.', michelinNote: 'Don\'t overcook chicken.' },
      { stepNumber: 4, instruction: 'Remove from heat. Add lime juice and chili.', michelinNote: 'Lime juice loses freshness if boiled.' },
    ]
  },
  'massaman-curry': {
    ingredients: [
      { name: 'Beef chuck', quantity: 500, unit: 'g', notes: 'cubed' },
      { name: 'Massaman curry paste', quantity: 60, unit: 'g' },
      { name: 'Coconut milk', quantity: 400, unit: 'ml' },
      { name: 'Potatoes', quantity: 300, unit: 'g' },
      { name: 'Peanuts', quantity: 100, unit: 'g' },
      { name: 'Tamarind paste', quantity: 30, unit: 'ml' },
    ],
    steps: [
      { stepNumber: 1, instruction: 'Fry curry paste in coconut cream.', michelinNote: 'Toast the spices in the paste.' },
      { stepNumber: 2, instruction: 'Add beef, sear on all sides.', michelinNote: 'Browning adds depth.' },
      { stepNumber: 3, instruction: 'Add coconut milk, potatoes. Simmer 1 hour.', michelinNote: 'Low and slow makes meat tender.' },
      { stepNumber: 4, instruction: 'Add peanuts and tamarind. Cook 15 more minutes.', michelinNote: 'Finish with peanuts for crunch.' },
    ]
  },
  'laab': {
    ingredients: [
      { name: 'Ground pork', quantity: 400, unit: 'g' },
      { name: 'Mint', quantity: 30, unit: 'g' },
      { name: 'Cilantro', quantity: 30, unit: 'g' },
      { name: 'Lime juice', quantity: 60, unit: 'ml' },
      { name: 'Fish sauce', quantity: 30, unit: 'ml' },
      { name: 'Thai chilies', quantity: 5, unit: 'pcs' },
      { name: 'Rice powder', quantity: 30, unit: 'g' },
    ],
    steps: [
      { stepNumber: 1, instruction: 'Cook pork in pan without oil until done.', michelinNote: 'Dry cooking concentrates flavor.' },
      { stepNumber: 2, instruction: 'Remove from heat, add lime juice immediately.', michelinNote: 'The residual heat cooks the pork.' },
      { stepNumber: 3, instruction: 'Add fish sauce, chilies, mint, cilantro.', michelinNote: 'Fresh herbs are essential.' },
      { stepNumber: 4, instruction: 'Top with toasted rice powder.', michelinNote: 'Toasting rice adds nuttiness.' },
    ]
  },
  'khao-soi': {
    ingredients: [
      { name: 'Chicken thighs', quantity: 400, unit: 'g' },
      { name: 'Rice noodles', quantity: 300, unit: 'g' },
      { name: 'Coconut milk', quantity: 400, unit: 'ml' },
      { name: 'Khao soi paste', quantity: 60, unit: 'g' },
      { name: 'Chicken stock', quantity: 500, unit: 'ml' },
      { name: 'Pickled mustard greens', quantity: 100, unit: 'g' },
    ],
    steps: [
      { stepNumber: 1, instruction: 'Fry paste in coconut cream.', michelinNote: 'Toast the paste well.' },
      { stepNumber: 2, instruction: 'Add chicken, seal, then add stock and coconut milk.', michelinNote: 'Simmer until chicken is tender.' },
      { stepNumber: 3, instruction: 'Cook noodles separately.', michelinNote: 'Don\'t overcook - they go in last.' },
      { stepNumber: 4, instruction: 'Serve noodles topped with curry and toppings.', michelinNote: 'Crispy noodles add texture.' },
    ]
  },
};

async function main() {
  await client.connect();
  
  // Add recipes
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
  
  // Get recipe IDs
  const recipeResult = await client.query('SELECT id, slug FROM recipe');
  const recipeMap = {};
  recipeResult.rows.forEach(r => recipeMap[r.slug] = r.id);
  
  // Add ingredients and steps
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
