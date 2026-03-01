'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface Recipe {
  id: string;
  slug: string;
  title: string;
  description: string;
  prepTime: number;
  cookTime: number;
  imageUrl: string | null;
  cuisine: { name: string; slug: string };
  category: { name: string; slug: string };
}

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3002';

export default function HomePage() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [cuisines, setCuisines] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const [recipesRes, cuisinesRes] = await Promise.all([
          fetch(`${API_URL}/api/recipes`),
          fetch(`${API_URL}/api/cuisines`),
        ]);
        
        const recipesData = await recipesRes.json();
        const cuisinesData = await cuisinesRes.json();
        
        setRecipes(recipesData.slice(0, 6));
        setCuisines(cuisinesData);
      } catch (error) {
        console.error('Failed to fetch:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  return (
    <div className="recipe-container max-w-7xl mx-auto px-4 py-8">
      {/* Hero Section */}
      <section className="mb-12 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">
          Discover Your Next Favorite Recipe
        </h1>
        <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
          Explore thousands of original recipes with precise measurements, 
          portion scaling, and chef-quality techniques.
        </p>
        
        {/* Search Bar */}
        <div className="max-w-xl mx-auto">
          <form action="/search" method="GET" className="flex gap-2">
            <input
              type="text"
              name="q"
              placeholder="Search recipes, ingredients, cuisines..."
              className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
            <button
              type="submit"
              className="px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
            >
              Search
            </button>
          </form>
        </div>
      </section>

      {/* Featured Recipes */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6">Featured Recipes</h2>
        {loading ? (
          <p className="text-gray-500">Loading recipes...</p>
        ) : recipes.length === 0 ? (
          <div className="text-center py-12 bg-gray-50 rounded-lg">
            <p className="text-gray-500 mb-4">No recipes yet!</p>
            <Link href="/register" className="text-primary-600 hover:underline">
              Sign up to add recipes
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recipes.map((recipe) => (
              <RecipeCard key={recipe.id} recipe={recipe} />
            ))}
          </div>
        )}
      </section>

      {/* Browse by Cuisine */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6">Browse by Cuisine</h2>
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

      {/* Browse by Category */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6">Browse by Category</h2>
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

      {/* Features */}
      <section className="mb-12 bg-gray-50 rounded-2xl p-8">
        <h2 className="text-2xl font-bold mb-6 text-center">Why Recipe Database?</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="text-4xl mb-3">📐</div>
            <h3 className="font-semibold mb-2">Portion Scaling</h3>
            <p className="text-gray-600">Scale any recipe from 0.5x to 3x with automatic unit conversion</p>
          </div>
          <div className="text-center">
            <div className="text-4xl mb-3">👨‍🍳</div>
            <h3 className="font-semibold mb-2">Michelin Mode</h3>
            <p className="text-gray-600">Toggle professional chef techniques for any dish</p>
          </div>
          <div className="text-center">
            <div className="text-4xl mb-3">🔄</div>
            <h3 className="font-semibold mb-2">US/Metric</h3>
            <p className="text-gray-600">Switch between US and metric units instantly</p>
          </div>
        </div>
      </section>
    </div>
  );
}

function RecipeCard({ recipe }: { recipe: Recipe }) {
  const totalTime = recipe.prepTime + recipe.cookTime;
  
  return (
    <Link href={`/recipe/${recipe.slug}`} className="recipe-card group">
      <div className="relative h-48 bg-gray-200 flex items-center justify-center">
        {recipe.imageUrl ? (
          <img src={recipe.imageUrl} alt={recipe.title} className="w-full h-full object-cover" />
        ) : (
          <div className="text-6xl">🍽️</div>
        )}
      </div>
      <div className="recipe-card-content">
        <span className="text-sm text-primary-600 font-medium">{recipe.cuisine?.name || 'Recipe'}</span>
        <h3 className="font-semibold text-lg mt-1 group-hover:text-primary-600">{recipe.title}</h3>
        <div className="flex items-center justify-between mt-2 text-sm text-gray-500">
          <span>⏱️ {totalTime} min</span>
        </div>
      </div>
    </Link>
  );
}

function CuisineCard({ name, slug }: { name: string; slug: string }) {
  return (
    <Link 
      href={`/cuisine/${slug}`}
      className="block p-4 bg-white rounded-lg border border-gray-200 hover:border-primary-300 hover:shadow-md transition-all text-center"
    >
      <span className="font-medium text-gray-700">{name}</span>
    </Link>
  );
}

function CategoryCard({ name, slug, icon }: { name: string; slug: string; icon: string }) {
  return (
    <Link 
      href={`/category/${slug}`}
      className="block p-4 bg-white rounded-lg border border-gray-200 hover:border-primary-300 hover:shadow-md transition-all text-center"
    >
      <div className="text-2xl mb-1">{icon}</div>
      <span className="font-medium text-gray-700">{name}</span>
    </Link>
  );
}
