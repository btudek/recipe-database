const { Client } = require('pg');
const client = new Client({ host: 'db.ycwbumsmlikiquplkdln.supabase.co', port: 5432, database: 'postgres', user: 'postgres', password: process.env.DBPASS });

const RECIPES = {
  'shrimp-cocktail': {
    ingredients: [
      { name: 'Large shrimp', quantity: 500, unit: 'g', notes: 'peeled and deveined' },
      { name: 'Cocktail sauce', quantity: 200, unit: 'ml' },
      { name: 'Lemon', quantity: 1, unit: 'pcs', notes: 'cut into wedges' },
      { name: 'Parsley', quantity: 2, unit: 'tbsp', notes: 'for garnish' },
    ],
    steps: [
      { stepNumber: 1, instruction: 'Bring large pot of salted water to boil.', michelinNote: 'Well-salted water seasons the shrimp.' },
      { stepNumber: 2, instruction: 'Add shrimp, cook 2-3 minutes until pink and curled.', michelinNote: 'Don\'t overcook - they become rubbery.' },
      { stepNumber: 3, instruction: 'Immediately transfer to ice bath to stop cooking.', michelinNote: 'Ice bath sets the texture.' },
      { stepNumber: 4, instruction: 'Drain and chill. Serve with cocktail sauce and lemon.', michelinNote: 'Cold shrimp taste sweeter.' },
    ]
  },
  'spinach-dip': {
    ingredients: [
      { name: 'Frozen spinach', quantity: 300, unit: 'g', notes: 'thawed and drained' },
      { name: 'Sour cream', quantity: 240, unit: 'ml' },
      { name: 'Mayonnaise', quantity: 120, unit: 'ml' },
      { name: 'Artichoke hearts', quantity: 200, unit: 'g', notes: 'chopped' },
      { name: 'Parmesan', quantity: 80, unit: 'g', notes: 'grated' },
      { name: 'Garlic', quantity: 3, unit: 'cloves', notes: 'minced' },
    ],
    steps: [
      { stepNumber: 1, instruction: 'Squeeze all water from spinach.', michelinNote: 'Too much water makes dip runny.' },
      { stepNumber: 2, instruction: 'Mix sour cream, mayonnaise, garlic, and parmesan.', michelinNote: 'Room temperature ingredients mix smoother.' },
      { stepNumber: 3, instruction: 'Fold in spinach and chopped artichokes.', michelinNote: 'Don\'t overmix.' },
      { stepNumber: 4, instruction: 'Bake at 350F for 25 minutes until bubbly.', michelinNote: 'Serve with tortilla chips or bread.' },
    ]
  },
  'egg-rolls': {
    ingredients: [
      { name: 'Egg roll wrappers', quantity: 12, unit: 'pcs' },
      { name: 'Ground pork', quantity: 300, unit: 'g' },
      { name: 'Cabbage', quantity: 200, unit: 'g', notes: 'shredded' },
      { name: 'Carrots', quantity: 1, unit: 'medium', notes: 'julienned' },
      { name: 'Soy sauce', quantity: 30, unit: 'ml' },
      { name: 'Sesame oil', quantity: 15, unit: 'ml' },
    ],
    steps: [
      { stepNumber: 1, instruction: 'Brown pork with soy sauce. Set aside.', michelinNote: 'Cook pork until no pink remains.' },
      { stepNumber: 2, instruction: 'Sauté cabbage and carrots until wilted.', michelinNote: 'Don\'t overcook - they should still have crunch.' },
      { stepNumber: 3, instruction: 'Mix with pork. Cool completely before wrapping.', michelinNote: 'Hot filling steams the wrapper.' },
      { stepNumber: 4, instruction: 'Roll up tightly, seal with water.', michelinNote: 'Seal edges firmly to prevent opening.' },
      { stepNumber: 5, instruction: 'Fry at 350F until golden, about 4-5 minutes.', michelinNote: 'Don\'t overcrowd the fryer.' },
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
