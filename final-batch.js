const { Client } = require('pg');
const client = new Client({ host: 'db.ycwbumsmlikiquplkdln.supabase.co', port: 5432, database: 'postgres', user: 'postgres', password: process.env.DBPASS });

const RECIPES = {
  'caesar-wrap': {
    ingredients: [
      { name: 'Flour tortilla', quantity: 2, unit: 'pcs' },
      { name: 'Grilled chicken', quantity: 200, unit: 'g', notes: 'sliced' },
      { name: 'Romaine lettuce', quantity: 100, unit: 'g', notes: 'chopped' },
      { name: 'Parmesan', quantity: 50, unit: 'g', notes: 'shaved' },
      { name: 'Caesar dressing', quantity: 60, unit: 'ml' },
      { name: 'Croutons', quantity: 50, unit: 'g' },
    ],
    steps: [
      { stepNumber: 1, instruction: 'Warm tortilla in pan or microwave.', michelinNote: 'Warm tortillas are more pliable.' },
      { stepNumber: 2, instruction: 'Spread Caesar dressing on tortilla.', michelinNote: 'Don\'t overdo the dressing.' },
      { stepNumber: 3, instruction: 'Layer lettuce, chicken, parmesan, and croutons.', michelinNote: 'Even distribution for each bite.' },
      { stepNumber: 4, instruction: 'Roll up tightly, tucking in sides.', michelinNote: 'Tightly rolled prevents falling apart.' },
    ]
  },
  'sushi-bowl': {
    ingredients: [
      { name: 'Sushi rice', quantity: 300, unit: 'g' },
      { name: 'Salmon', quantity: 150, unit: 'g', notes: 'sashimi grade' },
      { name: 'Avocado', quantity: 1, unit: 'pcs' },
      { name: 'Cucumber', quantity: 1, unit: 'medium' },
      { name: 'Edamame', quantity: 50, unit: 'g' },
      { name: 'Soy sauce', quantity: 30, unit: 'ml' },
      { name: 'Sesame seeds', quantity: 1, unit: 'tbsp' },
    ],
    steps: [
      { stepNumber: 1, instruction: 'Cook sushi rice and season with rice vinegar.', michelinNote: 'Fan rice while cooling for glossy texture.' },
      { stepNumber: 2, instruction: 'Slice salmon and avocado.', michelinNote: 'Thin slices are more flavorful.' },
      { stepNumber: 3, instruction: 'Arrange rice in bowl, top with fish, avocado, cucumber, edamame.', michelinNote: 'Beautiful arrangement makes it appetizing.' },
      { stepNumber: 4, instruction: 'Sprinkle with sesame seeds. Serve with soy sauce.', michelinNote: 'Wasabi on the side is traditional.' },
    ]
  },
  'couscous-salad': {
    ingredients: [
      { name: 'Couscous', quantity: 200, unit: 'g' },
      { name: 'Cucumber', quantity: 1, unit: 'medium' },
      { name: 'Cherry tomatoes', quantity: 200, unit: 'g' },
      { name: 'Feta cheese', quantity: 100, unit: 'g' },
      { name: 'Kalamata olives', quantity: 80, unit: 'g' },
      { name: 'Olive oil', quantity: 60, unit: 'ml' },
      { name: 'Lemon juice', quantity: 30, unit: 'ml' },
    ],
    steps: [
      { stepNumber: 1, instruction: 'Pour boiling water over couscous. Cover and let sit 5 minutes.', michelinNote: 'Fluff with fork after sitting.' },
      { stepNumber: 2, instruction: 'Dice cucumber and tomatoes.', michelinNote: 'Uniform dice looks better.' },
      { stepNumber: 3, instruction: 'Fluff couscous, add vegetables, feta, and olives.', michelinNote: 'Room temperature is best.' },
      { stepNumber: 4, instruction: 'Dress with olive oil and lemon. Season to taste.', michelinNote: 'Let sit 15 minutes for flavors to meld.' },
    ]
  },
  'pilaf': {
    ingredients: [
      { name: 'Basmati rice', quantity: 300, unit: 'g' },
      { name: 'Onion', quantity: 1, unit: 'medium' },
      { name: 'Garlic', quantity: 3, unit: 'cloves' },
      { name: 'Chicken stock', quantity: 600, unit: 'ml' },
      { name: 'Butter', quantity: 50, unit: 'g' },
      { name: 'Cumin seeds', quantity: 1, unit: 'tsp' },
      { name: 'Bay leaf', quantity: 2, unit: 'pcs' },
    ],
    steps: [
      { stepNumber: 1, instruction: 'Sauté onion and garlic in butter until soft.', michelinNote: 'Don\'t brown - we want sweet, not caramelized.' },
      { stepNumber: 2, instruction: 'Add cumin and bay. Toast rice for 2 minutes.', michelinNote: 'Toasting the rice before adding liquid is essential.' },
      { stepNumber: 3, instruction: 'Add stock, bring to boil, reduce to simmer.', michelinNote: 'Low and slow is the key.' },
      { stepNumber: 4, instruction: 'Cover and cook 15 minutes. Fluff with fork.', michelinNote: 'Don\'t lift the lid while cooking.' },
    ]
  },
  'roasted-vegetables': {
    ingredients: [
      { name: 'Zucchini', quantity: 2, unit: 'medium' },
      { name: 'Bell peppers', quantity: 2, unit: 'pcs' },
      { name: 'Cherry tomatoes', quantity: 250, unit: 'g' },
      { name: 'Red onion', quantity: 1, unit: 'large' },
      { name: 'Olive oil', quantity: 60, unit: 'ml' },
      { name: 'Balsamic vinegar', quantity: 30, unit: 'ml' },
      { name: 'Fresh herbs', quantity: 2, unit: 'tbsp', notes: 'thyme, rosemary' },
    ],
    steps: [
      { stepNumber: 1, instruction: 'Cut all vegetables into similar sizes for even cooking.', michelinNote: 'Uniform pieces cook evenly.' },
      { stepNumber: 2, instruction: 'Toss with olive oil, salt, pepper, and herbs.', michelinNote: 'Spread on baking sheet in single layer.' },
      { stepNumber: 3, instruction: 'Roast at 400F for 25-30 minutes, stirring halfway.', michelinNote: 'High heat caramelizes the vegetables.' },
      { stepNumber: 4, instruction: 'Finish with balsamic drizzle.', michelinNote: 'Balsamic adds sweetness and acidity.' },
    ]
  },
  'stuffing': {
    ingredients: [
      { name: 'Bread cubes', quantity: 400, unit: 'g', notes: 'day-old' },
      { name: 'Celery', quantity: 3, unit: 'stalks' },
      { name: 'Onion', quantity: 1, unit: 'medium' },
      { name: 'Butter', quantity: 100, unit: 'g' },
      { name: 'Chicken stock', quantity: 500, unit: 'ml' },
      { name: 'Sage', quantity: 1, unit: 'tbsp', notes: 'dried' },
      { name: 'Egg', quantity: 1, unit: 'pcs' },
    ],
    steps: [
      { stepNumber: 1, instruction: 'Sauté celery and onion in butter until soft.', michelinNote: 'This is the flavor base.' },
      { stepNumber: 2, instruction: 'Toss bread cubes with vegetables and sage.', michelinNote: 'Use day-old bread for better texture.' },
      { stepNumber: 3, instruction: 'Mix stock and egg, pour over bread. Toss to combine.', michelinNote: 'Squeeze bread to absorb liquid.' },
      { stepNumber: 4, instruction: 'Bake at 350F for 40 minutes until golden.', michelinNote: 'Cover if browning too fast.' },
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
