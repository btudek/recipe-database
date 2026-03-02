'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function ProfilePage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [favorites, setFavorites] = useState<any[]>([]);
  const [ratings, setRatings] = useState<Record<string, number>>({});
  const [comments, setComments] = useState<Record<string, any[]>>({});
  const [shoppingLists, setShoppingLists] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (!storedUser) {
      router.push('/login');
      return;
    }
    
    const userData = JSON.parse(storedUser);
    setUser(userData);
    
    // Load local data
    const favs = JSON.parse(localStorage.getItem('favorites') || '[]');
    const rats = JSON.parse(localStorage.getItem('ratings') || '{}');
    const comms = JSON.parse(localStorage.getItem('comments') || '{}');
    const shop = JSON.parse(localStorage.getItem('shoppingList') || '[]');
    
    setFavorites(favs);
    setRatings(rats);
    setComments(comms);
    setShoppingLists(shop);
    setLoading(false);
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    router.push('/');
  };

  const clearFavorites = () => {
    localStorage.removeItem('favorites');
    setFavorites([]);
  };

  const clearRatings = () => {
    localStorage.removeItem('ratings');
    setRatings({});
  };

  const clearComments = () => {
    localStorage.removeItem('comments');
    setComments({});
  };

  const clearShoppingList = () => {
    localStorage.removeItem('shoppingList');
    setShoppingLists([]);
  };

  if (!user) return <div className="p-8 text-center text-white">Loading...</div>;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Profile Header */}
      <div className="bg-gray-900 rounded-xl p-6 mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-white">Welcome, {user.username}!</h1>
            <p className="text-gray-400">{user.email}</p>
          </div>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-gray-900 rounded-lg p-4 text-center">
          <div className="text-3xl mb-1">❤️</div>
          <div className="text-2xl font-bold text-white">{favorites.length}</div>
          <div className="text-sm text-gray-400">Favorites</div>
        </div>
        <div className="bg-gray-900 rounded-lg p-4 text-center">
          <div className="text-3xl mb-1">⭐</div>
          <div className="text-2xl font-bold text-white">{Object.keys(ratings).length}</div>
          <div className="text-sm text-gray-400">Ratings</div>
        </div>
        <div className="bg-gray-900 rounded-lg p-4 text-center">
          <div className="text-3xl mb-1">💬</div>
          <div className="text-2xl font-bold text-white">
            {Object.values(comments).flat().length}
          </div>
          <div className="text-sm text-gray-400">Comments</div>
        </div>
        <div className="bg-gray-900 rounded-lg p-4 text-center">
          <div className="text-3xl mb-1">🛒</div>
          <div className="text-2xl font-bold text-white">{shoppingLists.length}</div>
          <div className="text-sm text-gray-400">Shopping Lists</div>
        </div>
      </div>

      {/* Favorites */}
      <section className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-white">❤️ Favorite Recipes</h2>
          {favorites.length > 0 && (
            <button onClick={clearFavorites} className="text-sm text-red-400 hover:text-red-300">
              Clear All
            </button>
          )}
        </div>
        
        {favorites.length === 0 ? (
          <div className="text-center py-8 bg-gray-900 rounded-lg">
            <p className="text-gray-400 mb-4">No favorites yet.</p>
            <Link href="/" className="text-primary-400 hover:underline">Browse recipes</Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {favorites.map((recipeId: string) => (
              <div key={recipeId} className="bg-gray-900 rounded-lg p-4">
                <span className="text-gray-400">Recipe ID: {recipeId}</span>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* My Ratings */}
      <section className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-white">⭐ My Ratings</h2>
          {Object.keys(ratings).length > 0 && (
            <button onClick={clearRatings} className="text-sm text-red-400 hover:text-red-300">
              Clear All
            </button>
          )}
        </div>
        
        {Object.keys(ratings).length === 0 ? (
          <div className="text-center py-8 bg-gray-900 rounded-lg">
            <p className="text-gray-400">No ratings yet.</p>
          </div>
        ) : (
          <div className="space-y-2">
            {Object.entries(ratings).map(([recipeId, rating]) => (
              <div key={recipeId} className="bg-gray-900 rounded-lg p-4 flex items-center justify-between">
                <span className="text-gray-400">Recipe ID: {recipeId}</span>
                <div className="flex">
                  {[1,2,3,4,5].map(star => (
                    <span key={star} className={star <= rating ? 'text-yellow-400' : 'text-gray-600'}>
                      ⭐
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Recent Comments */}
      <section className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-white">💬 Recent Comments</h2>
          {Object.values(comments).flat().length > 0 && (
            <button onClick={clearComments} className="text-sm text-red-400 hover:text-red-300">
              Clear All
            </button>
          )}
        </div>
        
        {Object.values(comments).flat().length === 0 ? (
          <div className="text-center py-8 bg-gray-900 rounded-lg">
            <p className="text-gray-400">No comments yet.</p>
          </div>
        ) : (
          <div className="space-y-2">
            {Object.entries(comments).flat().map((comment: any, idx) => (
              <div key={idx} className="bg-gray-900 rounded-lg p-4">
                <p className="text-gray-300">{comment.content}</p>
                <p className="text-sm text-gray-500 mt-2">
                  {new Date(comment.date).toLocaleDateString()}
                </p>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Shopping List */}
      <section className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-white">🛒 Shopping List</h2>
          {shoppingLists.length > 0 && (
            <button onClick={clearShoppingList} className="text-sm text-red-400 hover:text-red-300">
              Clear All
            </button>
          )}
        </div>
        
        {shoppingLists.length === 0 ? (
          <div className="text-center py-8 bg-gray-900 rounded-lg">
            <p className="text-gray-400 mb-4">Your shopping list is empty.</p>
            <Link href="/" className="text-primary-400 hover:underline">Browse recipes</Link>
          </div>
        ) : (
          <Link href="/shopping-list" className="block bg-gray-900 rounded-lg p-4 text-center hover:bg-gray-800">
            <span className="text-primary-400">View Shopping List →</span>
          </Link>
        )}
      </section>
    </div>
  );
}
