'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080';

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

interface CuisineData {
  cuisine: { name: string; description: string };
  recipes: Recipe[];
}

export default function CuisinePage() {
  const params = useParams();
  const [data, setData] = useState<CuisineData | null>(null);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  useEffect(() => {
    async function fetchCuisine() {
      try {
        const res = await fetch(`${API_URL}/api/cuisine/${params.slug}`);
        const data = await res.json();
        setData(data);
      } catch (error) {
        console.error('Failed to fetch:', error);
      } finally {
        setLoading(false);
      }
    }
    if (params.slug) {
      fetchCuisine();
    }
  }, [params.slug]);

  if (loading) return <div className="p-8 text-center">Loading...</div>;
  if (!data) return <div className="p-8 text-center">Cuisine not found</div>;

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-2">{data.cuisine.name} Recipes</h1>
      <p className="text-gray-600 mb-6">{data.cuisine.description}</p>

      {/* View Toggle */}
      <div className="flex justify-between items-center mb-6">
        <span className="text-gray-500">{data.recipes.length} recipes</span>
        <div className="flex gap-2">
          <button
            onClick={() => setViewMode('grid')}
            className={`px-3 py-1 rounded ${viewMode === 'grid' ? 'bg-primary-600 text-white' : 'bg-gray-200'}`}
          >
            Grid
          </button>
          <button
            onClick={() => setViewMode('list')}
            className={`px-3 py-1 rounded ${viewMode === 'list' ? 'bg-primary-600 text-white' : 'bg-gray-200'}`}
          >
            List
          </button>
        </div>
      </div>

      {/* Recipe Grid/List */}
      {data.recipes.length === 0 ? (
        <p className="text-gray-500">No recipes yet in this cuisine.</p>
      ) : viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.recipes.map((recipe) => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {data.recipes.map((recipe) => (
            <RecipeListItem key={recipe.id} recipe={recipe} />
          ))}
        </div>
      )}
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
        <span className="text-sm text-primary-600 font-medium">{recipe.cuisine.name}</span>
        <h3 className="font-semibold text-lg mt-1 group-hover:text-primary-600">{recipe.title}</h3>
        <div className="flex items-center justify-between mt-2 text-sm text-gray-500">
          <span>⏱️ {totalTime} min</span>
        </div>
      </div>
    </Link>
  );
}

function RecipeListItem({ recipe }: { recipe: Recipe }) {
  const totalTime = recipe.prepTime + recipe.cookTime;
  
  return (
    <Link href={`/recipe/${recipe.slug}`} className="flex gap-4 p-4 bg-white rounded-lg border hover:border-primary-300 transition-colors">
      <div className="w-32 h-24 bg-gray-200 rounded flex items-center justify-center flex-shrink-0">
        {recipe.imageUrl ? (
          <img src={recipe.imageUrl} alt={recipe.title} className="w-full h-full object-cover rounded" />
        ) : (
          <span className="text-3xl">🍽️</span>
        )}
      </div>
      <div>
        <h3 className="font-semibold text-lg">{recipe.title}</h3>
        <p className="text-gray-600 text-sm line-clamp-2">{recipe.description}</p>
        <div className="flex gap-4 mt-2 text-sm text-gray-500">
          <span>⏱️ {totalTime} min</span>
          <span>{recipe.cuisine.name}</span>
        </div>
      </div>
    </Link>
  );
}
