const { Client } = require('pg');
const client = new Client({ 
  host: 'db.ycwbumsmlikiquplkdln.supabase.co', 
  port: 5432, 
  database: 'postgres', 
  user: 'postgres', 
  password: 'HailMaryFullOfGrace1$' 
});

const recipes = [
  { name: 'Tiramisu Classic', cuisine: 'f51d9e26-ace3-4b36-9d0c-6364877d3d94', ingredients: ['500g mascarpone cheese', '4 eggs separated', '100g sugar', '200ml espresso cooled', '200g ladyfinger cookies', '2 tbsp cocoa powder', '1 tsp vanilla extract'], steps: ['Beat egg yolks with sugar until creamy', 'Add mascarpone and vanilla', 'Whip egg whites to stiff peaks and fold in', 'Dip ladyfingers briefly in espresso', 'Layer cookies and cream mixture', 'Repeat layers, dust with cocoa', 'Refrigerate 4+ hours'] },
  { name: 'Chicken Enchiladas Verdes', cuisine: '539d04d6-e193-4f0f-930a-90553fb21704', ingredients: ['500g shredded chicken', '8 flour tortillas', '200g shredded cheese', '1 cup enchilada sauce', '1 onion diced', '2 cloves garlic', '1 tsp cumin', 'Sour cream for serving'], steps: ['Saute onion and garlic', 'Mix chicken with cumin and half the cheese', 'Fill tortillas with chicken mixture', 'Roll and place in baking dish', 'Pour enchilada sauce over', 'Top with remaining cheese', 'Bake 20 min at 375F'] },
  { name: 'Tonkotsu Ramen Authentic', cuisine: 'a3cb4471-db63-434e-a2e2-255242ffaca0', ingredients: ['500g pork bones', '300g pork belly', '400g ramen noodles', '4 cups pork broth', '2 soft boiled eggs', 'Green onions', 'Nori sheets', 'Soy sauce', 'Garlic', 'Ginger'], steps: ['Boil pork bones 8+ hours for broth', 'Marinate pork belly in soy sauce', 'Braise pork belly until tender', 'Prepare soft boiled eggs', 'Cook ramen noodles', 'Assemble bowl with broth, noodles, pork', 'Top with egg, nori, green onions'] },
  { name: 'Coq au Vin Rouge', cuisine: '2f76ffd5-3152-4ed6-bb2a-5d4b1c09b07b', ingredients: ['1 whole chicken cut', '200g bacon', '1 bottle red wine', '200g mushrooms', '12 pearl onions', '2 carrots', '3 cloves garlic', 'Thyme', 'Bay leaves', 'Chicken stock'], steps: ['Marinate chicken in wine overnight', 'Brown bacon and remove', 'Brown chicken pieces', 'Saute vegetables', 'Add wine, stock, herbs', 'Simmer 1.5 hours', 'Add bacon back, serve'] },
  { name: 'Kung Pao Chicken Spicy', cuisine: '8232ae82-2fa2-4f95-a9f1-bc7ddd817d28', ingredients: ['500g chicken breast', '100g peanuts', '4 dried chilies', 'Bell pepper', 'Zucchini', '3 tbsp soy sauce', '2 tbsp vinegar', '1 tbsp sugar', 'Garlic', 'Ginger'], steps: ['Cube chicken and marinate', 'Make sauce with soy, vinegar, sugar', 'Stir fry peanuts until golden', 'Stir fry chilies and vegetables', 'Add chicken and cook', 'Pour sauce, toss to coat', 'Add peanuts, serve'] },
  { name: 'Butter Chicken Curry', cuisine: 'fec72a8d-e056-400b-8370-f915b936317a', ingredients: ['600g chicken thighs', '200g yogurt', '100g butter', '1 cup tomato puree', '100ml heavy cream', 'Garam masala', 'Garlic', 'Ginger', 'Kashmiri chili', 'Fenugreek'], steps: ['Marinate chicken in yogurt spices', 'Grill or pan-fry chicken', 'Saute garlic ginger', 'Add tomato puree and spices', 'Simmer 20 minutes', 'Add butter and cream', 'Add chicken, simmer 10 min'] },
  { name: 'BBQ Pulled Pork Southern', cuisine: '813587ed-24eb-421d-97be-f5f2d1740e86', ingredients: ['2kg pork shoulder', 'BBQ spice rub', '500ml BBQ sauce', '250ml apple cider vinegar', 'Burger buns', 'Coleslaw mix'], steps: ['Apply dry rub to pork overnight', 'Slow cook pork 8 hours at 225F', 'Shred with forks', 'Mix with BBQ sauce and vinegar', 'Toast buns', 'Pile pork on buns', 'Top with coleslaw'] },
  { name: 'Shrimp Scampi Pasta', cuisine: 'f51d9e26-ace3-4b36-9d0c-6364877d3d94', ingredients: ['500g large shrimp', '400g linguine', '100g butter', '6 cloves garlic', '1/2 cup white wine', 'Lemon juice', 'Parsley', 'Red pepper flakes'], steps: ['Cook pasta al dente', 'Saute garlic in butter', 'Add shrimp, cook pink', 'Add wine and lemon', 'Toss with pasta', 'Add parsley and pepper', 'Serve immediately'] },
  { name: 'Fish Tacos Baja', cuisine: '539d04d6-e193-4f0f-930a-90553fb21704', ingredients: ['500g white fish', '8 corn tortillas', 'Cabbage slaw', 'Pickled onions', 'Cilantro', 'Lime', 'Chipotle mayo', 'Cumin', 'Chili powder'], steps: ['Season fish with cumin and chili', 'Grill or pan-sear fish', 'Warm tortillas', 'Make chipotle mayo', 'Assemble with slaw', 'Add pickled onions', 'Squeeze lime, serve'] },
  { name: 'Miso Soup Traditional', cuisine: 'a3cb4471-db63-434e-a2e2-255242ffaca0', ingredients: ['4 cups dashi', '3 tbsp miso paste', '100g tofu', '2 sheets nori', 'Green onions', 'Wakame seaweed'], steps: ['Prepare dashi stock', 'Soft boil tofu cubes', 'Rehydrate wakame', 'Dissolve miso in warm dashi', 'Add tofu and wakame', 'Serve in bowls', 'Top with nori and green onions'] },
  { name: 'Beef Bourguignon French', cuisine: '2f76ffd5-3152-4ed6-bb2a-5d4b1c09b07b', ingredients: ['1kg beef chuck', '200g bacon', '1 bottle red wine', '250g pearl onions', '300g carrots', '400g mushrooms', '3 cloves garlic', 'Tomato paste', 'Beef stock'], steps: ['Brown beef chunks, set aside', 'Brown bacon and vegetables', 'Add tomato paste and garlic', 'Pour in wine and stock', 'Return beef, simmer 3 hours', 'Add mushrooms near end', 'Serve with crusty bread'] },
  { name: 'Mapo Tofu Spicy', cuisine: '8232ae82-2fa2-4f95-a9f1-bc7ddd817d28', ingredients: ['400g silken tofu', '300g ground pork', '2 tbsp doubanjiang', '1 tbsp douchi', 'Sichuan peppercorns', 'Garlic', 'Ginger', 'Green onions', 'Sesame oil'], steps: ['Cube tofu, blanch briefly', 'Brown pork with ginger', 'Add doubanjiang and douchi', 'Add stock and tofu', 'Season with peppercorns', 'Thicken with starch', 'Finish with sesame oil'] },
  { name: 'Palak Paneer Indian', cuisine: 'fec72a8d-e056-400b-8370-f915b936317a', ingredients: ['400g paneer', '500g spinach', '2 onions', '3 tomatoes', 'Ginger', 'Garlic', 'Garam masala', 'Cream', 'Ghee'], steps: ['Blanch and puree spinach', 'Saute onion tomato paste', 'Add ginger garlic', 'Add spinach puree', 'Simmer 15 minutes', 'Add paneer cubes', 'Finish with cream and ghee'] },
  { name: 'Meatloaf Classic', cuisine: '813587ed-24eb-421d-97be-f5f2d1740e86', ingredients: ['500g ground beef', '200g pork sausage', '2 eggs', '1 cup breadcrumbs', '1 onion', 'Ketchup', 'Worcestershire', 'Brown sugar', 'Mustard'], steps: ['Mix meats with eggs, breadcrumbs', 'Saute onion, add to mixture', 'Form loaf shape', 'Mix ketchup, sugar, mustard for glaze', 'Spread glaze on top', 'Bake 1 hour at 350F', 'Rest 10 min before slicing'] },
  { name: 'Risotto Milanese Saffron', cuisine: 'f51d9e26-ace3-4b36-9d0c-6364877d3d94', ingredients: ['400g arborio rice', '1L chicken stock', '100g parmesan', '100g butter', 'Saffron threads', '1 onion', 'White wine', 'Beef stock'], steps: ['Heat stock with saffron', 'Saute onion in butter', 'Toast rice 2 min', 'Add wine, let absorb', 'Add stock ladle by ladle', 'Stir constantly 18 min', 'Finish with parmesan'] },
  { name: 'Chile Rellenos Poblando', cuisine: '539d04d6-e193-4f0f-930a-90553fb21704', ingredients: ['6 poblano peppers', '200g queso Oaxaca', '4 eggs separated', 'Flour', 'Tomatillo salsa', 'Sour cream', 'Cilantro'], steps: ['Roast and peel poblanos', 'Make slit, stuff with cheese', 'Beat egg whites to stiff peaks', 'Mix yolks with flour', 'Coat peppers with flour, then egg', 'Fry until golden', 'Serve with salsa'] },
  { name: 'Yakitori Chicken', cuisine: 'a3cb4471-db63-434e-a2e2-255242ffaca0', ingredients: ['500g chicken thighs', '200g chicken liver', 'Bamboo skewers', 'Soy sauce', 'Mirin', 'Sake', 'Sugar', 'Green onions'], steps: ['Cut chicken into bite pieces', 'Soak skewers overnight', 'Make yakitori sauce', 'Thread chicken and liver', 'Grill, basting with sauce', 'Char slightly', 'Serve with green onions'] },
  { name: 'Ratatouille Provencal', cuisine: '2f76ffd5-3152-4ed6-bb2a-5d4b1c09b07b', ingredients: ['2 zucchini', '2 eggplants', '4 tomatoes', '2 bell peppers', '1 onion', '4 cloves garlic', 'Herbs de Provence', 'Olive oil', 'Thyme'], steps: ['Slice vegetables thinly', 'Make tomato sauce base', 'Layer vegetables in dish', 'Drizzle with olive oil', 'Season with herbs', 'Bake 45 min at 375F', 'Serve warm'] },
  { name: 'Sweet and Sour Pork Chinese', cuisine: '8232ae82-2fa2-4f95-a9f1-bc7ddd817d28', ingredients: ['500g pork loin', 'Pineapple chunks', 'Bell peppers', '1 onion', 'Rice vinegar', 'Sugar', 'Soy sauce', 'Ketchup', 'Cornstarch'], steps: ['Cut pork, coat in cornstarch', 'Deep fry pork until golden', 'Make sweet and sour sauce', 'Stir fry vegetables', 'Add sauce and pineapple', 'Return pork', 'Serve with rice'] },
  { name: 'Dal Makhani Punjabi', cuisine: 'fec72a8d-e056-400b-8370-f915b936317a', ingredients: ['300g black lentils', '100g kidney beans', '200g cream', '100g butter', 'Tomato puree', 'Ginger', 'Garlic', 'Garam masala', 'Kashmiri chili'], steps: ['Soak and pressure cook lentils', 'Saute ginger garlic', 'Add tomato and spices', 'Add cooked lentils', 'Simmer 30 minutes', 'Add cream and butter', 'Serve with naan'] },
  { name: 'Cobb Salad American', cuisine: '813587ed-24eb-421d-97be-f5f2d1740e86', ingredients: ['Chicken breast', 'Bacon', 'Hard boiled eggs', 'Avocado', 'Blue cheese', 'Tomatoes', 'Romaine lettuce', 'Ranch dressing'], steps: ['Grill and slice chicken', 'Cook bacon until crispy', 'Halve eggs, dice avocado', 'Chop tomatoes', 'Arrange on greens', 'Drizzle with ranch', 'Serve immediately'] },
  { name: 'Osso Buco Milanese', cuisine: 'f51d9e26-ace3-4b36-9d0c-6364877d3d94', ingredients: ['4 veal shanks', '1 cup white wine', '2 cups chicken stock', '2 carrots', '2 celery stalks', '1 onion', '4 cloves garlic', 'Tomato paste', 'Gremolata'], steps: ['Brown veal shanks, set aside', 'Saute vegetables', 'Add tomato paste', 'Pour wine and stock', 'Return veal, braise 2 hours', 'Make gremolata', 'Serve with risotto'] },
  { name: 'Carnitas Mexican Style', cuisine: '539d04d6-e193-4f0f-930a-90553fb21704', ingredients: ['1.5kg pork shoulder', 'Oranges', 'Lime', 'Cumin', 'Oregano', 'Chipotle', 'Garlic', 'Bay leaves', 'Corn tortillas'], steps: ['Season pork with spices', 'Add oranges, lime, garlic', 'Pressure cook 45 min', 'Shred meat', 'Crispy in oven or pan', 'Serve on tortillas', 'With onion, cilantro, lime'] },
  { name: 'Tempura Shrimp Vegetables', cuisine: 'a3cb4471-db63-434e-a2e2-255242ffaca0', ingredients: ['400g shrimp', '2 zucchinis', '2 sweet potatoes', '1 cup flour', '1 cup cornstarch', 'Ice cold water', 'Dashi', 'Soy sauce', 'Mirin'], steps: ['Make batter with ice water', 'Slice vegetables', 'Dip shrimp and veggies', 'Deep fry until golden', 'Make dipping sauce', 'Serve hot', 'With dipping sauce'] },
  { name: 'Quiche Lorraine French', cuisine: '2f76ffd5-3152-4ed6-bb2a-5d4b1c09b07b', ingredients: ['1 pie crust', '200g bacon', '200g gruyere cheese', '4 eggs', '2 cups cream', '1 cup milk', 'Nutmeg', 'Thyme'], steps: ['Blind bake crust', 'Cook bacon until crispy', 'Layer bacon and cheese', 'Whisk eggs, cream, milk', 'Season with nutmeg', 'Pour into crust', 'Bake 35 min at 375F'] },
  { name: 'General Tso Chicken Chinese', cuisine: '8232ae82-2fa2-4f95-a9f1-bc7ddd817d28', ingredients: ['500g chicken thighs', 'Cornstarch', 'Dried chilies', 'Garlic', 'Ginger', 'Soy sauce', 'Rice vinegar', 'Sugar', 'Sesame oil'], steps: ['Cut chicken, coat in cornstarch', 'Deep fry until crispy', 'Make sauce', 'Saute chilies, garlic, ginger', 'Add sauce, thicken', 'Toss chicken', 'Serve with rice'] }
];

async function addRecipes() {
  await client.connect();
  let added = 0;
  for (const r of recipes) {
    const slug = r.name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    try {
      const recipeResult = await client.query(
        'INSERT INTO recipe (slug, title, cuisine_id, status, published_at) VALUES ($1, $2, $3, $4, NOW()) RETURNING id',
        [slug, r.name, r.cuisine, 'published']
      );
      const recipeId = recipeResult.rows[0].id;
      
      for (let i = 0; i < r.ingredients.length; i++) {
        await client.query(
          'INSERT INTO ingredient (recipe_id, name, order_index) VALUES ($1, $2, $3)',
          [recipeId, r.ingredients[i], i]
        );
      }
      for (let i = 0; i < r.steps.length; i++) {
        await client.query(
          'INSERT INTO recipe_step (recipe_id, step_number, instruction) VALUES ($1, $2, $3)',
          [recipeId, i + 1, r.steps[i]]
        );
      }
      console.log('Added:', r.name);
      added++;
    } catch (e) {
      if (e.code === '23505') {
        console.log('Skipped (exists):', r.name);
      } else {
        console.error('Error:', r.name, e.message);
      }
    }
  }
  console.log('Total added:', added);
  await client.end();
}
addRecipes().catch(e => { console.error(e); client.end(); });
