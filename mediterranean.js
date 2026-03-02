const { Client } = require('pg');
const client = new Client({ host: 'db.ycwbumsmlikiquplkdln.supabase.co', port: 5432, database: 'postgres', user: 'postgres', password: process.env.DBPASS });

const recipes = [
  { title: 'Greek Salad', slug: 'greek-salad', description: 'Fresh Mediterranean salad with feta', cuisine_id: '2f76ffd5-3152-4ed6-bb2a-5d4b1c09b07b' },
  { title: 'Shakshuka', slug: 'shakshuka', description: 'Eggs poached in tomato sauce', cuisine_id: '2f76ffd5-3152-4ed6-bb2a-5d4b1c09b07b' },
  { title: 'Falafel', slug: 'falafel', description: 'Crispy chickpea fritters', cuisine_id: '2f76ffd5-3152-4ed6-bb2a-5d4b1c09b07b' },
  { title: 'Hummus', slug: 'hummus', description: 'Creamy chickpea dip', cuisine_id: '2f76ffd5-3152-4ed6-bb2a-5d4b1c09b07b' },
  { title: 'Dolmades', slug: 'dolmades', description: 'Stuffed grape leaves', cuisine_id: '2f76ffd5-3152-4ed6-bb2a-5d4b1c09b07b' },
  { title: 'Lamb Souvlaki', slug: 'lamb-souvlaki', description: 'Greek grilled lamb skewers', cuisine_id: '2f76ffd5-3152-4ed6-bb2a-5d4b1c09b07b' },
];

const RECIPES = {
  'greek-salad': {
    ingredients: [
      { name: 'Cucumber', quantity: 2, unit: 'medium' },
      { name: 'Tomatoes', quantity: 3, unit: 'medium' },
      { name: 'Red onion', quantity: 1, unit: 'medium' },
      { name: 'Feta cheese', quantity: 200, unit: 'g' },
      { name: 'Kalamata olives', quantity: 100, unit: 'g' },
      { name: 'Olive oil', quantity: 60, unit: 'ml' },
      { name: 'Red wine vinegar', quantity: 15, unit: 'ml' },
      { name: 'Oregano', quantity: 1, unit: 'tsp' },
    ],
    steps: [
      { stepNumber: 1, instruction: 'Chop cucumber and tomatoes into large chunks.', michelinNote: 'Rough chop is traditional.' },
      { stepNumber: 2, instruction: 'Slice red onion thinly.', michelinNote: 'Soaking in water reduces bite.' },
      { stepNumber: 3, instruction: 'Combine vegetables, olives, oregano.', michelinNote: 'Let sit to meld flavors.' },
      { stepNumber: 4, instruction: 'Top with block of feta. Drizzle oil and vinegar.', michelinNote: 'Serve immediately.' },
    ]
  },
  'shakshuka': {
    ingredients: [
      { name: 'Eggs', quantity: 4, unit: 'pcs' },
      { name: 'Canned tomatoes', quantity: 800, unit: 'g' },
      { name: 'Bell pepper', quantity: 1, unit: 'medium' },
      { name: 'Onion', quantity: 1, unit: 'medium' },
      { name: 'Cumin', quantity: 1, unit: 'tsp' },
      { name: 'Paprika', quantity: 1, unit: 'tsp' },
    ],
    steps: [
      { stepNumber: 1, instruction: 'Sauté onion and pepper until soft.', michelinNote: 'Cook until sweet.' },
      { stepNumber: 2, instruction: 'Add tomatoes, cumin, paprika. Simmer 10 minutes.', michelinNote: 'Let sauce thicken.' },
      { stepNumber: 3, instruction: 'Make wells, crack eggs into sauce.', michelinNote: 'Cover to steam eggs.' },
      { stepNumber: 4, instruction: 'Cook until whites set but yolks runny.', michelinNote: 'Serve in pan with crusty bread.' },
    ]
  },
  'falafel': {
    ingredients: [
      { name: 'Chickpeas', quantity: 400, unit: 'g', notes: 'dried, soaked overnight' },
      { name: 'Onion', quantity: 1, unit: 'medium' },
      { name: 'Garlic', quantity: 4, unit: 'cloves' },
      { name: 'Parsley', quantity: 60, unit: 'g' },
      { name: 'Cilantro', quantity: 30, unit: 'g' },
      { name: 'Cumin', quantity: 2, unit: 'tsp' },
      { name: 'Flour', quantity: 30, unit: 'g' },
    ],
    steps: [
      { stepNumber: 1, instruction: 'Blend chickpeas with herbs and spices - don\'t over-process.', michelinNote: 'Coarse texture is better.' },
      { stepNumber: 2, instruction: 'Rest mixture 30 minutes.', michelinNote: 'Lets flour absorb moisture.' },
      { stepNumber: 3, instruction: 'Form into small patties.', michelinNote: 'Slightly smaller than a golf ball.' },
      { stepNumber: 4, instruction: 'Fry at 350F until deep golden.', michelinNote: 'Double-fry for extra crispiness.' },
    ]
  },
  'hummus': {
    ingredients: [
      { name: 'Chickpeas', quantity: 400, unit: 'g', notes: 'canned, drained' },
      { name: 'Tahini', quantity: 120, unit: 'ml' },
      { name: 'Lemon juice', quantity: 60, unit: 'ml' },
      { name: 'Garlic', quantity: 2, unit: 'cloves' },
      { name: 'Olive oil', quantity: 60, unit: 'ml' },
      { name: 'Cumin', quantity: 1, unit: 'tsp' },
    ],
    steps: [
      { stepNumber: 1, instruction: 'Blend chickpeas with tahini until smooth.', michelinNote: 'Blend while tahini is at room temp.' },
      { stepNumber: 2, instruction: 'Add lemon juice, garlic, cumin.', michelinNote: 'Taste and adjust.' },
      { stepNumber: 3, instruction: 'Stream in olive oil while blending.', michelinNote: 'This makes it creamy.' },
      { stepNumber: 4, instruction: 'Serve with olive oil and paprika.', michelinNote: 'Great with pita.' },
    ]
  },
  'dolmades': {
    ingredients: [
      { name: 'Grape leaves', quantity: 40, unit: 'pcs' },
      { name: 'Rice', quantity: 200, unit: 'g' },
      { name: 'Lemon', quantity: 2, unit: 'pcs' },
      { name: 'Fresh dill', quantity: 60, unit: 'g' },
      { name: 'Olive oil', quantity: 120, unit: 'ml' },
      { name: 'Onion', quantity: 1, unit: 'medium' },
    ],
    steps: [
      { stepNumber: 1, instruction: 'Blanch grape leaves in boiling water 2 minutes.', michelinNote: 'Softens leaves, removes bitterness.' },
      { stepNumber: 2, instruction: 'Mix rice, dill, onion, lemon zest for filling.', michelinNote: 'Don\'t cook rice fully - it finishes in pot.' },
      { stepNumber: 3, instruction: 'Roll each leaf around filling.', michelinNote: 'Tight rolls are essential.' },
      { stepNumber: 4, instruction: 'Layer in pot, cover with lemon water and oil. Simmer 45 min.', michelinNote: 'Low heat prevents breaking.' },
    ]
  },
  'lamb-souvlaki': {
    ingredients: [
      { name: 'Lamb leg', quantity: 500, unit: 'g' },
      { name: 'Olive oil', quantity: 60, unit: 'ml' },
      { name: 'Lemon juice', quantity: 45, unit: 'ml' },
      { name: 'Garlic', quantity: 4, unit: 'cloves' },
      { name: 'Oregano', quantity: 2, unit: 'tbsp' },
      { name: 'Yogurt', quantity: 120, unit: 'ml' },
    ],
    steps: [
      { stepNumber: 1, instruction: 'Cut lamb into 1.5-inch cubes.', michelinNote: 'Uniform size ensures even cooking.' },
      { stepNumber: 2, instruction: 'Marinate in oil, lemon, garlic, oregano for 2 hours.', michelinNote: 'Yogurt tenderizes meat.' },
      { stepNumber: 3, instruction: 'Thread onto skewers.', michelinNote: 'Don\'t crowd - leaves space.' },
      { stepNumber: 4, instruction: 'Grill on high heat, turning often.', michelinNote: 'Medium-rare is ideal.' },
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
