const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const recipes = await prisma.recipe.findMany({
    include: { steps: { orderBy: { stepNumber: 'asc' } }, ingredients: true }
  });
  
  console.log(`Total recipes in DB: ${recipes.length}`);
  console.log(JSON.stringify(recipes, null, 2));
  
  prisma.$disconnect();
}

main().catch(console.error);
