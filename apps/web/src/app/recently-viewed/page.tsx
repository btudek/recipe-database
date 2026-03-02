'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface RecentlyViewedItem {
  id: string;
  title: string;
  slug: string;
  viewedAt: string;
}

export default function RecentlyViewedPage() {
  const [recentlyViewed, setRecentlyViewed] = useState<RecentlyViewedItem[]>([]);

  useEffect(() => {
    const recent = JSON.parse(localStorage.getItem('recentlyViewed') || '[]');
    setRecentlyViewed(recent);
  }, []);

  const clearHistory = () => {
    localStorage.removeItem('recentlyViewed');
    setRecentlyViewed([]);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-white">🕐 Recently Viewed</h1>
        {recentlyViewed.length > 0 && (
          <button
            onClick={clearHistory}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
          >
            Clear History
          </button>
        )}
      </div>

      {recentlyViewed.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-4xl mb-4">🕐</p>
          <p className="text-gray-400 mb-4">No recently viewed recipes</p>
          <Link href="/" className="text-primary-400 hover:underline">
            Browse recipes to get started
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {recentlyViewed.map((item, index) => (
            <Link
              key={index}
              href={`/recipe/${item.slug}`}
              className="flex items-center justify-between bg-gray-900 rounded-lg p-4 hover:bg-gray-800 transition-colors"
            >
              <div>
                <h3 className="font-semibold text-white">{item.title}</h3>
                <p className="text-sm text-gray-500">
                  Viewed {new Date(item.viewedAt).toLocaleDateString()}
                </p>
              </div>
              <span className="text-gray-500">→</span>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
