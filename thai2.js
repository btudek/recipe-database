const { Client } = require('pg');
const client = new Client({ host: 'db.ycwbumsmlikiquplkdln.supabase.co', port: 5432, database: 'postgres', user: 'postgres', password: process.env.DBPASS });

const recipes = [
  { title: 'Pad Thai', slug: 'pad-thai', description: 'Thai stir-fried noodles', cuisine_id: 'a3cb4471-db63-434e-a2e2-255242ffaca0' },
  { title: 'Green Curry', slug: 'green-curry', description: 'Thai coconut curry', cuisine_id: 'a3cb4471-db63-434e-a2e2-255242ffaca0' },
  { title: 'Drunken Noodles', slug: 'drunken-noodles', description: 'Thai stir-fried flat noodles', cuisine_id: 'a3cb4471-db63-434e-a2e2-255242ffaca0' },
  { title: 'Mango sticky rice', slug: 'mango-sticky-rice', description: 'Thai dessert', cuisine_id: 'a3cb4471-db63-434e-a2e2-255242ffaca0' },
  { title: 'Papaya Salad', slug: 'papaya-salad', description: 'Thai green papaya salad', cuisine_id: 'a3cb4471-db63-434e-a2e2-255242ffaca0' },
  { title: 'Crispy Pork Belly', slug: 'crispy-pork-belly', description: 'Thai roasted pork', cuisine_id: 'a3cb4471-db63-434e-a2e2-255242ffaca0' },
];

const RECIPES = {
  'pad-thai': {
    ingredients: [
      { name: 'Rice noodles', quantity: 300, unit: 'g' },
      { name: 'Shrimp', quantity: 200, unit: 'g' },
      { name: 'Eggs', quantity: 2, unit: 'pcs' },
      { name: 'Bean sprouts', quantity: 100, unit: 'g' },
      { name: 'Tamarind paste', quantity: 60, unit: 'ml' },
      { name: 'Fish sauce', quantity: 45, unit: 'ml' },
      { name: 'Peanuts', quantity: 50, unit: 'g' },
    ],
    steps: [
      { stepNumber: 1, instruction: 'Soak noodles in warm water until pliable.', michelinNote: 'Don\'t over-soak.' },
      { stepNumber: 2, instruction: 'Make sauce: tamarind, fish sauce, sugar.', michelinNote: 'Balance flavors.' },
      { stepNumber: 3, instruction: 'Stir-fry shrimp, set aside.', michelinNote: 'Cook in batches.' },
      { stepNumber: 4, instruction: 'Stir-fry noodles with sauce, add eggs.', michelinNote: 'High heat.' },
      { stepNumber: 5, instruction: 'Add shrimp, bean sprouts, peanuts.', michelinNote: 'Serve with lime.' },
    ]
  },
  'green-curry': {
    ingredients: [
      { name: 'Chicken', quantity: 400, unit: 'g' },
      { name: 'Green curry paste', quantity: 60, unit: 'g' },
      { name: 'Coconut milk', quantity: 400, unit: 'ml' },
      { name: 'Thai basil', quantity: 30, unit: 'g' },
      { name: 'Bamboo shoots', quantity: 150, unit: 'g' },
      { name: 'Fish sauce', quantity: 30, unit: 'ml' },
    ],
    steps: [
      { stepNumber: 1, instruction: 'Fry curry paste in coconut cream.', michelinNote: 'Until oil separates.' },
      { stepNumber: 2, instruction: 'Add chicken, seal.', michelinNote: 'Stir-fry until sealed.' },
      { stepNumber: 3, instruction: 'Add coconut milk, bamboo shoots.', michelinNote: 'Simmer.' },
      { stepNumber: 4, instruction: 'Season with fish sauce. Add basil.', michelinNote: 'Serve with rice.' },
    ]
  },
  'drunken-noodles': {
    ingredients: [
      { name: 'Flat rice noodles', quantity: 400, unit: 'g' },
      { name: 'Ground pork', quantity: 200, unit: 'g' },
      { name: 'Thai holy basil', quantity: 60, unit: 'g' },
      { name: 'Soy sauce', quantity: 45, unit: 'ml' },
      { name: 'Oyster sauce', quantity: 30, unit: 'ml' },
      { name: 'Thai chilies', quantity: 4, unit: 'pcs' },
    ],
    steps: [
      { stepNumber: 1, instruction: 'Stir-fry pork until crispy.', michelinNote: 'Crispy pork adds texture.' },
      { stepNumber: 2, instruction: 'Add noodles and sauces.', michelinNote: 'High heat.' },
      { stepNumber: 3, instruction: 'Add chilies and basil.', michelinNote: 'Toss quickly.' },
      { stepNumber: 4, instruction: 'Serve immediately.', michelinNote: 'Don\'t let sit.' },
    ]
  },
  'mango-sticky-rice': {
    ingredients: [
      { name: 'Sticky rice', quantity: 400, unit: 'g' },
      { name: 'Coconut milk', quantity: 400, unit: 'ml' },
      { name: 'Sugar', quantity: 100, unit: 'g' },
      { name: 'Ripe mango', quantity: 2, unit: 'pcs' },
      { name: 'Salt', quantity: 1, unit: 'tsp' },
    ],
    steps: [
      { stepNumber: 1, instruction: 'Soak sticky rice overnight.', michelinNote: 'Essential.' },
      { stepNumber: 2, instruction: 'Steam until translucent.', michelinNote: 'About 25 min.' },
      { stepNumber: 3, instruction: 'Heat coconut milk with sugar and salt.', michelinNote: 'Dissolve sugar.' },
      { stepNumber: 4, instruction: 'Mix hot coconut milk with rice. Rest 30 min.', michelinNote: 'Let absorb.' },
    ]
  },
  'papaya-salad': {
    ingredients: [
      { name: 'Green papaya', quantity: 1, unit: 'large' },
      { name: 'Tomatoes', quantity: 2, unit: 'medium' },
      { name: 'Green beans', quantity: 100, unit: 'g' },
      { name: 'Peanuts', quantity: 50, unit: 'g' },
      { name: 'Lime juice', quantity: 60, unit: 'ml' },
      { name: 'Fish sauce', quantity: 30, unit: 'ml' },
    ],
    steps: [
      { stepNumber: 1, instruction: 'Shred papaya finely.', michelinNote: 'The finer the better.' },
      { stepNumber: 2, instruction: 'Pound garlic and chilies in mortar.', michelinNote: 'The dressing.' },
      { stepNumber: 3, instruction: 'Add papaya, tomatoes, beans. Pound gently.', michelinNote: 'Mix but don\'t crush.' },
      { stepNumber: 4, instruction: 'Add fish sauce and lime. Top with peanuts.', michelinNote: 'Serve immediately.' },
    ]
  },
  'crispy-pork-belly': {
    ingredients: [
      { name: 'Pork belly', quantity: 750, unit: 'g' },
      { name: 'Rock sugar', quantity: 30, unit: 'g' },
      { name: 'Soy sauce', quantity: 60, unit: 'ml' },
      { name: 'Five spice', quantity: 1, unit: 'tsp' },
      { name: 'Garlic', quantity: 4, unit: 'cloves' },
    ],
    steps: [
      { stepNumber: 1, instruction: 'Score pork belly skin deeply.', michelinNote: 'This creates crispy skin.' },
      { stepNumber: 2, instruction: 'Rub with five spice, sugar, soy.', michelinNote: 'Marinate 2 hours.' },
      { stepNumber: 3, instruction: 'Roast at 400F for 30 min, then 350F for 1 hour.', michelinNote: 'Until skin is crackling.' },
      { stepNumber: 4, instruction: 'Rest 10 minutes, slice.', michelinNote: 'Serve with jasmine rice.' },
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
