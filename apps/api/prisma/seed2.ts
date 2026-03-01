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

  console.log('Added 7 recipes!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
