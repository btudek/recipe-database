import { SAMPLE_RECIPES, SAMPLE_CUISINES, SAMPLE_CATEGORIES } from './sampleData';

const SUPABASE_URL = 'https://ycwbumsmlikiquplkdln.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inljd2J1bXNtbGlraXF1cGxrZGxuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzI0MTI0NTEsImV4cCI6MjA4Nzk4ODQ1MX0.OssOxG4gz6pxkWkycsjJqA5cEM_IyxgjqB6JHP4PbhA';

export const API_BASE = SUPABASE_URL + '/rest/v1';

// Recipe photos from Unsplash
export const RECIPE_PHOTOS: Record<string, string> = {
  'classic-chicken-parmesan': 'https://images.unsplash.com/photo-1632778149955-e80f8ceca2e8?w=800&q=80',
  'spaghetti-carbonara': 'https://images.unsplash.com/photo-1612874742237-6526221588e3?w=800&q=80',
  'chicken-tacos': 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=800&q=80',
  'pad-thai': 'https://images.unsplash.com/photo-1559314809-0d155014e29e?w=800&q=80',
  'butter-chicken': 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=800&q=80',
  'french-onion-soup': 'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=800&q=80',
  'fluffy-pancakes': 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=800&q=80',
};

export function getRecipePhoto(slug: string): string {
  return RECIPE_PHOTOS[slug] || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&q=80';
}

let dbAvailable = true;

async function apiCall(endpoint: string, options: RequestInit = {}) {
  try {
    const url = `${API_BASE}${endpoint}`;
    const headers = {
      'apikey': SUPABASE_KEY,
      'Authorization': `Bearer ${SUPABASE_KEY}`,
      'Content-Type': 'application/json',
      'Prefer': 'return=representation',
      ...options.headers,
    };
    
    const response = await fetch(url, { ...options, headers });
    
    if (!response.ok) {
      const error = await response.json().catch(() => ({ message: 'Request failed' }));
      if (error.message?.includes('not found') || response.status === 404) {
        dbAvailable = false;
        return null;
      }
      throw new Error(error.message || `HTTP ${response.status}`);
    }
    
    const data = await response.json();
    return data;
  } catch (err) {
    console.warn('Database not available, using sample data');
    dbAvailable = false;
    return null;
  }
}

// Recipes
export async function getRecipes() {
  const data = await apiCall('/recipe?select=*,cuisine:Cuisine(name,slug),category:Category(name,slug)&status=eq.published&order=publishedAt.desc');
  if (!dbAvailable || !data) {
    return SAMPLE_RECIPES.map(r => ({ ...r, imageUrl: getRecipePhoto(r.slug) }));
  }
  return (data || []).map((r: any) => ({
    ...r,
    imageUrl: getRecipePhoto(r.slug)
  }));
}

export async function getRecipe(slug: string) {
  const data = await apiCall(`/recipe?select=*,cuisine:Cuisine(*),category:Category(*),ingredients:Ingredient(*),steps:RecipeStep(*)&slug=eq.${slug}&status=eq.published&limit=1`);
  if (!dbAvailable || !data || data.length === 0) {
    const recipe = SAMPLE_RECIPES.find(r => r.slug === slug);
    if (recipe) {
      return { ...recipe, imageUrl: getRecipePhoto(recipe.slug) };
    }
    return null;
  }
  const recipe = data[0];
  return {
    ...recipe,
    imageUrl: getRecipePhoto(recipe.slug)
  };
}

// Cuisines
export async function getCuisines() {
  const data = await apiCall('/cuisine?select=*,recipes:Recipe(id)&order=name');
  if (!dbAvailable || !data) {
    return SAMPLE_CUISINES.map(c => ({ ...c, recipes: [] }));
  }
  return data;
}

// Search
export async function searchRecipes(q: string) {
  const data = await apiCall(`/recipe?select=*,cuisine:Cuisine(name,slug)&status=eq.published&or=(title.ilike.*${q}*,description.ilike.*${q}*)&limit=20`);
  if (!dbAvailable || !data) {
    const qLower = q.toLowerCase();
    return SAMPLE_RECIPES.filter(r => 
      r.title.toLowerCase().includes(qLower) || 
      r.description.toLowerCase().includes(qLower)
    ).map(r => ({ ...r, imageUrl: getRecipePhoto(r.slug) }));
  }
  return (data || []).map((r: any) => ({
    ...r,
    imageUrl: getRecipePhoto(r.slug)
  }));
}
