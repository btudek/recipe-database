const { Client } = require('pg');
const client = new Client({ host: 'db.ycwbumsmlikiquplkdln.supabase.co', port: 5432, database: 'postgres', user: 'postgres', password: process.env.DBPASS });

const recipes = [
  { title: 'Pad See Ew', slug: 'pad-see-ew', description: 'Thai stir-fried rice noodles with soy sauce', cuisine_id: 'a3cb4471-db63-434e-a2e2-255242ffaca0' },
  { title: 'Mango Sticky Rice', slug: 'mango-sticky-rice', description: 'Thai sweet coconut rice with mango', cuisine_id: 'a3cb4471-db63-434e-a2e2-255242ffaca0' },
  { title: 'Som Tam', slug: 'som-tam', description: 'Thai green papaya salad', cuisine_id: 'a3cb4471-db63-434e-a2e2-255242ffaca0' },
  { title: 'Kung Pao Chicken', slug: 'kung-pao-chicken', description: 'Spicy Chinese stir-fry with peanuts', cuisine_id: '8232ae82-2fa2-4f95-a9f1-bc7ddd817d28' },
  { title: 'Mapo Tofu', slug: 'mapo-tofu', description: 'Spicy Sichuan tofu in chili bean sauce', cuisine_id: '8232ae82-2fa2-4f95-a9f1-bc7ddd817d28' },
  { title: 'Char Siu', slug: 'char-siu', description: 'Chinese BBQ pork', cuisine_id: '8232ae82-2fa2-4f95-a9f1-bc7ddd817d28' },
];

const RECIPES = {
  'pad-see-ew': {
    ingredients: [
      { name: 'Rice noodles', quantity: 400, unit: 'g' },
      { name: 'Chicken', quantity: 300, unit: 'g' },
      { name: 'Soy sauce', quantity: 60, unit: 'ml' },
      { name: 'Oyster sauce', quantity: 30, unit: 'ml' },
      { name: 'Dark soy sauce', quantity: 30, unit: 'ml' },
      { name: 'Garlic', quantity: 4, unit: 'cloves' },
      { name: 'Eggs', quantity: 2, unit: 'pcs' },
    ],
    steps: [
      { stepNumber: 1, instruction: 'Soak noodles in warm water until pliable.', michelinNote: 'Don\'t over-soak.' },
      { stepNumber: 2, instruction: 'Mix soy sauces and oyster sauce.', michelinNote: 'The flavor base.' },
      { stepNumber: 3, instruction: 'Stir-fry chicken, set aside.', michelinNote: 'Cook in batches.' },
      { stepNumber: 4, instruction: 'Stir-fry noodles with sauce until coated.', michelinNote: 'High heat, toss constantly.' },
      { stepNumber: 5, instruction: 'Add chicken and eggs. Toss.', michelinNote: 'Serve immediately.' },
    ]
  },
  'mango-sticky-rice': {
    ingredients: [
      { name: 'Sticky rice', quantity: 400, unit: 'g' },
      { name: 'Coconut milk', quantity: 400, unit: 'ml' },
      { name: 'Sugar', quantity: 100, unit: 'g' },
      { name: 'Salt', quantity: 1, unit: 'tsp' },
      { name: 'Ripe mango', quantity: 2, unit: 'pcs' },
    ],
    steps: [
      { stepNumber: 1, instruction: 'Soak sticky rice overnight.', michelinNote: 'Essential for proper texture.' },
      { stepNumber: 2, instruction: 'Steam rice for 25 minutes.', michelinNote: 'Until translucent.' },
      { stepNumber: 3, instruction: 'Heat coconut milk with sugar and salt.', michelinNote: 'Dissolve sugar completely.' },
      { stepNumber: 4, instruction: 'Mix hot coconut milk with rice. Rest 30 minutes.', michelinNote: 'Lets rice absorb coconut.' },
      { stepNumber: 5, instruction: 'Serve with sliced mango.', michelinNote: 'Ripe mango is key.' },
    ]
  },
  'som-tam': {
    ingredients: [
      { name: 'Green papaya', quantity: 1, unit: 'large' },
      { name: 'Tomatoes', quantity: 2, unit: 'medium' },
      { name: 'Green beans', quantity: 100, unit: 'g' },
      { name: 'Peanuts', quantity: 50, unit: 'g' },
      { name: 'Dried shrimp', quantity: 30, unit: 'g' },
      { name: 'Lime juice', quantity: 60, unit: 'ml' },
      { name: 'Fish sauce', quantity: 30, unit: 'ml' },
    ],
    steps: [
      { stepNumber: 1, instruction: 'Shred green papaya finely.', michelinNote: 'The finer the better.' },
      { stepNumber: 2, instruction: 'Pound garlic and chilies in mortar.', michelinNote: 'The dressing base.' },
      { stepNumber: 3, instruction: 'Add tomatoes, beans, papaya. Pound gently.', michelinNote: 'Mix but don\'t over-pound.' },
      { stepNumber: 4, instruction: 'Add fish sauce, lime, peanuts.', michelinNote: 'Taste and adjust.' },
    ]
  },
  'kung-pao-chicken': {
    ingredients: [
      { name: 'Chicken breast', quantity: 400, unit: 'g' },
      { name: 'Dried chilies', quantity: 10, unit: 'pcs' },
      { name: 'Sichuan peppercorns', quantity: 1, unit: 'tbsp' },
      { name: 'Peanuts', quantity: 100, unit: 'g' },
      { name: 'Soy sauce', quantity: 30, unit: 'ml' },
      { name: 'Rice vinegar', quantity: 30, unit: 'ml' },
      { name: 'Sugar', quantity: 15, unit: 'g' },
    ],
    steps: [
      { stepNumber: 1, instruction: 'Cut chicken into cubes. Marinate briefly.', michelinNote: ' cornstarch helps coating.' },
      { stepNumber: 2, instruction: 'Fry dried chilies and peppercorns until fragrant.', michelinNote: 'Don\'t burn.' },
      { stepNumber: 3, instruction: 'Add chicken, stir-fry until done.', michelinNote: 'High heat.' },
      { stepNumber: 4, instruction: 'Add sauce mixture (soy, vinegar, sugar).', michelinNote: 'Balance flavors.' },
      { stepNumber: 5, instruction: 'Add peanuts, serve over rice.', michelinNote: 'Garnish with green onion.' },
    ]
  },
  'mapo-tofu': {
    ingredients: [
      { name: 'Silken tofu', quantity: 400, unit: 'g' },
      { name: 'Ground pork', quantity: 200, unit: 'g' },
      { name: 'Doubanjiang', quantity: 60, unit: 'g' },
      { name: 'Douchi', quantity: 30, unit: 'g' },
      { name: 'Sichuan peppercorns', quantity: 1, unit: 'tsp' },
      { name: 'Garlic', quantity: 3, unit: 'cloves' },
    ],
    steps: [
      { stepNumber: 1, instruction: 'Cut tofu into cubes, parboil.', michelinNote: 'Removes beany taste.' },
      { stepNumber: 2, instruction: 'Fry pork until crispy.', michelinNote: 'Crispy pork adds texture.' },
      { stepNumber: 3, instruction: 'Add doubanjiang and douchi.', michelinNote: 'The flavor base.' },
      { stepNumber: 4, instruction: 'Add tofu, stock, simmer 5 minutes.', michelinNote: 'Gently - don\'t break tofu.' },
      { stepNumber: 5, instruction: 'Thicken with cornstarch slurry. Finish with peppercorn oil.', michelinNote: 'Numbing sensation is key.' },
    ]
  },
  'char-siu': {
    ingredients: [
      { name: 'Pork shoulder', quantity: 500, unit: 'g' },
      { name: 'Char siu sauce', quantity: 120, unit: 'ml' },
      { name: 'Honey', quantity: 60, unit: 'ml' },
      { name: 'Five spice', quantity: 1, unit: 'tsp' },
      { name: 'Red food coloring', quantity: 1, unit: 'tsp' },
    ],
    steps: [
      { stepNumber: 1, instruction: 'Cut pork into long strips.', michelinNote: 'Uniform thickness.' },
      { stepNumber: 2, instruction: 'Marinate overnight in sauce mixture.', michelinNote: 'Longer is better.' },
      { stepNumber: 3, instruction: 'Roast at 400F, basting every 10 minutes.', michelinNote: 'The caramelization is key.' },
      { stepNumber: 4, instruction: 'Rest 10 minutes, slice.', michelinNote: 'Serve with rice and greens.' },
    ]
  },
};

async function main() {
  await client.connect();
  
  for (const r of recipes) {
    const check = await client.query('SELECT id FROM recipe WHERE slug = $1', [r.slug]);
    if (check.rows.length === 0) {
      await client.query(
        'INSERT INTO recipe (title, slug, description, cuisine_id, published_at) VALUES ($1, $2, $3, $4, now())',
        [r.title, r.slug, r.description, r.cuisine_id]
      );
      console.log('Added recipe:', r.title);
    }
  }
  
  const recipeResult = await client.query('SELECT id, slug FROM recipe');
  const recipeMap = {};
  recipeResult.rows.forEach(r => recipeMap[r.slug] = r.id);
  
  for (const [slug, data] of Object.entries(RECIPES)) {
    const recipeId = recipeMap[slug];
    if (!recipeId) continue;
    
    const existingIng = await client.query('SELECT COUNT(*) FROM ingredient WHERE recipe_id = $1', [recipeId]);
    if (parseInt(existingIng.rows[0].count) === 0) {
      for (let i = 0; i < data.ingredients.length; i++) {
        await client.query(
          'INSERT INTO ingredient (recipe_id, name, quantity, unit, notes, order_index) VALUES ($1, $2, $3, $4, $5, $6)',
          [recipeId, data.ingredients[i].name, data.ingredients[i].quantity, data.ingredients[i].unit, data.ingredients[i].notes || null, i]
        );
      }
      console.log('Added ingredients:', slug);
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
