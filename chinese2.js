const { Client } = require('pg');
const client = new Client({ host: 'db.ycwbumsmlikiquplkdln.supabase.co', port: 5432, database: 'postgres', user: 'postgres', password: process.env.DBPASS });

const recipes = [
  { title: 'Fried Rice', slug: 'fried-rice', description: 'Classic Chinese fried rice', cuisine_id: '8232ae82-2fa2-4f95-a9f1-bc7ddd817d28' },
  { title: 'Chow Mein', slug: 'chow-mein', description: 'Stir-fried noodles', cuisine_id: '8232ae82-2fa2-4f95-a9f1-bc7ddd817d28' },
  { title: 'Kung Pao Chicken', slug: 'kung-pao-chicken', description: 'Spicy chicken with peanuts', cuisine_id: '8232ae82-2fa2-4f95-a9f1-bc7ddd817d28' },
  { title: 'General Tso Chicken', slug: 'general-tso-chicken', description: 'Crispy chicken in sauce', cuisine_id: '8232ae82-2fa2-4f95-a9f1-bc7ddd817d28' },
  { title: 'Egg Drop Soup', slug: 'egg-drop-soup', description: 'Chinese egg soup', cuisine_id: '8232ae82-2fa2-4f95-a9f1-bc7ddd817d28' },
  { title: 'Wonton Soup', slug: 'wonton-soup', description: 'Soup with dumplings', cuisine_id: '8232ae82-2fa2-4f95-a9f1-bc7ddd817d28' },
];

const RECIPES = {
  'fried-rice': {
    ingredients: [
      { name: 'Day-old rice', quantity: 400, unit: 'g' },
      { name: 'Eggs', quantity: 3, unit: 'pcs' },
      { name: 'Green peas', quantity: 100, unit: 'g' },
      { name: 'Soy sauce', quantity: 30, unit: 'ml' },
      { name: 'Sesame oil', quantity: 15, unit: 'ml' },
      { name: 'Green onions', quantity: 3, unit: 'stalks' },
    ],
    steps: [
      { stepNumber: 1, instruction: 'Beat eggs, scramble in hot wok.', michelinNote: 'Set aside.' },
      { stepNumber: 2, instruction: 'Add cold rice, press and stir to separate grains.', michelinNote: 'Cold rice works best.' },
      { stepNumber: 3, instruction: 'Add peas and egg. Season with soy sauce.', michelinNote: 'High heat.' },
      { stepNumber: 4, instruction: 'Finish with sesame oil and green onions.', michelinNote: 'Serve immediately.' },
    ]
  },
  'chow-mein': {
    ingredients: [
      { name: 'Egg noodles', quantity: 400, unit: 'g' },
      { name: 'Chicken', quantity: 300, unit: 'g' },
      { name: 'Cabbage', quantity: 200, unit: 'g' },
      { name: 'Celery', quantity: 2, unit: 'stalks' },
      { name: 'Soy sauce', quantity: 60, unit: 'ml' },
      { name: 'Oyster sauce', quantity: 30, unit: 'ml' },
    ],
    steps: [
      { stepNumber: 1, instruction: 'Cook noodles, drain.', michelinNote: 'Don\'t overcook.' },
      { stepNumber: 2, instruction: 'Stir-fry chicken, set aside.', michelinNote: 'Cook in batches.' },
      { stepNumber: 3, instruction: 'Stir-fry vegetables.', michelinNote: 'Keep crisp.' },
      { stepNumber: 4, instruction: 'Add noodles and sauce, toss.', michelinNote: 'High heat.' },
    ]
  },
  'kung-pao-chicken': {
    ingredients: [
      { name: 'Chicken breast', quantity: 400, unit: 'g' },
      { name: 'Dried chilies', quantity: 10, unit: 'pcs' },
      { name: 'Sichuan peppercorns', quantity: 1, unit: 'tbsp' },
      { name: 'Peanuts', quantity: 100, unit: 'g' },
      { name: 'Soy sauce', quantity: 30, unit: 'ml' },
      { name: 'Rice vinegar', quantity: 30, unit: 'ml' },
    ],
    steps: [
      { stepNumber: 1, instruction: 'Cut chicken into cubes.', michelinNote: 'Cornstarch helps coating.' },
      { stepNumber: 2, instruction: 'Fry chilies and peppercorns until fragrant.', michelinNote: 'Don\'t burn.' },
      { stepNumber: 3, instruction: 'Add chicken, stir-fry.', michelinNote: 'High heat.' },
      { stepNumber: 4, instruction: 'Add sauce, peanuts.', michelinNote: 'Serve over rice.' },
    ]
  },
  'general-tso-chicken': {
    ingredients: [
      { name: 'Chicken thighs', quantity: 500, unit: 'g' },
      { name: 'Flour', quantity: 150, unit: 'g' },
      { name: 'Soy sauce', quantity: 60, unit: 'ml' },
      { name: 'Rice vinegar', quantity: 30, unit: 'ml' },
      { name: 'Sugar', quantity: 60, unit: 'g' },
      { name: 'Garlic', quantity: 4, unit: 'cloves' },
    ],
    steps: [
      { stepNumber: 1, instruction: 'Cut chicken, coat in flour.', michelinNote: 'Deep fry until golden.' },
      { stepNumber: 2, instruction: 'Make sauce: soy, vinegar, sugar, garlic.', michelinNote: 'Simmer until thick.' },
      { stepNumber: 3, instruction: 'Toss chicken in sauce.', michelinNote: 'Crispy coating is key.' },
      { stepNumber: 4, instruction: 'Serve with broccoli and rice.', michelinNote: 'Garnish with sesame.' },
    ]
  },
  'egg-drop-soup': {
    ingredients: [
      { name: 'Chicken stock', quantity: 1000, unit: 'ml' },
      { name: 'Eggs', quantity: 3, unit: 'pcs' },
      { name: 'Cornstarch', quantity: 30, unit: 'g' },
      { name: 'Soy sauce', quantity: 15, unit: 'ml' },
      { name: 'Green onions', quantity: 2, unit: 'stalks' },
    ],
    steps: [
      { stepNumber: 1, instruction: 'Bring stock to boil.', michelinNote: 'Add soy.' },
      { stepNumber: 2, instruction: 'Mix cornstarch with water, add to soup.', michelinNote: 'Thickens the soup.' },
      { stepNumber: 3, instruction: 'Drizzle eggs while stirring.', michelinNote: 'Creates ribbons.' },
      { stepNumber: 4, instruction: 'Garnish with green onions.', michelinNote: 'Serve immediately.' },
    ]
  },
  'wonton-soup': {
    ingredients: [
      { name: 'Wonton wrappers', quantity: 50, unit: 'pcs' },
      { name: 'Ground pork', quantity: 300, unit: 'g' },
      { name: 'Chicken stock', quantity: 1500, unit: 'ml' },
      { name: 'Green onions', quantity: 4, unit: 'stalks' },
      { name: 'Soy sauce', quantity: 30, unit: 'ml' },
    ],
    steps: [
      { stepNumber: 1, instruction: 'Mix pork with soy and ginger for filling.', michelinNote: 'Season well.' },
      { stepNumber: 2, instruction: 'Fill and fold wontons.', michelinNote: 'Pleat the edges.' },
      { stepNumber: 3, instruction: 'Boil wontons in water until floating.', michelinNote: 'About 5 minutes.' },
      { stepNumber: 4, instruction: 'Serve in hot stock.', michelinNote: 'Garnish with green onions.' },
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
