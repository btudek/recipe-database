const SUPABASE_URL = 'https://ycwbumsmlikiquplkdln.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inljd2J1bXNtbGlraXF1cGxrZGxuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzI0MTI0NTEsImV4cCI6MjA4Nzk4ODQ1MX0.OssOxG4gz6pxkWkycsjJqA5cEM_IyxgjqB6JHP4PbhA';

export const API_BASE = SUPABASE_URL + '/rest/v1';

export const RECIPE_PHOTOS: Record<string, string> = {
  'spaghetti-carbonara': 'https://images.unsplash.com/photo-1612874742237-6526221588e3?w=800',
  'chicken-tacos': 'https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?w=800',
  'sushi-rolls': 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=800',
  'beef-bourguignon': 'https://images.unsplash.com/photo-1534939561126-855b8675edd7?w=800',
  'pad-thai': 'https://images.unsplash.com/photo-1559314809-0d155014e29e?w=800',
  'margherita-pizza': 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=800',
  'chocolate-lava-cake': 'https://images.unsplash.com/photo-1624353365286-3f8d62daad51?w=800',
};

export function getRecipePhoto(slug: string): string {
  return RECIPE_PHOTOS[slug] || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800';
}

async function apiCall(endpoint: string, options: RequestInit = {}) {
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

export async function getRecipes() {
  const data = await apiCall('/recipe?select=*,cuisine:cuisine(name,slug),category:category(name,slug)&status=eq.published&order=publishedAt.desc');
  return (data || []).map((r: any) => ({
    ...r,
    prepTime: r.prep_time,
    cookTime: r.cook_time,
    totalTime: r.total_time,
    yield: r.yield,
    imageUrl: getRecipePhoto(r.slug)
  }));
}

export async function getRecipe(slug: string) {
  const data = await apiCall(`/recipe?select=*,cuisine:cuisine(*),category:category(*)&slug=eq.${slug}&status=eq.published&limit=1`);
  if (!data || data.length === 0) return null;
  const recipe = data[0];
  return {
    ...recipe,
    prepTime: recipe.prep_time,
    cookTime: recipe.cook_time,
    totalTime: recipe.total_time,
    yield: recipe.yield,
    imageUrl: getRecipePhoto(recipe.slug)
  };
}

export async function getCuisines() {
  return apiCall('/cuisine?select=*&order=name');
}

export async function searchRecipes(q: string) {
  const data = await apiCall(`/recipe?select=*,cuisine:cuisine(name,slug)&status=eq.published&or=(title.ilike.*${q}*,description.ilike.*${q}*)&limit=20`);
  return (data || []).map((r: any) => ({
    ...r,
    prepTime: r.prep_time,
    cookTime: r.cook_time,
    imageUrl: getRecipePhoto(r.slug)
  }));
}
