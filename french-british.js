const { Client } = require('pg');
const client = new Client({ host: 'db.ycwbumsmlikiquplkdln.supabase.co', port: 5432, database: 'postgres', user: 'postgres', password: process.env.DBPASS });

const recipes = [
  { title: 'Fish and Chips', slug: 'fish-and-chips', description: 'British battered fried fish with chips', cuisine_id: '813587ed-24eb-421d-97be-f5f2d1740e86' },
  { title: 'Shepherd\'s Pie', slug: 'shepherds-pie', description: 'Meat pie with mashed potato topping', cuisine_id: '813587ed-24eb-421d-97be-f5f2d1740e86' },
  { title: 'Beef Wellington', slug: 'beef-wellington', description: 'Beef in puff pastry with duxelles', cuisine_id: '2f76ffd5-3152-4ed6-bb2a-5d4b1c09b07b' },
  { title: 'Croissant', slug: 'croissant', description: 'French buttery laminated pastry', cuisine_id: '2f76ffd5-3152-4ed6-bb2a-5d4b1c09b07b' },
  { title: 'Beef Bourguignon', slug: 'beef-bourguignon', description: 'French braised beef in red wine', cuisine_id: '2f76ffd5-3152-4ed6-bb2a-5d4b1c09b07b' },
  { title: 'Crème Brûlée', slug: 'creme-brulee', description: 'French caramelized cream custard', cuisine_id: '2f76ffd5-3152-4ed6-bb2a-5d4b1c09b07b' },
];

const RECIPES = {
  'fish-and-chips': {
    ingredients: [
      { name: 'Cod fillets', quantity: 600, unit: 'g' },
      { name: 'Flour', quantity: 200, unit: 'g' },
      { name: 'Beer', quantity: 250, unit: 'ml' },
      { name: 'Potatoes', quantity: 800, unit: 'g' },
      { name: 'Baking powder', quantity: 1, unit: 'tsp' },
      { name: 'Salt', quantity: 1, unit: 'tsp' },
    ],
    steps: [
      { stepNumber: 1, instruction: 'Cut potatoes into chips, soak in water.', michelinNote: 'Removes excess starch.' },
      { stepNumber: 2, instruction: 'Make batter: flour, beer, baking powder.', michelinNote: 'Cold beer = flaky crust.' },
      { stepNumber: 3, instruction: 'Fry chips at 350F until golden.', michelinNote: 'Double-fry for extra crisp.' },
      { stepNumber: 4, instruction: 'Dip fish in batter, fry until golden.', michelinNote: 'Don\'t overcrowd.' },
      { stepNumber: 5, instruction: 'Serve with mushy peas and tartar sauce.', michelinNote: 'Traditional accompaniments.' },
    ]
  },
  'shepherds-pie': {
    ingredients: [
      { name: 'Ground lamb', quantity: 600, unit: 'g' },
      { name: 'Potatoes', quantity: 1000, unit: 'g' },
      { name: 'Onion', quantity: 2, unit: 'medium' },
      { name: 'Carrots', quantity: 2, unit: 'medium' },
      { name: 'Beef stock', quantity: 250, unit: 'ml' },
      { name: 'Worcestershire sauce', quantity: 30, unit: 'ml' },
    ],
    steps: [
      { stepNumber: 1, instruction: 'Brown lamb with onion and carrots.', michelinNote: 'Don\'t crowd the pan.' },
      { stepNumber: 2, instruction: 'Add stock and Worcestershire. Simmer 20 minutes.', michelinNote: 'Let flavors meld.' },
      { stepNumber: 3, instruction: 'Boil potatoes, mash with butter and cream.', michelinNote: 'Fluffy mashed potatoes.' },
      { stepNumber: 4, instruction: 'Transfer meat to baking dish, top with potatoes.', michelinNote: 'Spread evenly.' },
      { stepNumber: 5, instruction: 'Bake at 400F for 20 minutes until golden.', michelinNote: 'The top should be crispy.' },
    ]
  },
  'beef-wellington': {
    ingredients: [
      { name: 'Beef tenderloin', quantity: 750, unit: 'g' },
      { name: 'Puff pastry', quantity: 500, unit: 'g' },
      { name: 'Mushrooms', quantity: 300, unit: 'g' },
      { name: 'Prosciutto', quantity: 150, unit: 'g' },
      { name: 'Egg', quantity: 1, unit: 'pcs' },
    ],
    steps: [
      { stepNumber: 1, instruction: 'Sear beef on all sides. Cool completely.', michelinNote: 'Cold beef is easier to wrap.' },
      { stepNumber: 2, instruction: 'Make duxelles: cook mushrooms until dry.', michelinNote: 'Dry filling prevents soggy pastry.' },
      { stepNumber: 3, instruction: 'Wrap beef in prosciutto, then duxelles, then pastry.', michelinNote: 'Tight wrap is essential.' },
      { stepNumber: 4, instruction: 'Brush with egg wash. Bake at 400F for 25 minutes.', michelinNote: 'Rest 10 min before slicing.' },
    ]
  },
  'croissant': {
    ingredients: [
      { name: 'Bread flour', quantity: 500, unit: 'g' },
      { name: 'Butter', quantity: 300, unit: 'g', notes: 'cold' },
      { name: 'Milk', quantity: 250, unit: 'ml' },
      { name: 'Sugar', quantity: 50, unit: 'g' },
      { name: 'Salt', quantity: 10, unit: 'g' },
      { name: 'Yeast', quantity: 10, unit: 'g' },
    ],
    steps: [
      { stepNumber: 1, instruction: 'Make dough, rest 1 hour.', michelinNote: 'Develop gluten.' },
      { stepNumber: 2, instruction: 'Encase butter in dough. Fold and roll 3 times.', michelinNote: 'Keep butter cold.' },
      { stepNumber: 3, instruction: 'Rest between folds.', michelinNote: 'This creates layers.' },
      { stepNumber: 4, instruction: 'Shape croissants. Proof 2 hours.', michelinNote: 'They should double in size.' },
      { stepNumber: 5, instruction: 'Bake at 400F for 15-18 minutes.', michelinNote: 'Golden brown is done.' },
    ]
  },
  'beef-bourguignon': {
    ingredients: [
      { name: 'Beef chuck', quantity: 1000, unit: 'g' },
      { name: 'Red wine', quantity: 750, unit: 'ml' },
      { name: 'Bacon', quantity: 150, unit: 'g' },
      { name: 'Pearl onions', quantity: 200, unit: 'g' },
      { name: 'Mushrooms', quantity: 250, unit: 'g' },
      { name: 'Carrots', quantity: 3, unit: 'medium' },
    ],
    steps: [
      { stepNumber: 1, instruction: 'Brown bacon, set aside. Brown beef in batches.', michelinNote: 'Don\'t crowd.' },
      { stepNumber: 2, instruction: 'Sauté vegetables.', michelinNote: 'The flavor base.' },
      { stepNumber: 3, instruction: 'Return beef, add wine and stock.', michelinNote: 'Use a good wine.' },
      { stepNumber: 4, instruction: 'Braise 3 hours until tender.', michelinNote: 'Low and slow.' },
      { stepNumber: 5, instruction: 'Add mushrooms and onions near end.', michelinNote: 'Serve with crusty bread.' },
    ]
  },
  'creme-brulee': {
    ingredients: [
      { name: 'Heavy cream', quantity: 500, unit: 'ml' },
      { name: 'Vanilla bean', quantity: 1, unit: 'pcs' },
      { name: 'Egg yolks', quantity: 5, unit: 'pcs' },
      { name: 'Sugar', quantity: 100, unit: 'g' },
      { name: 'Turbinado sugar', quantity: 60, unit: 'g', notes: 'for topping' },
    ],
    steps: [
      { stepNumber: 1, instruction: 'Heat cream with vanilla. Steep 15 minutes.', michelinNote: 'Infuse vanilla flavor.' },
      { stepNumber: 2, instruction: 'Whisk yolks with sugar. Temper with cream.', michelinNote: 'Don\'t scramble eggs.' },
      { stepNumber: 3, instruction: 'Strain, pour into ramekins. Bake water bath 45 min.', michelinNote: 'Jiggle - should be set.' },
      { stepNumber: 4, instruction: 'Chill for 4 hours minimum.', michelinNote: 'Overnight is best.' },
      { stepNumber: 5, instruction: 'Top with sugar, torch until caramelized.', michelinNote: 'Crack on serving.' },
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
