const { Client } = require('pg');
const client = new Client({ host: 'db.ycwbumsmlikiquplkdln.supabase.co', port: 5432, database: 'postgres', user: 'postgres', password: process.env.DBPASS });

const INGREDIENTS = {
  'spaghetti-carbonara': [
    { name: 'Spaghetti', quantity: 400, unit: 'g' },
    { name: 'Guanciale or pancetta', quantity: 200, unit: 'g' },
    { name: 'Eggs', quantity: 4, unit: 'large' },
    { name: 'Pecorino Romano', quantity: 100, unit: 'g' },
    { name: 'Black pepper', quantity: 2, unit: 'tsp', notes: 'freshly ground' },
  ],
  'chicken-tacos': [
    { name: 'Chicken thighs', quantity: 500, unit: 'g', notes: 'boneless' },
    { name: 'Corn tortillas', quantity: 12, unit: 'pcs' },
    { name: 'Onion', quantity: 1, unit: 'medium' },
    { name: 'Cilantro', quantity: 1, unit: 'bunch', notes: 'fresh' },
    { name: 'Lime', quantity: 2, unit: 'pcs' },
    { name: 'Cumin', quantity: 1, unit: 'tsp' },
    { name: 'Chili powder', quantity: 1, unit: 'tbsp' },
  ],
  'sushi-rolls': [
    { name: 'Sushi rice', quantity: 300, unit: 'g' },
    { name: 'Nori sheets', quantity: 8, unit: 'pcs' },
    { name: 'Fresh salmon', quantity: 200, unit: 'g', notes: 'sashimi grade' },
    { name: 'Cucumber', quantity: 1, unit: 'medium' },
    { name: 'Rice vinegar', quantity: 60, unit: 'ml' },
    { name: 'Wasabi', quantity: 1, unit: 'tbsp' },
    { name: 'Soy sauce', quantity: 30, unit: 'ml' },
  ],
  'beef-bourguignon': [
    { name: 'Beef chuck', quantity: 1000, unit: 'g', notes: 'cut into 2-inch cubes' },
    { name: 'Red wine', quantity: 750, unit: 'ml', notes: 'Burgundy or Pinot Noir' },
    { name: 'Pearl onions', quantity: 200, unit: 'g' },
    { name: 'Mushrooms', quantity: 300, unit: 'g', notes: 'cremini or button' },
    { name: 'Bacon', quantity: 150, unit: 'g' },
    { name: 'Carrots', quantity: 3, unit: 'medium' },
    { name: 'Beef stock', quantity: 500, unit: 'ml' },
    { name: 'Tomato paste', quantity: 2, unit: 'tbsp' },
  ],
  'pad-thai': [
    { name: 'Rice noodles', quantity: 200, unit: 'g' },
    { name: 'Shrimp', quantity: 150, unit: 'g', notes: 'peeled' },
    { name: 'Eggs', quantity: 2, unit: 'pcs' },
    { name: 'Bean sprouts', quantity: 100, unit: 'g' },
    { name: 'Peanuts', quantity: 50, unit: 'g', notes: 'crushed' },
    { name: 'Fish sauce', quantity: 3, unit: 'tbsp' },
    { name: 'Tamarind paste', quantity: 2, unit: 'tbsp' },
    { name: 'Palm sugar', quantity: 2, unit: 'tbsp' },
  ],
  'margherita-pizza': [
    { name: 'Pizza dough', quantity: 500, unit: 'g' },
    { name: 'San Marzano tomatoes', quantity: 400, unit: 'g', notes: 'crushed' },
    { name: 'Fresh mozzarella', quantity: 250, unit: 'g' },
    { name: 'Fresh basil', quantity: 1, unit: 'bunch' },
    { name: 'Olive oil', quantity: 30, unit: 'ml' },
    { name: 'Salt', quantity: 1, unit: 'tsp' },
  ],
  'chocolate-lava-cake': [
    { name: 'Dark chocolate', quantity: 150, unit: 'g', notes: '70% cacao' },
    { name: 'Butter', quantity: 100, unit: 'g' },
    { name: 'Eggs', quantity: 2, unit: 'large' },
    { name: 'Egg yolks', quantity: 2, unit: 'pcs' },
    { name: 'Sugar', quantity: 100, unit: 'g' },
    { name: 'Flour', quantity: 50, unit: 'g' },
    { name: 'Vanilla extract', quantity: 1, unit: 'tsp' },
  ],
};

const STEPS = {
  'spaghetti-carbonara': [
    { stepNumber: 1, instruction: 'Bring a large pot of salted water to boil. Cook spaghetti according to package directions until al dente.', michelinNote: 'Reserve 1 cup pasta water before draining. The starchy water helps create the silky sauce.' },
    { stepNumber: 2, instruction: 'While pasta cooks, cut guanciale into small cubes. Cook in a large cold pan over medium heat until crispy.', michelinNote: 'Starting with a cold pan helps render the fat slowly for crispier results.' },
    { stepNumber: 3, instruction: 'Whisk eggs and pecorino in a bowl. Add plenty of black pepper.', michelinNote: 'Room temperature eggs incorporate better and create a smoother sauce.' },
    { stepNumber: 4, instruction: 'Remove pan from heat. Add drained pasta to the guanciale. Toss to coat in the rendered fat.', michelinNote: 'Working off heat prevents the eggs from scrambling when you add them.' },
    { stepNumber: 5, instruction: 'Pour egg mixture over pasta. Toss quickly and vigorously, adding pasta water as needed for silky consistency.', michelinNote: 'The residual heat cooks the eggs just enough to create a creamy sauce without scrambling.' },
  ],
  'chicken-tacos': [
    { stepNumber: 1, instruction: 'Season chicken with cumin, chili powder, salt, and lime juice. Marinate for at least 30 minutes.', michelinNote: 'For best results, marinate overnight in the refrigerator.' },
    { stepNumber: 2, instruction: 'Grill or pan-fry chicken over medium-high heat until cooked through, about 6-8 minutes per side.', michelinNote: 'Let the chicken rest for 5 minutes before slicing for juicier meat.' },
    { stepNumber: 3, instruction: 'Warm tortillas on a dry skillet or directly over a gas flame until pliable and slightly charred.', michelinNote: 'Charred tortillas add authentic flavor and smokiness.' },
    { stepNumber: 4, instruction: 'Dice chicken, dice onion, and chop cilantro. Assemble tacos with all toppings.', michelinNote: 'Fresh lime wedges on the side allow guests to adjust to their taste.' },
  ],
  'sushi-rolls': [
    { stepNumber: 1, instruction: 'Rinse sushi rice until water runs clear. Cook according to package directions.', michelinNote: 'Properly rinsed rice prevents sticking and achieves the right texture.' },
    { stepNumber: 2, instruction: 'While rice is hot, season with rice vinegar, sugar, and salt. Fan rice while mixing to cool and create glossy texture.', michelinNote: 'Fanning while mixing creates distinct, glossy grains and helps the rice cool evenly.' },
    { stepNumber: 3, instruction: 'Place nori sheet shiny-side down on bamboo mat. Spread thin layer of rice evenly, leaving 1-inch border at top.', michelinNote: 'Wet your hands with water to prevent rice from sticking.' },
    { stepNumber: 4, instruction: 'Lay fish and cucumber in a line across the center of the rice. Roll tightly using the mat.', michelinNote: 'Roll slowly and apply even pressure for tight, even rolls.' },
    { stepNumber: 5, instruction: 'Cut rolls into 6-8 pieces with wet sharp knife. Serve with soy sauce and wasabi.', michelinNote: 'Clean the knife between cuts for cleaner edges.' },
  ],
};

async function main() {
  await client.connect();
  
  // Create tables
  await client.query(`
    CREATE TABLE IF NOT EXISTS ingredient (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      recipe_id UUID,
      name TEXT NOT NULL,
      quantity FLOAT,
      unit TEXT,
      notes TEXT,
      order_index INT
    )
  `);
  
  await client.query(`
    CREATE TABLE IF NOT EXISTS recipe_step (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      recipe_id UUID,
      step_number INT NOT NULL,
      instruction TEXT NOT NULL,
      michelin_note TEXT
    )
  `);
  
  // Get recipe IDs
  const recipeResult = await client.query('SELECT id, slug FROM recipe');
  const recipeMap = {};
  recipeResult.rows.forEach(r => recipeMap[r.slug] = r.id);
  
  console.log('Found recipes:', Object.keys(recipeMap));
  
  // Insert ingredients
  for (const [slug, ings] of Object.entries(INGREDIENTS)) {
    const recipeId = recipeMap[slug];
    if (!recipeId) {
      console.log('Recipe not found:', slug);
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
  for (const [slug, steps] of Object.entries(STEPS)) {
    const recipeId = recipeMap[slug];
    if (!recipeId) continue;
    
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
