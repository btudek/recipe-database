import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database...');

  // Create cuisines
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

  // Create categories
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

  // Create a recipe
  const recipe = await prisma.recipe.upsert({
    where: { slug: 'classic-chicken-parmesan' },
    update: {},
    create: {
      slug: 'classic-chicken-parmesan',
      title: 'Classic Chicken Parmesan',
      description: 'A crispy, golden chicken cutlet topped with marinara sauce and melted mozzarella cheese.',
      seoDescription: 'Learn how to make the best Chicken Parmesan at home with this easy recipe. Perfectly crispy chicken, rich marinara, and gooey cheese make this Italian-American classic a family favorite.',
      prepTime: 15,
      cookTime: 30,
      totalTime: 45,
      yield: 4,
      cuisineId: italian.id,
      categoryId: dinner.id,
      status: 'published',
      publishedAt: new Date(),
      imageUrl: '/images/chicken-parmesan.jpg',
      proTips: 'For extra crispy coating, use panko breadcrumbs and toast them in a dry pan first.',
      storageInfo: 'Refrigerate leftovers up to 4 days. Reheat in 350°F oven for best texture.',
      nutrition: { calories: 450, protein: 35, carbs: 28, fat: 22 },
    },
  });

  // Create ingredients
  const ingredients = [
    { name: 'chicken breast', quantity: 4, unit: 'piece', notes: 'butterflied', orderIndex: 0 },
    { name: 'breadcrumbs', quantity: 200, unit: 'g', notes: 'plain', orderIndex: 1 },
    { name: 'parmesan cheese', quantity: 50, unit: 'g', notes: 'grated', orderIndex: 2 },
    { name: 'egg', quantity: 2, unit: 'piece', notes: 'beaten', orderIndex: 3 },
    { name: 'flour', quantity: 100, unit: 'g', notes: 'all-purpose', orderIndex: 4 },
    { name: 'marinara sauce', quantity: 400, unit: 'g', notes: 'homemade or store-bought', orderIndex: 5 },
    { name: 'mozzarella', quantity: 150, unit: 'g', notes: 'sliced', orderIndex: 6 },
    { name: 'olive oil', quantity: 30, unit: 'ml', notes: 'extra virgin', orderIndex: 7 },
    { name: 'garlic', quantity: 3, unit: 'clove', notes: 'minced', orderIndex: 8 },
    { name: 'basil', quantity: 10, unit: 'g', notes: 'fresh, chopped', orderIndex: 9 },
    { name: 'salt', quantity: 1, unit: 'tsp', notes: '', orderIndex: 10 },
    { name: 'pepper', quantity: 0.5, unit: 'tsp', notes: 'freshly ground', orderIndex: 11 },
  ];

  for (const ing of ingredients) {
    await prisma.ingredient.upsert({
      where: { id: `${recipe.id}-${ing.orderIndex}` },
      update: ing,
      create: { ...ing, recipeId: recipe.id },
    });
  }

  // Create steps
  const steps = [
    { 
      stepNumber: 1, 
      instruction: 'Preheat oven to 425°F (220°C). Season chicken breasts with salt and pepper on both sides.',
      michelinNote: 'Season chicken 15 minutes ahead for even flavor distribution. Use generous salt - about 1 tsp per pound.',
    },
    { 
      stepNumber: 2, 
      instruction: 'Set up breading station: flour in one dish, beaten eggs in second, breadcrumbs mixed with parmesan in third.',
      michelinNote: 'Use one hand for wet ingredients, one for dry to prevent clumping. Season breadcrumbs with Italian herbs.',
    },
    { 
      stepNumber: 3, 
      instruction: 'Dredge chicken in flour, shaking off excess. Dip in egg, then coat thoroughly with breadcrumb mixture. Press firmly.',
      michelinNote: 'For extra crunch, double-bread: flour, egg, flour, egg, breadcrumbs. Press aggressively for adhesion.',
    },
    { 
      stepNumber: 4, 
      instruction: 'Heat olive oil in oven-safe skillet over medium-high heat. Sear chicken 3-4 minutes per side until golden brown.',
      michelinNote: 'Don\'t move the chicken while searing - let it develop a crust. Flip only once. Internal temp should reach 165°F.',
    },
    { 
      stepNumber: 5, 
      instruction: 'Top each chicken breast with marinara sauce and mozzarella slices. Transfer to oven and bake 12-15 minutes.',
      michelinNote: 'Finish under broiler for 2-3 minutes for golden brown cheese spots. Watch carefully to prevent burning.',
    },
    { 
      stepNumber: 6, 
      instruction: 'Garnish with fresh basil. Let rest 5 minutes before serving to allow juices to redistribute.',
      michelinNote: 'Resting is crucial - tent with foil. This prevents juice loss when cutting.',
    },
  ];

  for (const step of steps) {
    await prisma.recipeStep.upsert({
      where: { id: `${recipe.id}-${step.stepNumber}` },
      update: step,
      create: { ...step, recipeId: recipe.id },
    });
  }

  console.log('Seeding complete!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
