const { Client } = require('pg');
const client = new Client({ host: 'db.ycwbumsmlikiquplkdln.supabase.co', port: 5432, database: 'postgres', user: 'postgres', password: process.env.DBPASS });

const recipes = [
  { title: 'Korean Fried Chicken', slug: 'korean-fried-chicken', description: 'Double-fried crispy Korean chicken', cuisine_id: 'a3cb4471-db63-434e-a2e2-255242ffaca0' },
  { title: 'Bibimbap', slug: 'bibimbap', description: 'Korean rice bowl with vegetables', cuisine_id: 'a3cb4471-db63-434e-a2e2-255242ffaca0' },
  { title: 'Kimchi Jjigae', slug: 'kimchi-jjigae', description: 'Korean kimchi stew', cuisine_id: 'a3cb4471-db63-434e-a2e2-255242ffaca0' },
  { title: ' Bulgogi', slug: 'bulgogi', description: 'Korean marinated grilled beef', cuisine_id: 'a3cb4471-db63-434e-a2e2-255242ffaca0' },
  { title: 'Samgyeopsal', slug: 'samgyeopsal', description: 'Korean grilled pork belly', cuisine_id: 'a3cb4471-db63-434e-a2e2-255242ffaca0' },
  { title: 'Tteokbokki', slug: 'tteokbokki', description: 'Korean spicy rice cakes', cuisine_id: 'a3cb4471-db63-434e-a2e2-255242ffaca0' },
];

const RECIPES = {
  'korean-fried-chicken': {
    ingredients: [
      { name: 'Chicken wings', quantity: 1000, unit: 'g' },
      { name: 'Potato starch', quantity: 150, unit: 'g' },
      { name: 'Soy sauce', quantity: 60, unit: 'ml' },
      { name: 'Gochujang', quantity: 60, unit: 'ml' },
      { name: 'Garlic', quantity: 4, unit: 'cloves' },
      { name: 'Ginger', quantity: 2, unit: 'tbsp' },
      { name: 'Sesame oil', quantity: 30, unit: 'ml' },
      { name: 'Honey', quantity: 60, unit: 'ml' },
    ],
    steps: [
      { stepNumber: 1, instruction: 'Double-fry chicken: first at 325F for 10 min, rest 10 min, then at 375F.', michelinNote: 'The double-fry is the secret to crunch.' },
      { stepNumber: 2, instruction: 'Make sauce: simmer soy sauce, gochujang, garlic, ginger, honey.', michelinNote: 'Let it reduce until sticky.' },
      { stepNumber: 3, instruction: 'Toss fried chicken in sauce.', michelinNote: 'Add sesame oil at the end.' },
    ]
  },
  'bibimbap': {
    ingredients: [
      { name: 'Short grain rice', quantity: 400, unit: 'g' },
      { name: 'Beef bulgogi', quantity: 200, unit: 'g' },
      { name: 'Spinach', quantity: 100, unit: 'g' },
      { name: 'Bean sprouts', quantity: 100, unit: 'g' },
      { name: 'Carrots', quantity: 1, unit: 'medium' },
      { name: 'Zucchini', quantity: 1, unit: 'medium' },
      { name: 'Egg', quantity: 1, unit: 'pcs' },
      { name: 'Gochujang', quantity: 30, unit: 'ml' },
    ],
    steps: [
      { stepNumber: 1, instruction: 'Cook rice. Prepare each vegetable separately.', michelinNote: 'Sauté each vegetable individually.' },
      { stepNumber: 2, instruction: 'Sear beef, slice thin.', michelinNote: 'Marinated beef is pre-cooked.' },
      { stepNumber: 3, instruction: 'Fry egg sunny-side up.', michelinNote: 'Runny yolk mixes into the bowl.' },
      { stepNumber: 4, instruction: 'Arrange rice in bowl, top with vegetables and meat in sections.', michelinNote: 'Beautiful arrangement is traditional.' },
      { stepNumber: 5, instruction: 'Serve with gochujang and sesame oil.', michelinNote: 'Mix everything before eating.' },
    ]
  },
  'kimchi-jjigae': {
    ingredients: [
      { name: 'Kimchi', quantity: 300, unit: 'g' },
      { name: 'Pork belly', quantity: 200, unit: 'g' },
      { name: 'Tofu', quantity: 200, unit: 'g' },
      { name: 'Gochujang', quantity: 30, unit: 'ml' },
      { name: 'Garlic', quantity: 4, unit: 'cloves' },
      { name: 'Green onions', quantity: 3, unit: 'stalks' },
    ],
    steps: [
      { stepNumber: 1, instruction: 'Sear pork belly in pot until crispy.', michelinNote: 'Render the fat for flavor.' },
      { stepNumber: 2, instruction: 'Add kimchi, garlic, gochujang. Stir-fry 3 minutes.', michelinNote: 'Let kimchi caramelize.' },
      { stepNumber: 3, instruction: 'Add water and tofu. Simmer 15 minutes.', michelinNote: 'Aged kimchi is best for this.' },
      { stepNumber: 4, instruction: 'Finish with green onions.', michelinNote: 'Serve bubbling hot.' },
    ]
  },
  'bulgogi': {
    ingredients: [
      { name: 'Beef ribeye', quantity: 500, unit: 'g' },
      { name: 'Soy sauce', quantity: 60, unit: 'ml' },
      { name: 'Sesame oil', quantity: 30, unit: 'ml' },
      { name: 'Sugar', quantity: 30, unit: 'g' },
      { name: 'Garlic', quantity: 4, unit: 'cloves' },
      { name: 'Pear', quantity: 1, unit: 'medium', notes: 'Asian pear' },
      { name: 'Green onions', quantity: 4, unit: 'stalks' },
    ],
    steps: [
      { stepNumber: 1, instruction: 'Slice beef very thin against the grain.', michelinNote: 'Freeze slightly for easier slicing.' },
      { stepNumber: 2, instruction: 'Blend pear, garlic, soy sauce for marinade.', michelinNote: 'Pear tenderizes the meat.' },
      { stepNumber: 3, instruction: 'Marinate 2 hours or overnight.', michelinNote: 'Longer is better.' },
      { stepNumber: 4, instruction: 'Grill or pan-fry quickly.', michelinNote: 'Don\'t overcook - it gets tough.' },
    ]
  },
  'samgyeopsal': {
    ingredients: [
      { name: 'Pork belly', quantity: 500, unit: 'g' },
      { name: 'Lettuce', quantity: 200, unit: 'g' },
      { name: 'Garlic', quantity: 1, unit: 'head' },
      { name: 'Ssamjang', quantity: 60, unit: 'ml' },
      { name: 'Sesame oil', quantity: 30, unit: 'ml' },
      { name: 'Green chilies', quantity: 4, unit: 'pcs' },
    ],
    steps: [
      { stepNumber: 1, instruction: 'Grill pork belly on both sides until crispy.', michelinNote: 'High heat renders fat.' },
      { stepNumber: 2, instruction: 'Cut garlic in half, grill until charred.', michelinNote: 'Grilled garlic is sweeter.' },
      { stepNumber: 3, instruction: 'Wrap meat, garlic, ssamjang in lettuce.', michelinNote: 'The wrap balances fat.' },
    ]
  },
  'tteokbokki': {
    ingredients: [
      { name: 'Rice cakes', quantity: 400, unit: 'g' },
      { name: 'Gochujang', quantity: 60, unit: 'ml' },
      { name: 'Gochugaru', quantity: 30, unit: 'ml' },
      { name: 'Fish cakes', quantity: 200, unit: 'g' },
      { name: 'Egg', quantity: 2, unit: 'pcs' },
      { name: 'Green onions', quantity: 3, unit: 'stalks' },
    ],
    steps: [
      { stepNumber: 1, instruction: 'Simmer water with gochujang and gochugaru.', michelinNote: 'Let the paste dissolve.' },
      { stepNumber: 2, instruction: 'Add rice cakes, simmer until软 (soft).', michelinNote: 'Stir occasionally to prevent sticking.' },
      { stepNumber: 3, instruction: 'Add fish cakes and eggs.', michelinNote: 'Eggs add creaminess.' },
      { stepNumber: 4, instruction: 'Finish with green onions.', michelinNote: 'Serve hot and gooey.' },
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
