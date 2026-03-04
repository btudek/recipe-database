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
  
  try {
    const response = await fetch(url, { ...options, headers });
    if (!response.ok) return [];
    const text = await response.text();
    if (!text) return [];
    return JSON.parse(text);
  } catch (error) {
    console.error('API call failed:', error);
    return [];
  }
}

export async function getRecipes(filters?: { cuisine?: string; category?: string; diet?: string }) {
  let query = '/recipe?select=*&limit=100';
  const params: string[] = [];
  
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
  
  // Get all cuisines, categories, and diets for lookup
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
    imageUrl: getRecipePhoto(r.slug),
    cuisine: r.cuisine_id ? { name: cuisineMap[r.cuisine_id]?.name || 'Unknown', slug: cuisineMap[r.cuisine_id]?.slug || 'unknown' } : { name: 'American', slug: 'american' },
    category: r.category_id ? { name: categoryMap[r.category_id]?.name || 'Dinner', slug: categoryMap[r.category_id]?.slug || 'dinner' } : { name: 'Dinner', slug: 'dinner' },
    diet: r.diet_id ? { id: r.diet_id, name: dietMap[r.diet_id]?.name || null } : null
  }));
}

export async function getRecipe(slug: string) {
  const recipes = await apiCall(`/recipe?select=*&slug=eq.${slug}&limit=1`);
  if (!recipes || recipes.length === 0) return null;
  const r = recipes[0];
  
  // Get ingredients from database
  const ingredients = await apiCall(`/ingredient?recipe_id=eq.${r.id}&order=order_index`);
  
  // Get steps from database  
  const steps = await apiCall(`/recipe_step?recipe_id=eq.${r.id}&order=step_number`);
  
  // Get cuisine and category info
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
  
  // Get diet info
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
    cuisine,
    category,
    diet
  };
}

export async function getCuisines() {
  return apiCall('/cuisine?select=*&order=name');
}

export async function getCategories() {
  return apiCall('/category?select=*&order=name');
}

export async function getDiets() {
  return apiCall('/diet?select=*&order=name');
}

export async function searchRecipes(q: string) {
  const data = await apiCall(`/recipe?select=*&or=(title.ilike.*${q}*,description.ilike.*${q}*)&limit=20`);
  return (data || []).map((r: any) => ({
    ...r,
    prepTime: r.prep_time,
    cookTime: r.cook_time,
    imageUrl: getRecipePhoto(r.slug)
  }));
}

// Get health scores for multiple recipes
export async function getRecipeScores(recipeIds: string[]) {
  if (!recipeIds || recipeIds.length === 0) return {};
  const idsParam = recipeIds.map(id => `id.eq.${id}`).join(',');
  const data = await apiCall(`/recipe_score?or=(${idsParam})&select=recipe_id,general_score`);
  const scoreMap: Record<string, number> = {};
  (data || []).forEach((s: any) => {
    scoreMap[s.recipe_id] = s.general_score;
  });
  return scoreMap;
}

// Get health score for a single recipe
export async function getRecipeScore(recipeId: string): Promise<number | null> {
  if (!recipeId) return null;
  const data = await apiCall(`/recipe_score?recipe_id=eq.${recipeId}&select=general_score&limit=1`);
  if (!data || data.length === 0) return null;
  return data[0].general_score;
}
