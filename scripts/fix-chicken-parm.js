const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function fixChickenParm() {
  await prisma.recipe.update({
    where: { slug: 'classic-chicken-parmesan' },
    data: { imageUrl: 'https://images.unsplash.com/photo-1632778149955-e80f8ceca2e8?w=800' }
  });
  console.log('✅ Fixed Classic Chicken Parmesan image');
  
  const r = await prisma.recipe.findUnique({ where: { slug: 'classic-chicken-parmesan' }});
  console.log('New image:', r.imageUrl);
  
  await prisma.$disconnect();
}

fixChickenParm();
