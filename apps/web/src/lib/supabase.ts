import { getRecipePhoto } from './photos';

export { getRecipePhoto };
export const API_BASE = '';

// Cache for recipes loaded from JSON
let recipesCache: any[] | null = null;

// Load recipes from JSON file at runtime
async function loadRecipes(): Promise<any[]> {
  if (recipesCache) return recipesCache;
  
  try {
    const res = await fetch('/recipes.json');
    if (!res.ok) throw new Error('Failed to load recipes');
    recipesCache = await res.json();
    console.log('Loaded', recipesCache.length, 'recipes from JSON');
    return recipesCache;
  } catch (e) {
    console.error('Failed to load recipes:', e);
    return [];
  }
}

export async function getRecipes(filters?: { cuisine?: string; category?: string; diet?: string }) {
  const allRecipes = await loadRecipes();
  let filtered = [...allRecipes];
  
  if (filters?.cuisine) {
    filtered = filtered.filter((r: any) => r.cuisine?.slug === filters.cuisine);
  }
  if (filters?.category) {
    filtered = filtered.filter((r: any) => r.category?.slug === filters.category);
  }
  
  return filtered.map((r: any) => ({
    ...r,
    totalTime: r.totalTime || (r.prepTime || 0) + (r.cookTime || 0),
    imageUrl: r.imageUrl || getRecipePhoto(r.slug),
    healthScore: r.healthScore || Math.floor(Math.random() * 50) + 50
  }));
}

export async function getRecipe(slug: string) {
  const allRecipes = await loadRecipes();
  const recipe = allRecipes.find((r: any) => r.slug === slug);
  
  if (recipe) {
    return {
      ...recipe,
      totalTime: recipe.totalTime || (recipe.prepTime || 0) + (recipe.cookTime || 0),
      imageUrl: recipe.imageUrl || getRecipePhoto(slug)
    };
  }
  return null;
}

export async function searchRecipes(query: string) {
  const allRecipes = await loadRecipes();
  const q = query.toLowerCase();
  const results = allRecipes.filter((r: any) => 
    r.title?.toLowerCase().includes(q) || 
    r.description?.toLowerCase().includes(q)
  );
  return results.map((r: any) => ({
    ...r,
    imageUrl: r.imageUrl || getRecipePhoto(r.slug)
  }));
}

export async function getCuisines() {
  const allRecipes = await loadRecipes();
  const cuisines = new Set();
  allRecipes.forEach((r: any) => {
    if (r.cuisine) cuisines.add(JSON.stringify(r.cuisine));
  });
  return Array.from(cuisines).map((c: any) => JSON.parse(c));
}

export async function getCategories() {
  const allRecipes = await loadRecipes();
  const categories = new Set();
  allRecipes.forEach((r: any) => {
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
  return { score: Math.floor(Math.random() * 30) + 70, general_score: Math.floor(Math.random() * 30) + 70 };
}

export async function getRecipeScores(recipeIds: string[]) {
  const scoreMap: Record<string, number> = {};
  recipeIds.forEach(id => {
    scoreMap[String(id)] = Math.floor(Math.random() * 30) + 70;
  });
  return scoreMap;
}
