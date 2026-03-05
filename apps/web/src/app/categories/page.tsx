'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { getCategories } from '@/lib/supabase';

interface Category {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  imageUrl: string | null;
}

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getCategories()
      .then(data => {
        setCategories(data || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const categoryImages: Record<string, string> = {
    breakfast: 'https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?w=400',
    lunch: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400',
    dinner: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400',
    desserts: 'https://images.unsplash.com/photo-1551024601-bec78aea704b?w=400',
    appetizers: 'https://images.unsplash.com/photo-1541014741259-de529411b96a?w=400',
    soups: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=400',
    salads: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400',
  };

  const defaultImage = 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400';

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-white mb-8">📂 Browse by Category</h1>

      {loading ? (
        <p className="text-gray-500">Loading...</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {categories.map((category) => (
            <Link 
              key={category.id} 
              href={`/category/${category.slug}`}
              className="bg-gray-900 rounded-xl overflow-hidden hover:ring-2 hover:ring-primary-500 transition-all"
            >
              <div className="h-32 bg-gray-800 relative overflow-hidden">
                <Image
                  src={categoryImages[category.slug] || defaultImage}
                  alt={category.name}
                  fill
                  sizes="(max-width: 768px) 50vw, 25vw"
                  className="object-cover"
                />
              </div>
              <div className="p-4">
                <h2 className="font-semibold text-lg text-white">{category.name}</h2>
                <p className="text-sm text-gray-500 mt-1 line-clamp-2">
                  {category.description || `Browse ${category.name} recipes`}
                </p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
