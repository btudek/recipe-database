const { Client } = require('pg');
const client = new Client({ host: 'db.ycwbumsmlikiquplkdln.supabase.co', port: 5432, database: 'postgres', user: 'postgres', password: process.env.DBPASS });

const RECIPES = {
  'enchiladas': {
    ingredients: [
      { name: 'Corn tortillas', quantity: 12, unit: 'pcs' },
      { name: 'Shredded chicken', quantity: 400, unit: 'g' },
      { name: 'Cheddar cheese', quantity: 200, unit: 'g', notes: 'shredded' },
      { name: 'Onion', quantity: 1, unit: 'medium', notes: 'diced' },
      { name: 'Sour cream', quantity: 150, unit: 'ml' },
      { name: 'Enchilada sauce', quantity: 400, unit: 'ml' },
      { name: 'Green chilies', quantity: 100, unit: 'g', notes: 'diced' },
    ],
    steps: [
      { stepNumber: 1, instruction: 'Preheat oven to 375F. Spread some sauce on bottom of baking dish.', michelinNote: 'This prevents sticking and adds flavor.' },
      { stepNumber: 2, instruction: 'Warm tortillas to make them pliable. Fill with chicken and cheese.', michelinNote: 'Too hot or too cold tortillas will crack.' },
      { stepNumber: 3, instruction: 'Roll up tightly and place seam-side down in dish.', michelinNote: 'Tight rolls hold together better.' },
      { stepNumber: 4, instruction: 'Pour remaining sauce over top. Sprinkle with cheese.', michelinNote: 'The cheese creates a golden crust.' },
      { stepNumber: 5, instruction: 'Bake for 20 minutes until bubbly and cheese is melted.', michelinNote: 'Let rest 5 minutes before serving.' },
    ]
  },
  'quesadilla': {
    ingredients: [
      { name: 'Flour tortillas', quantity: 4, unit: 'pcs' },
      { name: 'Cheddar cheese', quantity: 200, unit: 'g', notes: 'shredded' },
      { name: 'Monterey Jack', quantity: 100, unit: 'g', notes: 'shredded' },
      { name: 'Butter', quantity: 30, unit: 'g' },
      { name: 'Salsa', quantity: 100, unit: 'ml' },
      { name: 'Sour cream', quantity: 100, unit: 'ml' },
    ],
    steps: [
      { stepNumber: 1, instruction: 'Heat butter in pan over medium heat.', michelinNote: 'Medium heat prevents burning while melting cheese.' },
      { stepNumber: 2, instruction: 'Place tortilla in pan. Add cheese on half.', michelinNote: 'Adding cheese to only half makes folding easier.' },
      { stepNumber: 3, instruction: 'Fold and press down. Cook until golden, about 2 minutes per side.', michelinNote: 'Pressing helps cheese melt and tortilla stick.' },
      { stepNumber: 4, instruction: 'Cut into wedges. Serve with salsa and sour cream.', michelinNote: 'Fresh salsa brightens the rich cheese.' },
    ]
  },
  'chicken-curry': {
    ingredients: [
      { name: 'Chicken thighs', quantity: 600, unit: 'g', notes: 'cubed' },
      { name: 'Onion', quantity: 2, unit: 'medium', notes: 'diced' },
      { name: 'Tomatoes', quantity: 400, unit: 'g', notes: 'crushed' },
      { name: 'Coconut milk', quantity: 400, unit: 'ml' },
      { name: 'Ginger-garlic paste', quantity: 2, unit: 'tbsp' },
      { name: 'Garam masala', quantity: 2, unit: 'tbsp' },
      { name: 'Turmeric', quantity: 1, unit: 'tsp' },
      { name: 'Cumin', quantity: 1, unit: 'tsp' },
      { name: 'Cilantro', quantity: 2, unit: 'tbsp', notes: 'for garnish' },
    ],
    steps: [
      { stepNumber: 1, instruction: 'Sauté onions until golden. Add ginger-garlic paste.', michelinNote: 'Cook until raw smell disappears.' },
      { stepNumber: 2, instruction: 'Add spices and toast for 1 minute until fragrant.', michelinNote: 'Toasting blooms the spices\' flavors.' },
      { stepNumber: 3, instruction: 'Add tomatoes and cook until oil separates.', michelinNote: 'Oil separation means tomatoes are cooked.' },
      { stepNumber: 4, instruction: 'Add chicken and brown. Pour in coconut milk.', michelinNote: 'Coconut milk adds richness and creaminess.' },
      { stepNumber: 5, instruction: 'Simmer 25 minutes until chicken is tender. Garnish with cilantro.', michelinNote: 'Don\'t rush the simmer - low heat tenderizes chicken.' },
    ]
  },
  'palak-paneer': {
    ingredients: [
      { name: 'Fresh spinach', quantity: 500, unit: 'g' },
      { name: 'Paneer', quantity: 400, unit: 'g', notes: 'cubed' },
      { name: 'Onion', quantity: 1, unit: 'medium' },
      { name: 'Garlic', quantity: 4, unit: 'cloves' },
      { name: 'Green chili', quantity: 2, unit: 'pcs' },
      { name: 'Cream', quantity: 100, unit: 'ml' },
      { name: 'Garam masala', quantity: 1, unit: 'tsp' },
    ],
    steps: [
      { stepNumber: 1, instruction: 'Blanch spinach in boiling water for 2 minutes. Drain and blend to puree.', michelinNote: 'Ice bath preserves vibrant green color.' },
      { stepNumber: 2, instruction: 'Sauté onion, garlic, and green chili until soft.', michelinNote: 'Don\'t brown - we want sweet, not caramelized.' },
      { stepNumber: 3, instruction: 'Add spinach puree and cook for 10 minutes.', michelinNote: 'Cook out raw spinach taste.' },
      { stepNumber: 4, instruction: 'Add paneer cubes and cream. Simmer 5 minutes.', michelinNote: 'Gentle heat keeps paneer soft.' },
      { stepNumber: 5, instruction: 'Finish with garam masala. Serve with naan or rice.', michelinNote: 'A swirl of cream on top looks elegant.' },
    ]
  },
  'dal-makhani': {
    ingredients: [
      { name: 'Whole black lentils', quantity: 250, unit: 'g', notes: 'overnight soaked' },
      { name: 'Kidney beans', quantity: 100, unit: 'g', notes: 'overnight soaked' },
      { name: 'Tomato puree', quantity: 300, unit: 'g' },
      { name: 'Cream', quantity: 100, unit: 'ml' },
      { name: 'Butter', quantity: 50, unit: 'g' },
      { name: 'Garam masala', quantity: 1, unit: 'tbsp' },
      { name: 'Kasar methi', quantity: 1, unit: 'tbsp', notes: 'dried fenugreek' },
    ],
    steps: [
      { stepNumber: 1, instruction: 'Pressure cook lentils until very soft, about 40 minutes.', michelinNote: 'Fully cooked lentils should mash easily.' },
      { stepNumber: 2, instruction: 'Simmer tomato puree with butter until oil separates.', michelinNote: 'This is the base of many Indian curries.' },
      { stepNumber: 3, instruction: 'Add cooked lentils and their liquid. Simmer 30 minutes.', michelinNote: 'The longer it simmers, the better the flavor.' },
      { stepNumber: 4, instruction: 'Add cream, kasar methi, and garam masala.', michelinNote: 'Kasar methi adds signature dal makhani flavor.' },
      { stepNumber: 5, instruction: 'Finish with drizzle of cream. Serve with jeera rice.', michelinNote: 'A pat of butter on top is traditional.' },
    ]
  },
  'naan-bread': {
    ingredients: [
      { name: 'All-purpose flour', quantity: 400, unit: 'g' },
      { name: 'Yogurt', quantity: 150, unit: 'ml' },
      { name: 'Warm milk', quantity: 100, unit: 'ml' },
      { name: 'Active dry yeast', quantity: 7, unit: 'g' },
      { name: 'Sugar', quantity: 1, unit: 'tbsp' },
      { name: 'Garlic', quantity: 4, unit: 'cloves', notes: 'minced' },
      { name: 'Butter', quantity: 50, unit: 'g', notes: 'melted' },
    ],
    steps: [
      { stepNumber: 1, instruction: 'Proof yeast in warm milk with sugar for 10 minutes until foamy.', michelinNote: 'Yeast should double in volume.' },
      { stepNumber: 2, instruction: 'Mix flour, yogurt, and yeast mixture. Knead 10 minutes until smooth.', michelinNote: 'Well-kneaded dough makes soft naan.' },
      { stepNumber: 3, instruction: 'Let dough rise for 1-2 hours until doubled.', michelinNote: 'Warm spot helps dough rise faster.' },
      { stepNumber: 4, instruction: 'Divide into balls. Roll out into ovals. Add garlic butter on top.', michelinNote: 'Traditional naan is hand-stretched, not rolled.' },
      { stepNumber: 5, instruction: 'Cook on very hot skillet or directly over gas flame until charred.', michelinNote: 'High heat creates the characteristic blisters and char.' },
    ]
  },
  'cheesecake': {
    ingredients: [
      { name: 'Cream cheese', quantity: 900, unit: 'g', notes: 'room temperature' },
      { name: 'Sugar', quantity: 200, unit: 'g' },
      { name: 'Eggs', quantity: 4, unit: 'pcs', notes: 'room temperature' },
      { name: 'Sour cream', quantity: 200, unit: 'ml' },
      { name: 'Vanilla extract', quantity: 2, unit: 'tsp' },
      { name: 'Graham crackers', quantity: 200, unit: 'g', notes: 'crushed' },
      { name: 'Butter', quantity: 80, unit: 'g', notes: 'melted' },
    ],
    steps: [
      { stepNumber: 1, instruction: 'Mix crushed graham crackers with melted butter. Press into springform pan.', michelinNote: 'Compact firmly for even crust.' },
      { stepNumber: 2, instruction: 'Beat cream cheese and sugar until smooth and fluffy.', michelinNote: 'Room temperature cheese mixes without lumps.' },
      { stepNumber: 3, instruction: 'Add eggs one at a time. Mix in sour cream and vanilla.', michelinNote: 'Don\'t overmix - incorporate but don\'t whip air in.' },
      { stepNumber: 4, instruction: 'Pour over crust. Bake at 325F for 55-60 minutes.', michelinNote: 'Jiggle in center when done - it will set as it cools.' },
      { stepNumber: 5, instruction: 'Cool slowly in oven with door cracked. Refrigerate overnight.', michelinNote: 'Slow cooling prevents cracks. Overnight is essential.' },
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
    if (!recipeId) {
      console.log('Recipe not found:', slug);
      continue;
    }
    
    const existingIng = await client.query('SELECT COUNT(*) FROM ingredient WHERE recipe_id = $1', [recipeId]);
    if (parseInt(existingIng.rows[0].count) === 0) {
      for (let i = 0; i < data.ingredients.length; i++) {
        const ing = data.ingredients[i];
        await client.query(
          'INSERT INTO ingredient (recipe_id, name, quantity, unit, notes, order_index) VALUES ($1, $2, $3, $4, $5, $6)',
          [recipeId, ing.name, ing.quantity, ing.unit, ing.notes || null, i]
        );
      }
      console.log('Added ingredients for:', slug);
    }
    
    const existingSteps = await client.query('SELECT COUNT(*) FROM recipe_step WHERE recipe_id = $1', [recipeId]);
    if (parseInt(existingSteps.rows[0].count) === 0) {
      for (const step of data.steps) {
        await client.query(
          'INSERT INTO recipe_step (recipe_id, step_number, instruction, michelin_note) VALUES ($1, $2, $3, $4)',
          [recipeId, step.stepNumber, step.instruction, step.michelinNote || null]
        );
      }
      console.log('Added steps for:', slug);
    }
  }
  
  console.log('Done!');
  await client.end();
}

main().catch(console.error);
