'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080';

export default function CuisinesPage() {
  const [cuisines, setCuisines] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_URL}/api/cuisines`)
      .then(res => res.json())
      .then(data => {
        setCuisines(data);
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
      <h1 className="text-4xl font-bold mb-6">Cuisines</h1>
      <p className="text-gray-600 mb-8">Explore recipes from around the world</p>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {cuisines.map(cuisine => (
          <Link 
            key={cuisine.id} 
            href={`/cuisine/${cuisine.slug}`}
            className="p-6 bg-white rounded-lg border hover:border-primary-300 hover:shadow-md transition-all text-center"
          >
            <h2 className="text-xl font-semibold">{cuisine.name}</h2>
            <p className="text-sm text-gray-500 mt-2">{cuisine._count?.recipes || 0} recipes</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
