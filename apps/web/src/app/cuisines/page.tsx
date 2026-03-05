'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { getCuisines, getRecipes, API_BASE } from '@/lib/supabase';

interface Cuisine {
  id: string;
  name: string;
  slug: string;
  description?: string;
}

export default function CuisinesPage() {
  const [cuisines, setCuisines] = useState<Cuisine[]>([]);
  const [recipeCounts, setRecipeCounts] = useState<Record<string, number>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        // Fetch all cuisines
        const cuisinesData = await getCuisines();
        setCuisines(cuisinesData || []);
        
        // Fetch all recipes to count per cuisine
        const recipesData = await getRecipes();
        
        // Count recipes per cuisine
        const counts: Record<string, number> = {};
        (recipesData || []).forEach((recipe: any) => {
          if (recipe.cuisine?.slug) {
            counts[recipe.cuisine.slug] = (counts[recipe.cuisine.slug] || 0) + 1;
          }
        });
        setRecipeCounts(counts);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  // Default cuisines to show if database is empty
  const defaultCuisines = [
    { name: 'American', slug: 'american' },
    { name: 'Italian', slug: 'italian' },
    { name: 'Mexican', slug: 'mexican' },
    { name: 'Chinese', slug: 'chinese' },
    { name: 'Japanese', slug: 'japanese' },
    { name: 'Indian', slug: 'indian' },
    { name: 'French', slug: 'french' },
    { name: 'Thai', slug: 'thai' },
    { name: 'Mediterranean', slug: 'mediterranean' },
    { name: 'Korean', slug: 'korean' },
    { name: 'Vietnamese', slug: 'vietnamese' },
    { name: 'Greek', slug: 'greek' },
  ];

  // Merge database cuisines with defaults to ensure we have all types
  const allCuisines = [...cuisines];
  defaultCuisines.forEach(def => {
    if (!allCuisines.find(c => c.slug === def.slug)) {
      allCuisines.push({ id: def.slug, name: def.name, slug: def.slug });
    }
  });

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-6 text-white">Cuisines</h1>
      <p className="text-gray-400 mb-8">Explore recipes from around the world</p>

      {loading ? (
        <p className="text-gray-500">Loading...</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {allCuisines.map((cuisine) => (
            <Link 
              key={cuisine.id} 
              href={`/cuisine/${cuisine.slug}`}
              className="p-6 bg-gray-900 rounded-lg border border-gray-800 hover:border-primary-500 transition-all text-center"
            >
              <h2 className="text-xl font-semibold text-white">{cuisine.name}</h2>
              <p className="text-sm text-gray-500 mt-2">{recipeCounts[cuisine.slug] || 0} recipes</p>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
