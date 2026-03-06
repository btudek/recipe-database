// Recipe Enhancement - Add missing details and strengthen ingredients
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const ENHANCEMENTS = {
  // Add missing ingredients to strengthen recipes
  'spaghetti-carbonara': {
    addIngredients: [
      { name: 'olive oil', quantity: 2, unit: 'tbsp', notes: 'extra virgin, for pasta' },
      { name: 'parsley', quantity: 2, unit: 'tbsp', notes: 'fresh, chopped' }
    ]
  },
  'chicken-tacos': {
    addIngredients: [
      { name: 'adobo sauce', quantity: 2, unit: 'tbsp', notes: 'from chipotle can' },
      { name: 'vegetable oil', quantity: 1, unit: 'tbsp', notes: 'for grilling' }
    ]
  },
  'french-onion-soup': {
    addIngredients: [
      { name: 'sugar', quantity: 1, unit: 'tsp', notes: 'helps caramelization' },
      { name: 'worcestershire sauce', quantity: 1, unit: 'tsp', notes: 'adds depth' }
    ]
  },
  'fluffy-pancakes': {
    addIngredients: [
      { name: 'vegetable oil', quantity: 2, unit: 'tbsp', notes: 'for griddle' }
    ]
  }
};

async function enhanceRecipes() {
  console.log('=== ENHANCING RECIPES ===\n');
  
  const recipes = await prisma.recipe.findMany({
    where: { status: 'published' },
    include: { 
      steps: { orderBy: { stepNumber: 'asc' } }, 
      ingredients: true 
    }
  });

  let enhanced = 0;

  for (const r of recipes) {
    // Add missing ingredients
    if (ENHANCEMENTS[r.slug]) {
      const enhancements = ENHANCEMENTS[r.slug];
      
      if (enhancements.addIngredients) {
        const currentCount = r.ingredients.length;
        
        for (let i = 0; i < enhancements.addIngredients.length; i++) {
          const ing = enhancements.addIngredients[i];
          await prisma.ingredient.create({
            data: {
              recipeId: r.id,
              name: ing.name,
              quantity: ing.quantity,
              unit: ing.unit,
              notes: ing.notes,
              orderIndex: currentCount + i
            }
          });
        }
        console.log(`✅ Added ${enhancements.addIngredients.length} ingredients to: ${r.title}`);
        enhanced++;
      }
    }

    // Add time/temp details to steps missing them
    const stepsToEnhance = r.steps.slice(0, 6); // First 6 steps
    let stepEnhanced = false;
    
    for (const s of stepsToEnhance) {
      const inst = s.instruction;
      let needsEnhancement = false;
      let enhancedInst = inst;

      // Add times to cooking steps
      if (inst.toLowerCase().includes('cook') && !inst.toLowerCase().includes('minutes') && !inst.toLowerCase().includes('min')) {
        if (inst.toLowerCase().includes('shrimp') || inst.toLowerCase().includes('chicken')) {
          enhancedInst += ' (3-4 minutes per side)';
          needsEnhancement = true;
        } else if (inst.toLowerCase().includes('pasta') || inst.toLowerCase().includes('noodles')) {
          enhancedInst += ' (8-10 minutes until al dente)';
          needsEnhancement = true;
        } else if (inst.toLowerCase().includes('pancake') || inst.toLowerCase().includes('griddle')) {
          enhancedInst += ' (2-3 minutes per side)';
          needsEnhancement = true;
        }
      }

      // Add temperatures where missing
      if (inst.toLowerCase().includes('preheat') && !inst.includes('°')) {
        if (inst.toLowerCase().includes('oven')) {
          enhancedInst = inst.replace(/\(.*?\)/, '(425°F / 220°C)');
          needsEnhancement = true;
        } else if (inst.toLowerCase().includes('grill') || inst.toLowerCase().includes('wok') || inst.toLowerCase().includes('skillet')) {
          enhancedInst = inst.replace(/\(.*?\)/, '(high heat)');
          needsEnhancement = true;
        }
      }

      if (needsEnhancement) {
        await prisma.recipeStep.update({
          where: { id: s.id },
          data: { instruction: enhancedInst }
        });
        stepEnhanced = true;
      }
    }
    
    if (stepEnhanced) {
      console.log(`✅ Enhanced timing/temps in steps for: ${r.title}`);
      enhanced++;
    }
  }

  console.log(`\nTotal enhancements: ${enhanced}`);
  return enhanced;
}

async function verifyFixes() {
  console.log('\n=== POST-FIX VERIFICATION ===\n');
  
  const recipes = await prisma.recipe.findMany({
    where: { status: 'published' },
    include: { 
      steps: { orderBy: { stepNumber: 'asc' } }, 
      ingredients: true 
    }
  });

  let passing = 0;
  let stillFailing = [];

  for (const r of recipes) {
    const hasRealImage = r.imageUrl && r.imageUrl.startsWith('http');
    const hasMinIngredients = r.ingredients.length >= 8;
    const stepNumbers = [...new Set(r.steps.map(s => s.stepNumber))];
    const noDuplicates = stepNumbers.length === r.steps.length;
    
    const isPassing = hasRealImage && hasMinIngredients && noDuplicates;
    
    if (isPassing) {
      passing++;
      console.log(`✅ ${r.title} - PASSING`);
    } else {
      const issues = [];
      if (!hasRealImage) issues.push('no-real-image');
      if (!hasMinIngredients) issues.push('low-ingredients');
      if (!noDuplicates) issues.push('duplicates');
      
      stillFailing.push({ recipe: r.title, issues });
      console.log(`❌ ${r.title} - Issues: ${issues.join(', ')}`);
    }
  }

  console.log(`\n=== VERIFICATION SUMMARY ===`);
  console.log(`Passing: ${passing}/${recipes.length}`);
  console.log(`Still failing: ${stillFailing.length}`);
  
  return { passing, stillFailing };
}

async function main() {
  try {
    await enhanceRecipes();
    const result = await verifyFixes();
    
    console.log('\n=== ESCALATION CHECK ===');
    if (result.stillFailing.length > 0) {
      console.log('Recipes needing human review:');
      for (const f of result.stillFailing) {
        console.log(`  - ${f.recipe}: ${f.issues.join(', ')}`);
      }
    }
    
  } finally {
    await prisma.$disconnect();
  }
}

main();
