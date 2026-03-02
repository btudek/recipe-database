const { Client } = require('pg');
const client = new Client({ host: 'db.ycwbumsmlikiquplkdln.supabase.co', port: 5432, database: 'postgres', user: 'postgres', password: process.env.DBPASS });

const recipes = [
  { title: 'Banana Bread', slug: 'banana-bread', description: 'Moist banana loaf', cuisine_id: '813587ed-24eb-421d-97be-f5f2d1740e86' },
  { title: 'Chocolate Chip Cookies', slug: 'chocolate-chip-cookies', description: 'Classic American cookies', cuisine_id: '813587ed-24eb-421d-97be-f5f2d1740e86' },
  { title: 'Cheesecake', slug: 'cheesecake', description: 'Creamy New York style cheesecake', cuisine_id: '813587ed-24eb-421d-97be-f5f2d1740e86' },
  { title: 'Apple Pie', slug: 'apple-pie', description: 'Classic American pie', cuisine_id: '813587ed-24eb-421d-97be-f5f2d1740e86' },
  { title: 'Pancakes', slug: 'pancakes', description: 'Fluffy American breakfast pancakes', cuisine_id: '813587ed-24eb-421d-97be-f5f2d1740e86' },
  { title: 'Mac and Cheese', slug: 'mac-and-cheese', description: 'Creamy baked pasta', cuisine_id: '813587ed-24eb-421d-97be-f5f2d1740e86' },
];

const RECIPES = {
  'banana-bread': {
    ingredients: [
      { name: 'Ripe bananas', quantity: 4, unit: 'pcs' },
      { name: 'Flour', quantity: 250, unit: 'g' },
      { name: 'Sugar', quantity: 150, unit: 'g' },
      { name: 'Butter', quantity: 115, unit: 'g' },
      { name: 'Eggs', quantity: 2, unit: 'pcs' },
      { name: 'Baking soda', quantity: 1, unit: 'tsp' },
    ],
    steps: [
      { stepNumber: 1, instruction: 'Mash bananas in a large bowl.', michelinNote: 'The riper the bananas, the sweeter.' },
      { stepNumber: 2, instruction: 'Mix in melted butter.', michelinNote: 'Don\'t add hot butter to eggs.' },
      { stepNumber: 3, instruction: 'Add sugar, eggs, then flour and baking soda.', michelinNote: 'Don\'t overmix.' },
      { stepNumber: 4, instruction: 'Pour into loaf pan. Bake at 350F for 60 minutes.', michelinNote: 'Test with toothpick.' },
    ]
  },
  'chocolate-chip-cookies': {
    ingredients: [
      { name: 'Flour', quantity: 280, unit: 'g' },
      { name: 'Butter', quantity: 230, unit: 'g' },
      { name: 'Brown sugar', quantity: 150, unit: 'g' },
      { name: 'White sugar', quantity: 100, unit: 'g' },
      { name: 'Eggs', quantity: 2, unit: 'pcs' },
      { name: 'Chocolate chips', quantity: 340, unit: 'g' },
      { name: 'Vanilla', quantity: 1, unit: 'tsp' },
    ],
    steps: [
      { stepNumber: 1, instruction: 'Cream butter and sugars until fluffy.', michelinNote: 'This incorporates air.' },
      { stepNumber: 2, instruction: 'Beat in eggs and vanilla.', michelinNote: 'Room temp eggs mix better.' },
      { stepNumber: 3, instruction: 'Fold in flour and chocolate chips.', michelinNote: 'Don\'t overmix.' },
      { stepNumber: 4, instruction: 'Scoop onto baking sheets. Bake at 375F for 10-12 minutes.', michelinNote: 'Underbake slightly for chewy centers.' },
    ]
  },
  'cheesecake': {
    ingredients: [
      { name: 'Cream cheese', quantity: 900, unit: 'g' },
      { name: 'Sugar', quantity: 200, unit: 'g' },
      { name: 'Eggs', quantity: 4, unit: 'pcs' },
      { name: 'Sour cream', quantity: 240, unit: 'ml' },
      { name: 'Vanilla', quantity: 2, unit: 'tsp' },
      { name: 'Graham crackers', quantity: 200, unit: 'g' },
    ],
    steps: [
      { stepNumber: 1, instruction: 'Mix crushed graham crackers with melted butter. Press into pan.', michelinNote: 'Firm press for crust.' },
      { stepNumber: 2, instruction: 'Beat cream cheese and sugar until smooth.', michelinNote: 'Room temperature is essential.' },
      { stepNumber: 3, instruction: 'Add eggs one at a time.', michelinNote: 'Don\'t overbeat.' },
      { stepNumber: 4, instruction: 'Add sour cream and vanilla. Pour over crust.', michelinNote: 'Bake at 325F for 55 minutes.' },
      { stepNumber: 5, instruction: 'Cool slowly in oven to prevent cracks.', michelinNote: 'Turn off oven, crack door, let cool.' },
    ]
  },
  'apple-pie': {
    ingredients: [
      { name: 'Pie crust', quantity: 2, unit: 'pcs' },
      { name: 'Apples', quantity: 1, unit: 'kg' },
      { name: 'Sugar', quantity: 150, unit: 'g' },
      { name: 'Cinnamon', quantity: 2, unit: 'tsp' },
      { name: 'Nutmeg', quantity: 0.5, unit: 'tsp' },
      { name: 'Butter', quantity: 60, unit: 'g' },
    ],
    steps: [
      { stepNumber: 1, instruction: 'Peel and slice apples. Mix with sugar and spices.', michelinNote: 'Toss to coat evenly.' },
      { stepNumber: 2, instruction: 'Line pie dish with one crust. Fill with apples.', michelinNote: 'Mound the apples in center.' },
      { stepNumber: 3, instruction: 'Dot with butter. Cover with second crust.', michelinNote: 'Crimp edges to seal.' },
      { stepNumber: 4, instruction: 'Cut slits for steam. Bake at 425F for 20 min, then 375F for 40 min.', michelinNote: 'Cover edges if browning.' },
    ]
  },
  'pancakes': {
    ingredients: [
      { name: 'Flour', quantity: 250, unit: 'g' },
      { name: 'Milk', quantity: 360, unit: 'ml' },
      { name: 'Egg', quantity: 1, unit: 'pcs' },
      { name: 'Butter', quantity: 45, unit: 'g' },
      { name: 'Baking powder', quantity: 2, unit: 'tsp' },
      { name: 'Sugar', quantity: 30, unit: 'g' },
    ],
    steps: [
      { stepNumber: 1, instruction: 'Mix dry ingredients.', michelinNote: 'Whisk to combine.' },
      { stepNumber: 2, instruction: 'Whisk wet ingredients separately.', michelinNote: 'Don\'t overmix.' },
      { stepNumber: 3, instruction: 'Combine wet and dry. Let rest 5 minutes.', michelinNote: 'Resting makes fluffier pancakes.' },
      { stepNumber: 4, instruction: 'Cook on buttered griddle until bubbles form, then flip.', michelinNote: 'First side takes longer.' },
    ]
  },
  'mac-and-cheese': {
    ingredients: [
      { name: 'Elbow macaroni', quantity: 400, unit: 'g' },
      { name: 'Cheddar cheese', quantity: 300, unit: 'g' },
      { name: 'Milk', quantity: 500, unit: 'ml' },
      { name: 'Butter', quantity: 60, unit: 'g' },
      { name: 'Flour', quantity: 45, unit: 'g' },
      { name: 'Breadcrumbs', quantity: 60, unit: 'g' },
    ],
    steps: [
      { stepNumber: 1, instruction: 'Cook pasta until al dente.', michelinNote: 'It continues cooking in oven.' },
      { stepNumber: 2, instruction: 'Make roux: melt butter, whisk in flour.', michelinNote: 'Cook 1 minute.' },
      { stepNumber: 3, instruction: 'Add milk gradually, whisk until thickened.', michelinNote: 'No lumps.' },
      { stepNumber: 4, instruction: 'Add cheese, stir until melted.', michelinNote: 'Season with salt and pepper.' },
      { stepNumber: 5, instruction: 'Combine with pasta, top with breadcrumbs. Bake at 375F for 20 min.', michelinNote: 'Until bubbly and golden.' },
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
