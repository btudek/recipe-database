const { Client } = require('pg');
const client = new Client({ host: 'db.ycwbumsmlikiquplkdln.supabase.co', port: 5432, database: 'postgres', user: 'postgres', password: process.env.DBPASS });

const MORE_INGREDIENTS = {
  'butter-chicken': [
    { name: 'Chicken breast', quantity: 750, unit: 'g', notes: 'cubed' },
    { name: 'Yogurt', quantity: 150, unit: 'ml' },
    { name: 'Garam masala', quantity: 2, unit: 'tbsp' },
    { name: 'Tomato puree', quantity: 400, unit: 'g' },
    { name: 'Heavy cream', quantity: 200, unit: 'ml' },
    { name: 'Butter', quantity: 50, unit: 'g' },
    { name: 'Ginger', quantity: 2, unit: 'inch', notes: 'grated' },
    { name: 'Garlic', quantity: 4, unit: 'cloves', notes: 'minced' },
    { name: 'Kashmiri chili powder', quantity: 1, unit: 'tbsp' },
  ],
  'beef-tacos': [
    { name: 'Ground beef', quantity: 500, unit: 'g' },
    { name: 'Taco shells', quantity: 12, unit: 'pcs' },
    { name: 'Onion', quantity: 1, unit: 'medium', notes: 'diced' },
    { name: 'Taco seasoning', quantity: 2, unit: 'tbsp' },
    { name: 'Shredded lettuce', quantity: 200, unit: 'g' },
    { name: 'Cheddar cheese', quantity: 150, unit: 'g', notes: 'shredded' },
    { name: 'Sour cream', quantity: 100, unit: 'ml' },
    { name: 'Tomatoes', quantity: 2, unit: 'medium', notes: 'diced' },
  ],
  'ramen-noodles': [
    { name: 'Ramen noodles', quantity: 400, unit: 'g' },
    { name: 'Pork bones', quantity: 1000, unit: 'g' },
    { name: 'Pork belly', quantity: 300, unit: 'g' },
    { name: 'Soft-boiled eggs', quantity: 4, unit: 'pcs' },
    { name: 'Green onions', quantity: 4, unit: 'stalks', notes: 'sliced' },
    { name: 'Nori sheets', quantity: 4, unit: 'pcs' },
    { name: 'Soy sauce', quantity: 60, unit: 'ml' },
    { name: 'Mirin', quantity: 30, unit: 'ml' },
  ],
  'lasagna': [
    { name: 'Lasagna sheets', quantity: 400, unit: 'g' },
    { name: 'Ground beef', quantity: 500, unit: 'g' },
    { name: 'Ricotta cheese', quantity: 250, unit: 'g' },
    { name: 'Mozzarella', quantity: 300, unit: 'g', notes: 'shredded' },
    { name: 'Parmesan', quantity: 100, unit: 'g', notes: 'grated' },
    { name: 'Tomato sauce', quantity: 700, unit: 'ml' },
    { name: 'Eggs', quantity: 2, unit: 'pcs' },
    { name: 'Italian herbs', quantity: 1, unit: 'tbsp' },
  ],
  'pad-thai': [
    { name: 'Rice noodles', quantity: 250, unit: 'g' },
    { name: 'Shrimp', quantity: 200, unit: 'g', notes: 'peeled' },
    { name: 'Firm tofu', quantity: 150, unit: 'g', notes: 'cubed' },
    { name: 'Eggs', quantity: 3, unit: 'pcs' },
    { name: 'Bean sprouts', quantity: 150, unit: 'g' },
    { name: 'Roasted peanuts', quantity: 60, unit: 'g', notes: 'crushed' },
    { name: 'Tamarind paste', quantity: 3, unit: 'tbsp' },
    { name: 'Fish sauce', quantity: 4, unit: 'tbsp' },
    { name: 'Palm sugar', quantity: 2, unit: 'tbsp' },
    { name: 'Garlic chives', quantity: 50, unit: 'g' },
  ],
  'guacamole': [
    { name: 'Ripe avocados', quantity: 3, unit: 'pcs' },
    { name: 'Lime juice', quantity: 30, unit: 'ml' },
    { name: 'Onion', quantity: 0.25, unit: 'cup', notes: 'finely diced' },
    { name: 'Cilantro', quantity: 2, unit: 'tbsp', notes: 'chopped' },
    { name: 'Jalapeno', quantity: 1, unit: 'pcs', notes: 'seeded and minced' },
    { name: 'Tomato', quantity: 1, unit: 'medium', notes: 'diced' },
    { name: 'Garlic', quantity: 1, unit: 'clove', notes: 'minced' },
    { name: 'Salt', quantity: 0.5, unit: 'tsp' },
  ],
  'croissant': [
    { name: 'All-purpose flour', quantity: 500, unit: 'g' },
    { name: 'Unsalted butter', quantity: 300, unit: 'g', notes: 'cold' },
    { name: 'Whole milk', quantity: 250, unit: 'ml' },
    { name: 'Active dry yeast', quantity: 10, unit: 'g' },
    { name: 'Sugar', quantity: 50, unit: 'g' },
    { name: 'Salt', quantity: 10, unit: 'g' },
    { name: 'Egg', quantity: 1, unit: 'pcs', notes: 'for egg wash' },
  ],
  'tiramisu': [
    { name: 'Mascarpone cheese', quantity: 500, unit: 'g' },
    { name: 'Ladyfinger cookies', quantity: 300, unit: 'g' },
    { name: 'Espresso', quantity: 250, unit: 'ml', notes: 'strong and cooled' },
    { name: 'Egg yolks', quantity: 4, unit: 'pcs' },
    { name: 'Sugar', quantity: 100, unit: 'g' },
    { name: 'Heavy cream', quantity: 200, unit: 'ml' },
    { name: 'Cocoa powder', quantity: 2, unit: 'tbsp', notes: 'for dusting' },
    { name: 'Marsala wine', quantity: 30, unit: 'ml', notes: 'optional' },
  ],
  'churros': [
    { name: 'All-purpose flour', quantity: 250, unit: 'g' },
    { name: 'Water', quantity: 250, unit: 'ml' },
    { name: 'Butter', quantity: 50, unit: 'g' },
    { name: 'Sugar', quantity: 50, unit: 'g' },
    { name: 'Salt', quantity: 0.25, unit: 'tsp' },
    { name: 'Egg', quantity: 1, unit: 'pcs' },
    { name: 'Cinnamon', quantity: 1, unit: 'tsp' },
    { name: 'Vegetable oil', quantity: 500, unit: 'ml', notes: 'for frying' },
  ],
  'pizza-margherita': [
    { name: 'Pizza dough', quantity: 500, unit: 'g' },
    { name: 'San Marzano tomatoes', quantity: 400, unit: 'g', notes: 'crushed' },
    { name: 'Fresh mozzarella', quantity: 250, unit: 'g', notes: 'sliced' },
    { name: 'Fresh basil leaves', quantity: 20, unit: 'pcs' },
    { name: 'Extra virgin olive oil', quantity: 30, unit: 'ml' },
    { name: 'Sea salt', quantity: 1, unit: 'tsp' },
  ],
};

const MORE_STEPS = {
  'butter-chicken': [
    { stepNumber: 1, instruction: 'Marinate chicken in yogurt, garam masala, and chili powder for at least 2 hours.', michelinNote: 'For deeper flavor, marinate overnight in the refrigerator.' },
    { stepNumber: 2, instruction: 'Grill or pan-fry marinated chicken until charred and cooked through. Set aside.', michelinNote: 'High heat creates the characteristic char marks.' },
    { stepNumber: 3, instruction: 'In a pan, melt butter and sauté ginger and garlic until fragrant.', michelinNote: 'Don\'t let the garlic burn - cook until just golden.' },
    { stepNumber: 4, instruction: 'Add tomato puree and simmer for 15 minutes until oil separates.', michelinNote: 'The oil separation is key - it indicates the tomatoes are cooked properly.' },
    { stepNumber: 5, instruction: 'Add cream and grilled chicken. Simmer for 10 minutes. Serve with naan.', michelinNote: 'Finish with a swirl of butter for extra richness.' },
  ],
  'ramen-noodles': [
    { stepNumber: 1, instruction: 'Blanch pork bones in boiling water for 10 minutes. Drain and rinse.', michelinNote: 'This removes impurities and creates a clearer broth.' },
    { stepNumber: 2, instruction: 'Simmer bones in fresh water for 8-12 hours with aromatics.', michelinNote: 'Low and slow extracts maximum collagen for rich, creamy broth.' },
    { stepNumber: 3, instruction: 'Prepare tare (seasoning base) with soy sauce and mirin.', michelinNote: 'The tare balances the rich pork broth.' },
    { stepNumber: 4, instruction: 'Cook noodles according to package. Do not overcook.', michelinNote: 'Slightly undercooked is better - they continue cooking in the hot broth.' },
    { stepNumber: 5, instruction: 'Assemble bowl: tare, hot broth, noodles, chashu, egg, nori, green onions.', michelinNote: 'Work quickly - everything should be hot.' },
  ],
  'tiramisu': [
    { stepNumber: 1, instruction: 'Beat egg yolks with sugar until thick and pale yellow.', michelinNote: 'The mixture should fall in ribbons that hold their shape.' },
    { stepNumber: 2, instruction: 'Fold in mascarpone until smooth. Whip cream separately and fold in.', michelinNote: 'Room temperature mascarpone blends more smoothly.' },
    { stepNumber: 3, instruction: 'Dip ladyfingers briefly in espresso. Layer in dish.', michelinNote: 'Don\'t soak too long or they become soggy.' },
    { stepNumber: 4, instruction: 'Spread half the mascarpone mixture. Repeat layers.', michelinNote: 'For clean layers, smooth the top with an offset spatula.' },
    { stepNumber: 5, instruction: 'Refrigerate at least 4 hours or overnight. Dust with cocoa before serving.', michelinNote: 'The waiting time is essential - it allows the flavors to meld.' },
  ],
};

async function main() {
  await client.connect();
  
  const recipeResult = await client.query('SELECT id, slug FROM recipe');
  const recipeMap = {};
  recipeResult.rows.forEach(r => recipeMap[r.slug] = r.id);
  
  // Insert more ingredients
  for (const [slug, ings] of Object.entries(MORE_INGREDIENTS)) {
    const recipeId = recipeMap[slug];
    if (!recipeId) {
      console.log('Recipe not found:', slug);
      continue;
    }
    
    // Check if ingredients already exist
    const existing = await client.query('SELECT COUNT(*) FROM ingredient WHERE recipe_id = $1', [recipeId]);
    if (parseInt(existing.rows[0].count) > 0) {
      console.log('Ingredients already exist for:', slug);
      continue;
    }
    
    for (let i = 0; i < ings.length; i++) {
      const ing = ings[i];
      await client.query(
        'INSERT INTO ingredient (recipe_id, name, quantity, unit, notes, order_index) VALUES ($1, $2, $3, $4, $5, $6)',
        [recipeId, ing.name, ing.quantity, ing.unit, ing.notes || null, i]
      );
    }
    console.log('Added ingredients for:', slug);
  }
  
  // Insert steps
  for (const [slug, steps] of Object.entries(MORE_STEPS)) {
    const recipeId = recipeMap[slug];
    if (!recipeId) continue;
    
    const existing = await client.query('SELECT COUNT(*) FROM recipe_step WHERE recipe_id = $1', [recipeId]);
    if (parseInt(existing.rows[0].count) > 0) {
      console.log('Steps already exist for:', slug);
      continue;
    }
    
    for (const step of steps) {
      await client.query(
        'INSERT INTO recipe_step (recipe_id, step_number, instruction, michelin_note) VALUES ($1, $2, $3, $4)',
        [recipeId, step.stepNumber, step.instruction, step.michelinNote || null]
      );
    }
    console.log('Added steps for:', slug);
  }
  
  console.log('Done!');
  await client.end();
}

main().catch(console.error);
