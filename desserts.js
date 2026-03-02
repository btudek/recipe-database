const { Client } = require('pg');
const client = new Client({ host: 'db.ycwbumsmlikiquplkdln.supabase.co', port: 5432, database: 'postgres', user: 'postgres', password: process.env.DBPASS });

const RECIPES = {
  'creme-brulee': {
    ingredients: [
      { name: 'Heavy cream', quantity: 500, unit: 'ml' },
      { name: 'Vanilla bean', quantity: 1, unit: 'pcs', notes: 'split and scraped' },
      { name: 'Egg yolks', quantity: 5, unit: 'pcs' },
      { name: 'Sugar', quantity: 100, unit: 'g', notes: 'plus more for topping' },
    ],
    steps: [
      { stepNumber: 1, instruction: 'Heat cream with vanilla bean until simmering.', michelinNote: 'Don\'t boil - just until edges bubble.' },
      { stepNumber: 2, instruction: 'Whisk yolks and sugar until pale.', michelinNote: 'Should fall in ribbons.' },
      { stepNumber: 3, instruction: 'Slowly pour hot cream into yolks, whisking constantly.', michelinNote: 'Temper slowly to avoid scrambling.' },
      { stepNumber: 4, instruction: 'Strain into ramekins. Bake at 325F water bath for 45 min.', michelinNote: 'Jiggle should be slight - it sets as it cools.' },
      { stepNumber: 5, instruction: 'Refrigerate 4 hours. Top with sugar and torch until caramelized.', michelinNote: 'Sugar layer should crack satisfyingly.' },
    ]
  },
  'pavlova': {
    ingredients: [
      { name: 'Egg whites', quantity: 4, unit: 'pcs' },
      { name: 'Sugar', quantity: 250, unit: 'g' },
      { name: 'Cornstarch', quantity: 1, unit: 'tsp' },
      { name: 'Vinegar', quantity: 1, unit: 'tsp' },
      { name: 'Heavy cream', quantity: 300, unit: 'ml' },
      { name: 'Mixed berries', quantity: 300, unit: 'g' },
    ],
    steps: [
      { stepNumber: 1, instruction: 'Beat egg whites to soft peaks. Gradually add sugar.', michelinNote: 'Sugar must dissolve fully - rub between fingers.' },
      { stepNumber: 2, instruction: 'Fold in cornstarch and vinegar. Pipe or spoon onto baking sheet.', michelinNote: 'Make a well in center for toppings.' },
      { stepNumber: 3, instruction: 'Bake at 225F for 1.5 hours. Turn off oven, leave inside to cool.', michelinNote: 'Slow cooling prevents cracks.' },
      { stepNumber: 4, instruction: 'Whip cream to soft peaks. Pile onto meringue.', michelinNote: 'Don\'t overwhip.' },
      { stepNumber: 5, instruction: 'Top with fresh berries. Serve immediately.', michelinNote: 'Meringue softens quickly.' },
    ]
  },
  'chocolate-mousse': {
    ingredients: [
      { name: 'Dark chocolate', quantity: 200, unit: 'g', notes: '70% cacao' },
      { name: 'Eggs', quantity: 3, unit: 'pcs', notes: 'separated' },
      { name: 'Heavy cream', quantity: 150, unit: 'ml' },
      { name: 'Sugar', quantity: 50, unit: 'g' },
      { name: 'Espresso', quantity: 30, unit: 'ml', notes: 'optional' },
    ],
    steps: [
      { stepNumber: 1, instruction: 'Melt chocolate over double boiler. Let cool slightly.', michelinNote: 'Don\'t get water in it or chocolate will seize.' },
      { stepNumber: 2, instruction: 'Whip egg yolks into chocolate. Add espresso.', michelinNote: 'Working quickly prevents eggs from cooking.' },
      { stepNumber: 3, instruction: 'Beat egg whites to stiff peaks. Fold in gently.', michelinNote: 'Fold in three additions for airy texture.' },
      { stepNumber: 4, instruction: 'Whip cream. Fold into mixture.', michelinNote: 'Don\'t overmix.' },
      { stepNumber: 5, instruction: 'Chill at least 4 hours or overnight.', michelinNote: 'Overnight is best for flavor development.' },
    ]
  },
  'baklava': {
    ingredients: [
      { name: 'Phyllo dough', quantity: 400, unit: 'g' },
      { name: 'Butter', quantity: 200, unit: 'g', notes: 'melted' },
      { name: 'Almonds', quantity: 300, unit: 'g', notes: 'ground' },
      { name: 'Walnuts', quantity: 200, unit: 'g', notes: 'ground' },
      { name: 'Sugar', quantity: 200, unit: 'g' },
      { name: 'Water', quantity: 200, unit: 'ml' },
      { name: 'Honey', quantity: 150, unit: 'ml' },
    ],
    steps: [
      { stepNumber: 1, instruction: 'Mix almonds, walnuts, and cinnamon for filling.', michelinNote: 'Toast nuts first for deeper flavor.' },
      { stepNumber: 2, instruction: 'Layer phyllo in pan, brushing each with butter. Repeat 10 times.', michelinNote: 'Keep phyllo covered - it dries out fast.' },
      { stepNumber: 3, instruction: 'Spread nut mixture. Top with 10 more buttered phyllo layers.', michelinNote: 'Press gently to compact.' },
      { stepNumber: 4, instruction: 'Cut into diamond shapes before baking. Bake at 350F for 45 min.', michelinNote: 'Cutting allows syrup to penetrate.' },
      { stepNumber: 5, instruction: 'Make syrup: boil sugar and water, add honey. Pour over hot baklava.', michelinNote: 'Cool slightly before pouring.' },
    ]
  },
  'flan': {
    ingredients: [
      { name: 'Eggs', quantity: 4, unit: 'pcs' },
      { name: 'Sweetened condensed milk', quantity: 400, unit: 'g' },
      { name: 'Evaporated milk', quantity: 350, unit: 'ml' },
      { name: 'Vanilla', quantity: 1, unit: 'tsp' },
      { name: 'Sugar', quantity: 100, unit: 'g', notes: 'for caramel' },
    ],
    steps: [
      { stepNumber: 1, instruction: 'Make caramel: melt sugar until amber. Pour into ramekins.', michelinNote: 'Watch carefully - it burns quickly.' },
      { stepNumber: 2, instruction: 'Blend eggs, condensed milk, evaporated milk, and vanilla.', michelinNote: 'Don\'t overblend - introduce air.' },
      { stepNumber: 3, instruction: 'Strain custard over caramel. Place in water bath.', michelinNote: 'Straining ensures silky texture.' },
      { stepNumber: 4, instruction: 'Bake at 350F for 45-50 minutes.', michelinNote: 'Toothpick should come out clean.' },
      { stepNumber: 5, instruction: 'Chill overnight. Invert onto plates before serving.', michelinNote: 'Run knife around edge to release.' },
    ]
  },
  'croissant': {
    ingredients: [
      { name: 'Bread flour', quantity: 500, unit: 'g' },
      { name: 'Butter', quantity: 300, unit: 'g', notes: 'cold' },
      { name: 'Milk', quantity: 250, unit: 'ml' },
      { name: 'Yeast', quantity: 10, unit: 'g' },
      { name: 'Sugar', quantity: 50, unit: 'g' },
      { name: 'Salt', quantity: 10, unit: 'g' },
    ],
    steps: [
      { stepNumber: 1, instruction: 'Make dough: mix flour, milk, yeast, sugar, salt. Refrigerate 1 hour.', michelinNote: 'Cold dough is easier to work with.' },
      { stepNumber: 2, instruction: 'Pound butter into flat square. Roll dough, encase butter.', michelinNote: 'Butter must be same consistency as dough.' },
      { stepNumber: 3, instruction: 'Fold dough into thirds. Refrigerate 30 min. Repeat 3 times.', michelinNote: 'This creates the flaky layers.' },
      { stepNumber: 4, instruction: 'Roll out, cut triangles. Roll from base to tip. Curve into crescent.', michelinNote: 'Keep everything cold.' },
      { stepNumber: 5, instruction: 'Proof until doubled. Brush with egg wash. Bake at 400F for 15-18 min.', michelinNote: 'Hot oven creates layers - don\'t open door.' },
    ]
  },
  'macarons': {
    ingredients: [
      { name: 'Almond flour', quantity: 200, unit: 'g' },
      { name: 'Powdered sugar', quantity: 200, unit: 'g' },
      { name: 'Egg whites', quantity: 150, unit: 'g', notes: 'aged overnight' },
      { name: 'Granulated sugar', quantity: 150, unit: 'g' },
      { name: 'Food coloring', quantity: 1, unit: 'drop', notes: 'optional' },
    ],
    steps: [
      { stepNumber: 1, instruction: 'Sift almond flour and powdered sugar together twice.', michelinNote: 'Removes lumps for smooth shells.' },
      { stepNumber: 2, instruction: 'Beat egg whites to foamy. Add sugar gradually. Beat to stiff peaks.', michelinNote: 'Age whites for better texture.' },
      { stepNumber: 3, instruction: 'Fold in almond mixture (macaronage) until flows like lava.', michelinNote: 'This is the critical step.' },
      { stepNumber: 4, instruction: 'Pipe circles. Tap to release air. Let rest 30-60 min until skin forms.', michelinNote: 'Skin should not be sticky.' },
      { stepNumber: 5, instruction: 'Bake at 300F for 15 min. Sandwich with filling.', michelinNote: 'Feet should form but not burn.' },
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
