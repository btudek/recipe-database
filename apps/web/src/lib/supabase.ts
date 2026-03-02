const SUPABASE_URL = 'https://ycwbumsmlikiquplkdln.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inljd3JidW1zbWlraXF1cGxrbG4iLCJpbnN0YW5jZSI6Inljd3JidW1zbWlraXF1cGxrbG4iLCJyZWFsXzFzIjoiZGVmYXVsdCIsInJlYWxfYnkiOiJwb3N0Z3JlcyIsInN1YiI6InRqemRiemd2ZG5hYWxibGlnZHNnIiwiaWF0IjoxNzA2Njc0NTc3fQ.K4AXxMHVd0VqeFR1gS22Id3fFDDDmW9F6HhKQHZbnfk';

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

// Get photo URL for a recipe
export function getRecipePhoto(slug: string): string {
  return RECIPE_PHOTOS[slug] || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&q=80';
}

export async function apiCall(endpoint: string, options: RequestInit = {}) {
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
    throw new Error(error.message || `HTTP ${response.status}`);
  }
  
  const data = await response.json();
  return data;
}

// Recipes
export async function getRecipes() {
  const data = await apiCall('/recipe?select=*,cuisine:Cuisine(name,slug),category:Category(name,slug)&status=eq.published&order=publishedAt.desc');
  return (data || []).map((r: any) => ({
    ...r,
    imageUrl: getRecipePhoto(r.slug)
  }));
}

export async function getRecipe(slug: string) {
  const data = await apiCall(`/recipe?select=*,cuisine:Cuisine(*),category:Category(*),ingredients:Ingredient(*),steps:RecipeStep(*)&slug=eq.${slug}&status=eq.published&limit=1`);
  if (!data || data.length === 0) return null;
  const recipe = data[0];
  return {
    ...recipe,
    imageUrl: getRecipePhoto(recipe.slug)
  };
}

// Cuisines
export async function getCuisines() {
  return apiCall('/cuisine?select=*,recipes:Recipe(id)&order=name');
}

// Search
export async function searchRecipes(q: string) {
  const data = await apiCall(`/recipe?select=*,cuisine:Cuisine(name,slug)&status=eq.published&or=(title.ilike.*${q}*,description.ilike.*${q}*)&limit=20`);
  return (data || []).map((r: any) => ({
    ...r,
    imageUrl: getRecipePhoto(r.slug)
  }));
}
