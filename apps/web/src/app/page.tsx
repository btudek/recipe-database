'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { getRecipes, getCuisines, getRecipeScores } from '@/lib/supabase';

interface Recipe {
  id: string;
  slug: string;
  title: string;
  description: string;
  prepTime: number;
  cookTime: number;
  imageUrl: string | null;
  cuisine: { name: string; slug: string };
  healthScore?: number;
}

export default function HomePage() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [cuisines, setCuisines] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const [recipesData, cuisinesData] = await Promise.all([
          getRecipes(),
          getCuisines(),
        ]);
        
        // Get health scores for recipes
        const recipeIds = (recipesData || []).map((r: any) => r.id);
        const scores = await getRecipeScores(recipeIds);
        
        // Attach scores to recipes
        const recipesWithScores = (recipesData || []).map((r: any) => ({
          ...r,
          healthScore: scores[r.id] || null
        }));
        
        setRecipes(recipesWithScores.slice(0, 6));
        setCuisines(cuisinesData || []);
      } catch (error) {
        console.error('Failed to fetch:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Hero */}
      <section className="mb-12 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">
          Discover Your Next Favorite Recipe
        </h1>
        <p className="text-lg text-gray-400 mb-8 max-w-2xl mx-auto">
          Explore thousands of original recipes with precise measurements, 
          portion scaling, and chef-quality techniques.
        </p>
        
        <form action="/search" method="GET" className="max-w-xl mx-auto flex gap-2">
          <input
            type="text"
            name="q"
            placeholder="Search recipes, ingredients, cuisines..."
            className="flex-1 px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
          />
          <button type="submit" className="px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700">
            Search
          </button>
        </form>
      </section>

      {/* Recipes */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6 text-white">Featured Recipes</h2>
        {loading ? (
          <p className="text-gray-500">Loading recipes...</p>
        ) : recipes.length === 0 ? (
          <p className="text-gray-500">No recipes yet!</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recipes.map((recipe) => (
              <RecipeCard key={recipe.id} recipe={recipe} />
            ))}
          </div>
        )}
      </section>

      {/* Cuisines */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6 text-white">Browse by Cuisine</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {cuisines.map((cuisine) => (
            <CuisineCard key={cuisine.id} name={cuisine.name} slug={cuisine.slug} />
          ))}
          <CuisineCard name="Italian" slug="italian" />
          <CuisineCard name="Mexican" slug="mexican" />
          <CuisineCard name="Chinese" slug="chinese" />
          <CuisineCard name="Japanese" slug="japanese" />
          <CuisineCard name="Indian" slug="indian" />
          <CuisineCard name="French" slug="french" />
        </div>
      </section>

      {/* Categories */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6 text-white">Browse by Category</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <CategoryCard name="Breakfast" slug="breakfast" icon="🍳" />
          <CategoryCard name="Lunch" slug="lunch" icon="🥗" />
          <CategoryCard name="Dinner" slug="dinner" icon="🍝" />
          <CategoryCard name="Desserts" slug="desserts" icon="🍰" />
          <CategoryCard name="Appetizers" slug="appetizers" icon="🥟" />
          <CategoryCard name="Soups" slug="soups" icon="🥣" />
          <CategoryCard name="Salads" slug="salads" icon="🥬" />
          <CategoryCard name="Baking" slug="baking" icon="🍞" />
        </div>
      </section>
    </div>
  );
}

function RecipeCard({ recipe }: { recipe: Recipe }) {
  return (
    <Link href={`/recipe/${recipe.slug}`} className="bg-gray-900 rounded-lg overflow-hidden hover:ring-2 hover:ring-primary-500 transition-all">
      <div className="h-48 bg-gray-800 flex items-center justify-center overflow-hidden relative">
        {recipe.imageUrl ? (
          <Image 
            src={recipe.imageUrl} 
            alt={recipe.title} 
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover"
            loading="lazy"
          />
        ) : (
          <span className="text-6xl">🍽️</span>
        )}
        {recipe.healthScore !== undefined && recipe.healthScore !== null && (
          <HealthScoreBadge score={recipe.healthScore} />
        )}
      </div>
      <div className="p-4">
        <span className="text-sm text-primary-400 font-medium">{recipe.cuisine?.name}</span>
        <h3 className="font-semibold text-lg mt-1 text-white">{recipe.title}</h3>
        <div className="flex items-center mt-2 text-sm text-gray-500">
          <span>⏱️ {recipe.prepTime + recipe.cookTime} min</span>
        </div>
      </div>
    </Link>
  );
}

function HealthScoreBadge({ score }: { score: number }) {
  let colorClass = '';
  let label = '';
  
  if (score >= 75) {
    colorClass = 'bg-green-600';
    label = 'Excellent';
  } else if (score >= 50) {
    colorClass = 'bg-yellow-500';
    label = 'Good';
  } else if (score >= 25) {
    colorClass = 'bg-orange-500';
    label = 'Fair';
  } else {
    colorClass = 'bg-red-600';
    label = 'Poor';
  }
  
  return (
    <div 
      className={`absolute top-2 right-2 ${colorClass} text-white text-xs font-bold px-2 py-1 rounded-full shadow-lg`}
      title={`Health Score: ${score}/100 (${label})`}
    >
      {score}
    </div>
  );
}

function CuisineCard({ name, slug }: { name: string; slug: string }) {
  return (
    <Link href={`/cuisine/${slug}`} className="block p-4 bg-gray-900 rounded-lg border border-gray-800 hover:border-primary-500 text-center">
      <span className="font-medium text-gray-300">{name}</span>
    </Link>
  );
}

function CategoryCard({ name, slug, icon }: { name: string; slug: string; icon: string }) {
  return (
    <Link href={`/category/${slug}`} className="block p-4 bg-gray-900 rounded-lg border border-gray-800 hover:border-primary-500 text-center">
      <div className="text-2xl mb-1">{icon}</div>
      <span className="font-medium text-gray-300">{name}</span>
    </Link>
  );
}
