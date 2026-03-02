const { Client } = require('pg');
const client = new Client({ host: 'db.ycwbumsmlikiquplkdln.supabase.co', port: 5432, database: 'postgres', user: 'postgres', password: process.env.DBPASS });

const recipes = [
  { title: 'Chicken Tikka Masala', slug: 'chicken-tikka-masala', description: 'Creamy Indian tomato curry with spiced chicken', cuisine_id: 'fec72a8d-e056-400b-8370-f915b936317a' },
  { title: 'Butter Chicken', slug: 'butter-chicken', description: 'Rich and creamy tomato-based curry', cuisine_id: 'fec72a8d-e056-400b-8370-f915b936317a' },
  { title: 'Palak Paneer', slug: 'palak-paneer', description: 'Spinach curry with cottage cheese', cuisine_id: 'fec72a8d-e056-400b-8370-f915b936317a' },
  { title: 'Samosa', slug: 'samosa', description: 'Crispy pastry with spiced potatoes', cuisine_id: 'fec72a8d-e056-400b-8370-f915b936317a' },
  { title: 'Biryani', slug: 'biryani', description: 'Aromatic layered rice with meat', cuisine_id: 'fec72a8d-e056-400b-8370-f915b936317a' },
  { title: 'Dal Makhani', slug: 'dal-makhani', description: 'Creamy black lentil curry', cuisine_id: 'fec72a8d-e056-400b-8370-f915b936317a' },
];

const RECIPES = {
  'chicken-tikka-masala': {
    ingredients: [
      { name: 'Chicken breast', quantity: 600, unit: 'g', notes: 'cubed' },
      { name: 'Yogurt', quantity: 200, unit: 'ml' },
      { name: 'Tomato puree', quantity: 400, unit: 'g' },
      { name: 'Heavy cream', quantity: 200, unit: 'ml' },
      { name: 'Garam masala', quantity: 2, unit: 'tbsp' },
      { name: 'Garlic', quantity: 4, unit: 'cloves' },
      { name: 'Ginger', quantity: 2, unit: 'tbsp' },
    ],
    steps: [
      { stepNumber: 1, instruction: 'Marinate chicken in yogurt and spices for 2 hours.', michelinNote: 'Yogurt tenderizes the chicken.' },
      { stepNumber: 2, instruction: 'Grill or broil chicken until charred.', michelinNote: 'Char marks add smoky flavor.' },
      { stepNumber: 3, instruction: 'Sauté garlic, ginger, then add tomato puree.', michelinNote: 'Cook out raw tomato taste.' },
      { stepNumber: 4, instruction: 'Add cream and garam masala. Simmer 15 minutes.', michelinNote: 'Low heat prevents curdling.' },
      { stepNumber: 5, instruction: 'Add chicken, simmer 10 more minutes.', michelinNote: 'Serve with naan or rice.' },
    ]
  },
  'butter-chicken': {
    ingredients: [
      { name: 'Chicken thighs', quantity: 500, unit: 'g' },
      { name: 'Butter', quantity: 100, unit: 'g' },
      { name: 'Tomato puree', quantity: 400, unit: 'g' },
      { name: 'Heavy cream', quantity: 250, unit: 'ml' },
      { name: 'Kashmiri chili powder', quantity: 2, unit: 'tbsp' },
      { name: 'Garam masala', quantity: 1, unit: 'tbsp' },
      { name: 'Fenugreek leaves', quantity: 1, unit: 'tbsp' },
    ],
    steps: [
      { stepNumber: 1, instruction: 'Marinate and cook chicken like tikka.', michelinNote: 'Same technique as tikka.' },
      { stepNumber: 2, instruction: 'Melt butter, sauté ginger-garlic paste.', michelinNote: 'Don\'t burn the butter.' },
      { stepNumber: 3, instruction: 'Add tomato puree and spices. Simmer 20 minutes.', michelinNote: 'The sauce should be thick.' },
      { stepNumber: 4, instruction: 'Add cream and fenugreek.', michelinNote: 'Fenugreek is the secret ingredient.' },
      { stepNumber: 5, instruction: 'Add chicken, simmer until coated.', michelinNote: 'Finish with extra butter.' },
    ]
  },
  'palak-paneer': {
    ingredients: [
      { name: 'Paneer', quantity: 400, unit: 'g' },
      { name: 'Spinach', quantity: 500, unit: 'g' },
      { name: 'Onion', quantity: 2, unit: 'medium' },
      { name: 'Tomato', quantity: 2, unit: 'medium' },
      { name: 'Garlic', quantity: 4, unit: 'cloves' },
      { name: 'Garam masala', quantity: 1, unit: 'tsp' },
    ],
    steps: [
      { stepNumber: 1, instruction: 'Blanch spinach in boiling water for 2 minutes.', michelinNote: 'Immediately ice bath preserves color.' },
      { stepNumber: 2, instruction: 'Blend spinach into smooth puree.', michelinNote: 'Strain for smoother texture.' },
      { stepNumber: 3, instruction: 'Sauté onion, garlic, tomato.', michelinNote: 'Cook until tomatoes break down.' },
      { stepNumber: 4, instruction: 'Add spinach puree, simmer 10 minutes.', michelinNote: 'Don\'t boil - turns gray.' },
      { stepNumber: 5, instruction: 'Add paneer, cook 5 minutes. Finish with garam masala.', michelinNote: 'Cube paneer evenly.' },
    ]
  },
  'samosa': {
    ingredients: [
      { name: 'Flour', quantity: 300, unit: 'g' },
      { name: 'Potatoes', quantity: 400, unit: 'g' },
      { name: 'Peas', quantity: 100, unit: 'g' },
      { name: 'Cumin seeds', quantity: 2, unit: 'tsp' },
      { name: 'Ginger', quantity: 1, unit: 'tbsp' },
      { name: 'Green chili', quantity: 2, unit: 'pcs' },
      { name: 'Oil', quantity: 60, unit: 'ml' },
    ],
    steps: [
      { stepNumber: 1, instruction: 'Make dough: flour, salt, oil, water. Rest 30 minutes.', michelinNote: 'Resting makes it flaky.' },
      { stepNumber: 2, instruction: 'Boil potatoes, mash with peas and spices.', michelinNote: 'Don\'t make it too wet.' },
      { stepNumber: 3, instruction: 'Roll dough into ovals, fill with potato mixture.', michelinNote: 'Seal edges with water.' },
      { stepNumber: 4, instruction: 'Fry at 350F until golden brown.', michelinNote: 'Low heat ensures inside cooks.' },
    ]
  },
  'biryani': {
    ingredients: [
      { name: 'Basmati rice', quantity: 500, unit: 'g' },
      { name: 'Lamb', quantity: 600, unit: 'g' },
      { name: 'Yogurt', quantity: 200, unit: 'ml' },
      { name: 'Onions', quantity: 3, unit: 'medium' },
      { name: 'Biryani masala', quantity: 2, unit: 'tbsp' },
      { name: 'Saffron', quantity: 1, unit: 'pinch' },
      { name: 'Ghee', quantity: 100, unit: 'ml' },
    ],
    steps: [
      { stepNumber: 1, instruction: 'Marinate lamb in yogurt and spices for 2 hours.', michelinNote: 'Yogurt tenderizes meat.' },
      { stepNumber: 2, instruction: 'Fry onions until golden - this is the birista.', michelinNote: 'The foundation of biryani flavor.' },
      { stepNumber: 3, instruction: 'Par-cook rice with whole spices.', michelinNote: '70% cooked - it finishes in pot.' },
      { stepNumber: 4, instruction: 'Layer: meat, rice, saffron milk, fried onions.', michelinNote: 'Seal pot with dough or foil.' },
      { stepNumber: 5, instruction: 'Cook on low heat for 45 minutes.', michelinNote: 'Dum cooking - don\'t open lid.' },
    ]
  },
  'dal-makhani': {
    ingredients: [
      { name: 'Black lentils', quantity: 300, unit: 'g' },
      { name: 'Kidney beans', quantity: 100, unit: 'g' },
      { name: 'Tomato puree', quantity: 200, unit: 'g' },
      { name: 'Cream', quantity: 120, unit: 'ml' },
      { name: 'Butter', quantity: 60, unit: 'g' },
      { name: 'Garam masala', quantity: 1, unit: 'tbsp' },
    ],
    steps: [
      { stepNumber: 1, instruction: 'Soak lentils overnight. Boil until soft.', michelinNote: 'This takes time - about 1 hour.' },
      { stepNumber: 2, instruction: 'Add tomato puree, butter, spices. Simmer.', michelinNote: 'The longer you cook, the better.' },
      { stepNumber: 3, instruction: 'Mash some lentils for creaminess.', michelinNote: 'Use immersion blender.' },
      { stepNumber: 4, instruction: 'Finish with cream and garam masala.', michelinNote: 'Serve with jeera rice.' },
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
