const { Client } = require('pg');
const client = new Client({ host: 'db.ycwbumsmlikiquplkdln.supabase.co', port: 5432, database: 'postgres', user: 'postgres', password: process.env.DBPASS });

const recipes = [
  { title: 'Chicken Biryani', slug: 'chicken-biryani', description: 'Aromatic Indian rice dish', cuisine_id: 'fec72a8d-e056-400b-8370-f915b936317a' },
  { title: 'Lamb Curry', slug: 'lamb-curry', description: 'Spicy Indian lamb curry', cuisine_id: 'fec72a8d-e056-400b-8370-f915b936317a' },
  { title: 'Palak Paneer', slug: 'palak-paneer', description: 'Spinach and cheese curry', cuisine_id: 'fec72a8d-e056-400b-8370-f915b936317a' },
  { title: 'Samosa', slug: 'samosa', description: 'Crispy pastry with potatoes', cuisine_id: 'fec72a8d-e056-400b-8370-f915b936317a' },
  { title: 'Naan Bread', slug: 'naan-bread', description: 'Indian flatbread', cuisine_id: 'fec72a8d-e056-400b-8370-f915b936317a' },
  { title: 'Tandoori Chicken', slug: 'tandoori-chicken', description: 'Yogurt-marinated roasted chicken', cuisine_id: 'fec72a8d-e056-400b-8370-f915b936317a' },
];

const RECIPES = {
  'chicken-biryani': {
    ingredients: [
      { name: 'Chicken', quantity: 750, unit: 'g' },
      { name: 'Basmati rice', quantity: 500, unit: 'g' },
      { name: 'Yogurt', quantity: 200, unit: 'ml' },
      { name: 'Onions', quantity: 3, unit: 'medium' },
      { name: 'Biryani masala', quantity: 2, unit: 'tbsp' },
      { name: 'Saffron', quantity: 1, unit: 'pinch' },
      { name: 'Ghee', quantity: 100, unit: 'ml' },
    ],
    steps: [
      { stepNumber: 1, instruction: 'Marinate chicken in yogurt and spices for 2 hours.', michelinNote: 'Yogurt tenderizes meat.' },
      { stepNumber: 2, instruction: 'Fry onions until golden - this is birista.', michelinNote: 'Foundation of biryani flavor.' },
      { stepNumber: 3, instruction: 'Par-cook rice with whole spices.', michelinNote: '70% cooked.' },
      { stepNumber: 4, instruction: 'Layer chicken, rice, saffron milk, fried onions.', michelinNote: 'Seal pot tightly.' },
      { stepNumber: 5, instruction: 'Cook on low heat 45 minutes.', michelinNote: 'Don\'t open lid.' },
    ]
  },
  'lamb-curry': {
    ingredients: [
      { name: 'Lamb', quantity: 750, unit: 'g' },
      { name: 'Onions', quantity: 2, unit: 'medium' },
      { name: 'Tomatoes', quantity: 3, unit: 'medium' },
      { name: 'Ginger', quantity: 2, unit: 'tbsp' },
      { name: 'Garlic', quantity: 6, unit: 'cloves' },
      { name: 'Garam masala', quantity: 2, unit: 'tbsp' },
      { name: 'Ghee', quantity: 60, unit: 'ml' },
    ],
    steps: [
      { stepNumber: 1, instruction: 'Brown lamb in ghee.', michelinNote: 'Set aside.' },
      { stepNumber: 2, instruction: 'Sauté onion, ginger, garlic.', michelinNote: 'Cook until raw smell gone.' },
      { stepNumber: 3, instruction: 'Add tomatoes and spices. Cook down.', michelinNote: 'Until oil separates.' },
      { stepNumber: 4, instruction: 'Add lamb and water. Simmer 1 hour.', michelinNote: 'Until lamb is tender.' },
      { stepNumber: 5, instruction: 'Finish with garam masala.', michelinNote: 'Serve with rice or naan.' },
    ]
  },
  'palak-paneer': {
    ingredients: [
      { name: 'Paneer', quantity: 400, unit: 'g' },
      { name: 'Spinach', quantity: 500, unit: 'g' },
      { name: 'Onion', quantity: 1, unit: 'medium' },
      { name: 'Tomato', quantity: 2, unit: 'medium' },
      { name: 'Garlic', quantity: 4, unit: 'cloves' },
      { name: 'Garam masala', quantity: 1, unit: 'tsp' },
    ],
    steps: [
      { stepNumber: 1, instruction: 'Blanch spinach, ice bath.', michelinNote: 'Preserves green color.' },
      { stepNumber: 2, instruction: 'Blend spinach smooth.', michelinNote: 'Strain for smooth texture.' },
      { stepNumber: 3, instruction: 'Sauté onion, garlic, tomato.', michelinNote: 'Cook until soft.' },
      { stepNumber: 4, instruction: 'Add spinach, simmer 10 min.', michelinNote: 'Don\'t boil - turns gray.' },
      { stepNumber: 5, instruction: 'Add paneer, cook 5 min.', michelinNote: 'Serve with roti.' },
    ]
  },
  'naan-bread': {
    ingredients: [
      { name: 'Bread flour', quantity: 500, unit: 'g' },
      { name: 'Yogurt', quantity: 120, unit: 'ml' },
      { name: 'Milk', quantity: 120, unit: 'ml' },
      { name: 'Yeast', quantity: 7, unit: 'g' },
      { name: 'Sugar', quantity: 15, unit: 'g' },
      { name: 'Butter', quantity: 60, unit: 'g' },
    ],
    steps: [
      { stepNumber: 1, instruction: 'Activate yeast in warm milk with sugar.', michelinNote: 'Wait until foamy.' },
      { stepNumber: 2, instruction: 'Mix flour, yogurt, yeast. Knead 10 min.', michelinNote: 'Smooth dough.' },
      { stepNumber: 3, instruction: 'Rest 1 hour until doubled.', michelinNote: 'Warm place.' },
      { stepNumber: 4, instruction: 'Roll into ovals. Cook on very hot tandoor or pan.', michelinNote: 'High heat creates blisters.' },
      { stepNumber: 5, instruction: 'Brush with butter.', michelinNote: 'Serve hot.' },
    ]
  },
  'tandoori-chicken': {
    ingredients: [
      { name: 'Chicken', quantity: 1000, unit: 'g' },
      { name: 'Yogurt', quantity: 250, unit: 'ml' },
      { name: 'Ginger', quantity: 2, unit: 'tbsp' },
      { name: 'Garlic', quantity: 6, unit: 'cloves' },
      { name: 'Tandoori masala', quantity: 3, unit: 'tbsp' },
      { name: 'Lemon', quantity: 2, unit: 'pcs' },
    ],
    steps: [
      { stepNumber: 1, instruction: 'Marinate chicken in yogurt and spices overnight.', michelinNote: 'Longer is better.' },
      { stepNumber: 2, instruction: 'Thread onto skewers.', michelinNote: 'Leave space between pieces.' },
      { stepNumber: 3, instruction: 'Grill or bake at 450F for 25 minutes.', michelinNote: 'Flip halfway.' },
      { stepNumber: 4, instruction: 'Char slightly for smoky flavor.', michelinNote: 'Serve with mint chutney.' },
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
