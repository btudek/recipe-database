'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { getRecipe } from '@/lib/supabase';
import { getRecipePhoto as getPhoto } from '@/lib/photos';

interface RecipePreview {
  id: string;
  slug: string;
  title: string;
  description: string;
  imageUrl: string | null;
  cuisine: { name: string; slug: string };
  cookTime: number;
}

export default function FavoritesPage() {
  const [favoriteIds, setFavoriteIds] = useState<string[]>([]);
  const [recipes, setRecipes] = useState<RecipePreview[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const favs = JSON.parse(localStorage.getItem('favorites') || '[]');
    setFavoriteIds(favs);
    
    // Load recipe previews for favorites
    fetch('/api/recipes')
      .then(res => res.json())
      .then(data => {
        const favoriteRecipes = (data.recipes || []).filter((r: RecipePreview) => favs.includes(r.id));
        setRecipes(favoriteRecipes);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const removeFavorite = (recipeId: string) => {
    const newFavs = favoriteIds.filter(id => id !== recipeId);
    localStorage.setItem('favorites', JSON.stringify(newFavs));
    setFavoriteIds(newFavs);
    setRecipes(recipes.filter(r => r.id !== recipeId));
  };

  if (loading) {
    return <div className="p-8 text-center text-white">Loading...</div>;
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-white mb-8">❤️ My Favorite Recipes</h1>

      {recipes.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-4xl mb-4">❤️</p>
          <p className="text-gray-400 mb-4">You haven&apos;t saved any favorites yet</p>
          <Link href="/" className="text-primary-400 hover:underline">
            Browse recipes to add favorites
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {recipes.map((recipe) => (
            <div key={recipe.id} className="bg-gray-900 rounded-xl overflow-hidden">
              <Link href={`/recipe/${recipe.slug}`}>
                <div className="relative h-48 bg-gray-800">
                  {recipe.slug ? (
                    <Image
                      src={getPhoto(recipe.slug)}
                      alt={recipe.title}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <Image
                      src={getPhoto(recipe.slug)}
                      alt={recipe.title}
                      fill
                      className="object-cover"
                    />
                  )}
                </div>
              </Link>
              <div className="p-4">
                <div className="flex items-start justify-between">
                  <Link href={`/recipe/${recipe.slug}`}>
                    <h2 className="text-lg font-bold text-white hover:text-primary-400">
                      {recipe.title}
                    </h2>
                  </Link>
                  <button
                    onClick={() => removeFavorite(recipe.id)}
                    className="text-red-500 hover:text-red-400 ml-2"
                    title="Remove from favorites"
                  >
                    ❤️
                  </button>
                </div>
                <p className="text-gray-400 text-sm mt-1 line-clamp-2">
                  {recipe.description}
                </p>
                <div className="flex items-center gap-4 mt-3 text-sm text-gray-500">
                  <Link 
                    href={`/cuisine/${recipe.cuisine?.slug}`}
                    className="hover:text-primary-400"
                  >
                    {recipe.cuisine?.name}
                  </Link>
                  <span>🍳 {recipe.cookTime} min</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
