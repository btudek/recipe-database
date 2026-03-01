import { Metadata } from 'next';
import { RecipeContent } from './RecipeContent';

interface Props {
  params: { slug: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  // In production, fetch recipe data
  const recipe = {
    title: 'Classic Chicken Parmesan',
    description: 'A crispy, golden chicken cutlet topped with marinara sauce and melted mozzarella cheese.',
    seoDescription: 'Learn how to make the best Chicken Parmesan at home with this easy recipe. Perfectly crispy chicken, rich marinara, and gooey cheese.',
    imageUrl: '/images/chicken-parmesan.jpg',
  };

  return {
    title: recipe.title,
    description: recipe.seoDescription,
    openGraph: {
      title: recipe.title,
      description: recipe.seoDescription,
      images: [recipe.imageUrl],
      type: 'article',
    },
  };
}

// JSON-LD for Recipe Schema
export function generateJsonLd(recipe: any) {
  return {
    '@context': 'https://schema.org/',
    '@type': 'Recipe',
    name: recipe.title,
    image: recipe.imageUrl,
    description: recipe.seoDescription,
    prepTime: `PT${recipe.prepTime}M`,
    cookTime: `PT${recipe.cookTime}M`,
    totalTime: `PT${recipe.prepTime + recipe.cookTime}M`,
    recipeYield: `${recipe.yield} servings`,
    recipeCategory: recipe.category?.name,
    recipeCuisine: recipe.cuisine?.name,
    recipeIngredient: recipe.ingredients?.map((i: any) => 
      `${i.quantity} ${i.unit} ${i.name}`
    ),
    recipeInstructions: recipe.steps?.map((s: any, idx: number) => ({
      '@type': 'HowToStep',
      position: idx + 1,
      text: s.instruction,
    })),
  };
}

export default function RecipePage({ params }: Props) {
  // In production, fetch from database
  const recipe = {
    slug: params.slug,
    title: 'Classic Chicken Parmesan',
    description: 'A crispy, golden chicken cutlet topped with marinara sauce and melted mozzarella cheese.',
    seoDescription: 'Learn how to make the best Chicken Parmesan at home with this easy recipe. Perfectly crispy chicken, rich marinara, and gooey cheese.',
    prepTime: 15,
    cookTime: 30,
    totalTime: 45,
    yield: 4,
    cuisine: { name: 'Italian', slug: 'italian' },
    category: { name: 'Dinner', slug: 'dinner' },
    imageUrl: '/images/chicken-parmesan.jpg',
    ingredients: [
      { name: 'chicken breast', quantity: 4, unit: 'piece', notes: 'butterflied' },
      { name: 'breadcrumbs', quantity: 200, unit: 'g' },
      { name: 'parmesan cheese', quantity: 50, unit: 'g', notes: 'grated' },
      { name: 'egg', quantity: 2, unit: 'piece' },
      { name: 'flour', quantity: 100, unit: 'g' },
      { name: 'marinara sauce', quantity: 400, unit: 'g' },
      { name: 'mozzarella', quantity: 150, unit: 'g', notes: 'sliced' },
      { name: 'olive oil', quantity: 30, unit: 'ml' },
      { name: 'garlic', quantity: 3, unit: 'clove' },
      { name: 'basil', quantity: 10, unit: 'g', notes: 'fresh' },
      { name: 'salt', quantity: 1, unit: 'tsp' },
      { name: 'pepper', quantity: 0.5, unit: 'tsp' },
    ],
    steps: [
      { stepNumber: 1, instruction: 'Preheat oven to 425°F (220°C). Season chicken with salt and pepper.', michelinNote: 'Season chicken 15 minutes ahead for even flavor distribution.' },
      { stepNumber: 2, instruction: 'Set up breading station: flour, beaten eggs, breadcrumbs mixed with parmesan.', michelinNote: 'Use one hand for wet, one for dry to prevent clumping.' },
      { stepNumber: 3, instruction: 'Dredge chicken in flour, then egg, then breadcrumbs. Press firmly.', michelinNote: 'For extra crunch, double-bread: egg, flour, egg, breadcrumbs.' },
      { stepNumber: 4, instruction: 'Heat olive oil in oven-safe skillet. Sear chicken 3 minutes per side until golden.', michelinNote: 'Don\'t move the chicken while searing. Flip only once.' },
      { stepNumber: 5, instruction: 'Top with marinara and mozzarella. Bake 15 minutes until cheese is melted and bubbly.', michelinNote: 'Finish under broiler for golden brown spots on cheese.' },
      { stepNumber: 6, instruction: 'Garnish with fresh basil. Let rest 5 minutes before serving.', michelinNote: 'Rest allows juices to redistribute. Tent with foil.' },
    ],
    proTips: 'For extra crispy coating, use panko breadcrumbs and toast them in a dry pan first.',
    storageInfo: 'Refrigerate leftovers up to 4 days. Reheat in 350°F oven for best texture.',
    nutrition: { calories: 450, protein: 35, carbs: 28, fat: 22 },
  };

  return <RecipeContent recipe={recipe} />;
}
