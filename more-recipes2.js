const { Client } = require('pg');
const client = new Client({ host: 'db.ycwbumsmlikiquplkdln.supabase.co', port: 5432, database: 'postgres', user: 'postgres', password: process.env.DBPASS });

const RECIPES = {
  'fettuccine-alfredo': {
    ingredients: [
      { name: 'Fettuccine pasta', quantity: 400, unit: 'g' },
      { name: 'Butter', quantity: 100, unit: 'g' },
      { name: 'Heavy cream', quantity: 300, unit: 'ml' },
      { name: 'Parmesan cheese', quantity: 150, unit: 'g', notes: 'freshly grated' },
      { name: 'Nutmeg', quantity: 0.25, unit: 'tsp', notes: 'freshly grated' },
      { name: 'Black pepper', quantity: 1, unit: 'tsp', notes: 'freshly ground' },
    ],
    steps: [
      { stepNumber: 1, instruction: 'Cook fettuccine in salted boiling water until al dente.', michelinNote: 'Save 1 cup pasta water before draining.' },
      { stepNumber: 2, instruction: 'Melt butter in a large pan over medium heat.', michelinNote: 'Use a wide pan for faster reduction.' },
      { stepNumber: 3, instruction: 'Add cream and simmer until slightly thickened, about 5 minutes.', michelinNote: 'Watch carefully - cream can boil over quickly.' },
      { stepNumber: 4, instruction: 'Add parmesan and stir until melted. Season with nutmeg and pepper.', michelinNote: 'Add pasta water to thin if needed.' },
      { stepNumber: 5, instruction: 'Toss pasta in sauce. Serve immediately with extra parmesan.', michelinNote: 'Work quickly - sauce thickens as it cools.' },
    ]
  },
  'mushroom-risotto': {
    ingredients: [
      { name: 'Arborio rice', quantity: 300, unit: 'g' },
      { name: 'Mixed mushrooms', quantity: 300, unit: 'g', notes: 'cremini, shiitake' },
      { name: 'Vegetable stock', quantity: 1000, unit: 'ml', notes: 'kept warm' },
      { name: 'White wine', quantity: 150, unit: 'ml' },
      { name: 'Shallots', quantity: 2, unit: 'medium', notes: 'finely diced' },
      { name: 'Parmesan', quantity: 80, unit: 'g' },
      { name: 'Butter', quantity: 50, unit: 'g' },
      { name: 'Fresh thyme', quantity: 4, unit: 'sprigs' },
    ],
    steps: [
      { stepNumber: 1, instruction: 'Sauté mushrooms in butter until golden. Season and set aside.', michelinNote: 'Cook mushrooms in batches for proper browning.' },
      { stepNumber: 2, instruction: 'Sauté shallots until soft. Add rice and toast for 2 minutes.', michelinNote: 'Toasting the rice is essential for texture.' },
      { stepNumber: 3, instruction: 'Add wine and stir until absorbed.', michelinNote: 'The wine adds acidity to balance the richness.' },
      { stepNumber: 4, instruction: 'Add warm stock one ladle at a time, stirring constantly.', michelinNote: 'Slow addition creates creamy texture.' },
      { stepNumber: 5, instruction: 'When rice is tender, fold in mushrooms, parmesan, and butter.', michelinNote: 'Mantecatura - this finishing step is key.' },
    ]
  },
  'guacamole': {
    ingredients: [
      { name: 'Ripe avocados', quantity: 4, unit: 'pcs' },
      { name: 'Lime juice', quantity: 45, unit: 'ml' },
      { name: 'Red onion', quantity: 0.5, unit: 'cup', notes: 'finely diced' },
      { name: 'Cilantro', quantity: 4, unit: 'tbsp', notes: 'chopped' },
      { name: 'Jalapeno', quantity: 1, unit: 'pcs', notes: 'seeded and minced' },
      { name: 'Roma tomato', quantity: 1, unit: 'medium', notes: 'diced' },
      { name: 'Garlic', quantity: 1, unit: 'clove', notes: 'minced' },
      { name: 'Salt', quantity: 1, unit: 'tsp' },
    ],
    steps: [
      { stepNumber: 1, instruction: 'Cut avocados in half. Remove pit. Scoop into bowl.', michelinNote: 'Use ripe avocados - they should give slightly.' },
      { stepNumber: 2, instruction: 'Mash with fork to desired consistency. Leave some chunks.', michelinNote: 'Chunky guacamole has better texture.' },
      { stepNumber: 3, instruction: 'Add onion, cilantro, jalapeño, tomato, garlic, and lime juice.', michelinNote: 'Add lime juice immediately to prevent browning.' },
      { stepNumber: 4, instruction: 'Mix gently. Taste and adjust seasoning.', michelinNote: 'Let sit 10 minutes for flavors to meld.' },
    ]
  },
  'buffalo-wings': {
    ingredients: [
      { name: 'Chicken wings', quantity: 1000, unit: 'g', notes: 'drumettes and flats' },
      { name: 'Vegetable oil', quantity: 500, unit: 'ml', notes: 'for frying' },
      { name: 'Butter', quantity: 60, unit: 'g' },
      { name: 'Hot sauce', quantity: 120, unit: 'ml', notes: 'like Franks RedHot' },
      { name: 'Garlic powder', quantity: 1, unit: 'tsp' },
      { name: 'Ranch dressing', quantity: 100, unit: 'ml' },
      { name: 'Celery', quantity: 4, unit: 'stalks', notes: 'cut into sticks' },
    ],
    steps: [
      { stepNumber: 1, instruction: 'Pat wings completely dry. This is crucial for crispy skin.', michelinNote: 'Wet wings will steam instead of frying.' },
      { stepNumber: 2, instruction: 'Heat oil to 375F. Fry wings in batches for 10-12 minutes.', michelinNote: 'Internal temp should reach 165F.' },
      { stepNumber: 3, instruction: 'Melt butter, mix with hot sauce and garlic powder.', michelinNote: 'The butter helps sauce cling to wings.' },
      { stepNumber: 4, instruction: 'Toss fried wings in buffalo sauce.', michelinNote: 'Don\'t let wings sit too long or they get soggy.' },
      { stepNumber: 5, instruction: 'Serve with ranch and celery sticks.', michelinNote: 'Cool ranch balances the heat.' },
    ]
  },
  'mac-cheese': {
    ingredients: [
      { name: 'Elbow macaroni', quantity: 400, unit: 'g' },
      { name: 'Cheddar cheese', quantity: 300, unit: 'g', notes: 'shredded' },
      { name: 'Gruyere cheese', quantity: 150, unit: 'g', notes: 'shredded' },
      { name: 'Butter', quantity: 60, unit: 'g' },
      { name: 'All-purpose flour', quantity: 60, unit: 'g' },
      { name: 'Milk', quantity: 600, unit: 'ml' },
      { name: 'Dijon mustard', quantity: 1, unit: 'tsp' },
      { name: 'Panko breadcrumbs', quantity: 100, unit: 'g' },
    ],
    steps: [
      { stepNumber: 1, instruction: 'Cook pasta until just shy of al dente. It will finish in oven.', michelinNote: 'Overcooked pasta becomes mushy when baked.' },
      { stepNumber: 2, instruction: 'Make roux: melt butter, whisk in flour, cook 2 minutes.', michelinNote: 'Cook out raw flour taste but don\'t let it brown.' },
      { stepNumber: 3, instruction: 'Gradually add milk, whisking constantly. Simmer until thick.', michelinNote: 'Room temperature milk incorporates more smoothly.' },
      { stepNumber: 4, instruction: 'Remove from heat. Add cheeses and mustard. Stir until melted.', michelinNote: 'Too much heat makes cheese stringy.' },
      { stepNumber: 5, instruction: 'Mix with pasta. Top with breadcrumbs. Bake at 375F for 25 minutes.', michelinNote: 'Breadcrumbs add crucial crunch.' },
    ]
  },
  'pancakes': {
    ingredients: [
      { name: 'All-purpose flour', quantity: 200, unit: 'g' },
      { name: 'Baking powder', quantity: 2, unit: 'tsp' },
      { name: 'Sugar', quantity: 2, unit: 'tbsp' },
      { name: 'Buttermilk', quantity: 350, unit: 'ml' },
      { name: 'Eggs', quantity: 2, unit: 'pcs' },
      { name: 'Butter', quantity: 50, unit: 'g', notes: 'melted' },
      { name: 'Vanilla extract', quantity: 1, unit: 'tsp' },
      { name: 'Maple syrup', quantity: 60, unit: 'ml' },
    ],
    steps: [
      { stepNumber: 1, instruction: 'Mix dry ingredients in a bowl.', michelinNote: 'Whisk well to distribute baking powder.' },
      { stepNumber: 2, instruction: 'Whisk wet ingredients separately. Combine without overmixting.', michelinNote: 'Lumps are okay - overmixting makes tough pancakes.' },
      { stepNumber: 3, instruction: 'Let batter rest 5 minutes.', michelinNote: 'Resting allows flour to fully hydrate.' },
      { stepNumber: 4, instruction: 'Heat griddle to medium. Pour 1/4 cup batter per pancake.', michelinNote: 'Bubbles on surface mean ready to flip.' },
      { stepNumber: 5, instruction: 'Flip when edges look set. Cook 1-2 minutes more.', michelinNote: 'Second side cooks faster.' },
    ]
  },
  'waffles': {
    ingredients: [
      { name: 'All-purpose flour', quantity: 250, unit: 'g' },
      { name: 'Baking powder', quantity: 2, unit: 'tsp' },
      { name: 'Eggs', quantity: 2, unit: 'pcs', notes: 'separated' },
      { name: 'Milk', quantity: 350, unit: 'ml' },
      { name: 'Butter', quantity: 100, unit: 'g', notes: 'melted' },
      { name: 'Sugar', quantity: 2, unit: 'tbsp' },
      { name: 'Vanilla extract', quantity: 1, unit: 'tsp' },
    ],
    steps: [
      { stepNumber: 1, instruction: 'Mix flour, baking powder, and sugar.', michelinNote: 'Sift dry ingredients for lighter waffles.' },
      { stepNumber: 2, instruction: 'Whisk egg yolks with milk, melted butter, and vanilla.', michelinNote: 'Room temperature ingredients mix better.' },
      { stepNumber: 3, instruction: 'Combine wet and dry. Fold in stiff egg whites.', michelinNote: 'Egg whites add fluffiness.' },
      { stepNumber: 4, instruction: 'Heat waffle iron. Pour batter, close lid.', michelinNote: 'Don\'t open early - steam escapes.' },
      { stepNumber: 5, instruction: 'Cook until golden and crisp, about 4-5 minutes.', michelinNote: 'Serve immediately for best texture.' },
    ]
  },
  'bruschetta': {
    ingredients: [
      { name: 'Baguette', quantity: 1, unit: 'loaf', notes: 'sliced diagonally' },
      { name: 'Roma tomatoes', quantity: 4, unit: 'medium', notes: 'diced' },
      { name: 'Garlic', quantity: 3, unit: 'cloves', notes: '2 minced, 1 whole' },
      { name: 'Fresh basil', quantity: 10, unit: 'leaves', notes: 'chiffonade' },
      { name: 'Extra virgin olive oil', quantity: 60, unit: 'ml' },
      { name: 'Balsamic vinegar', quantity: 15, unit: 'ml' },
    ],
    steps: [
      { stepNumber: 1, instruction: 'Toast bread slices until golden. Rub with whole garlic clove.', michelinNote: 'The rubbing adds garlic flavor without raw bite.' },
      { stepNumber: 2, instruction: 'Mix tomatoes, minced garlic, basil, olive oil, and vinegar.', michelinNote: 'Don\'t add salt until just before serving - it draws liquid.' },
      { stepNumber: 3, instruction: 'Season with salt and pepper.', michelinNote: 'Fresh cracked pepper is essential.' },
      { stepNumber: 4, instruction: 'Spoon tomato mixture onto toast. Drizzle with olive oil.', michelinNote: 'Serve immediately so bread doesn\'t get soggy.' },
    ]
  },
  'hummus': {
    ingredients: [
      { name: 'Chickpeas', quantity: 400, unit: 'g', notes: 'canned, drained' },
      { name: 'Tahini', quantity: 60, unit: 'ml' },
      { name: 'Lemon juice', quantity: 45, unit: 'ml' },
      { name: 'Garlic', quantity: 2, unit: 'cloves' },
      { name: 'Cumin', quantity: 0.5, unit: 'tsp' },
      { name: 'Olive oil', quantity: 60, unit: 'ml' },
      { name: 'Paprika', quantity: 1, unit: 'tsp', notes: 'for garnish' },
    ],
    steps: [
      { stepNumber: 1, instruction: 'Blend chickpeas, tahini, lemon juice, garlic, and cumin until smooth.', michelinNote: 'Add ice water if too thick.' },
      { stepNumber: 2, instruction: 'Stream in olive oil while blending.', michelinNote: 'This makes it creamy and smooth.' },
      { stepNumber: 3, instruction: 'Taste and adjust lemon and salt.', michelinNote: 'Best at room temperature.' },
      { stepNumber: 4, instruction: 'Drizzle with olive oil and paprika to serve.', michelinNote: 'A good drizzle of quality oil makes a difference.' },
    ]
  },
  'stuffed-mushrooms': {
    ingredients: [
      { name: 'Cremini mushrooms', quantity: 24, unit: 'pcs', notes: 'large caps' },
      { name: 'Cream cheese', quantity: 225, unit: 'g', notes: 'softened' },
      { name: 'Parmesan', quantity: 60, unit: 'g', notes: 'grated' },
      { name: 'Garlic', quantity: 3, unit: 'cloves', notes: 'minced' },
      { name: 'Fresh parsley', quantity: 3, unit: 'tbsp', notes: 'chopped' },
      { name: 'Breadcrumbs', quantity: 60, unit: 'g' },
      { name: 'Mozzarella', quantity: 60, unit: 'g', notes: 'shredded' },
    ],
    steps: [
      { stepNumber: 1, instruction: 'Remove mushroom stems. Chop stems finely.', michelinNote: 'Use stems in the filling for more flavor.' },
      { stepNumber: 2, instruction: 'Sauté stems with garlic until fragrant. Cool.', michelinNote: 'Let cool before mixing with cheese.' },
      { stepNumber: 3, instruction: 'Mix cream cheese, parmesan, parsley, and mushroom stems.', michelinNote: 'Room temperature cheese mixes smoother.' },
      { stepNumber: 4, instruction: 'Fill mushroom caps. Top with breadcrumbs and mozzarella.', michelinNote: 'Press filling in firmly.' },
      { stepNumber: 5, instruction: 'Bake at 375F for 20 minutes until golden and bubbly.', michelinNote: 'Watch - they go from perfect to burnt quickly.' },
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
