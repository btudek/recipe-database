const SUPABASE_URL = 'https://ycwbumsmlikiquplkdln.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inljd2J1bXNtbGlraXF1cGxrZGxuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzI0MTI0NTEsImV4cCI6MjA4Nzk4ODQ1MX0.OssOxG4gz6pxkWkycsjJqA5cEM_IyxgjqB6JHP4PbhA';

export const API_BASE = SUPABASE_URL + '/rest/v1';

export const RECIPE_PHOTOS: Record<string, string> = {
  'spaghetti-carbonara': 'https://images.unsplash.com/photo-1612874742237-6526221588e3?w=800',
  'chicken-tacos': 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=800',
  'sushi-rolls': 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=800',
  'beef-bourguignon': 'https://images.unsplash.com/photo-1534939561126-855b8675edd7?w=800',
  'pad-thai': 'https://images.unsplash.com/photo-1559314809-0d155014e29e?w=800',
  'margherita-pizza': 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=800',
  'chocolate-lava-cake': 'https://images.unsplash.com/photo-1624353365286-3f8d62daad51?w=800',
  'butter-chicken': 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=800',
  'beef-tacos': 'https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?w=800',
  'salmon-sushi': 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=800',
  'french-onion-soup': 'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=800',
  'kung-pao-chicken': 'https://images.unsplash.com/photo-1525755662778-989d0524087e?w=800',
  'ramen-noodles': 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=800',
  'guacamole': 'https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?w=800',
  'croissant': 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=800',
  'fried-rice': 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=800',
  'tiramisu': 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=800',
  'churros': 'https://images.unsplash.com/photo-1624371414361-e670edf4898d?w=800',
  'miso-soup': 'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=800',
  'caesar-salad': 'https://images.unsplash.com/photo-1546793665-c74683f339c1?w=800',
  'panna-cotta': 'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=800',
};

const DEFAULT_PHOTO = 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800';

export function getRecipePhoto(slug: string): string {
  return RECIPE_PHOTOS[slug] || DEFAULT_PHOTO;
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
  if (!response.ok) return [];
  return response.json();
}

export async function getRecipes() {
  const data = await apiCall('/recipe?select=*&status=eq.published&limit=20');
  return (data || []).map((r: any) => ({
    id: r.id,
    slug: r.slug,
    title: r.title,
    description: r.description,
    prepTime: r.prep_time || 0,
    cookTime: r.cook_time || 0,
    totalTime: r.total_time || 0,
    yield: r.yield || 4,
    imageUrl: getRecipePhoto(r.slug),
    cuisine: { name: 'Various', slug: 'various' },
    category: { name: 'Dinner', slug: 'dinner' }
  }));
}

export async function getRecipe(slug: string) {
  const recipes = await apiCall(`/recipe?select=*&slug=eq.${slug}&status=eq.published&limit=1`);
  if (!recipes || recipes.length === 0) return null;
  const r = recipes[0];
  
  // Get ingredients from database
  const ingredients = await apiCall(`/ingredient?recipe_id=eq.${r.id}&order=order_index`);
  
  // Get steps from database  
  const steps = await apiCall(`/recipe_step?recipe_id=eq.${r.id}&order=step_number`);
  
  return {
    id: r.id,
    slug: r.slug,
    title: r.title,
    description: r.description,
    prepTime: r.prep_time || 0,
    cookTime: r.cook_time || 0,
    totalTime: r.total_time || 0,
    yield: r.yield || 4,
    imageUrl: getRecipePhoto(r.slug),
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
    cuisine: { name: 'Various', slug: 'various' },
    category: { name: 'Dinner', slug: 'dinner' }
  };
}

export async function getCuisines() {
  return apiCall('/cuisine?select=*&order=name');
}

export async function searchRecipes(q: string) {
  const data = await apiCall(`/recipe?select=*&status=eq.published&or=(title.ilike.*${q}*,description.ilike.*${q}*)&limit=20`);
  return (data || []).map((r: any) => ({
    ...r,
    prepTime: r.prep_time,
    cookTime: r.cook_time,
    imageUrl: getRecipePhoto(r.slug)
  }));
}
