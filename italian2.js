const { Client } = require('pg');
const client = new Client({ host: 'db.ycwbumsmlikiquplkdln.supabase.co', port: 5432, database: 'postgres', user: 'postgres', password: process.env.DBPASS });

const recipes = [
  { title: 'Tiramisu', slug: 'tiramisu', description: 'Classic Italian coffee-flavored dessert', cuisine_id: 'f51d9e26-ace3-4b36-9d0c-6364877d3d94' },
  { title: 'Panna Cotta', slug: 'panna-cotta', description: 'Italian cream dessert', cuisine_id: 'f51d9e26-ace3-4b36-9d0c-6364877d3d94' },
  { title: 'Tiramisu', slug: 'tiramisu', description: 'Classic Italian coffee-flavored dessert', cuisine_id: 'f51d9e26-ace3-4b36-9d0c-6364877d3d94' },
  { title: 'Cannoli', slug: 'cannoli', description: 'Sicilian fried pastry tubes', cuisine_id: 'f51d9e26-ace3-4b36-9d0c-6364877d3d94' },
  { title: 'Osso Buco', slug: 'osso-buco', description: 'Braised veal shanks', cuisine_id: 'f51d9e26-ace3-4b36-9d0c-6364877d3d94' },
  { title: 'Risotto', slug: 'risotto', description: 'Creamy Italian rice dish', cuisine_id: 'f51d9e26-ace3-4b36-9d0c-6364877d3d94' },
];

const RECIPES = {
  'tiramisu': {
    ingredients: [
      { name: 'Mascarpone', quantity: 500, unit: 'g' },
      { name: 'Eggs', quantity: 4, unit: 'pcs' },
      { name: 'Sugar', quantity: 100, unit: 'g' },
      { name: 'Espresso', quantity: 250, unit: 'ml', notes: 'cooled' },
      { name: 'Ladyfingers', quantity: 300, unit: 'g' },
      { name: 'Cocoa powder', quantity: 30, unit: 'g' },
    ],
    steps: [
      { stepNumber: 1, instruction: 'Whisk egg yolks with sugar until pale and thick.', michelinNote: 'Ribbon stage - when it falls in ribbons.' },
      { stepNumber: 2, instruction: 'Fold in mascarpone until smooth.', michelinNote: 'Don\'t overmix.' },
      { stepNumber: 3, instruction: 'Dip ladyfingers briefly in espresso.', michelinNote: 'Don\'t soak - they\'ll get soggy.' },
      { stepNumber: 4, instruction: 'Layer: cookies, cream, repeat.', michelinNote: 'Dust cocoa on top.' },
      { stepNumber: 5, instruction: 'Chill overnight before serving.', michelinNote: 'Flavors meld overnight.' },
    ]
  },
  'panna-cotta': {
    ingredients: [
      { name: 'Heavy cream', quantity: 500, unit: 'ml' },
      { name: 'Sugar', quantity: 80, unit: 'g' },
      { name: 'Vanilla bean', quantity: 1, unit: 'pcs' },
      { name: 'Gelatin', quantity: 2, unit: 'sheets' },
      { name: 'Fruit puree', quantity: 200, unit: 'g' },
    ],
    steps: [
      { stepNumber: 1, instruction: 'Bloom gelatin in cold water.', michelinNote: 'Softens for even distribution.' },
      { stepNumber: 2, instruction: 'Heat cream with sugar and vanilla.', michelinNote: 'Don\'t boil.' },
      { stepNumber: 3, instruction: 'Add gelatin, stir until dissolved.', michelinNote: 'Strain for smooth texture.' },
      { stepNumber: 4, instruction: 'Pour into molds, chill 4 hours.', michelinNote: 'Overnight is better.' },
      { stepNumber: 5, instruction: 'Unmold onto plates with fruit.', michelinNote: 'Warm molds to release.' },
    ]
  },
  'cannoli': {
    ingredients: [
      { name: 'Flour', quantity: 300, unit: 'g' },
      { name: 'Sugar', quantity: 50, unit: 'g' },
      { name: 'Butter', quantity: 100, unit: 'g' },
      { name: 'Ricotta', quantity: 500, unit: 'g' },
      { name: 'Chocolate chips', quantity: 150, unit: 'g' },
      { name: 'Marsala wine', quantity: 60, unit: 'ml' },
    ],
    steps: [
      { stepNumber: 1, instruction: 'Make dough: flour, sugar, butter, wine, egg.', michelinNote: 'Rest 1 hour.' },
      { stepNumber: 2, instruction: 'Roll thin, cut circles, wrap around cannoli forms.', michelinNote: 'Seal with egg wash.' },
      { stepNumber: 3, instruction: 'Fry until golden.', michelinNote: 'Hot oil - 350F.' },
      { stepNumber: 4, instruction: 'Drain, cool, remove forms.', michelinNote: 'Handle carefully.' },
      { stepNumber: 5, instruction: 'Pipe ricotta mixture into shells. Dip ends in chocolate.', michelinNote: 'Fill just before serving.' },
    ]
  },
  'osso-buco': {
    ingredients: [
      { name: 'Veal shanks', quantity: 4, unit: 'pcs' },
      { name: 'Onion', quantity: 2, unit: 'medium' },
      { name: 'Carrots', quantity: 2, unit: 'medium' },
      { name: 'Celery', quantity: 2, unit: 'stalks' },
      { name: 'Tomato paste', quantity: 60, unit: 'g' },
      { name: 'White wine', quantity: 250, unit: 'ml' },
      { name: 'Beef stock', quantity: 500, unit: 'ml' },
    ],
    steps: [
      { stepNumber: 1, instruction: 'Season and flour veal shanks. Brown in pot.', michelinNote: 'Get good color on all sides.' },
      { stepNumber: 2, instruction: 'Sauté mirepoix (onion, carrot, celery).', michelinNote: 'The flavor base.' },
      { stepNumber: 3, instruction: 'Add tomato paste, wine, stock.', michelinNote: 'Deglaze the pot.' },
      { stepNumber: 4, instruction: 'Cover, braise 2 hours until tender.', michelinNote: 'Low and slow is key.' },
      { stepNumber: 5, instruction: 'Serve with gremolata and risotto.', michelinNote: 'Gremolata: lemon, parsley, garlic.' },
    ]
  },
  'risotto': {
    ingredients: [
      { name: 'Arborio rice', quantity: 300, unit: 'g' },
      { name: 'White wine', quantity: 150, unit: 'ml' },
      { name: 'Onion', quantity: 1, unit: 'medium' },
      { name: 'Parmesan', quantity: 100, unit: 'g' },
      { name: 'Butter', quantity: 60, unit: 'g' },
      { name: 'Stock', quantity: 1000, unit: 'ml', notes: 'warm' },
    ],
    steps: [
      { stepNumber: 1, instruction: 'Sauté onion in butter until soft.', michelinNote: 'Don\'t brown.' },
      { stepNumber: 2, instruction: 'Toast rice for 2 minutes.', michelinNote: 'Coat in butter, let it become translucent.' },
      { stepNumber: 3, instruction: 'Add wine, stir until absorbed.', michelinNote: 'The alcohol adds complexity.' },
      { stepNumber: 4, instruction: 'Add stock one ladle at a time, stirring constantly.', michelinNote: 'This is the key - patience.' },
      { stepNumber: 5, instruction: 'Finish with butter and parmesan.', michelinNote: 'Mantecatura - creates creamy texture.' },
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
