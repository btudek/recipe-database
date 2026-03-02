'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

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

export default function CategoryPage() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  useEffect(() => {
    fetch(`${API_URL}/api/recipes`)
      .then(res => res.json())
      .then(data => {
        // Show all recipes for now - in production filter by category
        setRecipes(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="p-8 text-center">Loading...</div>;

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-6">All Recipes</h1>

      <div className="flex justify-between items-center mb-6">
        <span className="text-gray-500">{recipes.length} recipes</span>
        <div className="flex gap-2">
          <button onClick={() => setViewMode('grid')} className={`px-3 py-1 rounded ${viewMode === 'grid' ? 'bg-primary-600 text-white' : 'bg-gray-200'}`}>Grid</button>
          <button onClick={() => setViewMode('list')} className={`px-3 py-1 rounded ${viewMode === 'list' ? 'bg-primary-600 text-white' : 'bg-gray-200'}`}>List</button>
        </div>
      </div>

      {recipes.length === 0 ? (
        <p className="text-gray-500">No recipes yet.</p>
      ) : viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {recipes.map(recipe => (
            <Link key={recipe.id} href={`/recipe/${recipe.slug}`} className="recipe-card group">
              <div className="h-48 bg-gray-200 flex items-center justify-center">
                <span className="text-6xl">🍽️</span>
              </div>
              <div className="p-4">
                <span className="text-sm text-primary-600 font-medium">{recipe.cuisine?.name}</span>
                <h3 className="font-semibold text-lg mt-1">{recipe.title}</h3>
                <p className="text-sm text-gray-500 mt-2">⏱️ {recipe.prepTime + recipe.cookTime} min</p>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {recipes.map(recipe => (
            <Link key={recipe.id} href={`/recipe/${recipe.slug}`} className="flex gap-4 p-4 bg-white rounded-lg border hover:border-primary-300">
              <div className="w-32 h-24 bg-gray-200 rounded flex items-center justify-center flex-shrink-0">
                <span className="text-3xl">🍽️</span>
              </div>
              <div>
                <h3 className="font-semibold text-lg">{recipe.title}</h3>
                <p className="text-gray-600 text-sm">{recipe.description}</p>
                <span className="text-sm text-gray-500">⏱️ {recipe.prepTime + recipe.cookTime} min</span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
