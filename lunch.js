const { Client } = require('pg');
const client = new Client({ host: 'db.ycwbumsmlikiquplkdln.supabase.co', port: 5432, database: 'postgres', user: 'postgres', password: process.env.DBPASS });

const RECIPES = {
  'greek-salad': {
    ingredients: [
      { name: 'Cucumber', quantity: 1, unit: 'large', notes: 'diced' },
      { name: 'Tomatoes', quantity: 3, unit: 'medium', notes: 'chunked' },
      { name: 'Red onion', quantity: 0.5, unit: 'medium', notes: 'sliced' },
      { name: 'Kalamata olives', quantity: 100, unit: 'g' },
      { name: 'Feta cheese', quantity: 150, unit: 'g', notes: 'cubed' },
      { name: 'Olive oil', quantity: 60, unit: 'ml' },
      { name: 'Red wine vinegar', quantity: 15, unit: 'ml' },
      { name: 'Dried oregano', quantity: 1, unit: 'tsp' },
    ],
    steps: [
      { stepNumber: 1, instruction: 'Cut cucumber and tomatoes into large chunks.', michelinNote: 'Don\'t cut too small - it releases less water.' },
      { stepNumber: 2, instruction: 'Slice red onion into thin rings.', michelinNote: 'Soaking in cold water 30 min mellows the bite.' },
      { stepNumber: 3, instruction: 'Combine vegetables with olives and feta.', michelinNote: 'Gentle toss prevents feta from crumbling.' },
      { stepNumber: 4, instruction: 'Whisk olive oil, vinegar, and oregano. Dress salad.', michelinNote: 'Dress just before serving.' },
    ]
  },
  'cobb-salad': {
    ingredients: [
      { name: 'Romaine lettuce', quantity: 1, unit: 'head', notes: 'chopped' },
      { name: 'Chicken breast', quantity: 300, unit: 'g', notes: 'grilled and sliced' },
      { name: 'Bacon', quantity: 150, unit: 'g', notes: 'cooked and crumbled' },
      { name: 'Hard-boiled eggs', quantity: 4, unit: 'pcs' },
      { name: 'Avocado', quantity: 2, unit: 'pcs' },
      { name: 'Blue cheese', quantity: 100, unit: 'g', notes: 'crumbled' },
      { name: 'Cherry tomatoes', quantity: 200, unit: 'g', notes: 'halved' },
    ],
    steps: [
      { stepNumber: 1, instruction: 'Arrange lettuce in a bowl or on platter.', michelinNote: 'Green base looks beautiful.' },
      { stepNumber: 2, instruction: 'Arrange toppings in rows on top: chicken, bacon, eggs, avocado, cheese, tomatoes.', michelinNote: 'The striped pattern is classic.' },
      { stepNumber: 3, instruction: 'Serve with ranch or blue cheese dressing on the side.', michelinNote: 'Dress at the table.' },
    ]
  },
  'caesar-salad': {
    ingredients: [
      { name: 'Romaine lettuce', quantity: 2, unit: 'heads' },
      { name: 'Parmesan', quantity: 80, unit: 'g', notes: 'shaved' },
      { name: 'Bread', quantity: 4, unit: 'slices', notes: 'for croutons' },
      { name: 'Garlic', quantity: 3, unit: 'cloves' },
      { name: 'Anchovy fillets', quantity: 4, unit: 'pcs' },
      { name: 'Lemon juice', quantity: 45, unit: 'ml' },
      { name: 'Olive oil', quantity: 120, unit: 'ml' },
      { name: 'Egg yolk', quantity: 1, unit: 'pcs' },
    ],
    steps: [
      { stepNumber: 1, instruction: 'Make croutons: toss bread with olive oil and garlic, bake at 375F until golden.', michelinNote: 'Homemade croutons are far superior.' },
      { stepNumber: 2, instruction: 'Blend anchovies, garlic, egg yolk, lemon juice, and olive oil for dressing.', michelinNote: 'The classic dressing is raw egg - use fresh eggs.' },
      { stepNumber: 3, instruction: 'Toss lettuce with dressing.', michelinNote: 'Add parmesan and croutons.' },
      { stepNumber: 4, instruction: 'Top with extra parmesan and black pepper.', michelinNote: 'Fresh cracked pepper is essential.' },
    ]
  },
  'omelette': {
    ingredients: [
      { name: 'Eggs', quantity: 3, unit: 'pcs' },
      { name: 'Butter', quantity: 15, unit: 'g' },
      { name: 'Cheese', quantity: 50, unit: 'g', notes: 'grated' },
      { name: 'Fillings', quantity: 50, unit: 'g', notes: 'ham, mushrooms, peppers' },
    ],
    steps: [
      { stepNumber: 1, instruction: 'Beat eggs with salt and pepper.', michelinNote: 'Don\'t overbeat - introduce some air but not too much.' },
      { stepNumber: 2, instruction: 'Heat butter in non-stick pan over medium-high heat.', michelinNote: 'Hot pan ensures eggs don\'t stick.' },
      { stepNumber: 3, instruction: 'Pour eggs, let set 30 seconds. Lift edges, tilt pan to let uncooked egg flow underneath.', michelinNote: 'This creates even cooking.' },
      { stepNumber: 4, instruction: 'Add fillings and cheese to one half. Fold and serve.', michelinNote: 'Fold gently to avoid breaking.' },
    ]
  },
  'acai-bowl': {
    ingredients: [
      { name: 'Frozen acai packet', quantity: 2, unit: 'pcs' },
      { name: 'Frozen banana', quantity: 1, unit: 'pcs' },
      { name: 'Almond milk', quantity: 60, unit: 'ml' },
      { name: 'Granola', quantity: 50, unit: 'g' },
      { name: 'Mixed berries', quantity: 100, unit: 'g' },
      { name: 'Honey', quantity: 1, unit: 'tbsp' },
      { name: 'Coconut flakes', quantity: 1, unit: 'tbsp' },
    ],
    steps: [
      { stepNumber: 1, instruction: 'Blend acai, frozen banana, and almond milk until thick.', michelinNote: 'Don\'t add too much liquid - should be thick like soft serve.' },
      { stepNumber: 2, instruction: 'Pour into bowl.', michelinNote: 'Use a round bowl for the classic look.' },
      { stepNumber: 3, instruction: 'Top with granola, fresh berries, coconut, and drizzle of honey.', michelinNote: 'The toppings should be generously applied.' },
    ]
  },
  'avocado-toast': {
    ingredients: [
      { name: 'Sourdough bread', quantity: 2, unit: 'slices' },
      { name: 'Ripe avocado', quantity: 1, unit: 'pcs' },
      { name: 'Lemon juice', quantity: 5, unit: 'ml' },
      { name: 'Red pepper flakes', quantity: 0.25, unit: 'tsp' },
      { name: 'Flaky sea salt', quantity: 1, unit: 'pinch' },
      { name: 'Extra virgin olive oil', quantity: 10, unit: 'ml' },
    ],
    steps: [
      { stepNumber: 1, instruction: 'Toast bread until golden and crispy.', michelinNote: 'Thick sourdough provides the perfect base.' },
      { stepNumber: 2, instruction: 'Mash avocado with lemon juice, salt, and pepper.', michelinNote: 'Leave some chunks for texture.' },
      { stepNumber: 3, instruction: 'Spread on toast. Drizzle with olive oil and top with red pepper flakes.', michelinNote: 'The finishing touches matter.' },
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
