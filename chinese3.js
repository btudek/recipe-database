const { Client } = require('pg');
const client = new Client({ host: 'db.ycwbumsmlikiquplkdln.supabase.co', port: 5432, database: 'postgres', user: 'postgres', password: process.env.DBPASS });

const recipes = [
  { title: 'Dumplings', slug: 'dumplings', description: 'Chinese pork dumplings', cuisine_id: '8232ae82-2fa2-4f95-a9f1-bc7ddd817d28' },
  { title: 'Fried Rice', slug: 'fried-rice', description: 'Classic fried rice', cuisine_id: '8232ae82-2fa2-4f95-a9f1-bc7ddd817d28' },
  { title: 'Kung Pao Chicken', slug: 'kung-pao-chicken', description: 'Spicy chicken', cuisine_id: '8232ae82-2fa2-4f95-a9f1-bc7ddd817d28' },
  { title: 'Beef Chow Fun', slug: 'beef-chow-fun', description: 'Stir-fried flat noodles', cuisine_id: '8232ae82-2fa2-4f95-a9f1-bc7ddd817d28' },
];

const RECIPES = {
  'dumplings': {
    ingredients: [
      { name: 'Ground pork', quantity: 400, unit: 'g' },
      { name: 'Cabbage', quantity: 200, unit: 'g' },
      { name: 'Dumpling wrappers', quantity: 50, unit: 'pcs' },
      { name: 'Soy sauce', quantity: 30, unit: 'ml' },
    ],
    steps: [
      { stepNumber: 1, instruction: 'Mix pork with cabbage and soy.', michelinNote: 'Season well.' },
      { stepNumber: 2, instruction: 'Fill and fold wrappers.', michelinNote: 'Pleat edges.' },
      { stepNumber: 3, instruction: 'Pan-fry then steam.', michelinNote: 'Serve with dip.' },
    ]
  },
  'beef-chow-fun': {
    ingredients: [
      { name: 'Beef ribeye', quantity: 300, unit: 'g' },
      { name: 'Flat rice noodles', quantity: 400, unit: 'g' },
      { name: 'Soy sauce', quantity: 60, unit: 'ml' },
      { name: 'Bean sprouts', quantity: 150, unit: 'g' },
    ],
    steps: [
      { stepNumber: 1, instruction: 'Marinate beef.', michelinNote: 'Briefly.' },
      { stepNumber: 2, instruction: 'Stir-fry beef, set aside.', michelinNote: 'High heat.' },
      { stepNumber: 3, instruction: 'Stir-fry noodles with sauce.', michelinNote: 'Toss well.' },
      { stepNumber: 4, instruction: 'Add beef and bean sprouts.', michelinNote: 'Serve immediately.' },
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
