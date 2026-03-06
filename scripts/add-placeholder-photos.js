const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  // Update recipes without images to use a placeholder
  const result = await prisma.recipe.updateMany({
    where: { 
      status: 'published',
      OR: [{ imageUrl: null }, { imageUrl: '' }]
    },
    data: { imageUrl: '/images/placeholder-food.jpg' }
  });
  console.log(`Updated ${result.count} recipes with placeholder image`);
}

main().finally(() => prisma.$disconnect());
