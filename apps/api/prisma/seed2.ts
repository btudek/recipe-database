import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Adding more recipes...');

  // Get or create cuisines
  const italian = await prisma.cuisine.upsert({
    where: { slug: 'italian' },
    update: {},
    create: { name: 'Italian', slug: 'italian', description: 'Classic Italian cuisine' },
  });

  const mexican = await prisma.cuisine.upsert({
    where: { slug: 'mexican' },
    update: {},
    create: { name: 'Mexican', slug: 'mexican', description: 'Vibrant Mexican flavors' },
  });

  const japanese = await prisma.cuisine.upsert({
    where: { slug: 'japanese' },
    update: {},
    create: { name: 'Japanese', slug: 'japanese', description: 'Refined Japanese cooking' },
  });

  const indian = await prisma.cuisine.upsert({
    where: { slug: 'indian' },
    update: {},
    create: { name: 'Indian', slug: 'indian', description: 'Aromatic Indian cuisine' },
  });

  const french = await prisma.cuisine.upsert({
    where: { slug: 'french' },
    update: {},
    create: { name: 'French', slug: 'french', description: 'Elegant French cuisine' },
  });

  const american = await prisma.cuisine.upsert({
    where: { slug: 'american' },
    update: {},
    create: { name: 'American', slug: 'american', description: 'Classic American comfort food' },
  });

  const dinner = await prisma.category.upsert({
    where: { slug: 'dinner' },
    update: {},
    create: { name: 'Dinner', slug: 'dinner', description: 'Main course meals' },
  });

  const breakfast = await prisma.category.upsert({
    where: { slug: 'breakfast' },
    update: {},
    create: { name: 'Breakfast', slug: 'breakfast', description: 'Morning meals' },
  });

  const dessert = await prisma.category.upsert({
    where: { slug: 'desserts' },
    update: {},
    create: { name: 'Desserts', slug: 'desserts', description: 'Sweet treats' },
  });

  // Recipe 2: Spaghetti Carbonara
  const carbonara = await prisma.recipe.upsert({
    where: { slug: 'spaghetti-carbonara' },
    update: {},
    create: {
      slug: 'spaghetti-carbonara',
      title: 'Spaghetti Carbonara',
      description: 'Creamy Roman pasta with eggs, cheese, pancetta, and black pepper.',
      seoDescription: 'Authentic Italian Spaghetti Carbonara recipe - creamy, rich, and ready in 20 minutes. Made with eggs, Pecorino Romano, pancetta, and fresh black pepper.',
      prepTime: 10,
      cookTime: 15,
      totalTime: 25,
      yield: 4,
      cuisineId: italian.id,
      categoryId: dinner.id,
      status: 'published',
      publishedAt: new Date(),
      proTips: 'Never add cream! The sauce is made from eggs and cheese. Keep pasta water starchy.',
      storageInfo: 'Best served immediately. Leftovers can be refrigerated but texture changes.',
      nutrition: { calories: 520, protein: 22, carbs: 58, fat: 24 },
    },
  });

  // Add ingredients for Carbonara
  const carbonaraIngredients = [
    { name: 'spaghetti', quantity: 400, unit: 'g', notes: 'dried', orderIndex: 0 },
    { name: 'pancetta', quantity: 200, unit: 'g', notes: 'cubed', orderIndex: 1 },
    { name: 'egg', quantity: 4, unit: 'piece', notes: 'whole', orderIndex: 2 },
    { name: 'egg yolk', quantity: 2, unit: 'piece', notes: '', orderIndex: 3 },
    { name: 'pecorino romano', quantity: 100, unit: 'g', notes: 'grated', orderIndex: 4 },
    { name: 'black pepper', quantity: 2, unit: 'tsp', notes: 'freshly ground', orderIndex: 5 },
    { name: 'salt', quantity: 1, unit: 'tbsp', notes: 'for pasta water', orderIndex: 6 },
  ];

  for (const ing of carbonaraIngredients) {
    await prisma.ingredient.upsert({
      where: { id: `${carbonara.id}-${ing.orderIndex}` },
      update: ing,
      create: { ...ing, recipeId: carbonara.id },
    });
  }

  const carbonaraSteps = [
    { stepNumber: 1, instruction: 'Bring large pot of salted water to boil. Cook spaghetti until al dente.', michelinNote: 'Save 2 cups pasta water before draining. Starchy water is key to silky sauce.' },
    { stepNumber: 2, instruction: 'While pasta cooks, fry pancetta in large skillet until crispy.', michelinNote: 'Medium heat - render fat slowly for maximum crispiness without burning.' },
    { stepNumber: 3, instruction: 'Whisk eggs, egg yolks, and Pecorino in bowl. Add plenty of black pepper.', michelinNote: 'Room temperature eggs incorporate better. Season aggressively with pepper.' },
    { stepNumber: 4, instruction: 'Remove pancetta from heat. Add drained pasta and toss.', michelinNote: 'Work quickly - residual heat cooks eggs gently.' },
    { stepNumber: 5, instruction: 'Add egg mixture, tossing constantly. Add pasta water as needed for silky sauce.', michelinNote: 'If eggs scramble, remove from heat immediately and add more pasta water.' },
    { stepNumber: 6, instruction: 'Serve immediately with extra Pecorino and black pepper.', michelinNote: 'Carbonara waits for no one - serve the moment it\'s ready!' },
  ];

  for (const step of carbonaraSteps) {
    await prisma.recipeStep.upsert({
      where: { id: `${carbonara.id}-${step.stepNumber}` },
      update: step,
      create: { ...step, recipeId: carbonara.id },
    });
  }

  // Recipe 3: Chicken Tacos
  const tacos = await prisma.recipe.upsert({
    where: { slug: 'chicken-tacos' },
    update: {},
    create: {
      slug: 'chicken-tacos',
      title: 'Street-Style Chicken Tacos',
      description: 'Authentic Mexican street tacos with grilled chicken, onions, and cilantro.',
      seoDescription: 'The best street-style chicken tacos with perfectly charred chicken, fresh cilantro, and tangy lime. Ready in 30 minutes!',
      prepTime: 15,
      cookTime: 15,
      totalTime: 30,
      yield: 6,
      cuisineId: mexican.id,
      categoryId: dinner.id,
      status: 'published',
      publishedAt: new Date(),
      proTips: 'Use chicken thighs for juicier meat. Charring the tortillas adds authentic flavor.',
      storageInfo: 'Store chicken and toppings separately. Best fresh the same day.',
      nutrition: { calories: 280, protein: 24, carbs: 18, fat: 12 },
    },
  });

  // Add ingredients for Tacos
  const tacosIngredients = [
    { name: 'chicken thighs', quantity: 1.5, unit: 'lb', notes: 'boneless, skinless', orderIndex: 0 },
    { name: 'white onion', quantity: 1, unit: 'medium', notes: 'diced', orderIndex: 1 },
    { name: 'cilantro', quantity: 0.5, unit: 'cup', notes: 'fresh, chopped', orderIndex: 2 },
    { name: 'lime', quantity: 3, unit: 'piece', notes: '2 for juice, 1 sliced', orderIndex: 3 },
    { name: 'garlic', quantity: 4, unit: 'cloves', notes: 'minced', orderIndex: 4 },
    { name: 'chipotle pepper', quantity: 2, unit: 'piece', notes: 'in adobo, minced', orderIndex: 5 },
    { name: 'cumin', quantity: 1, unit: 'tsp', notes: 'ground', orderIndex: 6 },
    { name: 'oregano', quantity: 1, unit: 'tsp', notes: 'dried Mexican', orderIndex: 7 },
    { name: 'vegetable oil', quantity: 2, unit: 'tbsp', notes: '', orderIndex: 8 },
    { name: 'corn tortillas', quantity: 12, unit: 'piece', notes: 'small street taco size', orderIndex: 9 },
    { name: 'salt', quantity: 1, unit: 'tbsp', notes: 'to taste', orderIndex: 10 },
  ];

  for (const ing of tacosIngredients) {
    await prisma.ingredient.upsert({
      where: { id: `${tacos.id}-${ing.orderIndex}` },
      update: ing,
      create: { ...ing, recipeId: tacos.id },
    });
  }

  const tacosSteps = [
    { stepNumber: 1, instruction: 'Combine lime juice, minced garlic, chipotle, cumin, oregano, and 1 tbsp oil. Marinate chicken for at least 30 minutes or overnight.', michelinNote: 'Acid tenderizes the chicken - don\'t skip the marinating time for maximum juiciness.' },
    { stepNumber: 2, instruction: 'Heat grill or cast iron pan over high heat until smoking. Cook chicken 5-6 minutes per side until internal temp reaches 165°F.', michelinNote: 'High heat creates char marks - don\'t move the chicken while searing.' },
    { stepNumber: 3, instruction: 'Let chicken rest 5 minutes, then slice against the grain into thin strips.', michelinNote: 'Resting retains juices. Slicing against the grain ensures tender bites.' },
    { stepNumber: 4, instruction: 'Warm tortillas on the grill or dry skillet, 30 seconds per side until pliable and slightly charred.', michelinNote: 'Char adds authentic street-taco flavor. Keep warm in a towel.' },
    { stepNumber: 5, instruction: 'Assemble tacos: sliced chicken, diced onion, fresh cilantro, and a squeeze of lime.', michelinNote: 'Layer textures - crispy onion, tender chicken, bright cilantro.' },
    { stepNumber: 6, instruction: 'Serve immediately with lime wedges and hot sauce on the side.', michelinNote: 'Tacos wait for no one - serve the moment they\'re assembled!' },
  ];

  for (const step of tacosSteps) {
    await prisma.recipeStep.upsert({
      where: { id: `${tacos.id}-${step.stepNumber}` },
      update: step,
      create: { ...step, recipeId: tacos.id },
    });
  }

  // Recipe 4: Pad Thai
  const padthai = await prisma.recipe.upsert({
    where: { slug: 'pad-thai' },
    update: {},
    create: {
      slug: 'pad-thai',
      title: 'Classic Pad Thai',
      description: 'Thai stir-fried rice noodles with shrimp, tofu, peanuts, and bean sprouts.',
      seoDescription: 'Restaurant-quality Pad Thai at home! Perfectly balanced sweet, sour, and savory flavors with that signature smoky wok taste.',
      prepTime: 20,
      cookTime: 15,
      totalTime: 35,
      yield: 4,
      cuisineId: japanese.id,
      categoryId: dinner.id,
      status: 'published',
      publishedAt: new Date(),
      proTips: 'High heat and a well-seasoned wok are essential. Don\'t overcrowd the pan.',
      storageInfo: 'Best fresh. Can refrigerate but loses texture.',
      nutrition: { calories: 420, protein: 18, carbs: 52, fat: 16 },
    },
  });

  // Add ingredients for Pad Thai
  const padthaiIngredients = [
    { name: 'rice noodles', quantity: 8, unit: 'oz', notes: 'medium width', orderIndex: 0 },
    { name: 'shrimp', quantity: 12, unit: 'oz', notes: 'peeled, deveined', orderIndex: 1 },
    { name: 'firm tofu', quantity: 8, unit: 'oz', notes: 'cubed', orderIndex: 2 },
    { name: 'egg', quantity: 2, unit: 'piece', notes: 'beaten', orderIndex: 3 },
    { name: 'bean sprouts', quantity: 2, unit: 'cup', notes: 'fresh', orderIndex: 4 },
    { name: 'garlic', quantity: 4, unit: 'cloves', notes: 'minced', orderIndex: 5 },
    { name: 'tamarind paste', quantity: 3, unit: 'tbsp', notes: '', orderIndex: 6 },
    { name: 'fish sauce', quantity: 3, unit: 'tbsp', notes: 'Thai', orderIndex: 7 },
    { name: 'palm sugar', quantity: 2, unit: 'tbsp', notes: 'or brown sugar', orderIndex: 8 },
    { name: 'roasted peanuts', quantity: 0.5, unit: 'cup', notes: 'crushed', orderIndex: 9 },
    { name: 'lime', quantity: 1, unit: 'piece', notes: 'cut into wedges', orderIndex: 10 },
    { name: 'vegetable oil', quantity: 3, unit: 'tbsp', notes: '', orderIndex: 11 },
    { name: 'green onions', quantity: 3, unit: 'stalk', notes: 'cut into 2-inch pieces', orderIndex: 12 },
    { name: 'dried shrimp', quantity: 2, unit: 'tbsp', notes: 'optional', orderIndex: 13 },
  ];

  for (const ing of padthaiIngredients) {
    await prisma.ingredient.upsert({
      where: { id: `${padthai.id}-${ing.orderIndex}` },
      update: ing,
      create: { ...ing, recipeId: padthai.id },
    });
  }

  const padthaiSteps = [
    { stepNumber: 1, instruction: 'Soak rice noodles in warm water for 30-45 minutes until pliable but still firm. Drain well.', michelinNote: 'Don\'t over-soak or they\'ll become mushy in the wok. They should bend without breaking.' },
    { stepNumber: 2, instruction: 'Mix tamarind paste, fish sauce, and palm sugar in a small bowl to create the sauce.', michelinNote: 'Taste and adjust - balance sweet, sour, and salty to your preference.' },
    { stepNumber: 3, instruction: 'Heat wok over high heat until smoking. Add 2 tbsp oil, swirl to coat. Add tofu, fry until golden on all sides, 3-4 minutes. Remove.', michelinNote: 'High heat is essential for wok hei (breath of the wok). Work quickly.' },
    { stepNumber: 4, instruction: 'Add shrimp to wok, cook 2 minutes until pink. Push to side, add beaten eggs, scramble.', michelinNote: 'Don\'t overcook shrimp - they continue cooking from residual heat.' },
    { stepNumber: 5, instruction: 'Add drained noodles and sauce. Toss constantly for 2-3 minutes until noodles absorb sauce and become tender.', michelinNote: 'Toss continuously or noodles will stick. Use two spatulas if needed.' },
    { stepNumber: 6, instruction: 'Add tofu back, bean sprouts, green onions, and half the peanuts. Toss 1 minute.', michelinNote: 'Add bean sprouts at the end - they should retain some crunch.' },
    { stepNumber: 7, instruction: 'Serve immediately with remaining peanuts, lime wedges, and extra bean sprouts on top.', michelinNote: 'Pad Thai waits for no one - serve hot with the accompaniments on the side!' },
  ];

  for (const step of padthaiSteps) {
    await prisma.recipeStep.upsert({
      where: { id: `${padthai.id}-${step.stepNumber}` },
      update: step,
      create: { ...step, recipeId: padthai.id },
    });
  }

  // Recipe 5: Butter Chicken
  const butterchicken = await prisma.recipe.upsert({
    where: { slug: 'butter-chicken' },
    update: {},
    create: {
      slug: 'butter-chicken',
      title: 'Butter Chicken (Murgh Makhani)',
      description: 'Creamy tomato-based Indian curry with tender chicken pieces.',
      seoDescription: 'Rich and creamy Butter Chicken (Murgh Makhani) with tender marinated chicken in a luxurious tomato-cream sauce. Restaurant quality at home!',
      prepTime: 30,
      cookTime: 30,
      totalTime: 60,
      yield: 6,
      cuisineId: indian.id,
      categoryId: dinner.id,
      status: 'published',
      publishedAt: new Date(),
      proTips: 'Marinate chicken overnight for best flavor. Use canned tomato puree for consistent results.',
      storageInfo: 'Refrigerates well for up to 4 days. Freezes beautifully.',
      nutrition: { calories: 380, protein: 28, carbs: 12, fat: 26 },
    },
  });

  // Add ingredients for Butter Chicken
  const butterchickenIngredients = [
    { name: 'chicken breast', quantity: 1.5, unit: 'lb', notes: 'cubed', orderIndex: 0 },
    { name: 'yogurt', quantity: 1, unit: 'cup', notes: 'plain, full-fat', orderIndex: 1 },
    { name: 'lemon juice', quantity: 2, unit: 'tbsp', notes: '', orderIndex: 2 },
    { name: 'garlic', quantity: 4, unit: 'cloves', notes: 'minced', orderIndex: 3 },
    { name: 'ginger', quantity: 2, unit: 'tbsp', notes: 'freshly grated', orderIndex: 4 },
    { name: 'garam masala', quantity: 2, unit: 'tsp', notes: '', orderIndex: 5 },
    { name: 'turmeric', quantity: 1, unit: 'tsp', notes: '', orderIndex: 6 },
    { name: 'cumin', quantity: 1, unit: 'tsp', notes: '', orderIndex: 7 },
    { name: 'cayenne pepper', quantity: 1, unit: 'tsp', notes: 'adjust to heat preference', orderIndex: 8 },
    { name: 'tomato puree', quantity: 14, unit: 'oz', notes: 'canned', orderIndex: 9 },
    { name: 'heavy cream', quantity: 1, unit: 'cup', notes: '', orderIndex: 10 },
    { name: 'butter', quantity: 4, unit: 'tbsp', notes: 'unsalted', orderIndex: 11 },
    { name: 'kashmiri chili powder', quantity: 1, unit: 'tbsp', notes: 'for color', orderIndex: 12 },
    { name: 'fenugreek leaves', quantity: 1, unit: 'tbsp', notes: 'dried, crushed (kasuri methi)', orderIndex: 13 },
    { name: 'salt', quantity: 1, unit: 'tbsp', notes: 'to taste', orderIndex: 14 },
  ];

  for (const ing of butterchickenIngredients) {
    await prisma.ingredient.upsert({
      where: { id: `${butterchicken.id}-${ing.orderIndex}` },
      update: ing,
      create: { ...ing, recipeId: butterchicken.id },
    });
  }

  const butterchickenSteps = [
    { stepNumber: 1, instruction: 'Marinate chicken in yogurt, lemon juice, half the garlic, half the ginger, 1 tsp garam masala, turmeric, cumin, and cayenne for at least 2 hours or overnight.', michelinNote: 'Yogurt tenderizes the chicken while the spices build complex flavor. Overnight is best.' },
    { stepNumber: 2, instruction: 'Thread marinated chicken onto skewers. Grill or broil 12-15 minutes, turning occasionally, until charred and cooked through.', michelinNote: 'High heat caramelizes the marinade. Chicken should have slight char marks.' },
    { stepNumber: 3, instruction: 'Melt butter in large pan over medium heat. Sauté remaining garlic and ginger until fragrant, 2 minutes.', michelinNote: 'Don\'t burn the garlic - medium heat and constant stirring.' },
    { stepNumber: 4, instruction: 'Add tomato puree, kashmiri chili powder, and remaining garam masala. Simmer 15 minutes until oil separates.', michelinNote: 'Low and slow develops the tomato flavor. Oil separation means it\'s ready.' },
    { stepNumber: 5, instruction: 'Stir in heavy cream and fenugreek leaves. Simmer 5 minutes more.', michelinNote: 'Add cream slowly to prevent curdling. Fenugreek adds authentic restaurant flavor.' },
    { stepNumber: 6, instruction: 'Add grilled chicken pieces to the sauce. Simmer 10 minutes, stirring occasionally.', michelinNote: 'Let chicken absorb the sauce flavors. The sauce should coat the chicken.' },
    { stepNumber: 7, instruction: 'Adjust salt and spices to taste. Garnish with cream swirl and fresh cilantro. Serve with naan or basmati rice.', michelinNote: 'A final drizzle of cream makes it look restaurant-worthy. Serve hot!' },
  ];

  for (const step of butterchickenSteps) {
    await prisma.recipeStep.upsert({
      where: { id: `${butterchicken.id}-${step.stepNumber}` },
      update: step,
      create: { ...step, recipeId: butterchicken.id },
    });
  }

  // Recipe 6: French Onion Soup
  const frenchonion = await prisma.recipe.upsert({
    where: { slug: 'french-onion-soup' },
    update: {},
    create: {
      slug: 'french-onion-soup',
      title: 'French Onion Soup',
      description: 'Caramelized onion soup topped with crusty bread and melted Gruyère.',
      seoDescription: 'Classic French Onion Soup with deeply caramelized onions, rich beef broth, and a golden layer of melted Gruyère cheese.',
      prepTime: 20,
      cookTime: 60,
      totalTime: 80,
      yield: 6,
      cuisineId: french.id,
      categoryId: dinner.id,
      status: 'published',
      publishedAt: new Date(),
      proTips: 'Low and slow is the key. Don\'t rush the caramelization - it takes 45-60 minutes.',
      storageInfo: 'Store soup and bread separately. Assemble and broil when ready to serve.',
      nutrition: { calories: 320, protein: 12, carbs: 28, fat: 18 },
    },
  });

  // Add ingredients for French Onion Soup
  const frenchonionIngredients = [
    { name: 'yellow onions', quantity: 6, unit: 'large', notes: 'thinly sliced', orderIndex: 0 },
    { name: 'butter', quantity: 4, unit: 'tbsp', notes: 'unsalted', orderIndex: 1 },
    { name: 'beef broth', quantity: 8, unit: 'cup', notes: 'low-sodium', orderIndex: 2 },
    { name: 'dry white wine', quantity: 1, unit: 'cup', notes: 'or dry sherry', orderIndex: 3 },
    { name: 'fresh thyme', quantity: 4, unit: 'sprig', notes: '', orderIndex: 4 },
    { name: 'bay leaf', quantity: 1, unit: 'piece', notes: '', orderIndex: 5 },
    { name: 'garlic', quantity: 2, unit: 'cloves', notes: 'minced', orderIndex: 6 },
    { name: 'baguette', quantity: 6, unit: 'slice', notes: '1-inch thick', orderIndex: 7 },
    { name: 'gruyère cheese', quantity: 2, unit: 'cup', notes: 'shredded', orderIndex: 8 },
    { name: 'parmesan cheese', quantity: 0.5, unit: 'cup', notes: 'grated', orderIndex: 9 },
    { name: 'salt', quantity: 1, unit: 'tsp', notes: 'to taste', orderIndex: 10 },
    { name: 'black pepper', quantity: 1, unit: 'tsp', notes: 'freshly ground', orderIndex: 11 },
  ];

  for (const ing of frenchonionIngredients) {
    await prisma.ingredient.upsert({
      where: { id: `${frenchonion.id}-${ing.orderIndex}` },
      update: ing,
      create: { ...ing, recipeId: frenchonion.id },
    });
  }

  const frenchonionSteps = [
    { stepNumber: 1, instruction: 'Melt butter in a large Dutch oven over medium-low heat. Add sliced onions and a pinch of salt. Cook, stirring occasionally, for 45-60 minutes until deeply caramelized.', michelinNote: 'Low and slow is essential. Don\'t rush - true caramelization takes time. The onions should be jammy and deep golden brown.' },
    { stepNumber: 2, instruction: 'Add garlic and cook until fragrant, 2 minutes. Pour in white wine, scraping up any browned bits from the bottom.', michelinNote: 'Wine adds acidity to balance the sweet onions. Scrape every bit of fond.' },
    { stepNumber: 3, instruction: 'Add beef broth, thyme, and bay leaf. Bring to a simmer and cook 20 minutes to meld flavors.', michelinNote: 'Let the broth reduce slightly for more concentrated flavor. Remove bay leaf before serving.' },
    { stepNumber: 4, instruction: 'Season with salt and pepper to taste. Remove from heat.', michelinNote: 'Taste and adjust seasoning - the broth should be well-balanced.' },
    { stepNumber: 5, instruction: 'Preheat broiler. Toast baguette slices until golden, 2-3 minutes per side.', michelinNote: 'Light toasting is enough - they will get fully crispy under the broiler.' },
    { stepNumber: 6, instruction: 'Ladle soup into oven-safe bowls. Top each with toasted bread and generous pile of mixed cheeses.', michelinNote: 'Use bowls that can handle high heat. Mound cheese to the edges for that perfect melted cap.' },
    { stepNumber: 7, instruction: 'Broil 3-5 minutes until cheese is bubbling, golden, and crispy on top. Serve immediately.', michelinNote: 'Watch carefully - broiling goes fast! The cheese should be golden but not burned.' },
  ];

  for (const step of frenchonionSteps) {
    await prisma.recipeStep.upsert({
      where: { id: `${frenchonion.id}-${step.stepNumber}` },
      update: step,
      create: { ...step, recipeId: frenchonion.id },
    });
  }

  // Recipe 7: Pancakes
  const pancakes = await prisma.recipe.upsert({
    where: { slug: 'fluffy-pancakes' },
    update: {},
    create: {
      slug: 'fluffy-pancakes',
      title: 'Fluffy Buttermilk Pancakes',
      description: 'Light and fluffy pancakes with golden edges and buttery flavor.',
      seoDescription: 'The fluffiest buttermilk pancakes you\'ll ever make! Light, airy, and perfectly golden. Perfect weekend breakfast.',
      prepTime: 10,
      cookTime: 15,
      totalTime: 25,
      yield: 8,
      cuisineId: american.id || french.id,
      categoryId: breakfast.id,
      status: 'published',
      publishedAt: new Date(),
      proTips: 'Don\'t overmix the batter - lumps are good! Let batter rest 5 minutes.',
      storageInfo: 'Keep warm in 200°F oven. Freeze leftover pancakes.',
      nutrition: { calories: 220, protein: 6, carbs: 28, fat: 9 },
    },
  });

  // Add ingredients for Pancakes
  const pancakesIngredients = [
    { name: 'all-purpose flour', quantity: 2, unit: 'cup', notes: '', orderIndex: 0 },
    { name: 'buttermilk', quantity: 2, unit: 'cup', notes: 'room temperature', orderIndex: 1 },
    { name: 'egg', quantity: 2, unit: 'piece', notes: 'large, room temperature', orderIndex: 2 },
    { name: 'butter', quantity: 4, unit: 'tbsp', notes: 'melted, plus more for serving', orderIndex: 3 },
    { name: 'sugar', quantity: 2, unit: 'tbsp', notes: '', orderIndex: 4 },
    { name: 'baking powder', quantity: 2, unit: 'tsp', notes: '', orderIndex: 5 },
    { name: 'baking soda', quantity: 1, unit: 'tsp', notes: '', orderIndex: 6 },
    { name: 'salt', quantity: 0.5, unit: 'tsp', notes: '', orderIndex: 7 },
    { name: 'vanilla extract', quantity: 1, unit: 'tsp', notes: 'pure', orderIndex: 8 },
    { name: 'maple syrup', quantity: 1, unit: 'cup', notes: 'for serving', orderIndex: 9 },
  ];

  for (const ing of pancakesIngredients) {
    await prisma.ingredient.upsert({
      where: { id: `${pancakes.id}-${ing.orderIndex}` },
      update: ing,
      create: { ...ing, recipeId: pancakes.id },
    });
  }

  const pancakesSteps = [
    { stepNumber: 1, instruction: 'Whisk flour, sugar, baking powder, baking soda, and salt in a large bowl.', michelinNote: 'Whisk thoroughly to distribute leaveners evenly - no lumps in dry ingredients.' },
    { stepNumber: 2, instruction: 'In another bowl, whisk buttermilk, eggs, melted butter, and vanilla until combined.', michelinNote: 'Room temperature ingredients mix better. Cold buttermilk can cause lumps.' },
    { stepNumber: 3, instruction: 'Pour wet ingredients into dry. Stir until just combined - lumps are okay! Let batter rest 5 minutes.', michelinNote: 'Overmixing develops gluten and makes tough pancakes. Lumpy batter = fluffy pancakes.' },
    { stepNumber: 4, instruction: 'Heat griddle or nonstick pan over medium heat. Test by sprinkling a few drops of water - they should sizzle.', michelinNote: 'Medium heat is perfect - too hot burns the outside before inside cooks.' },
    { stepNumber: 5, instruction: 'Pour 1/4 cup batter per pancake onto griddle. Cook until bubbles form on surface and edges look set, 2-3 minutes.', michelinNote: 'Wait for bubbles - they indicate the pancake is ready to flip.' },
    { stepNumber: 6, instruction: 'Flip and cook another 1-2 minutes until golden brown on both sides.', michelinNote: 'Second side cooks faster. Watch for golden color.' },
    { stepNumber: 7, instruction: 'Keep warm in 200°F oven while cooking remaining pancakes. Serve with butter and warm maple syrup.', michelinNote: 'Fresh off the griddle is best! A pat of butter on warm pancakes melts perfectly.' },
  ];

  for (const step of pancakesSteps) {
    await prisma.recipeStep.upsert({
      where: { id: `${pancakes.id}-${step.stepNumber}` },
      update: step,
      create: { ...step, recipeId: pancakes.id },
    });
  }

  console.log('Added 6 recipes with full steps and ingredients!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
