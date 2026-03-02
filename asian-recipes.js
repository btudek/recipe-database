const { Client } = require('pg');
const client = new Client({ host: 'db.ycwbumsmlikiquplkdln.supabase.co', port: 5432, database: 'postgres', user: 'postgres', password: process.env.DBPASS });

const RECIPES = {
  'bibimbap': {
    ingredients: [
      { name: 'Short-grain rice', quantity: 400, unit: 'g' },
      { name: 'Beef sirloin', quantity: 200, unit: 'g', notes: 'thinly sliced' },
      { name: 'Spinach', quantity: 200, unit: 'g' },
      { name: 'Bean sprouts', quantity: 100, unit: 'g' },
      { name: 'Carrots', quantity: 1, unit: 'medium', notes: 'julienned' },
      { name: 'Zucchini', quantity: 1, unit: 'medium', notes: 'julienned' },
      { name: 'Shiitake mushrooms', quantity: 100, unit: 'g' },
      { name: 'Egg', quantity: 4, unit: 'pcs' },
      { name: 'Gochujang', quantity: 3, unit: 'tbsp' },
      { name: 'Sesame oil', quantity: 2, unit: 'tbsp' },
      { name: 'Soy sauce', quantity: 2, unit: 'tbsp' },
    ],
    steps: [
      { stepNumber: 1, instruction: 'Cook rice according to package directions. Keep warm.', michelinNote: 'A slightly firmer texture works better for bibimbap.' },
      { stepNumber: 2, instruction: 'Marinate beef in soy sauce, sesame oil, and garlic for 30 minutes.', michelinNote: 'Thin slices marinate faster and cook more evenly.' },
      { stepNumber: 3, instruction: 'Blanch spinach and bean sprouts separately. Season with sesame oil and salt.', michelinNote: 'Shock in ice water to preserve vibrant color.' },
      { stepNumber: 4, instruction: 'Sauté carrots, zucchini, and mushrooms separately until tender.', michelinNote: 'Each vegetable should be cooked individually to maintain distinct flavors.' },
      { stepNumber: 5, instruction: 'Cook eggs sunny-side up. Assemble bowl with rice and vegetables. Top with beef and egg.', michelinNote: 'Presentation matters - arrange vegetables in colored sections.' },
      { stepNumber: 6, instruction: 'Serve with gochujang. Mix everything together before eating.', michelinNote: 'The mixing is essential - it combines all flavors.' },
    ]
  },
  'gyoza': {
    ingredients: [
      { name: 'Ground pork', quantity: 300, unit: 'g' },
      { name: 'Napa cabbage', quantity: 200, unit: 'g', notes: 'finely chopped' },
      { name: 'Green onions', quantity: 3, unit: 'stalks', notes: 'minced' },
      { name: 'Ginger', quantity: 1, unit: 'tbsp', notes: 'grated' },
      { name: 'Garlic', quantity: 2, unit: 'cloves', notes: 'minced' },
      { name: 'Soy sauce', quantity: 2, unit: 'tbsp' },
      { name: 'Sesame oil', quantity: 1, unit: 'tbsp' },
      { name: 'Gyoza wrappers', quantity: 40, unit: 'pcs' },
      { name: 'Dipping sauce', quantity: 50, unit: 'ml', notes: 'soy sauce + rice vinegar' },
    ],
    steps: [
      { stepNumber: 1, instruction: 'Salt cabbage and let sit for 15 minutes. Squeeze out excess water.', michelinNote: 'Too much water makes gyoza soggy.' },
      { stepNumber: 2, instruction: 'Mix pork, cabbage, green onions, ginger, garlic, soy sauce, and sesame oil.', michelinNote: 'Mix in one direction for better texture.' },
      { stepNumber: 3, instruction: 'Place filling in center of wrapper. Wet edges, fold and pleat.', michelinNote: '8-10 pleats give classic look and better seal.' },
      { stepNumber: 4, instruction: 'Heat oil in non-stick pan. Place gyoza in single layer. Pan-fry until bottoms golden.', michelinNote: 'The pan-fry creates the signature crispy bottom.' },
      { stepNumber: 5, instruction: 'Add water, cover, and steam until water evaporates, about 3 minutes.', michelinNote: 'The steam cooks the filling while the bottom stays crispy.' },
      { stepNumber: 6, instruction: 'Uncover and cook until bottoms are crispy again. Serve with dipping sauce.', michelinNote: 'Double-frying creates extra crispiness.' },
    ]
  },
  'pho': {
    ingredients: [
      { name: 'Beef bones', quantity: 1500, unit: 'g' },
      { name: 'Beef brisket', quantity: 500, unit: 'g' },
      { name: 'Onion', quantity: 2, unit: 'large', notes: 'halved' },
      { name: 'Ginger', quantity: 100, unit: 'g', notes: 'halved' },
      { name: 'Star anise', quantity: 5, unit: 'pcs' },
      { name: 'Cinnamon stick', quantity: 1, unit: 'pcs' },
      { name: 'Fish sauce', quantity: 60, unit: 'ml' },
      { name: 'Rice noodles', quantity: 400, unit: 'g' },
      { name: 'Bean sprouts', quantity: 150, unit: 'g' },
      { name: 'Thai basil', quantity: 1, unit: 'bunch' },
      { name: 'Lime', quantity: 2, unit: 'pcs' },
    ],
    steps: [
      { stepNumber: 1, instruction: 'Char onion and ginger under broiler until blackened. Set aside.', michelinNote: 'Charring adds smoky depth to the broth.' },
      { stepNumber: 2, instruction: 'Blanch bones in boiling water for 10 minutes. Drain and rinse.', michelinNote: 'This removes impurities for a cleaner broth.' },
      { stepNumber: 3, instruction: 'Simmer bones, brisket, charred aromatics, and spices for 3-4 hours.', michelinNote: 'Low and slow extracts maximum flavor.' },
      { stepNumber: 4, instruction: 'Remove brisket when tender. Slice thin against the grain.', michelinNote: 'The brisket will be added back to the bowl.' },
      { stepNumber: 5, instruction: 'Strain broth. Season with fish sauce and sugar.', michelinNote: 'Balance is key - taste and adjust.' },
      { stepNumber: 6, instruction: 'Cook noodles. Assemble bowls with noodles, broth, meat, and garnishes.', michelinNote: 'Fresh herbs and lime are essential - don\'t skip them.' },
    ]
  },
  'biryani': {
    ingredients: [
      { name: 'Basmati rice', quantity: 500, unit: 'g' },
      { name: 'Chicken thighs', quantity: 750, unit: 'g', notes: 'cut into pieces' },
      { name: 'Yogurt', quantity: 200, unit: 'ml' },
      { name: 'Onions', quantity: 3, unit: 'large', notes: 'sliced' },
      { name: 'Ginger-garlic paste', quantity: 3, unit: 'tbsp' },
      { name: 'Biryani masala', quantity: 2, unit: 'tbsp' },
      { name: 'Saffron', quantity: 1, unit: 'pinch', notes: 'soaked in milk' },
      { name: 'Ghee', quantity: 100, unit: 'g' },
      { name: 'Mint', quantity: 1, unit: 'bunch' },
      { name: 'Fried onions', quantity: 100, unit: 'g' },
    ],
    steps: [
      { stepNumber: 1, instruction: 'Marinate chicken in yogurt, ginger-garlic paste, and spices for 2 hours.', michelinNote: 'The yogurt tenderizes the chicken and adds flavor.' },
      { stepNumber: 2, instruction: 'Fry sliced onions in ghee until golden brown. Set aside for garnishing.', michelinNote: 'Low heat - don\'t burn them or they become bitter.' },
      { stepNumber: 3, instruction: 'Cook marinated chicken until 80% done. Set aside.', michelinNote: 'It will finish cooking with the rice.' },
      { stepNumber: 4, instruction: 'Par-cook rice with whole spices. Drain and set aside.', michelinNote: 'The rice should still have a white center.' },
      { stepNumber: 5, instruction: 'Layer chicken and rice in pot. Add saffron milk and fried onions.', michelinNote: 'Seal with dough or foil for dum cooking.' },
      { stepNumber: 6, instruction: 'Cook on low heat for 25 minutes. Let rest 5 minutes before opening.', michelinNote: 'The steam finishes cooking everything together.' },
    ]
  },
  'samosa': {
    ingredients: [
      { name: 'All-purpose flour', quantity: 300, unit: 'g' },
      { name: 'Ghee', quantity: 60, unit: 'g' },
      { name: 'Potatoes', quantity: 400, unit: 'g', notes: 'boiled and mashed' },
      { name: 'Peas', quantity: 100, unit: 'g', notes: 'boiled' },
      { name: 'Cumin seeds', quantity: 1, unit: 'tsp' },
      { name: 'Ginger', quantity: 1, unit: 'tbsp', notes: 'grated' },
      { name: 'Green chili', quantity: 2, unit: 'pcs', notes: 'minced' },
      { name: 'Coriander', quantity: 2, unit: 'tbsp', notes: 'fresh, chopped' },
      { name: 'Amchur powder', quantity: 1, unit: 'tsp' },
      { name: 'Oil', quantity: 500, unit: 'ml', notes: 'for frying' },
    ],
    steps: [
      { stepNumber: 1, instruction: 'Make dough: mix flour, ghee, and salt. Add water gradually. Rest for 30 minutes.', michelinNote: 'Resting makes dough more pliable and less shrink-y.' },
      { stepNumber: 2, instruction: 'Fry cumin seeds. Add ginger, green chili, and sauté.', michelinNote: 'Toast spices in oil to bloom their flavor.' },
      { stepNumber: 3, instruction: 'Add potatoes, peas, and spices. Cook for 5 minutes. Cool completely.', michelinNote: 'Filling must be cool or it steams the dough.' },
      { stepNumber: 4, instruction: 'Roll dough into oval shapes. Cut in half. Form cones.', michelinNote: 'Seal edges with water and crimp with fork.' },
      { stepNumber: 5, instruction: 'Fill cones with potato mixture. Seal top edge.', michelinNote: 'Don\'t overfill - it will burst when frying.' },
      { stepNumber: 6, instruction: 'Fry on medium-low heat until golden brown and crispy.', michelinNote: 'Low heat cooks inside without burning outside.' },
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
