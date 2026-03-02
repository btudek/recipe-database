// Hardcoded recipe data for when database is not available
export const SAMPLE_RECIPES = [
  {
    id: '1',
    slug: 'spaghetti-carbonara',
    title: 'Spaghetti Carbonara',
    description: 'Classic Italian pasta with eggs, cheese, and pancetta',
    prepTime: 15,
    cookTime: 20,
    totalTime: 35,
    yield: 4,
    cuisine: { name: 'Italian', slug: 'italian' },
    category: { name: 'Dinner', slug: 'dinner' },
    imageUrl: 'https://images.unsplash.com/photo-1612874742237-6526221588e3?w=800',
    ingredients: [
      { name: 'Spaghetti', quantity: 400, unit: 'g' },
      { name: 'Pancetta', quantity: 200, unit: 'g' },
      { name: 'Eggs', quantity: 4, unit: 'pcs' },
      { name: 'Parmesan cheese', quantity: 100, unit: 'g' },
      { name: 'Black pepper', quantity: 1, unit: 'tsp' }
    ],
    steps: [
      { stepNumber: 1, instruction: 'Cook spaghetti in salted boiling water until al dente.', michelinNote: 'Reserve 1 cup pasta water before draining.' },
      { stepNumber: 2, instruction: 'Fry pancetta until crispy.', michelinNote: 'Start with cold pan for crispier results.' },
      { stepNumber: 3, instruction: 'Mix eggs with grated Parmesan.', michelinNote: 'Add some pasta water for silky sauce.' },
      { stepNumber: 4, instruction: 'Combine pasta with pancetta, remove from heat, add egg mixture.', michelinNote: 'Toss quickly to create creamy sauce without scrambling eggs.' }
    ],
    nutrition: { calories: 650, protein: 28, carbs: 65, fat: 32 }
  },
  {
    id: '2',
    slug: 'chicken-tacos',
    title: 'Chicken Tacos',
    description: 'Mexican-style chicken tacos with fresh toppings',
    prepTime: 20,
    cookTime: 15,
    totalTime: 35,
    yield: 6,
    cuisine: { name: 'Mexican', slug: 'mexican' },
    category: { name: 'Dinner', slug: 'dinner' },
    imageUrl: 'https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?w=800',
    ingredients: [
      { name: 'Chicken breast', quantity: 500, unit: 'g' },
      { name: 'Corn tortillas', quantity: 12, unit: 'pcs' },
      { name: 'Onion', quantity: 1, unit: 'pcs' },
      { name: 'Cilantro', quantity: 1, unit: 'bunch' },
      { name: 'Lime', quantity: 2, unit: 'pcs' }
    ],
    steps: [
      { stepNumber: 1, instruction: 'Season and grill chicken until cooked through.', michelinNote: 'Let rest before slicing for juicier meat.' },
      { stepNumber: 2, instruction: 'Warm tortillas on a dry pan.', michelinNote: 'Char them slightly for authentic flavor.' },
      { stepNumber: 3, instruction: 'Slice chicken and assemble tacos with toppings.' }
    ],
    nutrition: { calories: 420, protein: 35, carbs: 38, fat: 14 }
  },
  {
    id: '3',
    slug: 'sushi-rolls',
    title: 'Sushi Rolls',
    description: 'Japanese-style sushi with fresh fish and rice',
    prepTime: 30,
    cookTime: 10,
    totalTime: 40,
    yield: 4,
    cuisine: { name: 'Japanese', slug: 'japanese' },
    category: { name: 'Dinner', slug: 'dinner' },
    imageUrl: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=800',
    ingredients: [
      { name: 'Sushi rice', quantity: 300, unit: 'g' },
      { name: 'Nori sheets', quantity: 8, unit: 'pcs' },
      { name: 'Fresh salmon', quantity: 200, unit: 'g' },
      { name: 'Cucumber', quantity: 1, unit: 'pcs' },
      { name: 'Rice vinegar', quantity: 60, unit: 'ml' }
    ],
    steps: [
      { stepNumber: 1, instruction: 'Cook sushi rice and season with rice vinegar.', michelinNote: 'Fan rice while mixing for glossy texture.' },
      { stepNumber: 2, instruction: 'Place nori on bamboo mat, spread rice evenly.', michelinNote: 'Wet hands to prevent sticking.' },
      { stepNumber: 3, instruction: 'Add fillings and roll tightly.', michelinNote: 'Roll slowly and firmly for tight rolls.' },
      { stepNumber: 4, instruction: 'Cut into 8 pieces with wet knife.' }
    ],
    nutrition: { calories: 380, protein: 18, carbs: 52, fat: 8 }
  },
  {
    id: '4',
    slug: 'beef-bourguignon',
    title: 'Beef Bourguignon',
    description: 'French beef stew in red wine sauce',
    prepTime: 30,
    cookTime: 180,
    totalTime: 210,
    yield: 8,
    cuisine: { name: 'French', slug: 'french' },
    category: { name: 'Dinner', slug: 'dinner' },
    imageUrl: 'https://images.unsplash.com/photo-1534939561126-855b8675edd7?w=800',
    ingredients: [
      { name: 'Beef chuck', quantity: 1000, unit: 'g' },
      { name: 'Red wine', quantity: 750, unit: 'ml' },
      { name: 'Pearl onions', quantity: 200, unit: 'g' },
      { name: 'Mushrooms', quantity: 300, unit: 'g' },
      { name: 'Bacon', quantity: 150, unit: 'g' }
    ],
    steps: [
      { stepNumber: 1, instruction: 'Brown beef and bacon in batches.', michelinNote: 'Don\'t overcrowd the pan for proper browning.' },
      { stepNumber: 2, instruction: 'Saute vegetables, add beef back with wine.', michelinNote: 'Use full-bodied red wine like Burgundy.' },
      { stepNumber: 3, instruction: 'Simmer covered for 3 hours until tender.', michelinNote: 'Low and slow is the key to melt-in-your-mouth beef.' }
    ],
    nutrition: { calories: 580, protein: 45, carbs: 12, fat: 38 }
  },
  {
    id: '5',
    slug: 'pad-thai',
    title: 'Pad Thai',
    description: 'Thai stir-fried noodles with shrimp',
    prepTime: 15,
    cookTime: 10,
    totalTime: 25,
    yield: 2,
    cuisine: { name: 'Chinese', slug: 'chinese' },
    category: { name: 'Dinner', slug: 'dinner' },
    imageUrl: 'https://images.unsplash.com/photo-1559314809-0d155014e29e?w=800',
    ingredients: [
      { name: 'Rice noodles', quantity: 200, unit: 'g' },
      { name: 'Shrimp', quantity: 150, unit: 'g' },
      { name: 'Eggs', quantity: 2, unit: 'pcs' },
      { name: 'Bean sprouts', quantity: 100, unit: 'g' },
      { name: 'Peanuts', quantity: 50, unit: 'g' }
    ],
    steps: [
      { stepNumber: 1, instruction: 'Soak rice noodles in warm water until soft.', michelinNote: 'Don\'t over-soak or they\'ll become mushy.' },
      { stepNumber: 2, instruction: 'Stir-fry shrimp and eggs in wok.', michelinNote: 'High heat is essential for authentic wok flavor.' },
      { stepNumber: 3, instruction: 'Add noodles and sauce, toss quickly.', michelinNote: 'Work fast to evenly coat noodles.' }
    ],
    nutrition: { calories: 520, protein: 28, carbs: 58, fat: 18 }
  },
  {
    id: '6',
    slug: 'margherita-pizza',
    title: 'Margherita Pizza',
    description: 'Classic Italian pizza with tomato, mozzarella, and basil',
    prepTime: 20,
    cookTime: 15,
    totalTime: 35,
    yield: 4,
    cuisine: { name: 'Italian', slug: 'italian' },
    category: { name: 'Dinner', slug: 'dinner' },
    imageUrl: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=800',
    ingredients: [
      { name: 'Pizza dough', quantity: 500, unit: 'g' },
      { name: 'San Marzano tomatoes', quantity: 400, unit: 'g' },
      { name: 'Fresh mozzarella', quantity: 250, unit: 'g' },
      { name: 'Fresh basil', quantity: 1, unit: 'bunch' },
      { name: 'Olive oil', quantity: 30, unit: 'ml' }
    ],
    steps: [
      { stepNumber: 1, instruction: 'Preheat oven to highest setting with pizza stone.', michelinNote: 'Hot oven is crucial for crispy crust.' },
      { stepNumber: 2, instruction: 'Stretch dough, add crushed tomatoes.', michelinNote: 'Don\'t overload with sauce.' },
      { stepNumber: 3, instruction: 'Bake 8-10 minutes, add mozzarella last 2 minutes.', michelinNote: 'Add basil after baking for fresh flavor.' }
    ],
    nutrition: { calories: 480, protein: 20, carbs: 52, fat: 22 }
  },
  {
    id: '7',
    slug: 'chocolate-lava-cake',
    title: 'Chocolate Lava Cake',
    description: 'Decadent chocolate cake with molten center',
    prepTime: 10,
    cookTime: 12,
    totalTime: 22,
    yield: 4,
    cuisine: { name: 'French', slug: 'french' },
    category: { name: 'Desserts', slug: 'desserts' },
    imageUrl: 'https://images.unsplash.com/photo-1624353365286-3f8d62daad51?w=800',
    ingredients: [
      { name: 'Dark chocolate', quantity: 150, unit: 'g' },
      { name: 'Butter', quantity: 100, unit: 'g' },
      { name: 'Eggs', quantity: 2, unit: 'pcs' },
      { name: 'Sugar', quantity: 100, unit: 'g' },
      { name: 'Flour', quantity: 50, unit: 'g' }
    ],
    steps: [
      { stepNumber: 1, instruction: 'Melt chocolate and butter together.', michelinNote: 'Don\'t overheat or chocolate will seize.' },
      { stepNumber: 2, instruction: 'Whisk eggs with sugar until pale.', michelinNote: 'Whisk vigorously for airy texture.' },
      { stepNumber: 3, instruction: 'Fold in flour, pour into ramekins.', michelinNote: 'Grease ramekins well to prevent sticking.' },
      { stepNumber: 4, instruction: 'Bake at 220C for exactly 12 minutes.', michelinNote: 'Center should still be jiggly when done.' }
    ],
    nutrition: { calories: 520, protein: 8, carbs: 42, fat: 36 }
  }
];

export const SAMPLE_CUISINES = [
  { id: '1', name: 'Italian', slug: 'italian' },
  { id: '2', name: 'Mexican', slug: 'mexican' },
  { id: '3', name: 'Japanese', slug: 'japanese' },
  { id: '4', name: 'French', slug: 'french' },
  { id: '5', name: 'Chinese', slug: 'chinese' },
  { id: '6', name: 'Indian', slug: 'indian' }
];

export const SAMPLE_CATEGORIES = [
  { id: '1', name: 'Dinner', slug: 'dinner' },
  { id: '2', name: 'Lunch', slug: 'lunch' },
  { id: '3', name: 'Breakfast', slug: 'breakfast' },
  { id: '4', name: 'Desserts', slug: 'desserts' }
];
