const { Client } = require('pg');
const client = new Client({ host: 'db.ycwbumsmlikiquplkdln.supabase.co', port: 5432, database: 'postgres', user: 'postgres', password: process.env.DBPASS });

const recipes = [
  { title: 'Chicken Marsala', slug: 'chicken-marsala', description: 'Italian chicken with wine sauce', cuisine_id: 'f51d9e26-ace3-4b36-9d0c-6364877d3d94' },
  { title: 'Chicken Piccata', slug: 'chicken-piccata', description: 'Italian lemon caper chicken', cuisine_id: 'f51d9e26-ace3-4b36-9d0c-6364877d3d94' },
  { title: 'Eggplant Parmesan', slug: 'eggplant-parmesan', description: 'Italian breaded eggplant', cuisine_id: 'f51d9e26-ace3-4b36-9d0c-6364877d3d94' },
  { title: 'Shrimp Scampi', slug: 'shrimp-scampi', description: 'Garlic butter shrimp', cuisine_id: 'f51d9e26-ace3-4b36-9d0c-6364877d3d94' },
  { title: 'Fettuccine Alfredo', slug: 'fettuccine-alfredo', description: 'Creamy pasta', cuisine_id: 'f51d9e26-ace3-4b36-9d0c-6364877d3d94' },
];

const RECIPES = {
  'chicken-marsala': {
    ingredients: [
      { name: 'Chicken breast', quantity: 2, unit: 'pcs' },
      { name: 'Mushrooms', quantity: 200, unit: 'g' },
      { name: 'Marsala wine', quantity: 120, unit: 'ml' },
      { name: 'Chicken stock', quantity: 120, unit: 'ml' },
      { name: 'Butter', quantity: 60, unit: 'g' },
    ],
    steps: [
      { stepNumber: 1, instruction: 'Pound chicken thin, season.', michelinNote: 'Even thickness.' },
      { stepNumber: 2, instruction: 'Sear chicken in butter. Set aside.', michelinNote: 'Golden color.' },
      { stepNumber: 3, instruction: 'Sauté mushrooms.', michelinNote: 'The base.' },
      { stepNumber: 4, instruction: 'Add wine and stock, reduce.', michelinNote: 'The sauce.' },
      { stepNumber: 5, instruction: 'Return chicken, spoon sauce over.', michelinNote: 'Serve with pasta.' },
    ]
  },
  'chicken-piccata': {
    ingredients: [
      { name: 'Chicken breast', quantity: 2, unit: 'pcs' },
      { name: 'Lemon', quantity: 2, unit: 'pcs' },
      { name: 'Capers', quantity: 30, unit: 'g' },
      { name: 'Butter', quantity: 60, unit: 'g' },
      { name: 'White wine', quantity: 120, unit: 'ml' },
    ],
    steps: [
      { stepNumber: 1, instruction: 'Pound chicken thin.', michelinNote: 'Even cooking.' },
      { stepNumber: 2, instruction: 'Sear in butter until golden.', michelinNote: 'Set aside.' },
      { stepNumber: 3, instruction: 'Add wine, lemon juice, capers.', michelinNote: 'The sauce.' },
      { stepNumber: 4, instruction: 'Reduce, return chicken.', michelinNote: 'Baste with sauce.' },
    ]
  },
  'eggplant-parmesan': {
    ingredients: [
      { name: 'Eggplant', quantity: 2, unit: 'large' },
      { name: 'Marinara sauce', quantity: 500, unit: 'ml' },
      { name: 'Mozzarella', quantity: 300, unit: 'g' },
      { name: 'Parmesan', quantity: 100, unit: 'g' },
      { name: 'Breadcrumbs', quantity: 150, unit: 'g' },
    ],
    steps: [
      { stepNumber: 1, instruction: 'Slice eggplant, salt to remove bitterness.', michelinNote: 'Let sit 30 min.' },
      { stepNumber: 2, instruction: 'Bread: flour, egg, breadcrumbs.', michelinNote: 'The coating.' },
      { stepNumber: 3, instruction: 'Fry until golden.', michelinNote: 'Drain on paper.' },
      { stepNumber: 4, instruction: 'Layer: sauce, eggplant, cheese, repeat.', michelinNote: 'Bake at 375F.' },
    ]
  },
  'shrimp-scampi': {
    ingredients: [
      { name: 'Shrimp', quantity: 500, unit: 'g' },
      { name: 'Linguine', quantity: 400, unit: 'g' },
      { name: 'Butter', quantity: 100, unit: 'g' },
      { name: 'Garlic', quantity: 6, unit: 'cloves' },
      { name: 'White wine', quantity: 120, unit: 'ml' },
      { name: 'Lemon', quantity: 1, unit: 'pcs' },
    ],
    steps: [
      { stepNumber: 1, instruction: 'Cook pasta, reserve water.', michelinNote: 'The starchy water.' },
      { stepNumber: 2, instruction: 'Sauté shrimp in butter. Set aside.', michelinNote: 'Pink color.' },
      { stepNumber: 3, instruction: 'Sauté garlic, add wine and lemon.', michelinNote: 'The sauce.' },
      { stepNumber: 4, instruction: 'Toss with pasta and shrimp.', michelinNote: 'Add pasta water if needed.' },
    ]
  },
  'fettuccine-alfredo': {
    ingredients: [
      { name: 'Fettuccine', quantity: 400, unit: 'g' },
      { name: 'Heavy cream', quantity: 500, unit: 'ml' },
      { name: 'Parmesan', quantity: 150, unit: 'g' },
      { name: 'Butter', quantity: 60, unit: 'g' },
    ],
    steps: [
      { stepNumber: 1, instruction: 'Cook pasta al dente.', michelinNote: 'Reserve water.' },
      { stepNumber: 2, instruction: 'Heat cream with butter.', michelinNote: 'Don\'t boil.' },
      { stepNumber: 3, instruction: 'Add parmesan, stir until smooth.', michelinNote: 'The sauce.' },
      { stepNumber: 4, instruction: 'Toss with pasta.', michelinNote: 'Add pasta water if needed.' },
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
