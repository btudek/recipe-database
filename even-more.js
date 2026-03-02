const { Client } = require('pg');
const client = new Client({ host: 'db.ycwbumsmlikiquplkdln.supabase.co', port: 5432, database: 'postgres', user: 'postgres', password: process.env.DBPASS });

const RECIPES_DATA = {
  'tempura': {
    ingredients: [
      { name: 'Shrimp', quantity: 200, unit: 'g', notes: 'large, peeled' },
      { name: 'Sweet potato', quantity: 1, unit: 'medium', notes: 'sliced' },
      { name: 'Zucchini', quantity: 1, unit: 'medium', notes: 'sliced' },
      { name: 'All-purpose flour', quantity: 200, unit: 'g' },
      { name: 'Ice cold water', quantity: 300, unit: 'ml' },
      { name: 'Baking powder', quantity: 1, unit: 'tsp' },
      { name: 'Vegetable oil', quantity: 1000, unit: 'ml', notes: 'for frying' },
    ],
    steps: [
      { stepNumber: 1, instruction: 'Make batter: whisk flour, baking powder, and ice cold water. Do not overmix.', michelinNote: 'Lumpy batter is fine - overmixing makes tempura tough.' },
      { stepNumber: 2, instruction: 'Heat oil to 350F (175C). The right temperature is crucial.', michelinNote: 'Use a thermometer - too hot burns outside, too cool makes it greasy.' },
      { stepNumber: 3, instruction: 'Dip vegetables in batter, shake off excess, and fry until golden.', michelinNote: 'Fry in batches - overcrowding drops oil temperature.' },
      { stepNumber: 4, instruction: 'Fry shrimp last - they cook faster. 2-3 minutes max.', michelinNote: 'Shrimp should be light golden, not brown.' },
      { stepNumber: 5, instruction: 'Drain on paper towels. Serve immediately with dipping sauce.', michelinNote: 'Tempura is best eaten immediately while crispy.' },
    ]
  },
  'teriyaki-chicken': {
    ingredients: [
      { name: 'Chicken thighs', quantity: 600, unit: 'g', notes: 'boneless' },
      { name: 'Soy sauce', quantity: 80, unit: 'ml' },
      { name: 'Mirin', quantity: 60, unit: 'ml' },
      { name: 'Sake', quantity: 30, unit: 'ml' },
      { name: 'Brown sugar', quantity: 3, unit: 'tbsp' },
      { name: 'Ginger', quantity: 1, unit: 'inch', notes: 'grated' },
      { name: 'Garlic', quantity: 2, unit: 'cloves', notes: 'minced' },
    ],
    steps: [
      { stepNumber: 1, instruction: 'Mix soy sauce, mirin, sake, sugar, ginger, and garlic for teriyaki sauce.', michelinNote: 'Warm the mixture slightly to help dissolve the sugar.' },
      { stepNumber: 2, instruction: 'Marinate chicken for 30 minutes or overnight.', michelinNote: 'Longer marination = deeper flavor.' },
      { stepNumber: 3, instruction: 'Pan-fry or grill chicken over medium-high heat until caramelized.', michelinNote: 'Don\'t move the chicken too much - let it develop color.' },
      { stepNumber: 4, instruction: 'Add remaining marinade to pan, simmer until thickened.', michelinNote: 'Watch carefully - it can go from thick to burnt quickly.' },
      { stepNumber: 5, instruction: 'Slice chicken and serve with sauce drizzled on top.', michelinNote: 'Rest for 2 minutes before slicing to retain juices.' },
    ]
  },
  'coq-au-vin': {
    ingredients: [
      { name: 'Chicken pieces', quantity: 1500, unit: 'g' },
      { name: 'Red wine', quantity: 750, unit: 'ml', notes: 'Burgundy' },
      { name: 'Bacon', quantity: 200, unit: 'g', notes: 'lardons' },
      { name: 'Pearl onions', quantity: 250, unit: 'g' },
      { name: 'Mushrooms', quantity: 250, unit: 'g' },
      { name: 'Carrots', quantity: 3, unit: 'medium', notes: 'chunked' },
      { name: 'Chicken stock', quantity: 250, unit: 'ml' },
      { name: 'Tomato paste', quantity: 2, unit: 'tbsp' },
      { name: 'Fresh thyme', quantity: 4, unit: 'sprigs' },
      { name: 'Bay leaves', quantity: 2, unit: 'pcs' },
    ],
    steps: [
      { stepNumber: 1, instruction: 'Brown chicken pieces in batches in a large Dutch oven. Set aside.', michelinNote: 'Don\'t crowd - each piece needs space to brown properly.' },
      { stepNumber: 2, instruction: 'Cook bacon until crispy. Remove and set aside with chicken.', michelinNote: 'Use the bacon fat to brown the chicken - it adds flavor.' },
      { stepNumber: 3, instruction: 'Sauté onions, carrots, and mushrooms until golden.', michelinNote: 'Don\'t rush this step - deeply browned vegetables build flavor.' },
      { stepNumber: 4, instruction: 'Add tomato paste, then wine and stock. Return chicken and bacon.', michelinNote: 'Use a good wine - you can taste it in the final dish.' },
      { stepNumber: 5, instruction: 'Cover and braise in 325F oven for 1.5 hours until tender.', michelinNote: 'Low and slow breaks down collagen into gelatin for silky sauce.' },
    ]
  },
  'kung-pao-chicken': {
    ingredients: [
      { name: 'Chicken breast', quantity: 400, unit: 'g', notes: 'cubed' },
      { name: 'Dried red chilies', quantity: 8, unit: 'pcs' },
      { name: 'Sichuan peppercorns', quantity: 1, unit: 'tsp' },
      { name: 'Peanuts', quantity: 80, unit: 'g', notes: 'roasted' },
      { name: 'Soy sauce', quantity: 2, unit: 'tbsp' },
      { name: 'Rice vinegar', quantity: 1, unit: 'tbsp' },
      { name: 'Sugar', quantity: 1, unit: 'tsp' },
      { name: 'Garlic', quantity: 3, unit: 'cloves', notes: 'minced' },
      { name: 'Ginger', quantity: 1, unit: 'inch', notes: 'minced' },
      { name: 'Green onions', quantity: 4, unit: 'stalks' },
    ],
    steps: [
      { stepNumber: 1, instruction: 'Mix soy sauce, vinegar, and sugar for sauce. Set aside.', michelinNote: 'Have everything ready before you start cooking - this dish comes together fast.' },
      { stepNumber: 2, instruction: 'Heat wok until smoking. Add oil, then chilies and peppercorns.', michelinNote: 'The chilies should darken slightly but not burn.' },
      { stepNumber: 3, instruction: 'Add chicken and stir-fry until cooked through, about 3 minutes.', michelinNote: 'Keep everything moving in the wok for even cooking.' },
      { stepNumber: 4, instruction: 'Add garlic, ginger, and half the peanuts. Pour in sauce.', michelinNote: 'The sauce should sizzle and immediately coat the chicken.' },
      { stepNumber: 5, instruction: 'Garnish with remaining peanuts and green onions.', michelinNote: 'The fresh green onions add brightness to balance the richness.' },
    ]
  },
  'french-onion-soup': {
    ingredients: [
      { name: 'Yellow onions', quantity: 1000, unit: 'g', notes: 'thinly sliced' },
      { name: 'Butter', quantity: 60, unit: 'g' },
      { name: 'Beef stock', quantity: 1500, unit: 'ml' },
      { name: 'Dry white wine', quantity: 250, unit: 'ml' },
      { name: 'French bread', quantity: 200, unit: 'g', notes: 'sliced' },
      { name: 'Gruyere cheese', quantity: 300, unit: 'g', notes: 'grated' },
      { name: 'Fresh thyme', quantity: 4, unit: 'sprigs' },
      { name: 'Bay leaf', quantity: 1, unit: 'pcs' },
    ],
    steps: [
      { stepNumber: 1, instruction: 'Melt butter over medium-low heat. Add onions and cook slowly for 45-60 minutes until deeply caramelized.', michelinNote: 'Low and slow is the secret - don\'t rush the onions.' },
      { stepNumber: 2, instruction: 'Add wine and scrape up any browned bits from the pan.', michelinNote: 'Those browned bits (fond) contain intense flavor.' },
      { stepNumber: 3, instruction: 'Add stock, thyme, and bay leaf. Simmer for 30 minutes.', michelinNote: 'The longer it simmers, the more the flavors develop.' },
      { stepNumber: 4, instruction: 'Toast bread slices. Ladle soup into oven-safe bowls.', michelinNote: 'Use bread that can stand up to the soup.' },
      { stepNumber: 5, instruction: 'Top with bread and cheese. Broil until cheese is bubbly and golden.', michelinNote: 'Watch carefully under the broiler - it goes from perfect to burnt fast.' },
    ]
  },
};

async function main() {
  await client.connect();
  
  const recipeResult = await client.query('SELECT id, slug FROM recipe');
  const recipeMap = {};
  recipeResult.rows.forEach(r => recipeMap[r.slug] = r.id);
  
  for (const [slug, data] of Object.entries(RECIPES_DATA)) {
    const recipeId = recipeMap[slug];
    if (!recipeId) {
      console.log('Recipe not found:', slug);
      continue;
    }
    
    // Check ingredients
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
    
    // Check steps
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
