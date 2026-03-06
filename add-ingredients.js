const { Pool } = require('pg');
const pool = new Pool({
  host: 'db.ycwbumsmlikiquplkdln.supabase.co',
  port: 5432,
  database: 'postgres',
  user: 'postgres',
  password: 'HailMaryFullOfGrace1$'
});

// Recipes with 0 ingredients - adding detailed ingredients
const recipesWithIngredients = [
  {
    title: 'Chocolate Chip Cookies',
    ingredients: [
      { name: 'All-purpose flour', quantity: '2 1/4', unit: 'cups', notes: 'spooned and leveled' },
      { name: 'Butter', quantity: '1', unit: 'cup', notes: 'softened (2 sticks)' },
      { name: 'Granulated sugar', quantity: '3/4', unit: 'cup' },
      { name: 'Brown sugar', quantity: '3/4', unit: 'cup', notes: 'packed' },
      { name: 'Eggs', quantity: '2', unit: 'large', notes: 'room temperature' },
      { name: 'Vanilla extract', quantity: '1', unit: 'tsp' },
      { name: 'Baking soda', quantity: '1', unit: 'tsp' },
      { name: 'Salt', quantity: '1', unit: 'tsp' },
      { name: 'Chocolate chips', quantity: '2', unit: 'cups', notes: 'semi-sweet' }
    ]
  },
  {
    title: 'Fried Chicken',
    ingredients: [
      { name: 'Chicken pieces', quantity: '3-4', unit: 'lbs', notes: 'thighs and drumsticks' },
      { name: 'Buttermilk', quantity: '2', unit: 'cups', notes: 'or milk with lemon juice' },
      { name: 'All-purpose flour', quantity: '2', unit: 'cups' },
      { name: 'Cornstarch', quantity: '1/2', unit: 'cup', notes: 'for extra crispiness' },
      { name: 'Paprika', quantity: '2', unit: 'tsp' },
      { name: 'Garlic powder', quantity: '1', unit: 'tsp' },
      { name: 'Onion powder', quantity: '1', unit: 'tsp' },
      { name: 'Cayenne pepper', quantity: '1/2', unit: 'tsp' },
      { name: 'Salt', quantity: '1', unit: 'tbsp' },
      { name: 'Vegetable oil', quantity: '4', unit: 'cups', notes: 'for frying' }
    ]
  },
  {
    title: 'Bun Cha',
    ingredients: [
      { name: 'Pork belly', quantity: '1', unit: 'lb', notes: 'thinly sliced' },
      { name: 'Ground pork', quantity: '1/2', unit: 'lb' },
      { name: 'Fish sauce', quantity: '3', unit: 'tbsp' },
      { name: 'Sugar', quantity: '2', unit: 'tbsp' },
      { name: 'Garlic', quantity: '4', unit: 'cloves', notes: 'minced' },
      { name: 'Shallots', quantity: '2', unit: 'medium', notes: 'sliced' },
      { name: 'Rice noodles', quantity: '8', unit: 'oz', notes: 'vermicelli' },
      { name: 'Fresh herbs', quantity: '1', unit: 'bunch', notes: 'mint, cilantro, Thai basil' },
      { name: 'Lime', quantity: '2', unit: 'whole', notes: 'cut into wedges' },
      { name: 'Dried shrimp', quantity: '2', unit: 'tbsp', notes: 'optional' }
    ]
  },
  {
    title: 'Thai Green Curry',
    ingredients: [
      { name: 'Chicken thighs', quantity: '1', unit: 'lb', notes: 'sliced' },
      { name: 'Green curry paste', quantity: '3', unit: 'tbsp' },
      { name: 'Coconut milk', quantity: '1', unit: 'can', notes: '14 oz' },
      { name: 'Thai eggplant', quantity: '1', unit: 'cup', notes: 'quartered' },
      { name: 'Bamboo shoots', quantity: '1/2', unit: 'cup' },
      { name: 'Thai basil', quantity: '1', unit: 'cup' },
      { name: 'Fish sauce', quantity: '2', unit: 'tbsp' },
      { name: 'Palm sugar', quantity: '1', unit: 'tbsp', notes: 'or brown sugar' },
      { name: 'Kaffir lime leaves', quantity: '4', unit: 'leaves' },
      { name: 'Vegetable oil', quantity: '2', unit: 'tbsp' }
    ]
  },
  {
    title: 'Thai Khao Soi',
    ingredients: [
      { name: 'Chicken thighs', quantity: '1', unit: 'lb', notes: 'bone-in' },
      { name: 'Khao soi paste', quantity: '3', unit: 'tbsp', notes: 'or yellow curry paste' },
      { name: 'Coconut milk', quantity: '1', unit: 'can', notes: '14 oz' },
      { name: 'Chicken stock', quantity: '2', unit: 'cups' },
      { name: 'Egg noodles', quantity: '8', unit: 'oz' },
      { name: 'Shallots', quantity: '2', unit: 'medium', notes: 'sliced' },
      { name: 'Bean sprouts', quantity: '1', unit: 'cup' },
      { name: 'Lime', quantity: '2', unit: 'whole', notes: 'cut into wedges' },
      { name: 'Fish sauce', quantity: '2', unit: 'tbsp' },
      { name: 'Palm sugar', quantity: '1', unit: 'tbsp' }
    ]
  },
  {
    title: 'Chapati',
    ingredients: [
      { name: 'Whole wheat flour', quantity: '2', unit: 'cups', notes: 'atta flour preferred' },
      { name: 'Water', quantity: '3/4', unit: 'cup', notes: 'warm' },
      { name: 'Salt', quantity: '1/2', unit: 'tsp' },
      { name: 'Ghee', quantity: '3', unit: 'tbsp', notes: 'divided' },
      { name: 'All-purpose flour', quantity: '2', unit: 'tbsp', notes: 'for rolling' }
    ]
  },
  {
    title: 'Baklava',
    ingredients: [
      { name: 'Phyllo dough', quantity: '1', unit: 'package', notes: '16 oz, thawed' },
      { name: 'Butter', quantity: '1', unit: 'cup', notes: 'melted' },
      { name: 'Walnuts', quantity: '2', unit: 'cups', notes: 'finely chopped' },
      { name: 'Almonds', quantity: '1', unit: 'cup', notes: 'finely chopped' },
      { name: 'Sugar', quantity: '1', unit: 'cup', notes: 'divided' },
      { name: 'Cinnamon', quantity: '2', unit: 'tsp' },
      { name: 'Cloves', quantity: '1/2', unit: 'tsp', notes: 'ground' },
      { name: 'Lemon juice', quantity: '1/4', unit: 'cup' },
      { name: 'Honey', quantity: '1', unit: 'cup' },
      { name: 'Orange blossom water', quantity: '1', unit: 'tbsp', notes: 'optional' }
    ]
  },
  {
    title: 'Bruschetta',
    ingredients: [
      { name: 'Baguette', quantity: '1', unit: 'loaf', notes: 'Italian bread' },
      { name: 'Roma tomatoes', quantity: '4', unit: 'medium', notes: 'diced' },
      { name: 'Fresh basil', quantity: '1/4', unit: 'cup', notes: 'chopped' },
      { name: 'Garlic', quantity: '3', unit: 'cloves', notes: '2 minced, 1 whole' },
      { name: 'Extra virgin olive oil', quantity: '1/4', unit: 'cup', notes: 'plus more for brushing' },
      { name: 'Balsamic vinegar', quantity: '1', unit: 'tbsp' },
      { name: 'Salt', quantity: '1/2', unit: 'tsp' },
      { name: 'Red pepper flakes', quantity: '1/4', unit: 'tsp', notes: 'optional' }
    ]
  },
  {
    title: 'Red Velvet Cake',
    ingredients: [
      { name: 'All-purpose flour', quantity: '2 1/2', unit: 'cups' },
      { name: 'Cocoa powder', quantity: '2', unit: 'tbsp' },
      { name: 'Butter', quantity: '1', unit: 'cup', notes: 'softened' },
      { name: 'Sugar', quantity: '1 1/2', unit: 'cups' },
      { name: 'Eggs', quantity: '2', unit: 'large' },
      { name: 'Buttermilk', quantity: '1', unit: 'cup' },
      { name: 'Red food coloring', quantity: '2', unit: 'oz', notes: '1 bottle' },
      { name: 'Vanilla extract', quantity: '1', unit: 'tsp' },
      { name: 'White vinegar', quantity: '1', unit: 'tsp' },
      { name: 'Baking soda', quantity: '1', unit: 'tsp' },
      { name: 'Cream cheese', quantity: '8', unit: 'oz', notes: 'for frosting' },
      { name: 'Powdered sugar', quantity: '4', unit: 'cups', notes: 'for frosting' }
    ]
  },
  {
    title: 'Pad Thai',
    ingredients: [
      { name: 'Rice noodles', quantity: '8', unit: 'oz', notes: 'medium width' },
      { name: 'Shrimp', quantity: '8', unit: 'oz', notes: 'peeled and deveined' },
      { name: 'Eggs', quantity: '2', unit: 'large' },
      { name: 'Tofu', quantity: '8', unit: 'oz', notes: 'extra-firm, cubed' },
      { name: 'Bean sprouts', quantity: '2', unit: 'cups' },
      { name: 'Green onions', quantity: '4', unit: 'stalks', notes: 'sliced' },
      { name: 'Garlic', quantity: '4', unit: 'cloves', notes: 'minced' },
      { name: 'Tamarind paste', quantity: '3', unit: 'tbsp' },
      { name: 'Fish sauce', quantity: '3', unit: 'tbsp' },
      { name: 'Palm sugar', quantity: '2', unit: 'tbsp', notes: 'or brown sugar' },
      { name: 'Peanuts', quantity: '1/2', unit: 'cup', notes: 'crushed' },
      { name: 'Lime', quantity: '2', unit: 'whole', notes: 'cut into wedges' }
    ]
  },
  {
    title: 'Bibimbap',
    ingredients: [
      { name: 'Cooked rice', quantity: '4', unit: 'cups' },
      { name: 'Beef sirloin', quantity: '8', unit: 'oz', notes: 'thinly sliced' },
      { name: 'Spinach', quantity: '2', unit: 'cups', notes: 'blanched' },
      { name: 'Bean sprouts', quantity: '1', unit: 'cup', notes: 'blanched' },
      { name: 'Carrots', quantity: '1', unit: 'medium', notes: 'julienned' },
      { name: 'Zucchini', quantity: '1', unit: 'medium', notes: 'julienned' },
      { name: 'Shiitake mushrooms', quantity: '4', unit: 'oz', notes: 'sliced' },
      { name: 'Eggs', quantity: '4', unit: 'large', notes: 'fried' },
      { name: 'Gochujang', quantity: '4', unit: 'tbsp', notes: 'Korean chili paste' },
      { name: 'Sesame oil', quantity: '2', unit: 'tbsp' },
      { name: 'Soy sauce', quantity: '2', unit: 'tbsp' },
      { name: 'Garlic', quantity: '3', unit: 'cloves', notes: 'minced' }
    ]
  },
  {
    title: 'Kimchi jjigae',
    ingredients: [
      { name: 'Kimchi', quantity: '2', unit: 'cups', notes: 'aged, chopped' },
      { name: 'Pork belly', quantity: '1/2', unit: 'lb', notes: 'sliced' },
      { name: 'Tofu', quantity: '1', unit: 'block', notes: 'firm, cubed' },
      { name: 'Gochujang', quantity: '2', unit: 'tbsp' },
      { name: 'Gochugaru', quantity: '1', unit: 'tbsp', notes: 'Korean red pepper flakes' },
      { name: 'Garlic', quantity: '4', unit: 'cloves', notes: 'minced' },
      { name: 'Ginger', quantity: '1', unit: 'inch', notes: 'minced' },
      { name: 'Soy sauce', quantity: '2', unit: 'tbsp' },
      { name: 'Sesame oil', quantity: '1', unit: 'tbsp' },
      { name: 'Green onions', quantity: '3', unit: 'stalks', notes: 'chopped' },
      { name: 'Chicken stock', quantity: '4', unit: 'cups' }
    ]
  },
  {
    title: 'Pizza Margherita',
    ingredients: [
      { name: '"00" flour', quantity: '500', unit: 'g', notes: 'or all-purpose' },
      { name: 'Water', quantity: '325', unit: 'ml', notes: 'warm' },
      { name: 'Instant yeast', quantity: '3', unit: 'g' },
      { name: 'Salt', quantity: '10', unit: 'g' },
      { name: 'San Marzano tomatoes', quantity: '14', unit: 'oz', notes: 'whole, peeled' },
      { name: 'Fresh mozzarella', quantity: '250', unit: 'g', notes: 'buffalo preferred' },
      { name: 'Fresh basil', quantity: '1', unit: 'bunch' },
      { name: 'Extra virgin olive oil', quantity: '2', unit: 'tbsp', notes: 'plus more for drizzling' }
    ]
  },
  {
    title: 'Drunken Noodles',
    ingredients: [
      { name: 'Rice noodles', quantity: '8', unit: 'oz', notes: 'wide' },
      { name: 'Chicken thighs', quantity: '1/2', unit: 'lb', notes: 'sliced' },
      { name: 'Thai basil', quantity: '1', unit: 'cup' },
      { name: 'Garlic', quantity: '6', unit: 'cloves', notes: 'minced' },
      { name: 'Thai chilies', quantity: '4', unit: 'whole', notes: 'sliced' },
      { name: 'Soy sauce', quantity: '3', unit: 'tbsp' },
      { name: 'Fish sauce', quantity: '2', unit: 'tbsp' },
      { name: 'Oyster sauce', quantity: '1', unit: 'tbsp' },
      { name: 'Sugar', quantity: '1', unit: 'tbsp' },
      { name: 'Vegetable oil', quantity: '3', unit: 'tbsp' },
      { name: 'Eggs', quantity: '2', unit: 'large' }
    ]
  },
  {
    title: 'Naan Bread',
    ingredients: [
      { name: 'All-purpose flour', quantity: '3', unit: 'cups' },
      { name: 'Plain yogurt', quantity: '1/2', unit: 'cup', notes: 'room temperature' },
      { name: 'Warm milk', quantity: '1/2', unit: 'cup' },
      { name: 'Instant yeast', quantity: '2', unit: 'tsp' },
      { name: 'Sugar', quantity: '1', unit: 'tbsp' },
      { name: 'Salt', quantity: '1', unit: 'tsp' },
      { name: 'Garlic', quantity: '4', unit: 'cloves', notes: 'minced (for garlic naan)' },
      { name: 'Butter', quantity: '4', unit: 'tbsp', notes: 'melted' },
      { name: 'Fresh cilantro', quantity: '2', unit: 'tbsp', notes: 'chopped (optional)' }
    ]
  }
];

async function addIngredients() {
  console.log('=== ADDING INGREDIENTS TO RECIPES ===\n');
  
  let fixedCount = 0;
  const fixedList = [];
  
  for (const recipe of recipesWithIngredients) {
    const recipeResult = await pool.query(`
      SELECT id FROM recipe WHERE title ILIKE $1 LIMIT 1
    `, [`%${recipe.title}%`]);
    
    if (recipeResult.rows.length > 0) {
      const recipeId = recipeResult.rows[0].id;
      
      // Delete any existing ingredients
      await pool.query(`DELETE FROM ingredient WHERE recipe_id = $1`, [recipeId]);
      
      // Add new ingredients
      let orderIndex = 1;
      for (const ing of recipe.ingredients) {
        await pool.query(`
          INSERT INTO ingredient (recipe_id, name, quantity, unit, notes, order_index)
          VALUES ($1, $2, $3, $4, $5, $6)
        `, [recipeId, ing.name, ing.quantity, ing.unit, ing.notes || null, orderIndex++]);
      }
      
      fixedCount++;
      fixedList.push(`${recipe.title} (${recipe.ingredients.length} ingredients)`);
      console.log(`✓ Added ${recipe.ingredients.length} ingredients to ${recipe.title}`);
    } else {
      console.log(`✗ Recipe not found: ${recipe.title}`);
    }
  }
  
  console.log(`\n=== SUMMARY ===`);
  console.log(`Recipes with ingredients added: ${fixedCount}`);
  console.log(fixedList.join(', '));
  
  pool.end();
}

addIngredients().catch(console.error);
