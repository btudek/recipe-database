const { Client } = require('pg');
const client = new Client({ host: 'db.ycwbumsmlikiquplkdln.supabase.co', port: 5432, database: 'postgres', user: 'postgres', password: process.env.DBPASS });

const recipes = [
  { title: 'BBQ Ribs', slug: 'bbq-ribs', description: 'American style BBQ ribs', cuisine_id: '813587ed-24eb-421d-97be-f5f2d1740e86' },
  { title: 'Buffalo Wings', slug: 'buffalo-wings', description: 'Spicy fried chicken wings', cuisine_id: '813587ed-24eb-421d-97be-f5f2d1740e86' },
  { title: 'Caesar Salad', slug: 'caesar-salad', description: 'Classic romaine salad', cuisine_id: '813587ed-24eb-421d-97be-f5f2d1740e86' },
  { title: 'Club Sandwich', slug: 'club-sandwich', description: 'Triple-decker sandwich', cuisine_id: '813587ed-24eb-421d-97be-f5f2d1740e86' },
  { title: 'Meatloaf', slug: 'meatloaf', description: 'Baked ground meat loaf', cuisine_id: '813587ed-24eb-421d-97be-f5f2d1740e86' },
  { title: 'Cornbread', slug: 'cornbread', description: 'Southern cornbread', cuisine_id: '813587ed-24eb-421d-97be-f5f2d1740e86' },
];

const RECIPES = {
  'bbq-ribs': {
    ingredients: [
      { name: 'Pork ribs', quantity: 1500, unit: 'g' },
      { name: 'Brown sugar', quantity: 100, unit: 'g' },
      { name: 'Paprika', quantity: 2, unit: 'tbsp' },
      { name: 'Cayenne', quantity: 1, unit: 'tsp' },
      { name: 'BBQ sauce', quantity: 250, unit: 'ml' },
    ],
    steps: [
      { stepNumber: 1, instruction: 'Mix dry rub: sugar, paprika, cayenne, salt.', michelinNote: 'The rub.' },
      { stepNumber: 2, instruction: 'Rub generously on ribs. Rest 1 hour.', michelinNote: 'Room temp.' },
      { stepNumber: 3, instruction: 'Smoke or bake at 250F for 3 hours.', michelinNote: 'Low and slow.' },
      { stepNumber: 4, instruction: 'Brush with BBQ sauce last 30 minutes.', michelinNote: 'Caramelizes.' },
    ]
  },
  'buffalo-wings': {
    ingredients: [
      { name: 'Chicken wings', quantity: 1000, unit: 'g' },
      { name: 'Hot sauce', quantity: 120, unit: 'ml' },
      { name: 'Butter', quantity: 60, unit: 'g' },
      { name: 'Garlic powder', quantity: 1, unit: 'tsp' },
      { name: 'Ranch dressing', quantity: 120, unit: 'ml' },
    ],
    steps: [
      { stepNumber: 1, instruction: 'Pat wings dry. Season with salt.', michelinNote: 'Dry wings crisp better.' },
      { stepNumber: 2, instruction: 'Fry at 375F until golden, about 10 min.', michelinNote: 'Double-fry for extra crisp.' },
      { stepNumber: 3, instruction: 'Mix hot sauce, butter, garlic.', michelinNote: 'The buffalo sauce.' },
      { stepNumber: 4, instruction: 'Toss wings in sauce.', michelinNote: 'Serve with ranch.' },
    ]
  },
  'caesar-salad': {
    ingredients: [
      { name: 'Romaine lettuce', quantity: 2, unit: 'heads' },
      { name: 'Parmesan', quantity: 100, unit: 'g' },
      { name: 'Croutons', quantity: 150, unit: 'g' },
      { name: 'Caesar dressing', quantity: 120, unit: 'ml' },
      { name: 'Lemon', quantity: 1, unit: 'pcs' },
    ],
    steps: [
      { stepNumber: 1, instruction: 'Wash and chop romaine.', michelinNote: 'Tear, don\'t cut.' },
      { stepNumber: 2, instruction: 'Toss with dressing.', michelinNote: 'Don\'t overdress.' },
      { stepNumber: 3, instruction: 'Top with shaved parmesan and croutons.', michelinNote: 'Add lemon wedge.' },
    ]
  },
  'club-sandwich': {
    ingredients: [
      { name: 'Bread', quantity: 6, unit: 'slices' },
      { name: 'Turkey breast', quantity: 150, unit: 'g' },
      { name: 'Bacon', quantity: 6, unit: 'strips' },
      { name: 'Lettuce', quantity: 4, unit: 'leaves' },
      { name: 'Tomato', quantity: 1, unit: 'medium' },
      { name: 'Mayonnaise', quantity: 60, unit: 'ml' },
    ],
    steps: [
      { stepNumber: 1, instruction: 'Toast bread.', michelinNote: 'Lightly toast.' },
      { stepNumber: 2, instruction: 'Cook bacon until crispy.', michelinNote: 'The foundation.' },
      { stepNumber: 3, instruction: 'Layer: turkey, bacon, lettuce, tomato.', michelinNote: '3 layers traditional.' },
      { stepNumber: 4, instruction: 'Cut diagonally, secure with toothpicks.', michelinNote: 'Serve with fries.' },
    ]
  },
  'meatloaf': {
    ingredients: [
      { name: 'Ground beef', quantity: 750, unit: 'g' },
      { name: 'Breadcrumbs', quantity: 150, unit: 'g' },
      { name: 'Eggs', quantity: 2, unit: 'pcs' },
      { name: 'Onion', quantity: 1, unit: 'medium' },
      { name: 'Ketchup', quantity: 120, unit: 'ml' },
      { name: 'Worcestershire sauce', quantity: 30, unit: 'ml' },
    ],
    steps: [
      { stepNumber: 1, instruction: 'Mix beef with breadcrumbs, egg, onion, seasonings.', michelinNote: 'Don\'t overmix.' },
      { stepNumber: 2, instruction: 'Shape into loaf on baking sheet.', michelinNote: 'Make a mound.' },
      { stepNumber: 3, instruction: 'Top with ketchup.', michelinNote: 'The glaze.' },
      { stepNumber: 4, instruction: 'Bake at 350F for 55 minutes.', michelinNote: 'Rest 10 min before slicing.' },
    ]
  },
  'cornbread': {
    ingredients: [
      { name: 'Cornmeal', quantity: 250, unit: 'g' },
      { name: 'Flour', quantity: 125, unit: 'g' },
      { name: 'Buttermilk', quantity: 360, unit: 'ml' },
      { name: 'Eggs', quantity: 2, unit: 'pcs' },
      { name: 'Butter', quantity: 60, unit: 'g' },
      { name: 'Baking powder', quantity: 1, unit: 'tbsp' },
    ],
    steps: [
      { stepNumber: 1, instruction: 'Mix cornmeal, flour, baking powder.', michelinNote: 'Whisk to combine.' },
      { stepNumber: 2, instruction: 'Mix buttermilk, eggs, melted butter.', michelinNote: 'Wet ingredients.' },
      { stepNumber: 3, instruction: 'Combine wet and dry. Don\'t overmix.', michelinNote: 'Lumpy is fine.' },
      { stepNumber: 4, instruction: 'Bake at 425F for 20-25 minutes.', michelinNote: 'Until golden.' },
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
