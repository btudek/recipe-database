const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log('=== RECIPE QA CHECK ===\n');
  
  // Get total counts
  const total = await prisma.recipe.count();
  const published = await prisma.recipe.count({ where: { status: 'published' } });
  console.log(`Total recipes: ${total}`);
  console.log(`Published: ${published}\n`);

  // Get recipes missing photos
  const noPhoto = await prisma.recipe.findMany({
    where: { 
      status: 'published',
      OR: [{ imageUrl: null }, { imageUrl: '' }]
    },
    select: { id: true, title: true, slug: true }
  });
  console.log(`Recipes missing photos: ${noPhoto.length}`);
  
  // Get recipes missing proTips
  const noProTips = await prisma.recipe.findMany({
    where: { 
      status: 'published',
      OR: [{ proTips: null }, { proTips: '' }]
    },
    select: { id: true, title: true, slug: true }
  });
  console.log(`Recipes missing proTips: ${noProTips.length}`);
  
  // Get recipes missing storageInfo
  const noStorage = await prisma.recipe.findMany({
    where: { 
      status: 'published',
      OR: [{ storageInfo: null }, { storageInfo: '' }]
    },
    select: { id: true, title: true, slug: true }
  });
  console.log(`Recipes missing storageInfo: ${noStorage.length}`);

  // Get all published recipes with steps and ingredients
  const recipes = await prisma.recipe.findMany({
    where: { status: 'published' },
    include: { steps: { orderBy: { stepNumber: 'asc' } }, ingredients: true },
    orderBy: { title: 'asc' }
  });
  
  console.log(`\nAnalyzing ${recipes.length} published recipes for quality issues...\n`);
  
  let failingRecipes = [];
  
  for (const r of recipes) {
    const issues = [];
    
    // Check photo
    if (!r.imageUrl || r.imageUrl.length < 10) {
      issues.push('missing/wrong photo');
    }
    
    // Check proTips
    if (!r.proTips || r.proTips.length < 20) {
      issues.push('weak/missing proTips');
    }
    
    // Check storageInfo
    if (!r.storageInfo || r.storageInfo.length < 10) {
      issues.push('missing storageInfo');
    }
    
    // Check step count
    if (r.steps.length < 4) {
      issues.push(`too few steps (${r.steps.length})`);
    }
    
    // Check step detail
    const avgStepLength = r.steps.reduce((a, s) => a + s.instruction.length, 0) / (r.steps.length || 1);
    if (avgStepLength < 40) {
      issues.push(`weak instructions (avg ${Math.round(avgStepLength)} chars/step)`);
    }
    
    // Check ingredient count
    if (r.ingredients.length < 4) {
      issues.push(`too few ingredients (${r.ingredients.length})`);
    }
    
    // Check if steps have michelinNote
    const stepsWithNotes = r.steps.filter(s => s.michelinNote && s.michelinNote.length > 10).length;
    if (stepsWithNotes < Math.ceil(r.steps.length * 0.3)) {
      issues.push('missing michelinNotes');
    }
    
    if (issues.length > 0) {
      failingRecipes.push({
        id: r.id,
        title: r.title,
        slug: r.slug,
        issues,
        stepCount: r.steps.length,
        ingredientCount: r.ingredients.length,
        avgStepLength: Math.round(avgStepLength)
      });
    }
  }
  
  console.log(`\n=== FAILING RECIPES: ${failingRecipes.length} ===\n`);
  console.log(JSON.stringify(failingRecipes.slice(0, 50), null, 2));
  
  // Output IDs for fixing
  console.log('\n=== RECIPE IDs TO FIX ===');
  failingRecipes.forEach(r => console.log(`${r.id} | ${r.title} | ${r.issues.join(', ')}`));
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
