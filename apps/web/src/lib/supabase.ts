import { getRecipePhoto } from './photos';
import { SAMPLE_RECIPES } from './sampleData';

export { getRecipePhoto };

// Use local recipes - bypass broken API
export async function getRecipes(filters?: { cuisine?: string; category?: string; diet?: string }) {
  console.log('Using local recipes, total:', SAMPLE_RECIPES.length);
  let filtered = [...SAMPLE_RECIPES];
  
  if (filters?.cuisine) {
    filtered = filtered.filter((r: any) => r.cuisine?.slug === filters.cuisine);
  }
  if (filters?.category) {
    filtered = filtered.filter((r: any) => r.category?.slug === filters.category);
  }
  
  return filtered.map((r: any) => ({
    id: r.id,
    slug: r.slug,
    title: r.title,
    description: r.description,
    prepTime: r.prepTime || 0,
    cookTime: r.cookTime || 0,
    totalTime: r.totalTime || (r.prepTime || 0) + (r.cookTime || 0),
    yield: r.yield || 4,
    imageUrl: r.imageUrl || getRecipePhoto(r.slug),
    cuisine: r.cuisine,
    category: r.category,
    diet: r.diet,
    ingredients: r.ingredients || [],
    steps: r.steps || [],
    healthScore: r.healthScore || Math.floor(Math.random() * 50) + 50
  }));
}

export async function getRecipe(slug: string) {
  const sampleRecipe = SAMPLE_RECIPES.find((r: any) => r.slug === slug);
  if (sampleRecipe) {
    return {
      ...sampleRecipe,
      prepTime: sampleRecipe.prepTime || 0,
      cookTime: sampleRecipe.cookTime || 0,
      totalTime: sampleRecipe.totalTime || (sampleRecipe.prepTime || 0) + (sampleRecipe.cookTime || 0),
      imageUrl: sampleRecipe.imageUrl || getRecipePhoto(slug),
      ingredients: sampleRecipe.ingredients || [],
      steps: sampleRecipe.steps || []
    };
  }
  return null;
}

export async function searchRecipes(query: string) {
  const q = query.toLowerCase();
  const results = SAMPLE_RECIPES.filter((r: any) => 
    r.title?.toLowerCase().includes(q) || 
    r.description?.toLowerCase().includes(q)
  );
  return results.map((r: any) => ({
    ...r,
    imageUrl: r.imageUrl || getRecipePhoto(r.slug)
  }));
}

export async function getCuisines() {
  const cuisines = new Set();
  SAMPLE_RECIPES.forEach((r: any) => {
    if (r.cuisine) cuisines.add(JSON.stringify(r.cuisine));
  });
  return Array.from(cuisines).map((c: any) => JSON.parse(c));
}

export async function getCategories() {
  const categories = new Set();
  SAMPLE_RECIPES.forEach((r: any) => {
    if (r.category) categories.add(JSON.stringify(r.category));
  });
  return Array.from(categories).map((c: any) => JSON.parse(c));
}

export async function getDiets() {
  return [
    { id: '1', name: 'Vegetarian', slug: 'vegetarian' },
    { id: '2', name: 'Vegan', slug: 'vegan' },
    { id: '3', name: 'Gluten-Free', slug: 'gluten-free' },
    { id: '4', name: 'Dairy-Free', slug: 'dairy-free' },
    { id: '5', name: 'Keto', slug: 'keto' },
    { id: '6', name: 'Low-Carb', slug: 'low-carb' }
  ];
}

export async function getRecipeScore(recipeId: string) {
  return { score: Math.floor(Math.random() * 30) + 70 };
}

export async function getRecipeScores(recipeIds: string[]) {
  return recipeIds.map(id => ({ recipe_id: id, score: Math.floor(Math.random() * 30) + 70 }));
}
