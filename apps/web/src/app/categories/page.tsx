'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { getRecipes } from '@/lib/supabase';

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

const RECIPE_PHOTOS: Record<string, string> = {
  'spaghetti-carbonara': 'https://images.unsplash.com/photo-1612874742237-6526221588e3?w=800',
  'chicken-tacos': 'https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?w=800',
  'sushi-rolls': 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=800',
  'beef-bourguignon': 'https://images.unsplash.com/photo-1534939561126-855b8675edd7?w=800',
  'pad-thai': 'https://images.unsplash.com/photo-1559314809-0d155014e29e?w=800',
  'margherita-pizza': 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=800',
  'chocolate-lava-cake': 'https://images.unsplash.com/photo-1624353365286-3f8d62daad51?w=800',
};

export default function CategoriesPage() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getRecipes()
      .then(data => {
        setRecipes(data || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const categories = [
    { name: 'All', slug: 'all' },
    { name: 'Breakfast', slug: 'breakfast' },
    { name: 'Lunch', slug: 'lunch' },
    { name: 'Dinner', slug: 'dinner' },
    { name: 'Desserts', slug: 'desserts' },
    { name: 'Appetizers', slug: 'appetizers' },
    { name: 'Soups', slug: 'soups' },
    { name: 'Salads', slug: 'salads' },
  ];

  const filteredRecipes = selectedCategory === 'all' 
    ? recipes 
    : recipes.filter(r => r.category?.slug === selectedCategory);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-white mb-8">📂 Browse by Category</h1>

      {/* Category Filter */}
      <div className="flex flex-wrap gap-2 mb-8">
        {categories.map(cat => (
          <button
            key={cat.slug}
            onClick={() => setSelectedCategory(cat.slug)}
            className={`px-4 py-2 rounded-lg transition-colors ${
              selectedCategory === cat.slug
                ? 'bg-primary-600 text-white'
                : 'bg-gray-900 text-gray-300 hover:bg-gray-800'
            }`}
          >
            {cat.name}
          </button>
        ))}
      </div>

      {/* Recipe Count */}
      <p className="text-gray-400 mb-4">{filteredRecipes.length} recipes found</p>

      {/* Recipes Grid */}
      {loading ? (
        <p className="text-gray-500">Loading...</p>
      ) : filteredRecipes.length === 0 ? (
        <p className="text-gray-500">No recipes in this category yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRecipes.map((recipe) => (
            <Link 
              key={recipe.id} 
              href={`/recipe/${recipe.slug}`}
              className="bg-gray-900 rounded-xl overflow-hidden hover:ring-2 hover:ring-primary-500 transition-all"
            >
              <div className="h-48 bg-gray-800 relative overflow-hidden">
                {recipe.imageUrl || RECIPE_PHOTOS[recipe.slug] ? (
                  <img 
                    src={recipe.imageUrl || RECIPE_PHOTOS[recipe.slug]} 
                    alt={recipe.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="flex items-center justify-center h-full text-5xl">🍽️</div>
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
          ))}
        </div>
      )}
    </div>
  );
}
