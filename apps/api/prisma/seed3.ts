import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Adding full recipe data...');

  // Get recipes
  const carbonara = await prisma.recipe.findUnique({ where: { slug: 'spaghetti-carbonara' } });
  const tacos = await prisma.recipe.findUnique({ where: { slug: 'chicken-tacos' } });
  const padthai = await prisma.recipe.findUnique({ where: { slug: 'pad-thai' } });
  const butterchicken = await prisma.recipe.findUnique({ where: { slug: 'butter-chicken' } });

  if (!carbonara || !tacos || !padthai || !butterchicken) {
    console.log('Recipes not found');
    return;
  }

  // Carbonara ingredients
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
    await prisma.ingredient.create({
      data: { ...ing, recipeId: carbonara.id },
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
    await prisma.recipeStep.create({
      data: { ...step, recipeId: carbonara.id },
    });
  }

  // Chicken Tacos ingredients
  const tacosIngredients = [
    { name: 'chicken thighs', quantity: 500, unit: 'g', notes: 'boneless', orderIndex: 0 },
    { name: 'olive oil', quantity: 30, unit: 'ml', notes: '', orderIndex: 1 },
    { name: 'lime juice', quantity: 60, unit: 'ml', notes: 'fresh', orderIndex: 2 },
    { name: 'cumin', quantity: 1, unit: 'tsp', notes: '', orderIndex: 3 },
    { name: 'chili powder', quantity: 1, unit: 'tsp', notes: '', orderIndex: 4 },
    { name: 'garlic', quantity: 3, unit: 'clove', notes: 'minced', orderIndex: 5 },
    { name: 'tortilla', quantity: 12, unit: 'piece', notes: 'small corn or flour', orderIndex: 6 },
    { name: 'onion', quantity: 1, unit: 'piece', notes: 'white, diced', orderIndex: 7 },
    { name: 'cilantro', quantity: 30, unit: 'g', notes: 'fresh, chopped', orderIndex: 8 },
    { name: 'salsa verde', quantity: 200, unit: 'g', notes: '', orderIndex: 9 },
  ];

  for (const ing of tacosIngredients) {
    await prisma.ingredient.create({
      data: { ...ing, recipeId: tacos.id },
    });
  }

  const tacosSteps = [
    { stepNumber: 1, instruction: 'Mix olive oil, lime juice, cumin, chili powder, and garlic. Marinate chicken for 30 minutes.', michelinNote: 'Marinating longer is better - up to 2 hours in the fridge.' },
    { stepNumber: 2, instruction: 'Heat grill or skillet over high heat. Cook chicken 5-6 minutes per side until charred and cooked through.', michelinNote: 'High heat creates the characteristic char. Let chicken rest 5 minutes before slicing.' },
    { stepNumber: 3, instruction: 'Warm tortillas on the grill or dry skillet.', michelinNote: 'Charring the tortillas adds authentic flavor and makes them more pliable.' },
    { stepNumber: 4, instruction: 'Slice chicken into thin strips. Dice onion. Chop cilantro.', michelinNote: 'Uniform slicing ensures even distribution in each taco.' },
    { stepNumber: 5, instruction: 'Assemble tacos: tortilla, chicken, onion, cilantro, salsa.', michelinNote: 'Top with onion and cilantro FIRST - the salsa can make them soggy.' },
    { stepNumber: 6, instruction: 'Serve with lime wedges and extra salsa.', michelinNote: 'Fresh lime juice brightens all the flavors.' },
  ];

  for (const step of tacosSteps) {
    await prisma.recipeStep.create({
      data: { ...step, recipeId: tacos.id },
    });
  }

  // Pad Thai ingredients
  const padthaiIngredients = [
    { name: 'rice noodles', quantity: 250, unit: 'g', notes: 'flat', orderIndex: 0 },
    { name: 'shrimp', quantity: 200, unit: 'g', notes: 'peeled', orderIndex: 1 },
    { name: 'tofu', quantity: 150, unit: 'g', notes: 'firm, cubed', orderIndex: 2 },
    { name: 'egg', quantity: 2, unit: 'piece', notes: 'beaten', orderIndex: 3 },
    { name: 'bean sprouts', quantity: 100, unit: 'g', notes: '', orderIndex: 4 },
    { name: 'green onion', quantity: 3, unit: 'piece', notes: 'chopped', orderIndex: 5 },
    { name: 'peanuts', quantity: 50, unit: 'g', notes: 'crushed', orderIndex: 6 },
    { name: 'fish sauce', quantity: 45, unit: 'ml', notes: '', orderIndex: 7 },
    { name: 'tamarind paste', quantity: 30, unit: 'g', notes: '', orderIndex: 8 },
    { name: 'palm sugar', quantity: 30, unit: 'g', notes: 'or brown sugar', orderIndex: 9 },
    { name: 'garlic', quantity: 3, unit: 'clove', notes: 'minced', orderIndex: 10 },
    { name: 'lime', quantity: 1, unit: 'piece', notes: '', orderIndex: 11 },
  ];

  for (const ing of padthaiIngredients) {
    await prisma.ingredient.create({
      data: { ...ing, recipeId: padthai.id },
    });
  }

  const padthaiSteps = [
    { stepNumber: 1, instruction: 'Soak rice noodles in warm water for 30 minutes until pliable. Drain.', michelinNote: 'Don\'t over-soak - they should still have some chew.' },
    { stepNumber: 2, instruction: 'Mix fish sauce, tamarind paste, and sugar to make the sauce.', michelinNote: 'Taste and adjust - should be sweet, sour, salty.' },
    { stepNumber: 3, instruction: 'Heat wok over high heat. Stir-fry shrimp and tofu until pink. Set aside.', michelinNote: 'High heat is essential - wok should be smoking hot.' },
    { stepNumber: 4, instruction: 'Add more oil. Fry garlic until fragrant. Push aside, add eggs, scramble.', michelinNote: 'Keep eggs slightly underdone - they finish cooking in the sauce.' },
    { stepNumber: 5, instruction: 'Add noodles and sauce. Toss until noodles are coated and cooked.', michelinNote: 'Work quickly - don\'t let noodles stick to the wok.' },
    { stepNumber: 6, instruction: 'Add shrimp, tofu, bean sprouts, green onions. Toss briefly.', michelinNote: 'Bean sprouts should still be crisp - don\'t overcook.' },
    { stepNumber: 7, instruction: 'Serve with crushed peanuts and lime wedge.', michelinNote: 'The acid from lime cuts through the richness.' },
  ];

  for (const step of padthaiSteps) {
    await prisma.recipeStep.create({
      data: { ...step, recipeId: padthai.id },
    });
  }

  // Butter Chicken ingredients
  const butterchickenIngredients = [
    { name: 'chicken breast', quantity: 500, unit: 'g', notes: 'cubed', orderIndex: 0 },
    { name: 'yogurt', quantity: 150, unit: 'g', notes: 'plain', orderIndex: 1 },
    { name: 'garam masala', quantity: 2, unit: 'tsp', notes: '', orderIndex: 2 },
    { name: 'turmeric', quantity: 1, unit: 'tsp', notes: '', orderIndex: 3 },
    { name: 'cumin', quantity: 1, unit: 'tsp', notes: '', orderIndex: 4 },
    { name: 'tomato puree', quantity: 400, unit: 'g', notes: '', orderIndex: 5 },
    { name: 'heavy cream', quantity: 200, unit: 'ml', notes: '', orderIndex: 6 },
    { name: 'butter', quantity: 60, unit: 'g', notes: '', orderIndex: 7 },
    { name: 'garlic', quantity: 4, unit: 'clove', notes: 'minced', orderIndex: 8 },
    { name: 'ginger', quantity: 2, unit: 'inch', notes: 'fresh, grated', orderIndex: 9 },
    { name: 'kashmiri chili', quantity: 1, unit: 'tsp', notes: 'for color', orderIndex: 10 },
    { name: 'salt', quantity: 1, unit: 'tsp', notes: '', orderIndex: 11 },
  ];

  for (const ing of butterchickenIngredients) {
    await prisma.ingredient.create({
      data: { ...ing, recipeId: butterchicken.id },
    });
  }

  const butterchickenSteps = [
    { stepNumber: 1, instruction: 'Marinate chicken in yogurt, garam masala, turmeric, cumin, and salt for at least 1 hour.', michelinNote: 'Marinate overnight for best flavor. The yogurt tenderizes the chicken.' },
    { stepNumber: 2, instruction: 'Grill or pan-fry marinated chicken until charred. Set aside.', michelinNote: 'High heat gives the smoky char - indoor grill works great.' },
    { stepNumber: 3, instruction: 'Melt butter in large pan. Sauté garlic and ginger until fragrant.', michelinNote: 'Don\'t burn the garlic - medium heat.' },
    { stepNumber: 4, instruction: 'Add tomato puree and kashmiri chili. Simmer 15 minutes until oil separates.', michelinNote: 'The oil separation is key - it means the tomatoes are cooked properly.' },
    { stepNumber: 5, instruction: 'Add cream and remaining marinade. Simmer 10 minutes.', michelinNote: 'Add cream slowly and stir constantly to prevent curdling.' },
    { stepNumber: 6, instruction: 'Add grilled chicken. Simmer 5 minutes. Finish with more butter.', michelinNote: 'Finish with a knob of butter for extra richness - this is the "makhani" technique.' },
    { stepNumber: 7, instruction: 'Serve with naan or basmati rice.', michelinNote: 'Garnish with fresh cilantro and a drizzle of cream.' },
  ];

  for (const step of butterchickenSteps) {
    await prisma.recipeStep.create({
      data: { ...step, recipeId: butterchicken.id },
    });
  }

  console.log('Added full ingredients and steps to 4 recipes!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
