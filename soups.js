const { Client } = require('pg');
const client = new Client({ host: 'db.ycwbumsmlikiquplkdln.supabase.co', port: 5432, database: 'postgres', user: 'postgres', password: process.env.DBPASS });

const RECIPES = {
  'bbq-ribs': {
    ingredients: [
      { name: 'Pork ribs', quantity: 2000, unit: 'g', notes: 'full rack' },
      { name: 'Brown sugar', quantity: 100, unit: 'g' },
      { name: 'Paprika', quantity: 3, unit: 'tbsp' },
      { name: 'Garlic powder', quantity: 2, unit: 'tbsp' },
      { name: 'Onion powder', quantity: 2, unit: 'tbsp' },
      { name: 'Cayenne pepper', quantity: 1, unit: 'tbsp' },
      { name: 'Apple cider vinegar', quantity: 120, unit: 'ml' },
      { name: 'BBQ sauce', quantity: 240, unit: 'ml' },
    ],
    steps: [
      { stepNumber: 1, instruction: 'Remove membrane from back of ribs.', michelinNote: 'This makes ribs more tender.' },
      { stepNumber: 2, instruction: 'Mix all dry ingredients for rub. Coat ribs generously.', michelinNote: 'Apply rub the night before for best flavor.' },
      { stepNumber: 3, instruction: 'Wrap in foil, refrigerate for at least 4 hours or overnight.', michelinNote: 'Longer = more flavor.' },
      { stepNumber: 4, instruction: 'Bake at 250F wrapped in foil for 3 hours.', michelinNote: 'Low and slow breaks down connective tissue.' },
      { stepNumber: 5, instruction: 'Unwrap, brush with BBQ sauce, broil 5 min until caramelized.', michelinNote: 'Watch carefully to prevent burning.' },
    ]
  },
  'club-sandwich': {
    ingredients: [
      { name: 'Bread', quantity: 6, unit: 'slices', notes: 'toasted' },
      { name: 'Turkey breast', quantity: 200, unit: 'g', notes: 'sliced' },
      { name: 'Bacon', quantity: 6, unit: 'strips' },
      { name: 'Lettuce', quantity: 4, unit: 'leaves' },
      { name: 'Tomato', quantity: 1, unit: 'medium' },
      { name: 'Mayonnaise', quantity: 3, unit: 'tbsp' },
    ],
    steps: [
      { stepNumber: 1, instruction: 'Toast bread. Cook bacon until crispy.', michelinNote: 'Crispy bacon adds texture.' },
      { stepNumber: 2, instruction: 'Spread mayo on all slices.', michelinNote: 'This prevents sogginess.' },
      { stepNumber: 3, instruction: 'Layer: turkey, bacon, lettuce, tomato between three slices.', michelinNote: 'Center slice separates layers.' },
      { stepNumber: 4, instruction: 'Cut diagonally and secure with toothpicks.', michelinNote: 'Diagonal cut looks more appetizing.' },
    ]
  },
  'gazpacho': {
    ingredients: [
      { name: 'Tomatoes', quantity: 800, unit: 'g', notes: 'ripe' },
      { name: 'Cucumber', quantity: 1, unit: 'medium' },
      { name: 'Red pepper', quantity: 1, unit: 'medium' },
      { name: 'Garlic', quantity: 2, unit: 'cloves' },
      { name: 'Sherry vinegar', quantity: 30, unit: 'ml' },
      { name: 'Olive oil', quantity: 60, unit: 'ml' },
    ],
    steps: [
      { stepNumber: 1, instruction: 'Core tomatoes. Chop all vegetables roughly.', michelinNote: 'Rough chop is fine - blending does the rest.' },
      { stepNumber: 2, instruction: 'Blend tomatoes, cucumber, pepper, garlic until smooth.', michelinNote: 'Strain for smoother texture.' },
      { stepNumber: 3, instruction: 'Stream in olive oil while blending.', michelinNote: 'This creates silky texture.' },
      { stepNumber: 4, instruction: 'Add vinegar, salt, pepper. Chill for at least 2 hours.', michelinNote: 'Cold soup tastes better.' },
      { stepNumber: 5, instruction: 'Serve with diced vegetables on top.', michelinNote: 'Garnish adds texture.' },
    ]
  },
  'chicken-noodle-soup': {
    ingredients: [
      { name: 'Whole chicken', quantity: 1500, unit: 'g' },
      { name: 'Egg noodles', quantity: 300, unit: 'g' },
      { name: 'Carrots', quantity: 3, unit: 'medium' },
      { name: 'Celery', quantity: 3, unit: 'stalks' },
      { name: 'Onion', quantity: 1, unit: 'large' },
      { name: 'Garlic', quantity: 4, unit: 'cloves' },
      { name: 'Chicken stock', quantity: 2000, unit: 'ml' },
      { name: 'Fresh thyme', quantity: 4, unit: 'sprigs' },
    ],
    steps: [
      { stepNumber: 1, instruction: 'Simmer chicken in stock with aromatics until cooked, about 45 minutes.', michelinNote: 'Whole chicken gives best flavor.' },
      { stepNumber: 2, instruction: 'Remove chicken. Strain stock. Shred meat from bones.', michelinNote: 'Save the meat for the soup.' },
      { stepNumber: 3, instruction: 'Sauté onion, carrots, celery until softened.', michelinNote: 'This builds the flavor base.' },
      { stepNumber: 4, instruction: 'Add stock and noodles. Cook until noodles are tender.', michelinNote: 'Add noodles last - they cook fast.' },
      { stepNumber: 5, instruction: 'Return chicken to pot. Season and serve.', michelinNote: 'Fresh parsley brightens the soup.' },
    ]
  },
  'minestrone': {
    ingredients: [
      { name: 'Cannellini beans', quantity: 400, unit: 'g', notes: 'canned, drained' },
      { name: 'Zucchini', quantity: 2, unit: 'medium' },
      { name: 'Carrots', quantity: 2, unit: 'medium' },
      { name: 'Celery', quantity: 2, unit: 'stalks' },
      { name: 'Onion', quantity: 1, unit: 'large' },
      { name: 'Tomatoes', quantity: 400, unit: 'g', notes: 'crushed' },
      { name: 'Pasta', quantity: 100, unit: 'g', notes: 'small like ditalini' },
      { name: 'Kale', quantity: 100, unit: 'g' },
    ],
    steps: [
      { stepNumber: 1, instruction: 'Sauté soffritto: onion, carrots, celery in olive oil until soft.', michelinNote: 'The flavor foundation of the soup.' },
      { stepNumber: 2, instruction: 'Add tomatoes and stock. Simmer 20 minutes.', michelinNote: 'Let flavors meld.' },
      { stepNumber: 3, instruction: 'Add beans and zucchini. Cook 10 minutes.', michelinNote: 'Don\'t overcook vegetables.' },
      { stepNumber: 4, instruction: 'Add pasta and kale. Cook until pasta is tender.', michelinNote: 'Add pasta last so it doesn\'t get mushy.' },
      { stepNumber: 5, instruction: 'Serve with parmesan and crusty bread.', michelinNote: 'A drizzle of olive oil on top is traditional.' },
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
