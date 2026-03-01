'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

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
}

export default function SearchPage() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || '';
  
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function search() {
      if (!query.trim()) {
        setRecipes([]);
        return;
      }
      
      setLoading(true);
      try {
        const res = await fetch(`${API_URL}/api/search?q=${encodeURIComponent(query)}`);
        const data = await res.json();
        setRecipes(data);
      } catch (error) {
        console.error('Search failed:', error);
      } finally {
        setLoading(false);
      }
    }
    
    search();
  }, [query]);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">
        {query ? `Search results for "${query}"` : 'Search Recipes'}
      </h1>

      {/* Search Form */}
      <form action="/search" method="GET" className="mb-8">
        <div className="flex gap-2">
          <input
            type="text"
            name="q"
            defaultValue={query}
            placeholder="Search recipes, ingredients, cuisines..."
            className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
          />
          <button
            type="submit"
            className="px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
          >
            Search
          </button>
        </div>
      </form>

      {/* Results */}
      {loading ? (
        <p className="text-gray-500">Searching...</p>
      ) : recipes.length === 0 && query ? (
        <p className="text-gray-500">No recipes found for "{query}"</p>
      ) : recipes.length > 0 ? (
        <div className="space-y-4">
          {recipes.map((recipe) => (
            <Link 
              key={recipe.id} 
              href={`/recipe/${recipe.slug}`}
              className="flex gap-4 p-4 bg-white rounded-lg border hover:border-primary-300 transition-colors"
            >
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
                  <span>⏱️ {recipe.prepTime + recipe.cookTime} min</span>
                  <span>{recipe.cuisine.name}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <p className="text-gray-500">Enter a search term to find recipes.</p>
      )}
    </div>
  );
}
