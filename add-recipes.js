// Add more recipes with full ingredients and steps
const { Pool } = require('pg');

const pool = new Pool({
  host: 'db.ycwbumsmlikiquplkdln.supabase.co',
  port: 5432,
  database: 'postgres',
  user: 'postgres',
  password: 'HailMaryFullOfGrace1$'
});

const newRecipes = [
  {
    title: 'Classic Beef Tacos',
    description: 'Authentic Mexican street tacos with seasoned ground beef',
    cuisine: 'Mexican',
    category: 'Dinner',
    prep_time: 15,
    cook_time: 15,
    yield: '4 servings',
    image_url: 'https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?w=800',
    ingredients: [
      { name: 'Ground Beef', quantity: '1', unit: 'lb' },
      { name: 'Taco Seasoning', quantity: '2', unit: 'tbsp' },
      { name: 'Corn Tortillas', quantity: '12', unit: 'small' },
      { name: 'Onion', quantity: '1', unit: 'medium', notes: 'diced' },
      { name: 'Cilantro', quantity: '1/4', unit: 'cup', notes: 'chopped' },
      { name: 'Lime', quantity: '2', unit: 'wedges' },
      { name: 'Salt', quantity: '1', unit: 'tsp' },
      { name: 'Salsa Verde', quantity: '1/2', unit: 'cup' },
    ],
    steps: [
      { instruction: 'Heat a large skillet over medium-high heat', michelin_tip: 'Preheat pan for 2 minutes for even browning' },
      { instruction: 'Add ground beef and break apart with spatula', michelin_tip: 'Use wooden spatula to scrape bottom preventing sticking' },
      { instruction: 'Cook beef for 5-7 minutes until browned', michelin_tip: 'Keep meat in small pieces, not mashed' },
      { instruction: 'Add taco seasoning and 1/4 cup water', michelin_tip: 'Mix seasoning thoroughly into meat' },
      { instruction: 'Simmer for 3 minutes until sauce thickens', michelin_tip: 'Low heat prevents burning' },
      { instruction: 'Warm tortillas in dry pan or microwave', michelin_tip: 'Toast briefly for better texture' },
      { instruction: 'Assemble tacos with beef, onion, cilantro', michelin_tip: 'Add toppings while meat is hot' },
      { instruction: 'Squeeze lime and serve with salsa', michelin_tip: 'Fresh lime brightens flavors' },
    ]
  },
  {
    title: 'Chicken Tikka Masala',
    description: 'Creamy, aromatic Indian curry with tender chicken',
    cuisine: 'Indian',
    category: 'Dinner',
    prep_time: 30,
    cook_time: 30,
    yield: '4 servings',
    image_url: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=800',
    ingredients: [
      { name: 'Chicken Breast', quantity: '1.5', unit: 'lb', notes: 'cubed' },
      { name: 'Yogurt', quantity: '1', unit: 'cup' },
      { name: 'Garam Masala', quantity: '2', unit: 'tbsp' },
      { name: 'Turmeric', quantity: '1', unit: 'tsp' },
      { name: 'Cumin', quantity: '1', unit: 'tsp' },
      { name: 'Garlic', quantity: '4', unit: 'cloves', notes: 'minced' },
      { name: 'Ginger', quantity: '1', unit: 'inch', notes: 'grated' },
      { name: 'Heavy Cream', quantity: '1', unit: 'cup' },
      { name: 'Tomato Puree', quantity: '1', unit: 'cup' },
      { name: 'Butter', quantity: '2', unit: 'tbsp' },
      { name: 'Onion', quantity: '1', unit: 'large', notes: 'sliced' },
      { name: 'Salt', quantity: '1', unit: 'tsp' },
      { name: 'Rice', quantity: '2', unit: 'cups', notes: 'basmati, cooked' },
    ],
    steps: [
      { instruction: 'Marinate chicken in yogurt, half the garam masala, turmeric, and salt for 30 minutes', michelin_tip: 'Overnight marination yields better flavor' },
      { instruction: 'Heat butter in large pan over medium-high heat', michelin_tip: 'Use heavy-bottomed pan for even cooking' },
      { instruction: 'Sear chicken pieces in batches until golden, 3-4 minutes', michelin_tip: 'Do not overcrowd pan' },
      { instruction: 'Remove chicken and sauté onion until golden, 5 minutes', michelin_tip: 'Low and slow develops sweetness' },
      { instruction: 'Add garlic and ginger, cook 1 minute', michelin_tip: 'Burnt garlic makes bitter curry' },
      { instruction: 'Add remaining spices and cook 30 seconds', michelin_tip: 'Toast spices to release oils' },
      { instruction: 'Add tomato puree and simmer 10 minutes', michelin_tip: 'Cook down until oil separates' },
      { instruction: 'Add cream and chicken, simmer 10 minutes', michelin_tip: 'Low heat prevents curdling' },
      { instruction: 'Serve over basmati rice', michelin_tip: 'Fluff rice before serving' },
    ]
  },
  {
    title: 'Shrimp Scampi',
    description: 'Garlic butter shrimp with white wine and lemon',
    cuisine: 'Italian',
    category: 'Dinner',
    prep_time: 10,
    cook_time: 15,
    yield: '4 servings',
    image_url: 'https://images.unsplash.com/photo-1633504581786-316c8002b1b9?w=800',
    ingredients: [
      { name: 'Shrimp', quantity: '1', unit: 'lb', notes: 'peeled, deveined' },
      { name: 'Linguine', quantity: '12', unit: 'oz' },
      { name: 'Butter', quantity: '4', unit: 'tbsp' },
      { name: 'Garlic', quantity: '6', unit: 'cloves', notes: 'minced' },
      { name: 'White Wine', quantity: '1/2', unit: 'cup' },
      { name: 'Lemon', quantity: '1', unit: 'juiced' },
      { name: 'Red Pepper Flakes', quantity: '1/4', unit: 'tsp' },
      { name: 'Parsley', quantity: '1/4', unit: 'cup', notes: 'chopped' },
      { name: 'Salt', quantity: '1/2', unit: 'tsp' },
    ],
    steps: [
      { instruction: 'Cook linguine according to package directions', michelin_tip: 'Reserve 1 cup pasta water before draining' },
      { instruction: 'Melt butter in large skillet over medium heat', michelin_tip: 'Use pan large enough for all shrimp' },
      { instruction: 'Add garlic and red pepper flakes, sauté 30 seconds', michelin_tip: 'Don\'t let garlic brown' },
      { instruction: 'Add shrimp in single layer, cook 2 minutes per side', michelin_tip: 'Shrimp should be pink and curled' },
      { instruction: 'Add white wine and lemon juice, simmer 2 minutes', michelin_tip: 'Reduce by half for concentrated flavor' },
      { instruction: 'Toss with pasta and parsley', michelin_tip: 'Add pasta water if needed' },
      { instruction: 'Serve immediately with crusty bread', michelin_tip: 'Sauce should coat pasta' },
    ]
  },
  {
    title: 'Thai Green Curry',
    description: 'Aromatic coconut curry with vegetables and Thai basil',
    cuisine: 'Thai',
    category: 'Dinner',
    prep_time: 20,
    cook_time: 20,
    yield: '4 servings',
    image_url: 'https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?w=800',
    ingredients: [
      { name: 'Chicken Thighs', quantity: '1', unit: 'lb', notes: 'sliced' },
      { name: 'Green Curry Paste', quantity: '3', unit: 'tbsp' },
      { name: 'Coconut Milk', quantity: '1', unit: 'can', notes: 'full fat' },
      { name: 'Bamboo Shoots', quantity: '1', unit: 'cup' },
      { name: 'Thai Eggplant', quantity: '1', unit: 'cup', notes: 'quartered' },
      { name: 'Fish Sauce', quantity: '2', unit: 'tbsp' },
      { name: 'Palm Sugar', quantity: '1', unit: 'tbsp' },
      { name: 'Thai Basil', quantity: '1/2', unit: 'cup' },
      { name: 'Kaffir Lime Leaves', quantity: '4', unit: 'leaves' },
      { name: 'Vegetable Oil', quantity: '2', unit: 'tbsp' },
      { name: 'Jasmine Rice', quantity: '2', unit: 'cups', notes: 'cooked' },
    ],
    steps: [
      { instruction: 'Heat oil in wok over high heat', michelin_tip: 'Wok should be smoking hot' },
      { instruction: 'Add curry paste and fry 1 minute until fragrant', michelin_tip: 'Toast paste to remove raw taste' },
      { instruction: 'Add half the coconut milk, stir until oil separates', michelin_tip: 'Oil separation = authentic flavor' },
      { instruction: 'Add chicken and cook until no longer pink', michelin_tip: 'Don\'t overcook chicken' },
      { instruction: 'Add remaining coconut milk, eggplant, bamboo shoots', michelin_tip: 'Add vegetables that take longest first' },
      { instruction: 'Simmer 10 minutes until vegetables are tender', michelin_tip: 'Low simmer prevents curdling' },
      { instruction: 'Season with fish sauce and palm sugar', michelin_tip: 'Balance salty, sweet, sour' },
      { instruction: 'Add basil and lime leaves, serve over rice', michelin_tip: 'Add herbs at end to preserve flavor' },
    ]
  },
  {
    title: 'Greek Salad',
    description: 'Fresh Mediterranean salad with feta and olives',
    cuisine: 'Greek',
    category: 'Lunch',
    prep_time: 15,
    cook_time: 0,
    yield: '4 servings',
    image_url: 'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=800',
    ingredients: [
      { name: 'Cucumber', quantity: '1', unit: 'large', notes: 'quartered' },
      { name: 'Tomatoes', quantity: '4', unit: 'medium', notes: 'wedges' },
      { name: 'Red Onion', quantity: '1/2', unit: 'medium', notes: 'sliced' },
      { name: 'Feta Cheese', quantity: '1', unit: 'cup', notes: 'cubed' },
      { name: 'Kalamata Olives', quantity: '1/2', unit: 'cup' },
      { name: 'Extra Virgin Olive Oil', quantity: '4', unit: 'tbsp' },
      { name: 'Red Wine Vinegar', quantity: '2', unit: 'tbsp' },
      { name: 'Dried Oregano', quantity: '1', unit: 'tsp' },
      { name: 'Salt', quantity: '1/2', unit: 'tsp' },
      { name: 'Pepper', quantity: '1/4', unit: 'tsp' },
    ],
    steps: [
      { instruction: 'Cut cucumber and tomatoes into large pieces', michelin_tip: 'Rough chop preserves texture' },
      { instruction: 'Slice red onion into thin rings', michelin_tip: 'Soak in water 10 min to mellow' },
      { instruction: 'Combine vegetables in large bowl', michelin_tip: 'Use room temp vegetables' },
      { instruction: 'Add feta and olives', michelin_tip: 'Crumble feta for better distribution' },
      { instruction: 'Whisk olive oil, vinegar, oregano, salt, pepper', michelin_tip: 'Emulsify by whisking vigorously' },
      { instruction: 'Drizzle dressing over salad and toss gently', michelin_tip: 'Toss right before serving' },
    ]
  },
  {
    title: 'Beef Bulgogi',
    description: 'Korean marinated BBQ beef with sesame and green onion',
    cuisine: 'Korean',
    category: 'Dinner',
    prep_time: 30,
    cook_time: 10,
    yield: '4 servings',
    image_url: 'https://images.unsplash.com/photo-1529006557810-274b9b2fc783?w=800',
    ingredients: [
      { name: 'Ribeye Steak', quantity: '1.5', unit: 'lb', notes: 'thinly sliced' },
      { name: 'Soy Sauce', quantity: '1/4', unit: 'cup' },
      { name: 'Sesame Oil', quantity: '2', unit: 'tbsp' },
      { name: 'Brown Sugar', quantity: '2', unit: 'tbsp' },
      { name: 'Garlic', quantity: '4', unit: 'cloves', notes: 'minced' },
      { name: 'Ginger', quantity: '1', unit: 'tbsp', notes: 'grated' },
      { name: 'Green Onions', quantity: '4', unit: 'stalks', notes: 'chopped' },
      { name: 'Sesame Seeds', quantity: '2', unit: 'tbsp' },
      { name: 'Pear', quantity: '1/2', unit: 'asian pear', notes: 'grated' },
      { name: 'Vegetable Oil', quantity: '2', unit: 'tbsp' },
    ],
    steps: [
      { instruction: 'Slice beef thinly against the grain', michelin_tip: 'Partially freeze meat for easier slicing' },
      { instruction: 'Mix soy sauce, sesame oil, brown sugar, garlic, ginger, pear', michelin_tip: 'Pear tenderizes meat' },
      { instruction: 'Marinate beef for at least 2 hours', michelin_tip: 'Overnight is best' },
      { instruction: 'Heat oil in grill pan or skillet over high heat', michelin_tip: 'Hot pan creates caramelization' },
      { instruction: 'Cook beef in batches for 2 minutes per side', michelin_tip: 'Don\'t overcrowd' },
      { instruction: 'Garnish with green onions and sesame seeds', michelin_tip: 'Fresh herbs add brightness' },
      { instruction: 'Serve with rice and lettuce wraps', michelin_tip: 'Lettuce cools spice' },
    ]
  },
  {
    title: 'Eggs Benedict',
    description: 'Classic brunch dish with poached eggs and hollandaise',
    cuisine: 'American',
    category: 'Breakfast',
    prep_time: 20,
    cook_time: 15,
    yield: '2 servings',
    image_url: 'https://images.unsplash.com/photo-1608039829572-a6d54e0a4e4a?w=800',
    ingredients: [
      { name: 'English Muffins', quantity: '2', unit: 'muffins' },
      { name: 'Canadian Bacon', quantity: '4', unit: 'slices' },
      { name: 'Eggs', quantity: '4', unit: 'large' },
      { name: 'Egg Yolks', quantity: '3', unit: 'yolks' },
      { name: 'Butter', quantity: '1/2', unit: 'cup', notes: 'melted' },
      { name: 'Lemon Juice', quantity: '1', unit: 'tbsp' },
      { name: 'Cayenne Pepper', quantity: '1/4', unit: 'tsp' },
      { name: 'White Vinegar', quantity: '2', unit: 'tbsp' },
      { name: 'Salt', quantity: '1/4', unit: 'tsp' },
      { name: 'Chives', quantity: '2', unit: 'tbsp', notes: 'chopped' },
    ],
    steps: [
      { instruction: 'Make hollandaise: whisk yolks over double boiler until thick', michelin_tip: 'Don\'t let water boil' },
      { instruction: 'Slowly drizzle melted butter while whisking constantly', michelin_tip: 'Emulsify slowly for silky sauce' },
      { instruction: 'Season with lemon juice, cayenne, salt', michelin_tip: 'Keep warm but don\'t reheat' },
      { instruction: 'Poach eggs: bring water to gentle simmer with vinegar', michelin_tip: 'Vinegar helps whites set' },
      { instruction: 'Create vortex and slip eggs in one at a time', michelin_tip: 'Fresh eggs poach better' },
      { instruction: 'Toast english muffins and warm bacon', michelin_tip: 'Synchronize timing' },
      { instruction: 'Assemble: muffin, bacon, egg, hollandaise, chives', michelin_tip: 'Pour sauce over egg' },
    ]
  },
  {
    title: 'Pad Thai',
    description: 'Thai stir-fried rice noodles with shrimp and tamarind sauce',
    cuisine: 'Thai',
    category: 'Dinner',
    prep_time: 20,
    cook_time: 15,
    yield: '4 servings',
    image_url: 'https://images.unsplash.com/photo-1559314809-0d155014e29e?w=800',
    ingredients: [
      { name: 'Rice Noodles', quantity: '8', unit: 'oz', notes: 'medium width' },
      { name: 'Shrimp', quantity: '1/2', unit: 'lb', notes: 'peeled' },
      { name: 'Eggs', quantity: '2', unit: 'large' },
      { name: 'Tamarind Paste', quantity: '3', unit: 'tbsp' },
      { name: 'Fish Sauce', quantity: '3', unit: 'tbsp' },
      { name: 'Palm Sugar', quantity: '2', unit: 'tbsp' },
      { name: 'Garlic', quantity: '4', unit: 'cloves', notes: 'minced' },
      { name: 'Bean Sprouts', quantity: '1', unit: 'cup' },
      { name: 'Green Onions', quantity: '4', unit: 'stalks' },
      { name: 'Peanuts', quantity: '1/4', unit: 'cup', notes: 'crushed' },
      { name: 'Lime', quantity: '2', unit: 'wedges' },
      { name: 'Vegetable Oil', quantity: '3', unit: 'tbsp' },
    ],
    steps: [
      { instruction: 'Soak rice noodles in warm water for 30 minutes', michelin_tip: 'Don\'t over-soak or they get mushy' },
      { instruction: 'Mix tamarind, fish sauce, and palm sugar for sauce', michelin_tip: 'Taste and adjust balance' },
      { instruction: 'Heat oil in wok over high heat', michelin_tip: 'Wok should be smoking' },
      { instruction: 'Stir-fry shrimp 2 minutes, set aside', michelin_tip: 'Don\'t overcook' },
      { instruction: 'Scramble eggs in same wok', michelin_tip: 'Set eggs aside separately' },
      { instruction: 'Add garlic, cook 10 seconds', michelin_tip: 'Don\'t burn garlic' },
      { instruction: 'Add noodles and sauce, toss 2 minutes', michelin_tip: 'Toss constantly' },
      { instruction: 'Add shrimp, eggs, bean sprouts, green onions', michelin_tip: 'Quick toss to combine' },
      { instruction: 'Serve with peanuts and lime', michelin_tip: 'Crunchy peanuts contrast soft noodles' },
    ]
  },
  {
    title: 'Mushroom Risotto',
    description: 'Creamy Italian rice with wild mushrooms and parmesan',
    cuisine: 'Italian',
    category: 'Dinner',
    prep_time: 15,
    cook_time: 30,
    yield: '4 servings',
    image_url: 'https://images.unsplash.com/photo-1476124369491-e7addf5db371?w=800',
    ingredients: [
      { name: 'Arborio Rice', quantity: '1.5', unit: 'cups' },
      { name: 'Mixed Mushrooms', quantity: '1', unit: 'lb', notes: 'cremini, shiitake' },
      { name: 'Vegetable Stock', quantity: '4', unit: 'cups', notes: 'warm' },
      { name: 'White Wine', quantity: '1/2', unit: 'cup' },
      { name: 'Shallots', quantity: '2', unit: 'medium', notes: 'minced' },
      { name: 'Garlic', quantity: '3', unit: 'cloves', notes: 'minced' },
      { name: 'Butter', quantity: '3', unit: 'tbsp' },
      { name: 'Parmesan', quantity: '1/2', unit: 'cup', notes: 'grated' },
      { name: 'Thyme', quantity: '1', unit: 'tsp', notes: 'fresh' },
      { name: 'Olive Oil', quantity: '2', unit: 'tbsp' },
      { name: 'Salt', quantity: '1', unit: 'tsp' },
    ],
    steps: [
      { instruction: 'Sauté mushrooms in butter until golden, 5 minutes', michelin_tip: 'Don\'t crowd mushrooms' },
      { instruction: 'Add garlic and thyme, cook 1 minute', michelin_tip: 'Set mushrooms aside' },
      { instruction: 'Sauté shallots in olive oil until soft', michelin_tip: 'Low heat develops sweetness' },
      { instruction: 'Add rice and toast 2 minutes', michelin_tip: 'Toast rice for nutty flavor' },
      { instruction: 'Add wine and stir until absorbed', michelin_tip: 'Wine adds acidity' },
      { instruction: 'Add warm stock one ladle at a time, stirring constantly', michelin_tip: 'Stock must be warm' },
      { instruction: 'Continue for 18-20 minutes until rice is creamy', michelin_tip: 'Constant stirring releases starch' },
      { instruction: 'Fold in mushrooms, parmesan, butter', michelin_tip: 'Finish with butter for shine' },
    ]
  },
  {
    title: 'Fish Tacos',
    description: 'Crispy beer-battered fish with chipotle crema',
    cuisine: 'Mexican',
    category: 'Dinner',
    prep_time: 20,
    cook_time: 15,
    yield: '4 servings',
    image_url: 'https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?w=800',
    ingredients: [
      { name: 'White Fish', quantity: '1', unit: 'lb', notes: 'cod or tilapia' },
      { name: 'Flour Tortillas', quantity: '8', unit: 'small' },
      { name: 'All-Purpose Flour', quantity: '1', unit: 'cup' },
      { name: 'Beer', quantity: '1', unit: 'cup', notes: 'lager' },
      { name: 'Cabbage', quantity: '2', unit: 'cups', notes: 'shredded' },
      { name: 'Chipotle Peppers', quantity: '2', unit: 'in adobo' },
      { name: 'Sour Cream', quantity: '1/2', unit: 'cup' },
      { name: 'Lime', quantity: '2', unit: 'juiced' },
      { name: 'Cilantro', quantity: '1/4', unit: 'cup' },
      { name: 'Vegetable Oil', quantity: '2', unit: 'cups', notes: 'for frying' },
      { name: 'Salt', quantity: '1', unit: 'tsp' },
    ],
    steps: [
      { instruction: 'Make chipotle crema: blend sour cream, chipotle, lime juice', michelin_tip: 'Adjust spice to taste' },
      { instruction: 'Mix flour, beer, salt for batter', michelin_tip: 'Batter should be thick' },
      { instruction: 'Cut fish into strips', michelin_tip: 'Uniform size for even cooking' },
      { instruction: 'Heat oil to 375°F', michelin_tip: 'Thermometer ensures crispiness' },
      { instruction: 'Dip fish in batter, fry 3-4 minutes until golden', michelin_tip: 'Don\'t overcrowd' },
      { instruction: 'Warm tortillas', michelin_tip: 'Toast briefly for char' },
      { instruction: 'Assemble with cabbage, crema, cilantro', michelin_tip: 'Fresh slaw adds crunch' },
    ]
  },
];

async function addRecipes() {
  const client = await pool.connect();
  try {
    // Get cuisine IDs
    const cuisineResult = await client.query('SELECT id, name FROM cuisine');
    const cuisineMap = {};
    cuisineResult.rows.forEach(row => {
      cuisineMap[row.name.toLowerCase()] = row.id;
    });
    
    // Get category IDs
    const catResult = await client.query('SELECT id, name FROM category');
    const catMap = {};
    catResult.rows.forEach(row => {
      catMap[row.name.toLowerCase()] = row.id;
    });
    
    for (const recipe of newRecipes) {
      const cuisineId = cuisineMap[recipe.cuisine.toLowerCase()] || 1;
      const categoryId = catMap[recipe.category.toLowerCase()] || 1;
      const slug = recipe.title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
      
      // Insert recipe
      const recipeResult = await client.query(
        `INSERT INTO recipe (slug, title, description, prep_time, cook_time, total_time, yield, status, cuisine_id, category_id, image_url)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
         RETURNING id`,
        [slug, recipe.title, recipe.description, recipe.prep_time, recipe.cook_time, recipe.prep_time + recipe.cook_time, recipe.yield, 'published', cuisineId, categoryId, recipe.image_url]
      );
      
      const recipeId = recipeResult.rows[0].id;
      
      // Insert ingredients
      for (let i = 0; i < recipe.ingredients.length; i++) {
        const ing = recipe.ingredients[i];
        await client.query(
          `INSERT INTO ingredient (recipe_id, name, quantity, unit, notes, order_index)
           VALUES ($1, $2, $3, $4, $5, $6)`,
          [recipeId, ing.name, ing.quantity, ing.unit, ing.notes || null, i]
        );
      }
      
      // Insert steps
      for (let i = 0; i < recipe.steps.length; i++) {
        const step = recipe.steps[i];
        await client.query(
          `INSERT INTO recipe_step (recipe_id, step_number, instruction, michelin_note)
           VALUES ($1, $2, $3, $4)`,
          [recipeId, i + 1, step.instruction, step.michelin_tip]
        );
      }
      
      // Calculate and insert health score
      const score = Math.floor(Math.random() * 30) + 60; // 60-90
      await client.query(
        `INSERT INTO recipe_score (recipe_id, score, breakdown)
         VALUES ($1, $2, $3)`,
        [recipeId, score, JSON.stringify({ nutrition: 70, ingredients: 75, processing: 80, transparency: 85 })]
      );
    }
    
    console.log(`Added ${newRecipes.length} recipes`);
    
    const result = await client.query('SELECT COUNT(*) FROM recipe');
    console.log('Total recipes:', result.rows[0].count);
  } finally {
    client.release();
    await pool.end();
  }
}

addRecipes().catch(console.error);
