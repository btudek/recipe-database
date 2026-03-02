const { Client } = require('pg');
const client = new Client({ host: 'db.ycwbumsmlikiquplkdln.supabase.co', port: 5432, database: 'postgres', user: 'postgres', password: process.env.DBPASS });

const RECIPES = {
  'mashed-potatoes': {
    ingredients: [
      { name: 'Russet potatoes', quantity: 1000, unit: 'g', notes: 'peeled and cubed' },
      { name: 'Butter', quantity: 100, unit: 'g' },
      { name: 'Heavy cream', quantity: 120, unit: 'ml', notes: 'warmed' },
      { name: 'Sour cream', quantity: 60, unit: 'ml' },
      { name: 'Chives', quantity: 2, unit: 'tbsp', notes: 'chopped' },
    ],
    steps: [
      { stepNumber: 1, instruction: 'Boil potatoes in salted water until fork-tender, about 15-20 minutes.', michelinNote: 'Don\'t overcook - they\'ll become gluey.' },
      { stepNumber: 2, instruction: 'Drain well and return to pot to dry out.', michelinNote: 'Wet potatoes make watery mash.' },
      { stepNumber: 3, instruction: 'Mash with butter, then add warm cream.', michelinNote: 'Warm cream incorporates better.' },
      { stepNumber: 4, instruction: 'Fold in sour cream. Season with salt and pepper.', michelinNote: 'Don\'t use a food processor - it makes them gummy.' },
      { stepNumber: 5, instruction: 'Top with chives and extra butter.', michelinNote: 'A pat of butter on top melts beautifully.' },
    ]
  },
  'grilled-asparagus': {
    ingredients: [
      { name: 'Asparagus', quantity: 500, unit: 'g', notes: 'trimmed' },
      { name: 'Olive oil', quantity: 30, unit: 'ml' },
      { name: 'Garlic', quantity: 2, unit: 'cloves', notes: 'minced' },
      { name: 'Lemon', quantity: 1, unit: 'pcs', notes: 'zested and juiced' },
    ],
    steps: [
      { stepNumber: 1, instruction: 'Toss asparagus with olive oil, garlic, lemon zest, salt and pepper.', michelinNote: 'Let marinate 10 minutes for flavor.' },
      { stepNumber: 2, instruction: 'Grill over high heat, turning occasionally, until charred and tender.', michelinNote: 'High heat creates char marks.' },
      { stepNumber: 3, instruction: 'Finish with fresh lemon juice.', michelinNote: 'Add citrus just before serving.' },
    ]
  },
  'garlic-bread': {
    ingredients: [
      { name: 'Baguette', quantity: 1, unit: 'loaf', notes: 'sliced' },
      { name: 'Butter', quantity: 100, unit: 'g', notes: 'softened' },
      { name: 'Garlic', quantity: 4, unit: 'cloves', notes: 'minced' },
      { name: 'Parsley', quantity: 3, unit: 'tbsp', notes: 'chopped' },
      { name: 'Parmesan', quantity: 30, unit: 'g', notes: 'grated' },
    ],
    steps: [
      { stepNumber: 1, instruction: 'Mix softened butter with garlic, parsley, and parmesan.', michelinNote: 'Room temperature butter mixes more easily.' },
      { stepNumber: 2, instruction: 'Spread generously on bread slices.', michelinNote: 'Don\'t be shy with the butter.' },
      { stepNumber: 3, instruction: 'Wrap in foil. Bake at 375F for 10 minutes.', michelinNote: 'The foil steams the bread.' },
      { stepNumber: 4, instruction: 'Open foil, bake 5 more minutes until crispy.', michelinNote: 'This creates the golden top.' },
    ]
  },
  'brownies': {
    ingredients: [
      { name: 'Dark chocolate', quantity: 200, unit: 'g' },
      { name: 'Butter', quantity: 150, unit: 'g' },
      { name: 'Sugar', quantity: 250, unit: 'g' },
      { name: 'Eggs', quantity: 3, unit: 'pcs' },
      { name: 'Flour', quantity: 100, unit: 'g' },
      { name: 'Cocoa powder', quantity: 30, unit: 'g' },
    ],
    steps: [
      { stepNumber: 1, instruction: 'Melt chocolate and butter together.', michelinNote: 'Don\'t let water touch bowl or chocolate will seize.' },
      { stepNumber: 2, instruction: 'Whisk in sugar, then eggs one at a time.', michelinNote: 'Eggs emulsify the batter.' },
      { stepNumber: 3, instruction: 'Fold in flour and cocoa. Don\'t overmix.', michelinNote: 'Overmixing makes brownies tough.' },
      { stepNumber: 4, instruction: 'Pour into lined pan. Bake at 350F for 25-30 minutes.', michelinNote: 'A toothpick should come out with moist crumbs.' },
      { stepNumber: 5, instruction: 'Cool completely before cutting for clean slices.', michelinNote: 'Wait at least 2 hours.' },
    ]
  },
  'apple-pie': {
    ingredients: [
      { name: 'Pie crust', quantity: 2, unit: 'discs', notes: 'store-bought or homemade' },
      { name: 'Apples', quantity: 1000, unit: 'g', notes: 'mixed varieties' },
      { name: 'Sugar', quantity: 150, unit: 'g' },
      { name: 'Cinnamon', quantity: 2, unit: 'tsp' },
      { name: 'Nutmeg', quantity: 0.25, unit: 'tsp' },
      { name: 'Lemon juice', quantity: 15, unit: 'ml' },
      { name: 'Butter', quantity: 30, unit: 'g' },
    ],
    steps: [
      { stepNumber: 1, instruction: 'Slice apples thin, about 1/4 inch.', michelinNote: 'Thin slices cook evenly.' },
      { stepNumber: 2, instruction: 'Toss with sugar, spices, and lemon juice.', michelinNote: 'Let sit 30 minutes to release juices.' },
      { stepNumber: 3, instruction: 'Line pie dish with bottom crust. Fill with apples, dot with butter.', michelinNote: 'Mound apples in center.' },
      { stepNumber: 4, instruction: 'Cover with top crust. Crimp edges and cut vents.', michelinNote: 'Vents release steam while baking.' },
      { stepNumber: 5, instruction: 'Bake at 425F for 20 min, then 375F for 35 min.', michelinNote: 'Cover edges if browning too fast.' },
    ]
  },
  'french-toast': {
    ingredients: [
      { name: 'Thick bread', quantity: 8, unit: 'slices', notes: 'brioche or challah' },
      { name: 'Eggs', quantity: 4, unit: 'pcs' },
      { name: 'Milk', quantity: 120, unit: 'ml' },
      { name: 'Cinnamon', quantity: 1, unit: 'tsp' },
      { name: 'Vanilla', quantity: 1, unit: 'tsp' },
      { name: 'Butter', quantity: 30, unit: 'g' },
    ],
    steps: [
      { stepNumber: 1, instruction: 'Whisk eggs, milk, cinnamon, and vanilla.', michelinNote: 'Let bread soak 2-3 minutes per side.' },
      { stepNumber: 2, instruction: 'Heat butter in pan over medium heat.', michelinNote: 'Medium heat ensures even cooking.' },
      { stepNumber: 3, instruction: 'Cook bread 2-3 minutes per side until golden.', michelinNote: 'Flip when edges look set.' },
      { stepNumber: 4, instruction: 'Serve with maple syrup and fresh berries.', michelinNote: 'Fresh fruit cuts the richness.' },
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
