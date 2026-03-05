'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export function Header() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    try {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    } catch (e) {
      console.error('Error loading user:', e);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    window.location.href = '/';
  };

  return (
    <header className="bg-gray-900 border-b border-gray-800 sticky top-0 z-50 no-print">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl">🍳</span>
            <span className="font-bold text-xl text-white">Recipe Database</span>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/recipes" className="text-gray-300 hover:text-white">
              All Recipes
            </Link>
            <Link href="/cuisines" className="text-gray-300 hover:text-white">
              Cuisines
            </Link>
            <Link href="/categories" className="text-gray-300 hover:text-white">
              Categories
            </Link>
            <Link href="/recently-viewed" className="text-gray-300 hover:text-white">
              🕐 Recent
            </Link>
            <Link href="/favorites" className="text-gray-300 hover:text-white">
              ❤️ Favorites
            </Link>
            <Link href="/shopping-list" className="text-gray-300 hover:text-white">
              🛒 List
            </Link>
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-4">
            <Link 
              href="/search"
              className="p-2 text-gray-400 hover:text-white"
              aria-label="Search"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </Link>
            
            {user ? (
              <div className="flex items-center gap-3">
                <Link href="/profile" className="text-sm text-gray-300 hover:text-white">
                  Hi, {user.username}
                </Link>
                <button
                  onClick={handleLogout}
                  className="text-sm text-gray-400 hover:text-white"
                >
                  Logout
                </button>
              </div>
            ) : (
              <>
                <Link 
                  href="/login"
                  className="text-sm text-gray-300 hover:text-white"
                >
                  Sign In
                </Link>
                <Link 
                  href="/register"
                  className="px-4 py-2 bg-primary-600 text-white text-sm rounded-lg hover:bg-primary-700 transition-colors"
                >
                  Get Started
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
