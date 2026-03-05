'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { searchRecipes, getRecipePhoto } from '@/lib/supabase';

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

function SearchContent() {
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
        const data = await searchRecipes(query);
        setRecipes(data || []);
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
      <h1 className="text-3xl font-bold mb-6 text-white">
        {query ? `Search results for "${query}"` : 'Search Recipes'}
      </h1>

      <form action="/search" method="GET" className="mb-8">
        <div className="flex gap-2">
          <input
            type="text"
            name="q"
            defaultValue={query}
            placeholder="Search recipes, ingredients, cuisines..."
            className="flex-1 px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
          />
          <button type="submit" className="px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700">
            Search
          </button>
        </div>
      </form>

      {loading ? (
        <p className="text-gray-400">Searching...</p>
      ) : recipes.length === 0 && query ? (
        <p className="text-gray-400">No recipes found for "{query}"</p>
      ) : recipes.length > 0 ? (
        <div className="space-y-4">
          {recipes.map((recipe) => (
            <Link 
              key={recipe.id} 
              href={`/recipe/${recipe.slug}`}
              className="flex gap-4 p-4 bg-gray-900 rounded-lg border border-gray-800 hover:border-primary-600"
            >
              <div className="w-32 h-24 bg-gray-800 rounded flex items-center justify-center flex-shrink-0 overflow-hidden">
                {recipe.imageUrl ? (
                  <Image
                    src={recipe.imageUrl}
                    alt={recipe.title}
                    fill
                    sizes="128px"
                    className="object-cover"
                  />
                ) : (
                  <Image
                    src={getRecipePhoto(recipe.slug)}
                    alt={recipe.title}
                    fill
                    sizes="128px"
                    className="object-cover"
                  />
                )}
              </div>
              <div>
                <h3 className="font-semibold text-lg text-white">{recipe.title}</h3>
                <p className="text-gray-400 text-sm">{recipe.description}</p>
                <div className="flex gap-4 mt-2 text-sm text-gray-500">
                  <span>⏱️ {recipe.prepTime + recipe.cookTime} min</span>
                  <span>{recipe.cuisine?.name}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <p className="text-gray-400">Enter a search term to find recipes.</p>
      )}
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-white">Loading...</div>}>
      <SearchContent />
    </Suspense>
  );
}
