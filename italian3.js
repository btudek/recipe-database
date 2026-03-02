const { Client } = require('pg');
const client = new Client({ host: 'db.ycwbumsmlikiquplkdln.supabase.co', port: 5432, database: 'postgres', user: 'postgres', password: process.env.DBPASS });

const recipes = [
  { title: 'Chicken Alfredo', slug: 'chicken-alfredo', description: 'Creamy Italian pasta with chicken', cuisine_id: 'f51d9e26-ace3-4b36-9d0c-6364877d3d94' },
  { title: 'Shrimp Scampi', slug: 'shrimp-scampi', description: 'Garlic butter shrimp over pasta', cuisine_id: 'f51d9e26-ace3-4b36-9d0c-6364877d3d94' },
  { title: 'Bruschetta', slug: 'bruschetta', description: 'Italian tomato toast appetizer', cuisine_id: 'f51d9e26-ace3-4b36-9d0c-6364877d3d94' },
  { title: 'Caprese Salad', slug: 'caprese-salad', description: 'Fresh mozzarella and tomato salad', cuisine_id: 'f51d9e26-ace3-4b36-9d0c-6364877d3d94' },
  { title: 'Lasagna', slug: 'lasagna', description: 'Layered Italian pasta with meat sauce', cuisine_id: 'f51d9e26-ace3-4b36-9d0c-6364877d3d94' },
  { title: 'Carbonara', slug: 'carbonara', description: 'Roman pasta with egg and pancetta', cuisine_id: 'f51d9e26-ace3-4b36-9d0c-6364877d3d94' },
];

const RECIPES = {
  'chicken-alfredo': {
    ingredients: [
      { name: 'Fettuccine', quantity: 400, unit: 'g' },
      { name: 'Chicken breast', quantity: 400, unit: 'g' },
      { name: 'Heavy cream', quantity: 500, unit: 'ml' },
      { name: 'Parmesan', quantity: 150, unit: 'g' },
      { name: 'Butter', quantity: 60, unit: 'g' },
      { name: 'Garlic', quantity: 4, unit: 'cloves' },
    ],
    steps: [
      { stepNumber: 1, instruction: 'Season and pan-fry chicken until done.', michelinNote: 'Slice thin for even cooking.' },
      { stepNumber: 2, instruction: 'Sauté garlic in butter.', michelinNote: 'Don\'t burn.' },
      { stepNumber: 3, instruction: 'Add cream, simmer until thickened.', michelinNote: 'About 5 minutes.' },
      { stepNumber: 4, instruction: 'Add parmesan, stir until melted.', michelinNote: 'Low heat prevents curdling.' },
      { stepNumber: 5, instruction: 'Toss with pasta and chicken.', michelinNote: 'Serve immediately.' },
    ]
  },
  'shrimp-scampi': {
    ingredients: [
      { name: 'Linguine', quantity: 400, unit: 'g' },
      { name: 'Shrimp', quantity: 500, unit: 'g' },
      { name: 'Butter', quantity: 100, unit: 'g' },
      { name: 'Garlic', quantity: 6, unit: 'cloves' },
      { name: 'White wine', quantity: 150, unit: 'ml' },
      { name: 'Lemon', quantity: 1, unit: 'pcs' },
    ],
    steps: [
      { stepNumber: 1, instruction: 'Cook pasta, reserve 1 cup pasta water.', michelinNote: 'Starchy water helps sauce.' },
      { stepNumber: 2, instruction: 'Sauté shrimp in butter until pink. Set aside.', michelinNote: 'Don\'t overcook.' },
      { stepNumber: 3, instruction: 'Sauté garlic in butter, add wine and lemon.', michelinNote: 'Let wine reduce by half.' },
      { stepNumber: 4, instruction: 'Add shrimp and pasta, toss with pasta water.', michelinNote: 'The sauce clings to pasta.' },
    ]
  },
  'bruschetta': {
    ingredients: [
      { name: 'Baguette', quantity: 1, unit: 'pcs' },
      { name: 'Tomatoes', quantity: 4, unit: 'medium' },
      { name: 'Garlic', quantity: 3, unit: 'cloves' },
      { name: 'Fresh basil', quantity: 30, unit: 'g' },
      { name: 'Olive oil', quantity: 60, unit: 'ml' },
      { name: 'Balsamic vinegar', quantity: 15, unit: 'ml' },
    ],
    steps: [
      { stepNumber: 1, instruction: 'Dice tomatoes, mix with minced garlic, basil, oil.', michelinNote: 'Let sit 15 minutes.' },
      { stepNumber: 2, instruction: 'Toast baguette slices.', michelinNote: 'Rub with garlic after toasting.' },
      { stepNumber: 3, instruction: 'Top toast with tomato mixture.', michelinNote: 'Drizzle with balsamic.' },
    ]
  },
  'caprese-salad': {
    ingredients: [
      { name: 'Fresh mozzarella', quantity: 300, unit: 'g' },
      { name: 'Tomatoes', quantity: 3, unit: 'medium' },
      { name: 'Fresh basil', quantity: 30, unit: 'g' },
      { name: 'Olive oil', quantity: 45, unit: 'ml' },
      { name: 'Balsamic glaze', quantity: 30, unit: 'ml' },
    ],
    steps: [
      { stepNumber: 1, instruction: 'Slice mozzarella and tomatoes uniformly.', michelinNote: 'Even slices look better.' },
      { stepNumber: 2, instruction: 'Arrange alternating on plate.', michelinNote: 'Simple arrangement.' },
      { stepNumber: 3, instruction: 'Drizzle with oil and balsamic.', michelinNote: 'Season with salt and pepper.' },
    ]
  },
  'lasagna': {
    ingredients: [
      { name: 'Lasagna noodles', quantity: 400, unit: 'g' },
      { name: 'Ground beef', quantity: 500, unit: 'g' },
      { name: 'Tomato sauce', quantity: 800, unit: 'g' },
      { name: 'Ricotta', quantity: 400, unit: 'g' },
      { name: 'Mozzarella', quantity: 300, unit: 'g' },
      { name: 'Parmesan', quantity: 100, unit: 'g' },
    ],
    steps: [
      { stepNumber: 1, instruction: 'Brown beef with onion and garlic.', michelinNote: 'Add tomato sauce, simmer 20 min.' },
      { stepNumber: 2, instruction: 'Mix ricotta with egg and parsley.', michelinNote: 'The binding layer.' },
      { stepNumber: 3, instruction: 'Layer: sauce, noodles, ricotta, mozzarella, repeat.', michelinNote: 'End with sauce and cheese.' },
      { stepNumber: 4, instruction: 'Cover, bake at 375F for 45 minutes.', michelinNote: 'Uncover last 15 min for browning.' },
      { stepNumber: 5, instruction: 'Rest 15 minutes before slicing.', michelinNote: 'Lets layers set.' },
    ]
  },
  'carbonara': {
    ingredients: [
      { name: 'Spaghetti', quantity: 400, unit: 'g' },
      { name: 'Guanciale', quantity: 200, unit: 'g' },
      { name: 'Egg yolks', quantity: 6, unit: 'pcs' },
      { name: 'Pecorino Romano', quantity: 100, unit: 'g' },
      { name: 'Black pepper', quantity: 2, unit: 'tsp' },
    ],
    steps: [
      { stepNumber: 1, instruction: 'Cook pasta al dente, reserve pasta water.', michelinNote: 'It finishes in pan.' },
      { stepNumber: 2, instruction: 'Crisp guanciale in pan.', michelinNote: 'The fat renders out.' },
      { stepNumber: 3, instruction: 'Mix yolks with cheese and pepper.', michelinNote: 'The sauce base.' },
      { stepNumber: 4, instruction: 'Toss hot pasta with guanciale, remove from heat, add egg mixture.', michelinNote: 'The residual heat cooks eggs.' },
      { stepNumber: 5, instruction: 'Add pasta water to achieve creamy consistency.', michelinNote: 'Work quickly - don\'t scramble eggs.' },
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
