'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { getCuisines } from '@/lib/supabase';

export default function CuisinesPage() {
  const [cuisines, setCuisines] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getCuisines()
      .then(data => {
        setCuisines(data || []);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-6 text-white">Cuisines</h1>
      <p className="text-gray-400 mb-8">Explore recipes from around the world</p>

      {loading ? (
        <p className="text-gray-500">Loading...</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {cuisines.map((cuisine: any) => (
            <Link 
              key={cuisine.id} 
              href={`/cuisine/${cuisine.slug}`}
              className="p-6 bg-gray-900 rounded-lg border border-gray-800 hover:border-primary-500 transition-all text-center"
            >
              <h2 className="text-xl font-semibold text-white">{cuisine.name}</h2>
              <p className="text-sm text-gray-500 mt-2">{cuisine.recipes?.length || 0} recipes</p>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
