const { Client } = require('pg');
const client = new Client({ host: 'db.ycwbumsmlikiquplkdln.supabase.co', port: 5432, database: 'postgres', user: 'postgres', password: process.env.DBPASS });

const RECIPES = {
  'salsa-verde': {
    ingredients: [
      { name: 'Tomatillos', quantity: 500, unit: 'g', notes: 'husked' },
      { name: 'Jalapeno', quantity: 2, unit: 'pcs' },
      { name: 'Onion', quantity: 0.5, unit: 'medium' },
      { name: 'Garlic', quantity: 3, unit: 'cloves' },
      { name: 'Cilantro', quantity: 1, unit: 'bunch' },
      { name: 'Lime juice', quantity: 30, unit: 'ml' },
    ],
    steps: [
      { stepNumber: 1, instruction: 'Roast tomatillos, jalapeño, and onion under broiler until charred.', michelinNote: 'Charred skins add smoky flavor.' },
      { stepNumber: 2, instruction: 'Blend all ingredients with garlic and cilantro.', michelinNote: 'Add lime juice to brighten flavors.' },
      { stepNumber: 3, instruction: 'Season with salt to taste.', michelinNote: 'Serve at room temperature.' },
    ]
  },
  'margarita': {
    ingredients: [
      { name: 'Tequila', quantity: 60, unit: 'ml' },
      { name: 'Triple sec', quantity: 30, unit: 'ml' },
      { name: 'Lime juice', quantity: 30, unit: 'ml' },
      { name: 'Lime wheel', quantity: 1, unit: 'pcs', notes: 'for garnish' },
      { name: 'Salt', quantity: 1, unit: 'pinch', notes: 'for rim' },
    ],
    steps: [
      { stepNumber: 1, instruction: 'Run lime wedge around rim of glass. Dip in salt.', michelinNote: 'Only a light coating of salt is needed.' },
      { stepNumber: 2, instruction: 'Shake tequila, triple sec, and lime juice with ice.', michelinNote: 'Shaking chills and dilutes properly.' },
      { stepNumber: 3, instruction: 'Strain into glass over ice. Garnish with lime wheel.', michelinNote: 'Fresh lime juice makes all the difference.' },
    ]
  },
  'blt-sandwich': {
    ingredients: [
      { name: 'Bacon', quantity: 6, unit: 'strips' },
      { name: 'Bread', quantity: 3, unit: 'slices' },
      { name: 'Lettuce', quantity: 2, unit: 'leaves' },
      { name: 'Tomato', quantity: 1, unit: 'medium' },
      { name: 'Mayonnaise', quantity: 2, unit: 'tbsp' },
    ],
    steps: [
      { stepNumber: 1, instruction: 'Cook bacon until crispy.', michelinNote: 'Crispy bacon has better texture.' },
      { stepNumber: 2, instruction: 'Toast bread.', michelinNote: 'Toasted bread holds up to the filling.' },
      { stepNumber: 3, instruction: 'Assemble: mayo, lettuce, tomato, bacon.', michelinNote: 'Season with pepper.' },
    ]
  },
  'pasta-salad': {
    ingredients: [
      { name: 'Pasta', quantity: 400, unit: 'g', notes: 'penne or rotini' },
      { name: 'Cherry tomatoes', quantity: 200, unit: 'g', notes: 'halved' },
      { name: 'Mozzarella', quantity: 200, unit: 'g', notes: 'cubed' },
      { name: 'Olives', quantity: 100, unit: 'g' },
      { name: 'Italian dressing', quantity: 120, unit: 'ml' },
    ],
    steps: [
      { stepNumber: 1, instruction: 'Cook pasta until al dente. Drain and cool.', michelinNote: 'Rinse with cold water to stop cooking.' },
      { stepNumber: 2, instruction: 'Toss with tomatoes, mozzarella, and olives.', michelinNote: 'Add dressing while pasta is still slightly warm.' },
      { stepNumber: 3, instruction: 'Refrigerate for at least 1 hour before serving.', michelinNote: 'Overnight is even better.' },
    ]
  },
  'tuna-salad': {
    ingredients: [
      { name: 'Canned tuna', quantity: 400, unit: 'g', notes: 'drained' },
      { name: 'Mayonnaise', quantity: 60, unit: 'ml' },
      { name: 'Celery', quantity: 2, unit: 'stalks', notes: 'diced' },
      { name: 'Red onion', quantity: 0.25, unit: 'cup', notes: 'minced' },
      { name: 'Lemon juice', quantity: 15, unit: 'ml' },
    ],
    steps: [
      { stepNumber: 1, instruction: 'Flake tuna into a bowl.', michelinNote: 'Break apart any large chunks.' },
      { stepNumber: 2, instruction: 'Mix with mayo, celery, onion, and lemon juice.', michelinNote: 'Season with salt and pepper.' },
      { stepNumber: 3, instruction: 'Serve on bread or with crackers.', michelinNote: 'Best after chilling 30 minutes.' },
    ]
  },
  'oatmeal': {
    ingredients: [
      { name: 'Rolled oats', quantity: 100, unit: 'g' },
      { name: 'Milk or water', quantity: 300, unit: 'ml' },
      { name: 'Banana', quantity: 1, unit: 'pcs', notes: 'sliced' },
      { name: 'Berries', quantity: 100, unit: 'g' },
      { name: 'Honey', quantity: 2, unit: 'tbsp' },
    ],
    steps: [
      { stepNumber: 1, instruction: 'Bring milk to simmer. Add oats.', michelinNote: 'Use more liquid for creamier oatmeal.' },
      { stepNumber: 2, instruction: 'Cook 5 minutes, stirring occasionally.', michelinNote: 'Stirring prevents sticking.' },
      { stepNumber: 3, instruction: 'Top with banana, berries, and honey.', michelinNote: 'Fresh fruit adds brightness.' },
    ]
  },
  'smoothie-bowl': {
    ingredients: [
      { name: 'Frozen mango', quantity: 200, unit: 'g' },
      { name: 'Frozen pineapple', quantity: 100, unit: 'g' },
      { name: 'Banana', quantity: 1, unit: 'pcs', notes: 'frozen' },
      { name: 'Coconut milk', quantity: 100, unit: 'ml' },
      { name: 'Granola', quantity: 50, unit: 'g' },
      { name: 'Chia seeds', quantity: 1, unit: 'tbsp' },
    ],
    steps: [
      { stepNumber: 1, instruction: 'Blend frozen fruit with coconut milk until thick.', michelinNote: 'Use less liquid for thicker consistency.' },
      { stepNumber: 2, instruction: 'Pour into bowl.', michelinNote: 'Use a rounded bowl for presentation.' },
      { stepNumber: 3, instruction: 'Top with granola, chia seeds, and fresh fruit.', michelinNote: 'Add toppings right before eating.' },
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
