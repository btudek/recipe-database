'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080';

export default function ProfilePage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [savedRecipes, setSavedRecipes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (!storedUser) {
      router.push('/login');
      return;
    }
    
    const userData = JSON.parse(storedUser);
    setUser(userData);
    
    // Fetch saved recipes
    const token = localStorage.getItem('token');
    fetch(`${API_URL}/api/users/saved`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(res => res.json())
      .then(data => {
        setSavedRecipes(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    router.push('/');
  };

  if (!user) return <div className="p-8 text-center">Loading...</div>;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Profile Header */}
      <div className="bg-white rounded-lg border p-6 mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">{user.username}</h1>
            <p className="text-gray-500">{user.email}</p>
          </div>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Saved Recipes */}
      <section>
        <h2 className="text-xl font-bold mb-4">Saved Recipes</h2>
        
        {loading ? (
          <p className="text-gray-500">Loading...</p>
        ) : savedRecipes.length === 0 ? (
          <div className="text-center py-8 bg-gray-50 rounded-lg">
            <p className="text-gray-500 mb-4">No saved recipes yet.</p>
            <Link href="/" className="text-primary-600 hover:underline">Browse recipes</Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {savedRecipes.map((item: any) => (
              <Link 
                key={item.id} 
                href={`/recipe/${item.recipe?.slug}`}
                className="flex gap-4 p-4 bg-white rounded-lg border hover:border-primary-300"
              >
                <div className="w-24 h-20 bg-gray-200 rounded flex items-center justify-center flex-shrink-0">
                  <span className="text-2xl">🍽️</span>
                </div>
                <div>
                  <h3 className="font-semibold">{item.recipe?.title}</h3>
                  <p className="text-sm text-gray-500">{item.recipe?.cuisine?.name}</p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
