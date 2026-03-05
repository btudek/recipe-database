const fs = require('fs');
const path = require('path');

function analyzeRecipeData(filePath) {
  const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  const recipes = data.recipes || [];
  
  let totalSteps = 0;
  let totalIngredients = 0;
  let recipesWithMichelinTips = 0;
  let recipesWithDetailedSteps = 0;
  
  for (const r of recipes) {
    const steps = r.steps || [];
    const ingredients = r.ings || [];
    
    totalSteps += steps.length;
    totalIngredients += ingredients.length;
    
    // Check for michelin tips
    const stepsWithTips = steps.filter(s => s.m && s.m.length > 30).length;
    if (stepsWithTips >= steps.length * 0.5) recipesWithMichelinTips++;
    
    // Check step detail
    const avgStepLength = steps.reduce((a, s) => a + (s.i?.length || 0), 0) / (steps.length || 1);
    if (avgStepLength > 60) recipesWithDetailedSteps++;
  }
  
  return {
    recipeCount: recipes.length,
    totalSteps,
    totalIngredients,
    avgStepsPerRecipe: (totalSteps / recipes.length).toFixed(1),
    avgIngredientsPerRecipe: (totalIngredients / recipes.length).toFixed(1),
    recipesWithMichelinTips,
    recipesWithDetailedSteps
  };
}

const baseDir = path.join(__dirname);
const files = ['recipe-data.json', 'recipe-data2.json', 'recipe-data3.json', 'recipe-data4.json'];

console.log('=== RECIPE DATA FILES ANALYSIS ===\n');

let totalRecipes = 0;
let totalSteps = 0;
let totalIngredients = 0;

for (const f of files) {
  const filePath = path.join(baseDir, f);
  if (fs.existsSync(filePath)) {
    const result = analyzeRecipeData(filePath);
    console.log(`${f}: ${result.recipeCount} recipes | avg ${result.avgStepsPerRecipe} steps | avg ${result.avgIngredientsPerRecipe} ingredients | ${result.recipesWithMichelinTips} with tips`);
    totalRecipes += result.recipeCount;
    totalSteps += result.totalSteps;
    totalIngredients += result.totalIngredients;
  }
}

console.log(`\n=== TOTALS ===`);
console.log(`Total recipes: ${totalRecipes}`);
console.log(`Total steps: ${totalSteps}`);
console.log(`Total ingredients: ${totalIngredients}`);
