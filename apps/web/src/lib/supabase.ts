import { getRecipePhoto } from './photos';
import { SAMPLE_RECIPES } from './sampleData';

const SUPABASE_URL = 'https://ycwbumsmlikiquplkdln.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inljd2J1bXNtbGlraXF1cGxrZGxuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzI0MTI0NTEsImV4cCI6MjA4Nzk4ODQ1MX0.OssOxG4gz6pxkWkycsjJqA5cEM_IyxgjqB6JHP4PbhA';

export const API_BASE = SUPABASE_URL + '/rest/v1';

export { getRecipePhoto } from './photos';

// Helper to get custom image from localStorage
function getCustomImageUrl(recipeId: string): string | null {
  if (typeof window === 'undefined') return null;
  try {
    const customImages = JSON.parse(localStorage.getItem('custom_recipe_images') || '{}');
    return customImages[recipeId] || null;
  } catch {
    return null;
  }
}

// Client-side function to apply custom images to rendered content
export function applyCustomImages() {
  if (typeof window === 'undefined') return;
  try {
    const customImages = JSON.parse(localStorage.getItem('custom_recipe_images') || '{}');
    // Find all recipe images and apply custom ones
    Object.keys(customImages).forEach(recipeId => {
      const customUrl = customImages[recipeId];
      if (customUrl) {
        // Try to find image by data-recipe-id attribute
        const img = document.querySelector(`img[data-recipe-id="${recipeId}"]`) as HTMLImageElement;
        if (img) {
          img.src = customUrl;
        }
      }
    });
  } catch (e) {
    console.error('Error applying custom images:', e);
  }
}

async function apiCall(endpoint: string, options: RequestInit = {}) {
  const url = `${API_BASE}${endpoint}`;
  console.log('API Call:', url);
  const headers = {
    'apikey': SUPABASE_KEY,
    'Authorization': `Bearer ${SUPABASE_KEY}`,
    'Content-Type': 'application/json',
    'Prefer': 'return=representation',
    ...options.headers,
  };
  
  try {
    const response = await fetch(url, { ...options, headers });
    if (!response.ok) {
      console.error(`API call failed for ${endpoint}:`, response.status, response.statusText);
      return [];
    }
    const text = await response.text();
    if (!text) {
      console.error(`API call returned empty for ${endpoint}`);
      return [];
    }
    return JSON.parse(text);
  } catch (error) {
    console.error('API call failed:', error);
    return [];
  }
}

export async function getRecipes(filters?: { cuisine?: string; category?: string; diet?: string }) {
  // Use sample recipes directly (bypass API for reliability)
  console.log('Using local recipes');
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
  
  if (filters?.cuisine) {
    params.push(`cuisine_id=eq.${filters.cuisine}`);
  }
  if (filters?.category) {
    params.push(`category_id=eq.${filters.category}`);
  }
  if (filters?.diet) {
    params.push(`diet_id=eq.${filters.diet}`);
  }
  
  if (params.length > 0) {
    query += '&' + params.join('&');
  }
  
  const data = await apiCall(query);
  
  // If no data from API, use sample recipes as fallback
  if (!data || data.length === 0) {
    console.log('Using sample recipes as fallback');
    return SAMPLE_RECIPES.map((r: any) => ({
      id: r.id,
      slug: r.slug,
      title: r.title,
      description: r.description,
      prepTime: r.prepTime || 0,
      cookTime: r.cookTime || 0,
      totalTime: r.totalTime || 0,
      yield: r.yield || 4,
      imageUrl: r.imageUrl,
      cuisine: r.cuisine,
      category: r.category,
      diet: r.diet || null
    }));
  }
  
  const cuisines = await apiCall('/cuisine?select=*');
  const categories = await apiCall('/category?select=*');
  const diets = await apiCall('/diet?select=*');
  
  const cuisineMap: Record<string, any> = {};
  (cuisines || []).forEach((c: any) => { cuisineMap[c.id] = c; });
  
  const categoryMap: Record<string, any> = {};
  (categories || []).forEach((c: any) => { categoryMap[c.id] = c; });
  
  const dietMap: Record<string, any> = {};
  (diets || []).forEach((d: any) => { dietMap[d.id] = d; });
  
  return (data || []).map((r: any) => ({
    id: r.id,
    slug: r.slug,
    title: r.title,
    description: r.description,
    prepTime: r.prep_time || 0,
    cookTime: r.cook_time || 0,
    totalTime: r.total_time || 0,
    yield: r.yield || 4,
    imageUrl: getCustomImageUrl(r.id) || (r.slug ? getRecipePhoto(r.slug) : null),
    cuisine: r.cuisine_id ? { name: cuisineMap[r.cuisine_id]?.name || 'American', slug: cuisineMap[r.cuisine_id]?.slug || 'american' } : { name: 'American', slug: 'american' },
    category: r.category_id ? { name: categoryMap[r.category_id]?.name || 'Dinner', slug: categoryMap[r.category_id]?.slug || 'dinner' } : { name: 'Dinner', slug: 'dinner' },
    diet: r.diet_id ? { id: r.diet_id, name: dietMap[r.diet_id]?.name || null } : null
  }));
}

export async function getRecipe(slug: string) {
  // Use sample recipes directly (bypass API)
  const sampleRecipe = SAMPLE_RECIPES.find((r: any) => r.slug === slug);
  if (sampleRecipe) {
    return {
      ...sampleRecipe,
      prepTime: sampleRecipe.prepTime || 0,
      cookTime: sampleRecipe.cookTime || 0,
      totalTime: sampleRecipe.totalTime || (sampleRecipe.prepTime || 0) + (sampleRecipe.cookTime || 0),
      imageUrl: sampleRecipe.imageUrl || getRecipePhoto(slug)
    };
  }
  return null;
}
  
  const r = recipes[0];
  
  const ingredients = await apiCall(`/ingredient?recipe_id=eq.${r.id}&order=order_index`);
  const steps = await apiCall(`/recipe_step?recipe_id=eq.${r.id}&order=step_number`);
  
  let cuisine = { name: 'American', slug: 'american' };
  let category = { name: 'Dinner', slug: 'dinner' };
  
  if (r.cuisine_id) {
    const cuisines = await apiCall(`/cuisine?id=eq.${r.cuisine_id}&limit=1`);
    if (cuisines && cuisines.length > 0) {
      cuisine = { name: cuisines[0].name, slug: cuisines[0].slug };
    }
  }
  
  if (r.category_id) {
    const categories = await apiCall(`/category?id=eq.${r.category_id}&limit=1`);
    if (categories && categories.length > 0) {
      category = { name: categories[0].name, slug: categories[0].slug };
    }
  }
  
  let diet = null;
  if (r.diet_id) {
    const diets = await apiCall(`/diet?id=eq.${r.diet_id}&limit=1`);
    if (diets && diets.length > 0) {
      diet = { id: diets[0].id, name: diets[0].name };
    }
  }
  
  return {
    id: r.id,
    slug: r.slug,
    title: r.title,
    description: r.description,
    prepTime: r.prep_time || 0,
    cookTime: r.cook_time || 0,
    totalTime: r.total_time || 0,
    yield: r.yield || 4,
    imageUrl: getCustomImageUrl(r.id) || (r.slug ? getRecipePhoto(r.slug) : null),
    ingredients: ingredients.map((i: any) => ({
      name: i.name,
      quantity: i.quantity,
      unit: i.unit,
      notes: i.notes
    })),
    steps: steps.map((s: any) => ({
      stepNumber: s.step_number,
      instruction: s.instruction,
      michelinNote: s.michelin_note
    })),
    cuisine,
    category,
    diet
  };
}

// Sample fallback data
const SAMPLE_CUISINES = [
  { id: '1', name: 'American', slug: 'american' },
  { id: '2', name: 'Italian', slug: 'italian' },
  { id: '3', name: 'Mexican', slug: 'mexican' },
  { id: '4', name: 'Chinese', slug: 'chinese' },
  { id: '5', name: 'Japanese', slug: 'japanese' },
  { id: '6', name: 'Indian', slug: 'indian' },
  { id: '7', name: 'Thai', slug: 'thai' },
  { id: '8', name: 'French', slug: 'french' },
];

const SAMPLE_CATEGORIES = [
  { id: '1', name: 'Breakfast', slug: 'breakfast' },
  { id: '2', name: 'Lunch', slug: 'lunch' },
  { id: '3', name: 'Dinner', slug: 'dinner' },
  { id: '4', name: 'Desserts', slug: 'desserts' },
  { id: '5', name: 'Appetizers', slug: 'appetizers' },
  { id: '6', name: 'Soups', slug: 'soups' },
  { id: '7', name: 'Salads', slug: 'salads' },
  { id: '8', name: 'Baking', slug: 'baking' },
];

const SAMPLE_DIETS = [
  { id: '1', name: 'Vegetarian' },
  { id: '2', name: 'Vegan' },
  { id: '3', name: 'Gluten-Free' },
  { id: '4', name: 'Keto' },
  { id: '5', name: 'Paleo' },
];

export async function getCuisines() {
  const data = await apiCall('/cuisine?select=*&order=name');
  if (!data || data.length === 0) return SAMPLE_CUISINES;
  return data;
}

export async function getCategories() {
  const data = await apiCall('/category?select=*&order=name');
  if (!data || data.length === 0) return SAMPLE_CATEGORIES;
  return data;
}

export async function getDiets() {
  const data = await apiCall('/diet?select=*&order=name');
  if (!data || data.length === 0) return SAMPLE_DIETS;
  return data;
}

// singular - for single recipe
export async function getRecipeScore(recipeId: string) {
  const scores = await apiCall(`/recipe_score?recipe_id=eq.${recipeId}&limit=1`);
  return scores?.[0] || null;
}

// plural - for multiple recipes  
export async function getRecipeScores(recipeIds?: string[]) {
  if (recipeIds && recipeIds.length > 0) {
    // Limit to first 50 to avoid URL length issues
    const limitedIds = recipeIds.slice(0, 50);
    const data = await apiCall(`/recipe_score?recipe_id=in.(${limitedIds.join(',')})`);
    // Convert array to object for easier lookup
    const scoreMap: Record<string, number> = {};
    (data || []).forEach((item: any) => {
      scoreMap[item.recipe_id] = item.score;
    });
    return scoreMap;
  }
  const data = await apiCall('/recipe_score?select=*');
  const scoreMap: Record<string, number> = {};
  (data || []).forEach((item: any) => {
    scoreMap[item.recipe_id] = item.score;
  });
  return scoreMap;
}

export async function searchRecipes(query: string) {
  const encodedQuery = encodeURIComponent(query);
  const data = await apiCall(`/recipe?select=*&or=(title.ilike.*${encodedQuery}*,slug.ilike.*${encodedQuery}*)&order=title&limit=50`);
  
  // If no data from API, search in sample recipes
  if (!data || data.length === 0) {
    const queryLower = query.toLowerCase();
    const filtered = SAMPLE_RECIPES.filter((r: any) => 
      r.title.toLowerCase().includes(queryLower) || 
      r.description.toLowerCase().includes(queryLower)
    );
    return filtered.map((r: any) => ({
      id: r.id,
      slug: r.slug,
      title: r.title,
      description: r.description || '',
      prepTime: r.prepTime || 0,
      cookTime: r.cookTime || 0,
      totalTime: r.totalTime || 0,
      yield: r.yield || 4,
      imageUrl: r.imageUrl,
      cuisine: r.cuisine,
      category: r.category
    }));
  }
  
  return data.map((r: any) => ({
    id: r.id,
    slug: r.slug,
    title: r.title,
    description: r.description || '',
    prepTime: r.prep_time || 0,
    cookTime: r.cook_time || 0,
    totalTime: r.total_time || 0,
    yield: r.yield || 4,
    imageUrl: r.slug ? getRecipePhoto(r.slug) : null,
    cuisine: { name: 'American', slug: 'american' },
    category: { name: 'Dinner', slug: 'dinner' }
  }));
}
