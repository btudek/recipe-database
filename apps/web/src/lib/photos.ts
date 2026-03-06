// Food photos mapping - REAL database recipes
const FOOD_PHOTOS: Record<string, string> = {
  // From real database
  tiramisu: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=800',
  'chocolate-lava-cake': 'https://images.unsplash.com/photo-1624353365286-3f8d62daad51?w=800',
  churros: 'https://images.unsplash.com/photo-1624371414361-e670edf4898d?w=800',
  'caesar-salad': 'https://images.unsplash.com/photo-1550304943-4f24f54ddde9?w=800',
  gazpacho: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?w=800',
  'beef-tacos': 'https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?w=800',
  'butter-chicken': 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=800',
  'salmon-sushi': 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=800',
  'pad-thai': 'https://images.unsplash.com/photo-1559314809-0d155014e29e?w=800',
  'chicken-tacos': 'https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?w=800',
  'margherita-pizza': 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800',
  'french-onion-soup': 'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=800',
  'kung-pao-chicken': 'https://images.unsplash.com/photo-1525755662778-989d0524087e?w=800',
  'ramen-noodles': 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=800',
  guacamole: 'https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?w=800',
  croissant: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=800',
  'fried-rice': 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=800',
  'pizza-margherita': 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800',
  'panna-cotta': 'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=800',
  'beef-stir-fry': 'https://images.unsplash.com/photo-1512058564366-18510be2db19?w=800',
  
  // Common dish types
  pizza: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800',
  pasta: 'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=800',
  taco: 'https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?w=800',
  tacos: 'https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?w=800',
  burger: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800',
  sushi: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=800',
  ramen: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=800',
  curry: 'https://images.unsplash.com/photo-1585938389612-a55228e2eb59?w=800',
  soup: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=800',
  salad: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800',
  cake: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=800',
  chicken: 'https://images.unsplash.com/photo-1598103442097-8b74394b95c6?w=800',
  steak: 'https://images.unsplash.com/photo-1600891964092-4316c288032e?w=800',
  seafood: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=800',
  shrimp: 'https://images.unsplash.com/photo-1565680018434-b513d5e5fd47?w=800',
  salmon: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=800',
  breakfast: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?w=800',
  dessert: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=800',
};

// Keyword rules for fallback
const KEYWORD_RULES = [
  { keywords: ['pizza'], photo: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800' },
  { keywords: ['taco', 'tacos'], photo: 'https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?w=800' },
  { keywords: ['burger'], photo: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800' },
  { keywords: ['pasta'], photo: 'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=800' },
  { keywords: ['sushi'], photo: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=800' },
  { keywords: ['ramen', 'noodle'], photo: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=800' },
  { keywords: ['curry', 'butter-chicken', 'chicken-tikka'], photo: 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=800' },
  { keywords: ['soup', 'french-onion'], photo: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=800' },
  { keywords: ['salad', 'caesar'], photo: 'https://images.unsplash.com/photo-1550304943-4f24f54ddde9?w=800' },
  { keywords: ['tiramisu'], photo: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=800' },
  { keywords: ['croissant'], photo: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=800' },
  { keywords: ['guacamole'], photo: 'https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?w=800' },
  { keywords: ['churro'], photo: 'https://images.unsplash.com/photo-1624371414361-e670edf4898d?w=800' },
  { keywords: ['fried-rice'], photo: 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=800' },
  { keywords: ['stir-fry'], photo: 'https://images.unsplash.com/photo-1512058564366-18510be2db19?w=800' },
  { keywords: ['kung-pao'], photo: 'https://images.unsplash.com/photo-1525755662778-989d0524087e?w=800' },
  { keywords: ['panna-cotta'], photo: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=800' },
  { keywords: ['lava-cake', 'chocolate-cake'], photo: 'https://images.unsplash.com/photo-1624353365286-3f8d62daad51?w=800' },
  { keywords: ['gazpacho'], photo: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?w=800' },
];

const DEFAULT_PHOTO = 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800';

export function getRecipePhoto(slug: string): string {
  if (!slug || typeof slug !== 'string') return DEFAULT_PHOTO;
  
  const slugLower = slug.toLowerCase();
  
  // First try exact match
  if (FOOD_PHOTOS[slugLower]) {
    return FOOD_PHOTOS[slugLower];
  }
  
  // Try keyword rules
  for (const rule of KEYWORD_RULES) {
    for (const keyword of rule.keywords) {
      if (slugLower.includes(keyword)) {
        return rule.photo;
      }
    }
  }
  
  return DEFAULT_PHOTO;
}
