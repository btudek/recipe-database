const SUPABASE_URL = 'https://ycwbumsmlikiquplkdln.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inljd3JidW1zbWlraXF1cGxrbG4iLCJpbnN0YW5jZSI6Inljd3JidW1zbWlraXF1cGxrbG4iLCJyZWFsXzFzIjoiZGVmYXVsdCIsInJlYWxfYnkiOiJwb3N0Z3JlcyIsInN1YiI6InRqemRiemd2ZG5hYWxibGlnZHNnIiwiaWF0IjoxNzA2Njc0NTc3fQ.K4AXxMHVd0VqeFR1gS22Id3fFDDDmW9F6HhKQHZbnfk';

export const API_BASE = SUPABASE_URL + '/rest/v1';

// Helper for API calls
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
  return apiCall('/recipe?select=*,cuisine:Cuisine(name,slug),category:Category(name,slug)&status=eq.published&order=publishedAt.desc');
}

export async function getRecipe(slug: string) {
  const data = await apiCall(`/recipe?select=*,cuisine:Cuisine(*),category:Category(*),ingredients:Ingredient(*),steps:RecipeStep(*)&slug=eq.${slug}&status=eq.published&limit=1`);
  return data[0] || null;
}

// Cuisines
export async function getCuisines() {
  return apiCall('/cuisine?select=*,recipes:Recipe(id)&order=name');
}

// Search
export async function searchRecipes(q: string) {
  return apiCall(`/recipe?select=*,cuisine:Cuisine(name,slug)&status=eq.published&or=(title.ilike.*${q}*,description.ilike.*${q}*)&limit=20`);
}
