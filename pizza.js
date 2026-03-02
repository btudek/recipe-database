const { Client } = require('pg');
const client = new Client({ host: 'db.ycwbumsmlikiquplkdln.supabase.co', port: 5432, database: 'postgres', user: 'postgres', password: process.env.DBPASS });

const recipes = [
  { title: 'Pizza Margherita', slug: 'pizza-margherita', description: 'Classic Italian pizza', cuisine_id: 'f51d9e26-ace3-4b36-9d0c-6364877d3d94' },
  { title: 'Pizza Pepperoni', slug: 'pizza-pepperoni', description: 'American pepperoni pizza', cuisine_id: 'f51d9e26-ace3-4b36-9d0c-6364877d3d94' },
  { title: 'Calzone', slug: 'calzone', description: 'Italian folded pizza', cuisine_id: 'f51d9e26-ace3-4b36-9d0c-6364877d3d94' },
  { title: 'Bruschetta', slug: 'bruschetta', description: 'Italian tomato toast', cuisine_id: 'f51d9e26-ace3-4b36-9d0c-6364877d3d94' },
  { title: 'Minestrone', slug: 'minestrone', description: 'Italian vegetable soup', cuisine_id: 'f51d9e26-ace3-4b36-9d0c-6364877d3d94' },
  { title: 'Tiramisu', slug: 'tiramisu', description: 'Coffee dessert', cuisine_id: 'f51d9e26-ace3-4b36-9d0c-6364877d3d94' },
];

const RECIPES = {
  'pizza-margherita': {
    ingredients: [
      { name: 'Pizza dough', quantity: 500, unit: 'g' },
      { name: 'San Marzano tomatoes', quantity: 400, unit: 'g' },
      { name: 'Fresh mozzarella', quantity: 250, unit: 'g' },
      { name: 'Fresh basil', quantity: 20, unit: 'g' },
      { name: 'Olive oil', quantity: 30, unit: 'ml' },
    ],
    steps: [
      { stepNumber: 1, instruction: 'Stretch dough into 12-inch circle.', michelinNote: 'Don\'t use rolling pin.' },
      { stepNumber: 2, instruction: 'Crush tomatoes by hand.', michelinNote: 'Season with salt.' },
      { stepNumber: 3, instruction: 'Top with tomatoes, mozzarella.', michelinNote: 'Leave border.' },
      { stepNumber: 4, instruction: 'Bake at 500F for 8-10 minutes.', michelinNote: 'Hot oven is key.' },
      { stepNumber: 5, instruction: 'Top with fresh basil and olive oil.', michelinNote: 'Serve immediately.' },
    ]
  },
  'pizza-pepperoni': {
    ingredients: [
      { name: 'Pizza dough', quantity: 500, unit: 'g' },
      { name: 'Pizza sauce', quantity: 250, unit: 'ml' },
      { name: 'Mozzarella', quantity: 300, unit: 'g' },
      { name: 'Pepperoni', quantity: 150, unit: 'g' },
    ],
    steps: [
      { stepNumber: 1, instruction: 'Stretch dough.', michelinNote: 'Even thickness.' },
      { stepNumber: 2, instruction: 'Spread sauce, leaving border.', michelinNote: 'Don\'t overload.' },
      { stepNumber: 3, instruction: 'Add cheese, then pepperoni.', michelinNote: 'Pepperoni on top.' },
      { stepNumber: 4, instruction: 'Bake at 500F for 10 minutes.', michelinNote: 'Crispy crust.' },
    ]
  },
  'calzone': {
    ingredients: [
      { name: 'Pizza dough', quantity: 500, unit: 'g' },
      { name: 'Ricotta', quantity: 200, unit: 'g' },
      { name: 'Mozzarella', quantity: 200, unit: 'g' },
      { name: 'Pepperoni', quantity: 100, unit: 'g' },
    ],
    steps: [
      { stepNumber: 1, instruction: 'Roll dough into oval.', michelinNote: 'About 1/2 inch thick.' },
      { stepNumber: 2, instruction: 'Spread filling on half.', michelinNote: 'Leave edge.' },
      { stepNumber: 3, instruction: 'Fold over, seal edges.', michelinNote: 'Crimp with fork.' },
      { stepNumber: 4, instruction: 'Bake at 450F for 15 minutes.', michelinNote: 'Until golden.' },
    ]
  },
  'minestrone': {
    ingredients: [
      { name: 'Cannellini beans', quantity: 400, unit: 'g' },
      { name: 'Zucchini', quantity: 2, unit: 'medium' },
      { name: 'Carrots', quantity: 2, unit: 'medium' },
      { name: 'Celery', quantity: 2, unit: 'stalks' },
      { name: 'Tomatoes', quantity: 400, unit: 'g' },
      { name: 'Pasta', quantity: 100, unit: 'g' },
    ],
    steps: [
      { stepNumber: 1, instruction: 'Sauté onion, carrot, celery.', michelinNote: 'The soffritto.' },
      { stepNumber: 2, instruction: 'Add tomatoes and beans.', michelinNote: 'The base.' },
      { stepNumber: 3, instruction: 'Add stock, simmer 30 minutes.', michelinNote: 'Let flavors meld.' },
      { stepNumber: 4, instruction: 'Add zucchini and pasta.', michelinNote: 'Cook until pasta done.' },
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
