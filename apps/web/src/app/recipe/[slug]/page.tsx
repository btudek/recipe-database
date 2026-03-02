'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';

// Load AdSense
if (typeof window !== 'undefined') {
  try {
    (window as any).adsbygoogle = (window as any).adsbygoogle || [];
  } catch (e) {}
}

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

export default function RecipePage() {
  const params = useParams();
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [loading, setLoading] = useState(true);
  const [servings, setServings] = useState(4);
  const [unitSystem, setUnitSystem] = useState<'us' | 'metric'>('us');
  const [michelinMode, setMichelinMode] = useState(false);
  const [saved, setSaved] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [rating, setRating] = useState(0);
  const [comments, setComments] = useState<any[]>([]);
  const [newComment, setNewComment] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    console.log('Fetching recipe:', params.slug);
    console.log('API URL:', API_URL);
    
    const storedUser = localStorage.getItem('user');
    if (storedUser) setUser(JSON.parse(storedUser));
    
    fetch(`${API_URL}/api/recipes/${params.slug}`)
      .then(res => {
        console.log('Response status:', res.status);
        return res.json();
      })
      .then(data => {
        console.log('Recipe data:', data);
        setRecipe(data);
        setServings(data?.yield || 4);
        setLoading(false);
        if (data?.id) {
          fetchComments(data.id);
        }
      })
      .catch(err => {
        console.error('Fetch error:', err);
        setError(err.message);
        setLoading(false);
      });
  }, [params.slug]);

  const fetchComments = async (recipeId: string) => {
    try {
      const res = await fetch(`${API_URL}/api/recipes/${recipeId}/comments`);
      const data = await res.json();
      setComments(data);
    } catch (e) { console.error(e); }
  };

  const handleSave = async () => {
    if (!user) {
      alert('Please login to save recipes');
      return;
    }
    try {
      const token = localStorage.getItem('token');
      await fetch(`${API_URL}/api/recipes/${recipe?.id}/save`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
      });
      setSaved(!saved);
    } catch (e) { console.error(e); }
  };

  const handleRate = async (value: number) => {
    if (!user) {
      alert('Please login to rate');
      return;
    }
    try {
      const token = localStorage.getItem('token');
      await fetch(`${API_URL}/api/recipes/${recipe?.id}/rate`, {
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
      const res = await fetch(`${API_URL}/api/recipes/${recipe?.id}/comments`, {
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

  if (loading) return <div className="p-8 text-center">Loading...</div>;
  if (error) return <div className="p-8 text-center text-red-500">Error: {error}</div>;
  if (!recipe) return <div className="p-8 text-center">Recipe not found</div>;

  const scaleFactor = servings / (recipe?.yield || 1);
  
  // Simple unit conversion
  const convertUnit = (qty: number, unit: string, toMetric: boolean) => {
    if (toMetric) {
      if (unit === 'oz') return `${(qty * 28.35).toFixed(0)}g`;
      if (unit === 'lb') return `${(qty * 453.6).toFixed(0)}g`;
      if (unit === 'cup') return `${(qty * 236.6).toFixed(0)}ml`;
      if (unit === 'tbsp') return `${(qty * 14.8).toFixed(1)}ml`;
      if (unit === 'tsp') return `${(qty * 4.9).toFixed(1)}ml`;
      if (unit === 'fl oz') return `${(qty * 29.6).toFixed(0)}ml`;
    } else {
      if (unit === 'g' && qty >= 1000) return `${(qty/1000).toFixed(2)}kg`;
      if (unit === 'g') return `${qty.toFixed(0)}g`;
      if (unit === 'ml' && qty >= 236) return `${(qty/236.6).toFixed(1)}cup`;
      if (unit === 'ml') return `${qty.toFixed(0)}ml`;
    }
    return `${qty.toFixed(1)} ${unit}`;
  };
  
  const scaledIngredients = (recipe?.ingredients || []).map((ing: Ingredient) => {
    const scaled = (ing.quantity || 0) * scaleFactor;
    const displayQty = unitSystem === 'metric' 
      ? convertUnit(scaled, ing.unit || '', true)
      : `${scaled.toFixed(1)} ${ing.unit || ''}`;
    return `${displayQty} ${ing.name || ''}${ing.notes ? `, ${ing.notes}` : ''}`;
  });

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <nav className="text-sm text-gray-500 mb-4">
        <Link href="/" className="hover:text-primary-400">Home</Link>
        <span className="mx-2">›</span>
        <Link href={`/cuisine/${recipe.cuisine.slug}`} className="hover:text-primary-400">{recipe.cuisine.name}</Link>
        <span className="mx-2">›</span>
        <span className="text-gray-300">{recipe.title}</span>
      </nav>

      {/* Title */}
      <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">{recipe.title}</h1>
      
      {/* Description */}
      <p className="text-gray-400 mb-4">{recipe.description}</p>

      {/* Times & Save */}
      <div className="flex flex-wrap gap-4 mb-6 text-sm">
        <span className="bg-gray-900 px-4 py-2 rounded-lg">⏱️ Prep: {recipe.prepTime} min</span>
        <span className="bg-gray-900 px-4 py-2 rounded-lg">🍳 Cook: {recipe.cookTime} min</span>
        <span className="bg-gray-900 px-4 py-2 rounded-lg">⏰ Total: {recipe.totalTime} min</span>
        <button
          onClick={handleSave}
          className={`px-4 py-2 rounded-lg ${saved ? 'bg-green-600 text-white' : 'bg-gray-900 hover:bg-gray-800'}`}
        >
          {saved ? '✓ Saved' : '♡ Save'}
        </button>
        <button
          onClick={() => window.print()}
          className="bg-gray-900 px-4 py-2 rounded-lg hover:bg-gray-800"
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
      <div className="bg-gray-900 rounded-xl p-6 mb-8">
        <div className="flex flex-wrap gap-6 items-center">
          <div className="flex items-center gap-4">
            <span className="font-medium">Servings:</span>
            <button onClick={() => setServings(Math.max(1, servings - 1))} className="w-8 h-8 bg-gray-800 border border-gray-700 rounded-full">−</button>
            <span className="font-semibold">{servings}</span>
            <button onClick={() => setServings(servings + 1)} className="w-8 h-8 bg-gray-800 border border-gray-700 rounded-full">+</button>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-500">Units:</span>
            <button onClick={() => setUnitSystem('us')} className={`px-3 py-1 rounded ${unitSystem === 'us' ? 'bg-primary-600 text-white' : 'bg-gray-800 border border-gray-700'}`}>US</button>
            <button onClick={() => setUnitSystem('metric')} className={`px-3 py-1 rounded ${unitSystem === 'metric' ? 'bg-primary-600 text-white' : 'bg-gray-800 border border-gray-700'}`}>Metric</button>
          </div>
          <button
            onClick={() => setMichelinMode(!michelinMode)}
            className={`px-4 py-2 rounded-lg border ${michelinMode ? 'bg-amber-600 text-white border-amber-600' : 'bg-gray-800 border-gray-700'}`}
          >
            👨‍🍳 Michelin Mode
          </button>
        </div>
      </div>

      {/* Ingredients */}
      <section className="mb-8">
        <h2 className="text-2xl font-bold text-white mb-4">Ingredients</h2>
        <ul className="space-y-2">
          {scaledIngredients.map((ing, i) => (
            <li key={i} className="flex justify-between py-2 border-b border-gray-800">
              <span>{ing}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* Ad placeholder */}
      <div className="my-8 bg-gray-900 py-4 flex items-center justify-center">
        <ins className="adsbygoogle" style={{ display: 'block' }} data-ad-client="ca-pub-1794557219157944" data-ad-slot="YOUR_AD_SLOT_ID" data-ad-format="auto"></ins>
      </div>

      {/* Instructions */}
      <section className="mb-8">
        <h2 className="text-2xl font-bold text-white mb-4">Instructions</h2>
        <ol className="space-y-6">
          {(recipe.steps || []).map((step: Step) => (
            <li key={step.stepNumber} className="flex gap-4 pb-4 border-b border-gray-800">
              <span className="flex-shrink-0 w-8 h-8 bg-primary-600 text-white rounded-full flex items-center justify-center font-bold">
                {step.stepNumber}
              </span>
              <div>
                <p className="text-gray-300">{step.instruction}</p>
                {michelinMode && step.michelinNote && (
                  <div className="mt-2 p-3 bg-amber-900/30 border border-amber-700 rounded-lg">
                    <span className="text-amber-400 font-medium text-sm">👨‍🍳 Chef's Note: </span>
                    <span className="text-amber-300 text-sm">{step.michelinNote}</span>
                  </div>
                )}
              </div>
            </li>
          ))}
        </ol>
      </section>

      {/* Pro Tips */}
      {recipe.proTips && (
        <section className="mb-8 p-4 bg-blue-900/30 border border-blue-700 rounded-lg">
          <h3 className="font-semibold text-blue-400 mb-2">💡 Pro Tips</h3>
          <p className="text-blue-300">{recipe.proTips}</p>
        </section>
      )}

      {/* Storage */}
      {recipe.storageInfo && (
        <section className="mb-8 p-4 bg-gray-900 rounded-lg">
          <h3 className="font-semibold text-gray-300 mb-2">📦 Storage & Reheating</h3>
          <p className="text-gray-400">{recipe.storageInfo}</p>
        </section>
      )}

      {/* Nutrition */}
      {recipe.nutrition && (
        <section className="mb-8">
          <h3 className="font-semibold text-gray-300 mb-3">Nutrition per serving</h3>
          <div className="grid grid-cols-4 gap-4 text-center">
            <div className="bg-gray-900 rounded-lg p-3">
              <div className="text-2xl font-bold text-white">{recipe.nutrition.calories}</div>
              <div className="text-xs text-gray-500">Calories</div>
            </div>
            <div className="bg-gray-900 rounded-lg p-3">
              <div className="text-2xl font-bold text-white">{recipe.nutrition.protein}g</div>
              <div className="text-xs text-gray-500">Protein</div>
            </div>
            <div className="bg-gray-900 rounded-lg p-3">
              <div className="text-2xl font-bold text-white">{recipe.nutrition.carbs}g</div>
              <div className="text-xs text-gray-500">Carbs</div>
            </div>
            <div className="bg-gray-900 rounded-lg p-3">
              <div className="text-2xl font-bold text-white">{recipe.nutrition.fat}g</div>
              <div className="text-xs text-gray-500">Fat</div>
            </div>
          </div>
        </section>
      )}

      {/* Comments Section */}
      <section className="mb-8">
        <h2 className="text-2xl font-bold text-white mb-4">Comments ({comments.length})</h2>
        
        {/* Add Comment */}
        {user ? (
          <form onSubmit={handleComment} className="mb-6">
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Write a comment..."
              className="w-full p-3 bg-gray-900 border border-gray-700 rounded-lg mb-2 text-white"
              rows={3}
              required
            />
            <button type="submit" className="px-4 py-2 bg-primary-600 text-white rounded-lg">
              Post Comment
            </button>
          </form>
        ) : (
          <p className="mb-4 text-gray-500"><Link href="/login" className="text-primary-400">Login</Link> to post a comment</p>
        )}

        {/* Comments List */}
        <div className="space-y-4">
          {comments.map(comment => (
            <div key={comment.id} className="p-4 bg-gray-900 rounded-lg">
              <div className="font-medium text-white">{comment.user?.username || 'Anonymous'}</div>
              <p className="text-gray-400">{comment.content}</p>
            </div>
          ))}
          {comments.length === 0 && <p className="text-gray-500">No comments yet. Be the first!</p>}
        </div>
      </section>
    </div>
  );
}
