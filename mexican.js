const { Client } = require('pg');
const client = new Client({ host: 'db.ycwbumsmlikiquplkdln.supabase.co', port: 5432, database: 'postgres', user: 'postgres', password: process.env.DBPASS });

const recipes = [
  { title: 'Chicken Enchiladas', slug: 'chicken-enchiladas', description: 'Mexican rolled tortillas with chicken', cuisine_id: '539d04d6-e193-4f0f-930a-90553fb21704' },
  { title: 'Guacamole', slug: 'guacamole', description: 'Mexican avocado dip', cuisine_id: '539d04d6-e193-4f0f-930a-90553fb21704' },
  { title: 'Churros', slug: 'churros', description: 'Fried dough with cinnamon sugar', cuisine_id: '539d04d6-e193-4f0f-930a-90553fb21704' },
  { title: 'Pozole', slug: 'pozole', description: 'Mexican pork and hominy soup', cuisine_id: '539d04d6-e193-4f0f-930a-90553fb21704' },
  { title: 'Tacos al Pastor', slug: 'tacos-al-pastor', description: 'Marinated pork tacos', cuisine_id: '539d04d6-e193-4f0f-930a-90553fb21704' },
  { title: 'Tres Leches', slug: 'tres-leches', description: 'Mexican three-milk cake', cuisine_id: '539d04d6-e193-4f0f-930a-90553fb21704' },
];

const RECIPES = {
  'chicken-enchiladas': {
    ingredients: [
      { name: 'Chicken breast', quantity: 500, unit: 'g' },
      { name: 'Corn tortillas', quantity: 12, unit: 'pcs' },
      { name: 'Enchilada sauce', quantity: 500, unit: 'ml' },
      { name: 'Cheddar cheese', quantity: 200, unit: 'g' },
      { name: 'Onion', quantity: 1, unit: 'medium' },
      { name: 'Sour cream', quantity: 120, unit: 'ml' },
    ],
    steps: [
      { stepNumber: 1, instruction: 'Shred cooked chicken.', michelinNote: 'Use leftover or poached chicken.' },
      { stepNumber: 2, instruction: 'Mix chicken with onion and some cheese.', michelinNote: 'The filling.' },
      { stepNumber: 3, instruction: 'Warm tortillas to make pliable.', michelinNote: 'Dip briefly in sauce.' },
      { stepNumber: 4, instruction: 'Fill and roll tortillas. Place in baking dish.', michelinNote: 'Seam-side down.' },
      { stepNumber: 5, instruction: 'Top with sauce and cheese. Bake at 375F for 20 min.', michelinNote: 'Until cheese is melted.' },
    ]
  },
  'guacamole': {
    ingredients: [
      { name: 'Avocados', quantity: 4, unit: 'pcs' },
      { name: 'Lime', quantity: 2, unit: 'pcs' },
      { name: 'Onion', quantity: 1, unit: 'medium' },
      { name: 'Tomato', quantity: 1, unit: 'medium' },
      { name: 'Cilantro', quantity: 30, unit: 'g' },
      { name: 'Jalapeño', quantity: 1, unit: 'pcs' },
    ],
    steps: [
      { stepNumber: 1, instruction: 'Mash avocados with fork - leave some chunks.', michelinNote: 'Texture is key.' },
      { stepNumber: 2, instruction: 'Add lime juice immediately to prevent browning.', michelinNote: 'The acid preserves color.' },
      { stepNumber: 3, instruction: 'Dice onion, tomato, jalapeño finely.', michelinNote: 'Uniform dice.' },
      { stepNumber: 4, instruction: 'Mix everything together. Season with salt.', michelinNote: 'Taste and adjust.' },
    ]
  },
  'churros': {
    ingredients: [
      { name: 'Flour', quantity: 250, unit: 'g' },
      { name: 'Water', quantity: 250, unit: 'ml' },
      { name: 'Butter', quantity: 100, unit: 'g' },
      { name: 'Sugar', quantity: 100, unit: 'g' },
      { name: 'Cinnamon', quantity: 2, unit: 'tbsp' },
      { name: 'Eggs', quantity: 2, unit: 'pcs' },
    ],
    steps: [
      { stepNumber: 1, instruction: 'Boil water and butter. Add flour, stir until combined.', michelinNote: 'Dough forms a ball.' },
      { stepNumber: 2, instruction: 'Let cool slightly. Beat in eggs one at a time.', michelinNote: 'Wait between additions.' },
      { stepNumber: 3, instruction: 'Pipe into hot oil. Fry until golden.', michelinNote: 'Don\'t overcrowd.' },
      { stepNumber: 4, instruction: 'Roll in cinnamon sugar.', michelinNote: 'Serve with chocolate sauce.' },
    ]
  },
  'pozole': {
    ingredients: [
      { name: 'Pork shoulder', quantity: 750, unit: 'g' },
      { name: 'Hominy', quantity: 800, unit: 'g' },
      { name: 'Dried guajillo chilies', quantity: 4, unit: 'pcs' },
      { name: 'Garlic', quantity: 6, unit: 'cloves' },
      { name: 'Oregano', quantity: 2, unit: 'tbsp' },
      { name: 'Radishes', quantity: 4, unit: 'pcs' },
    ],
    steps: [
      { stepNumber: 1, instruction: 'Boil pork until tender, about 2 hours.', michelinNote: 'Shred when done.' },
      { stepNumber: 2, instruction: 'Toast and rehydrate chilies. Blend with garlic.', michelinNote: 'The sauce base.' },
      { stepNumber: 3, instruction: 'Add chili sauce to pork broth.', michelinNote: 'Simmer 30 minutes.' },
      { stepNumber: 4, instruction: 'Add hominy and shredded pork.', michelinNote: 'Serve with toppings.' },
    ]
  },
  'tacos-al-pastor': {
    ingredients: [
      { name: 'Pork shoulder', quantity: 500, unit: 'g' },
      { name: 'Achiote paste', quantity: 60, unit: 'g' },
      { name: 'Pineapple', quantity: 200, unit: 'g' },
      { name: 'Corn tortillas', quantity: 12, unit: 'pcs' },
      { name: 'Onion', quantity: 1, unit: 'medium' },
      { name: 'Cilantro', quantity: 30, unit: 'g' },
    ],
    steps: [
      { stepNumber: 1, instruction: 'Marinate pork with achiote and pineapple juice overnight.', michelinNote: 'The red color comes from achiote.' },
      { stepNumber: 2, instruction: 'Grill or pan-fry pork until charred.', michelinNote: 'Slightly charred is good.' },
      { stepNumber: 3, instruction: 'Slice pork thinly.', michelinNote: 'Chop on cutting board.' },
      { stepNumber: 4, instruction: 'Serve on warm tortillas with pineapple, onion, cilantro.', michelinNote: 'Add lime and salsa.' },
    ]
  },
  'tres-leches': {
    ingredients: [
      { name: 'Cake flour', quantity: 200, unit: 'g' },
      { name: 'Eggs', quantity: 4, unit: 'pcs' },
      { name: 'Sugar', quantity: 200, unit: 'g' },
      { name: 'Evaporated milk', quantity: 350, unit: 'ml' },
      { name: 'Condensed milk', quantity: 350, unit: 'ml' },
      { name: 'Heavy cream', quantity: 250, unit: 'ml' },
    ],
    steps: [
      { stepNumber: 1, instruction: 'Bake a simple sponge cake. Cool completely.', michelinNote: 'Don\'t overbake.' },
      { stepNumber: 2, instruction: 'Mix evaporated milk, condensed milk, cream.', michelinNote: 'The three milks.' },
      { stepNumber: 3, instruction: 'Poke holes in cake, pour milk mixture over.', michelinNote: 'Let soak overnight.' },
      { stepNumber: 4, instruction: 'Top with whipped cream.', michelinNote: 'Serve cold.' },
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
