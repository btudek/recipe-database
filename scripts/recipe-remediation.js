// Recipe Remediation - QA Check and Fix Script
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Real food images from Unsplash (free to use, food-specific)
const RECIPE_IMAGES = {
  'spaghetti-carbonara': 'https://images.unsplash.com/photo-1612874742237-6526221588e3?w=800',
  'chicken-tacos': 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=800',
  'pad-thai': 'https://images.unsplash.com/photo-1559314809-0d155014e29e?w=800',
  'butter-chicken': 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=800',
  'french-onion-soup': 'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=800',
  'fluffy-pancakes': 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=800'
};

async function checkQA() {
  console.log('=== RECIPE QA CHECK ===\n');
  
  const recipes = await prisma.recipe.findMany({
    where: { status: 'published' },
    include: { 
      steps: { orderBy: { stepNumber: 'asc' } }, 
      ingredients: true 
    }
  });

  const issues = [];

  for (const r of recipes) {
    // Check 1: Image quality
    const isPlaceholder = r.imageUrl === '/images/placeholder-food.jpg';
    const hasRealImage = !isPlaceholder && r.imageUrl && r.imageUrl.startsWith('http');
    
    // Check 2: Step detail (times/temps)
    const stepsNeedingDetail = r.steps.filter(s => {
      const inst = s.instruction.toLowerCase();
      return !inst.includes('°') && !inst.includes('minutes') && !inst.includes('mins') && s.stepNumber <= 6;
    });
    
    // Check 3: Ingredient count
    const ingredientCount = r.ingredients.length / 2; // Divided by 2 due to duplicates
    
    // Check 4: Duplicate steps
    const stepNumbers = r.steps.map(s => s.stepNumber);
    const hasDuplicates = stepNumbers.length !== new Set(stepNumbers).size;

    const recipeIssues = [];
    
    if (isPlaceholder) {
      recipeIssues.push('PLACEHOLDER_IMAGE');
    }
    
    if (stepsNeedingDetail.length > 2) {
      recipeIssues.push('WEAK_STEPS');
    }
    
    if (ingredientCount < 8) {
      recipeIssues.push('WEAK_INGREDIENTS');
    }
    
    if (hasDuplicates) {
      recipeIssues.push('DUPLICATE_STEPS');
    }

    if (recipeIssues.length > 0) {
      issues.push({
        recipe: r.title,
        slug: r.slug,
        issues: recipeIssues,
        severity: recipeIssues.includes('PLACEHOLDER_IMAGE') ? 'CRITICAL' : 'HIGH'
      });
    }
    
    console.log(`${r.title}:`);
    console.log(`  Image: ${isPlaceholder ? 'PLACEHOLDER ❌' : 'OK ✅'}`);
    console.log(`  Steps: ${r.steps.length} (unique: ${new Set(stepNumbers).size})`);
    console.log(`  Ingredients: ${ingredientCount}`);
    console.log(`  Issues: ${recipeIssues.length > 0 ? recipeIssues.join(', ') : 'None'}`);
    console.log('');
  }

  return issues;
}

async function fixRecipes() {
  console.log('\n=== APPLYING FIXES ===\n');
  
  const recipes = await prisma.recipe.findMany({
    where: { status: 'published' },
    include: { 
      steps: { orderBy: { stepNumber: 'asc' } }, 
      ingredients: true 
    }
  });

  let fixed = 0;

  for (const r of recipes) {
    // Fix 1: Update images
    if (RECIPE_IMAGES[r.slug]) {
      await prisma.recipe.update({
        where: { id: r.id },
        data: { imageUrl: RECIPE_IMAGES[r.slug] }
      });
      console.log(`✅ Fixed image for: ${r.title}`);
      fixed++;
    }

    // Fix 2: Remove duplicate steps (keep unique stepNumbers, keep first occurrence)
    const stepNumbers = r.steps.map(s => s.stepNumber);
    const seen = new Set();
    const duplicates = r.steps.filter(s => {
      if (seen.has(s.stepNumber)) return true;
      seen.add(s.stepNumber);
      return false;
    });
    
    if (duplicates.length > 0) {
      for (const d of duplicates) {
        await prisma.recipeStep.delete({ where: { id: d.id } });
      }
      console.log(`✅ Removed ${duplicates.length} duplicate steps from: ${r.title}`);
      fixed++;
    }

    // Fix 3: Remove duplicate ingredients
    const seenIngredients = new Set();
    const duplicateIngredients = r.ingredients.filter(i => {
      const key = `${i.name}-${i.quantity}-${i.unit}`;
      if (seenIngredients.has(key)) return true;
      seenIngredients.add(key);
      return false;
    });
    
    if (duplicateIngredients.length > 0) {
      for (const di of duplicateIngredients) {
        await prisma.ingredient.delete({ where: { id: di.id } });
      }
      console.log(`✅ Removed ${duplicateIngredients.length} duplicate ingredients from: ${r.title}`);
      fixed++;
    }
  }

  console.log(`\nTotal fixes applied: ${fixed}`);
  return fixed;
}

async function main() {
  try {
    const issues = await checkQA();
    console.log('\n=== FAILING RECIPES ===');
    console.log(JSON.stringify(issues, null, 2));
    
    const fixCount = await fixRecipes();
    
    console.log(`\n=== SUMMARY ===`);
    console.log(`Recipes with issues: ${issues.length}`);
    console.log(`Fixes applied: ${fixCount}`);
    console.log(`Remaining in queue: ${issues.length}`);
    
  } finally {
    await prisma.$disconnect();
  }
}

main();
