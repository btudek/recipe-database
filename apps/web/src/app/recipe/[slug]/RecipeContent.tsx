'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { AdUnit } from '@/components/AdUnit';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080';

interface Ingredient {
  name: string;
  quantity: number;
  unit: string;
  notes?: string;
}

interface Step {
  stepNumber: number;
  instruction: string;
  michelinNote?: string;
}

interface Recipe {
  id: string;
  slug: string;
  title: string;
  description: string;
  seoDescription: string;
  prepTime: number;
  cookTime: number;
  totalTime: number;
  yield: number;
  cuisine: { name: string; slug: string };
  category: { name: string; slug: string };
  imageUrl: string | null;
  ingredients: Ingredient[];
  steps: Step[];
  proTips?: string;
  storageInfo?: string;
  nutrition?: { calories: number; protein: number; carbs: number; fat: number };
}

export default function RecipePage({ recipe }: { recipe: Recipe }) {
  const [servings, setServings] = useState(recipe.yield);
  const [unitSystem, setUnitSystem] = useState<'us' | 'metric'>('us');
  const [michelinMode, setMichelinMode] = useState(false);
  const [saved, setSaved] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [rating, setRating] = useState(0);
  const [comments, setComments] = useState<any[]>([]);
  const [newComment, setNewComment] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) setUser(JSON.parse(storedUser));
    
    // Load saved state from localStorage
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    if (favorites.includes(recipe.id)) {
      setSaved(true);
    }
    
    fetchComments();
  }, [recipe.id]);

  const fetchComments = async () => {
    try {
      const res = await fetch(`${API_URL}/api/recipes/${recipe.id}/comments`);
      const data = await res.json();
      setComments(data);
    } catch (e) { console.error(e); }
  };

  const handleSave = async () => {
    // Toggle saved state and persist to localStorage
    const newSavedState = !saved;
    setSaved(newSavedState);
    
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    let newFavorites;
    if (newSavedState) {
      newFavorites = [...favorites, recipe.id];
    } else {
      newFavorites = favorites.filter((id: string) => id !== recipe.id);
    }
    localStorage.setItem('favorites', JSON.stringify(newFavorites));
    
    // Optionally sync with API if user is logged in
    if (user) {
      try {
        const token = localStorage.getItem('token');
        await fetch(`${API_URL}/api/recipes/${recipe.id}/save`, {
          method: 'POST',
          headers: { Authorization: `Bearer ${token}` },
        });
      } catch (e) { console.error(e); }
    }
  };

  const handleRate = async (value: number) => {
    if (!user) {
      alert('Please login to rate');
      return;
    }
    try {
      const token = localStorage.getItem('token');
      await fetch(`${API_URL}/api/recipes/${recipe.id}/rate`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ value }),
      });
      setRating(value);
    } catch (e) { console.error(e); }
  };

  const handleComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      alert('Please login to comment');
      return;
    }
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`${API_URL}/api/recipes/${recipe.id}/comments`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ content: newComment }),
      });
      const comment = await res.json();
      setComments([comment, ...comments]);
      setNewComment('');
    } catch (e) { console.error(e); }
  };

  const scaleFactor = servings / recipe.yield;
  
  const scaledIngredients = recipe.ingredients.map(ing => {
    const scaled = ing.quantity * scaleFactor;
    return `${scaled.toFixed(1)} ${ing.unit} ${ing.name}${ing.notes ? `, ${ing.notes}` : ''}`;
  });

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Print-only header */}
      <div className="print-header" style={{ display: 'none' }}>
        <h1>{recipe.title}</h1>
        <p className="site-name">Recipe Database</p>
      </div>
      {/* Breadcrumb */}
      <nav className="text-sm text-gray-500 mb-4">
        <Link href="/" className="hover:text-primary-600">Home</Link>
        <span className="mx-2">›</span>
        <Link href={`/cuisine/${recipe.cuisine.slug}`} className="hover:text-primary-600">{recipe.cuisine.name}</Link>
        <span className="mx-2">›</span>
        <span className="text-gray-700">{recipe.title}</span>
      </nav>

      {/* Title */}
      <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{recipe.title}</h1>
      
      {/* Description */}
      <p className="text-gray-600 mb-4">{recipe.description}</p>

      {/* Times & Save */}
      <div className="flex flex-wrap gap-4 mb-6 text-sm">
        <span className="bg-gray-100 px-4 py-2 rounded-lg">⏱️ Prep: {recipe.prepTime} min</span>
        <span className="bg-gray-100 px-4 py-2 rounded-lg">🍳 Cook: {recipe.cookTime} min</span>
        <span className="bg-gray-100 px-4 py-2 rounded-lg">⏰ Total: {recipe.totalTime} min</span>
        <button
          onClick={handleSave}
          className={`px-4 py-2 rounded-lg ${saved ? 'bg-green-500 text-white' : 'bg-gray-100 hover:bg-gray-200'}`}
        >
          {saved ? '✓ Saved' : '♡ Save'}
        </button>
        <button
          onClick={() => window.print()}
          className="bg-gray-100 px-4 py-2 rounded-lg hover:bg-gray-200"
        >
          🖨️ Print
        </button>
      </div>

      {/* Rating */}
      <div className="mb-6">
        <span className="text-sm text-gray-500 mr-2">Rate this recipe:</span>
        {[1,2,3,4,5].map(v => (
          <button key={v} onClick={() => handleRate(v)} className="text-2xl mr-1">
            {v <= rating ? '⭐' : '☆'}
          </button>
        ))}
      </div>

      {/* Controls */}
      <div className="bg-gray-50 rounded-xl p-6 mb-8">
        <div className="flex flex-wrap gap-6 items-center">
          <div className="flex items-center gap-4">
            <span className="font-medium">Servings:</span>
            <button onClick={() => setServings(Math.max(1, servings - 1))} className="w-8 h-8 bg-white border rounded-full">−</button>
            <span className="font-semibold">{servings}</span>
            <button onClick={() => setServings(servings + 1)} className="w-8 h-8 bg-white border rounded-full">+</button>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-500">Units:</span>
            <button onClick={() => setUnitSystem('us')} className={`px-3 py-1 rounded ${unitSystem === 'us' ? 'bg-primary-600 text-white' : 'bg-white border'}`}>US</button>
            <button onClick={() => setUnitSystem('metric')} className={`px-3 py-1 rounded ${unitSystem === 'metric' ? 'bg-primary-600 text-white' : 'bg-white border'}`}>Metric</button>
          </div>
          <button
            onClick={() => setMichelinMode(!michelinMode)}
            className={`px-4 py-2 rounded-lg border ${michelinMode ? 'bg-amber-500 text-white border-amber-500' : 'bg-white border-gray-300'}`}
          >
            👨‍🍳 Michelin Mode
          </button>
        </div>
      </div>

      {/* Ingredients */}
      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Ingredients</h2>
        <ul className="space-y-2">
          {scaledIngredients.map((ing, i) => (
            <li key={i} className="flex justify-between py-2 border-b border-gray-100">
              <span>{ing}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* Ad after ingredients */}
      <AdUnit slot="4582969457" />

      {/* Instructions */}
      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Instructions</h2>
        <ol className="space-y-6">
          {recipe.steps.map(step => (
            <li key={step.stepNumber} className="flex gap-4 pb-4 border-b border-gray-100">
              <span className="flex-shrink-0 w-8 h-8 bg-primary-600 text-white rounded-full flex items-center justify-center font-bold">
                {step.stepNumber}
              </span>
              <div>
                <p className="text-gray-800">{step.instruction}</p>
                {michelinMode && step.michelinNote && (
                  <div className="mt-2 p-3 bg-amber-50 border border-amber-200 rounded-lg">
                    <span className="text-amber-700 font-medium text-sm">👨‍🍳 Chef's Note: </span>
                    <span className="text-amber-800 text-sm">{step.michelinNote}</span>
                  </div>
                )}
              </div>
            </li>
          ))}
        </ol>
      </section>

      {/* Ad after instructions */}
      <AdUnit slot="4582969457" />

      {/* Pro Tips */}
      {recipe.proTips && (
        <section className="mb-8 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <h3 className="font-semibold text-blue-900 mb-2">💡 Pro Tips</h3>
          <p className="text-blue-800">{recipe.proTips}</p>
        </section>
      )}

      {/* Storage */}
      {recipe.storageInfo && (
        <section className="mb-8 p-4 bg-gray-100 rounded-lg">
          <h3 className="font-semibold text-gray-700 mb-2">📦 Storage & Reheating</h3>
          <p className="text-gray-600">{recipe.storageInfo}</p>
        </section>
      )}

      {/* Nutrition */}
      {recipe.nutrition && (
        <section className="mb-8">
          <h3 className="font-semibold text-gray-700 mb-3">Nutrition per serving</h3>
          <div className="grid grid-cols-4 gap-4 text-center">
            <div className="bg-gray-100 rounded-lg p-3">
              <div className="text-2xl font-bold">{recipe.nutrition.calories}</div>
              <div className="text-xs text-gray-500">Calories</div>
            </div>
            <div className="bg-gray-100 rounded-lg p-3">
              <div className="text-2xl font-bold">{recipe.nutrition.protein}g</div>
              <div className="text-xs text-gray-500">Protein</div>
            </div>
            <div className="bg-gray-100 rounded-lg p-3">
              <div className="text-2xl font-bold">{recipe.nutrition.carbs}g</div>
              <div className="text-xs text-gray-500">Carbs</div>
            </div>
            <div className="bg-gray-100 rounded-lg p-3">
              <div className="text-2xl font-bold">{recipe.nutrition.fat}g</div>
              <div className="text-xs text-gray-500">Fat</div>
            </div>
          </div>
        </section>
      )}

      {/* Comments Section */}
      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Comments ({comments.length})</h2>
        
        {/* Add Comment */}
        {user ? (
          <form onSubmit={handleComment} className="mb-6">
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Write a comment..."
              className="w-full p-3 border rounded-lg mb-2"
              rows={3}
              required
            />
            <button type="submit" className="px-4 py-2 bg-primary-600 text-white rounded-lg">
              Post Comment
            </button>
          </form>
        ) : (
          <p className="mb-4 text-gray-500"><Link href="/login" className="text-primary-600">Login</Link> to post a comment</p>
        )}

        {/* Comments List */}
        <div className="space-y-4">
          {comments.map(comment => (
            <div key={comment.id} className="p-4 bg-gray-50 rounded-lg">
              <div className="font-medium">{comment.user?.username || 'Anonymous'}</div>
              <p className="text-gray-700">{comment.content}</p>
            </div>
          ))}
          {comments.length === 0 && <p className="text-gray-500">No comments yet. Be the first!</p>}
        </div>
      </section>
    </div>
  );
}
