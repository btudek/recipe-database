const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const recipes = await prisma.recipe.findMany({
    where: { status: 'published' },
    include: { 
      steps: { orderBy: { stepNumber: 'asc' } }, 
      ingredients: true 
    }
  });
  
  console.log('=== DETAILED RECIPE ANALYSIS ===\n');
  
  for (const r of recipes) {
    console.log(`Recipe: ${r.title}`);
    console.log(`  Image: ${r.imageUrl || 'MISSING'}`);
    console.log(`  Steps: ${r.steps.length}`);
    console.log(`  Ingredients: ${r.ingredients.length}`);
    console.log(`  ProTips: ${r.proTips ? 'YES' : 'NO'}`);
    
    // Check michelinNotes
    let stepsWithMichelin = 0;
    for (const s of r.steps) {
      if (s.michelinNote && s.michelinNote.length > 10) stepsWithMichelin++;
    }
    console.log(`  MichelinNotes: ${stepsWithMichelin}/${r.steps.length}`);
    
    // Check step detail
    for (const s of r.steps) {
      if (!s.michelinNote || s.michelinNote.length < 10) {
        console.log(`    Step ${s.stepNumber}: needs michelinNote`);
      }
    }
    console.log('');
  }
}

main().finally(() => prisma.$disconnect());
