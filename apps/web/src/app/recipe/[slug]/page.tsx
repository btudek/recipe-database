'use client';

import { useState, useEffect, useMemo } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { getRecipe, getRecipeScore } from '@/lib/supabase';

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
  healthScore?: number | null;
}

// Local storage helpers
function getFavorites(): string[] {
  if (typeof window === 'undefined') return [];
  return JSON.parse(localStorage.getItem('favorites') || '[]');
}

function addToFavorites(recipeId: string) {
  const favs = getFavorites();
  if (!favs.includes(recipeId)) {
    favs.push(recipeId);
    localStorage.setItem('favorites', JSON.stringify(favs));
  }
}

function removeFromFavorites(recipeId: string) {
  const favs = getFavorites().filter(id => id !== recipeId);
  localStorage.setItem('favorites', JSON.stringify(favs));
}

function isFavorite(recipeId: string): boolean {
  return getFavorites().includes(recipeId);
}

function getRecentlyViewed(): { id: string; title: string; slug: string; viewedAt: string }[] {
  if (typeof window === 'undefined') return [];
  return JSON.parse(localStorage.getItem('recentlyViewed') || '[]');
}

function addToRecentlyViewed(recipeId: string, recipeTitle: string, recipeSlug: string) {
  let recent = getRecentlyViewed().filter((r: any) => r.id !== recipeId);
  recent.unshift({ id: recipeId, title: recipeTitle, slug: recipeSlug, viewedAt: new Date().toISOString() });
  recent = recent.slice(0, 10); // Keep only 10
  localStorage.setItem('recentlyViewed', JSON.stringify(recent));
}

function getShoppingList(): any[] {
  if (typeof window === 'undefined') return [];
  return JSON.parse(localStorage.getItem('shoppingList') || '[]');
}

function addToShoppingList(recipe: Recipe, scaledIngredients: string[]) {
  const list = getShoppingList();
  const existingIndex = list.findIndex((item: any) => item.recipeId === recipe.id);
  
  if (existingIndex >= 0) {
    list[existingIndex].ingredients = scaledIngredients;
  } else {
    list.push({
      recipeId: recipe.id,
      recipeTitle: recipe.title,
      ingredients: scaledIngredients,
      addedAt: new Date().toISOString()
    });
  }
  
  localStorage.setItem('shoppingList', JSON.stringify(list));
}

function getRatings(): Record<string, number> {
  if (typeof window === 'undefined') return {};
  return JSON.parse(localStorage.getItem('ratings') || '{}');
}

function setRating(recipeId: string, value: number) {
  const ratings = getRatings();
  ratings[recipeId] = value;
  localStorage.setItem('ratings', JSON.stringify(ratings));
}

function getComments(): Record<string, any[]> {
  if (typeof window === 'undefined') return {};
  return JSON.parse(localStorage.getItem('comments') || '{}');
}

function addComment(recipeId: string, comment: any) {
  const allComments = getComments();
  if (!allComments[recipeId]) {
    allComments[recipeId] = [];
  }
  allComments[recipeId].unshift(comment);
  localStorage.setItem('comments', JSON.stringify(allComments));
}

function HealthScoreDisplay({ score }: { score: number }) {
  let colorClass = '';
  let label = '';
  let bgColor = '';
  
  if (score >= 75) {
    colorClass = 'text-green-400';
    bgColor = 'bg-green-900/30 border-green-700';
    label = 'Excellent';
  } else if (score >= 50) {
    colorClass = 'text-yellow-400';
    bgColor = 'bg-yellow-900/30 border-yellow-700';
    label = 'Good';
  } else if (score >= 25) {
    colorClass = 'text-orange-400';
    bgColor = 'bg-orange-900/30 border-orange-700';
    label = 'Fair';
  } else {
    colorClass = 'text-red-400';
    bgColor = 'bg-red-900/30 border-red-700';
    label = 'Poor';
  }
  
  return (
    <div className={`inline-flex items-center gap-3 px-4 py-2 rounded-lg border ${bgColor}`}>
      <span className="text-gray-400 text-sm">Health Impact Score:</span>
      <span className={`text-2xl font-bold ${colorClass}`}>{score}</span>
      <span className={`text-sm ${colorClass}`}>({label})</span>
    </div>
  );
}

export default function RecipePage() {
  const params = useParams();
  const slug = params?.slug as string;
  
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [loading, setLoading] = useState(true);
  const [servings, setServings] = useState(4);
  const [unitSystem, setUnitSystem] = useState<'us' | 'metric'>('us');
  const [michelinMode, setMichelinMode] = useState(false);
  const [isFav, setIsFav] = useState(false);
  const [addedToList, setAddedToList] = useState(false);
  const [userRating, setUserRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [comments, setComments] = useState<any[]>([]);
  const [newComment, setNewComment] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (!slug) return;
    
    getRecipe(slug)
      .then(async (data) => {
        if (!data) {
          setLoading(false);
          return null;
        }
        // Get health score for this recipe
        const score = await getRecipeScore(data.id);
        return { ...data, healthScore: score };
      })
      .then(dataWithScore => {
        if (!dataWithScore) {
          setLoading(false);
          return;
        }
        setRecipe(dataWithScore);
        setServings(dataWithScore.yield || 4);
        setIsFav(isFavorite(dataWithScore.id));
        setUserRating(getRatings()[dataWithScore.id] || 0);
        setComments(getComments()[dataWithScore.id] || []);
        
        // Add to recently viewed
        addToRecentlyViewed(dataWithScore.id, dataWithScore.title, dataWithScore.slug);
        
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, [slug]);

  const scaleFactor = servings / (recipe?.yield || 1);
  
  const scaledIngredients = useMemo(() => {
    if (!recipe?.ingredients) return [];
    return recipe.ingredients.map((ing) => {
      const scaled = (ing.quantity || 0) * scaleFactor;
      let displayQty: string;
      
      if (unitSystem === 'metric') {
        if (ing.unit === 'g' && scaled >= 1000) {
          displayQty = `${(scaled/1000).toFixed(2)}kg`;
        } else if (ing.unit === 'ml' && scaled >= 1000) {
          displayQty = `${(scaled/1000).toFixed(2)}L`;
        } else if (ing.unit === 'g') {
          displayQty = `${scaled.toFixed(0)}g`;
        } else if (ing.unit === 'ml') {
          displayQty = `${scaled.toFixed(0)}ml`;
        } else {
          displayQty = `${scaled.toFixed(1)} ${ing.unit || ''}`;
        }
      } else {
        if (ing.unit === 'g') {
          if (scaled >= 453) {
            displayQty = `${(scaled/453.6).toFixed(1)}lb`;
          } else {
            displayQty = `${(scaled/28.35).toFixed(0)}oz`;
          }
        } else if (ing.unit === 'ml') {
          if (scaled >= 236) {
            displayQty = `${(scaled/236.6).toFixed(1)}cup`;
          } else if (scaled >= 14.8) {
            displayQty = `${(scaled/14.8).toFixed(1)}tbsp`;
          } else {
            displayQty = `${(scaled/4.9).toFixed(1)}tsp`;
          }
        } else {
          displayQty = `${scaled.toFixed(1)} ${ing.unit || ''}`;
        }
      }
      
      return `${displayQty} ${ing.name || ''}${ing.notes ? ', ' + ing.notes : ''}`;
    });
  }, [recipe?.ingredients, scaleFactor, unitSystem]);

  const toggleFavorite = () => {
    if (!recipe) return;
    if (isFav) {
      removeFromFavorites(recipe.id);
    } else {
      addToFavorites(recipe.id);
    }
    setIsFav(!isFav);
  };

  const handleAddToShoppingList = () => {
    if (!recipe) return;
    addToShoppingList(recipe, scaledIngredients);
    setAddedToList(true);
    setTimeout(() => setAddedToList(false), 2000);
  };

  const handleRate = (rating: number) => {
    if (!recipe) return;
    setUserRating(rating);
    setRating(recipe.id, rating);
  };

  const handleAddComment = () => {
    if (!recipe || !newComment.trim()) return;
    const comment = {
      id: Date.now().toString(),
      author: 'Anonymous',
      content: newComment.trim(),
      date: new Date().toISOString()
    };
    addComment(recipe.id, comment);
    setComments([comment, ...comments]);
    setNewComment('');
  };

  const handlePrint = () => {
    window.print();
  };

  const handleShare = async () => {
    if (!recipe) return;
    const url = window.location.href;
    if (navigator.share) {
      try {
        await navigator.share({
          title: recipe.title,
          text: recipe.description,
          url: url,
        });
      } catch (err) {
        // User cancelled or error
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(url);
      alert('Link copied to clipboard!');
    }
  };

  if (loading) return <div className="p-8 text-center text-white">Loading...</div>;
  if (error) return <div className="p-8 text-center text-red-500">Error: {error}</div>;
  if (!recipe) return <div className="p-8 text-center text-white">Recipe not found</div>;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <nav className="text-sm text-gray-500 mb-4">
        <Link href="/" className="hover:text-primary-400">Home</Link>
        <span className="mx-2">›</span>
        <Link href={`/cuisine/${recipe.cuisine?.slug}`} className="hover:text-primary-400">{recipe.cuisine?.name}</Link>
        <span className="mx-2">›</span>
        <span className="text-gray-300">{recipe.title}</span>
      </nav>

      <div className="relative h-64 md:h-96 bg-gray-900 rounded-xl overflow-hidden mb-6">
        {recipe.imageUrl ? (
          <Image 
            src={recipe.imageUrl} 
            alt={recipe.title} 
            fill
            className="object-cover"
            priority
          />
        ) : (
          <div className="flex items-center justify-center h-full text-6xl">🍽️</div>
        )}
      </div>

      <div className="flex items-start justify-between mb-4">
        <h1 className={`text-3xl md:text-4xl font-bold ${michelinMode ? 'text-amber-400' : 'text-white'}`}>
          {recipe.title}
          {michelinMode && <span className="text-2xl ml-2">👨‍🍳</span>}
        </h1>
        <div className="flex gap-2">
          <button
            onClick={handlePrint}
            className="px-3 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700"
            title="Print recipe"
          >
            🖨️
          </button>
          <button
            onClick={handleShare}
            className="px-3 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700"
            title="Share recipe"
          >
            📤
          </button>
          <button
            onClick={toggleFavorite}
            className="text-3xl ml-2 hover:scale-110 transition-transform"
            title={isFav ? "Remove from favorites" : "Add to favorites"}
          >
            {isFav ? '❤️' : '🤍'}
          </button>
        </div>
      </div>
      
      <p className="text-gray-400 mb-4">{recipe.description}</p>

      {/* Health Score Badge */}
      {recipe.healthScore !== undefined && recipe.healthScore !== null && (
        <div className="mb-4">
          <HealthScoreDisplay score={recipe.healthScore} />
        </div>
      )}

      {/* Rating */}
      <div className="flex items-center gap-4 mb-4">
        <span className="text-gray-400">Rate this recipe:</span>
        <div className="flex gap-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              onClick={() => handleRate(star)}
              onMouseEnter={() => setHoverRating(star)}
              onMouseLeave={() => setHoverRating(0)}
              className="text-2xl hover:scale-125 transition-transform"
            >
              {star <= (hoverRating || userRating) ? '⭐' : '☆'}
            </button>
          ))}
          {userRating > 0 && <span className="text-gray-400 ml-2">({userRating}/5)</span>}
        </div>
      </div>

      <div className="flex flex-wrap gap-4 mb-6 text-sm">
        <span className="bg-gray-900 px-4 py-2 rounded-lg">⏱️ Prep: {recipe.prepTime} min</span>
        <span className="bg-gray-900 px-4 py-2 rounded-lg">🍳 Cook: {recipe.cookTime} min</span>
        <span className="bg-gray-900 px-4 py-2 rounded-lg">⏰ Total: {recipe.totalTime} min</span>
      </div>

      <div className="bg-gray-900 rounded-xl p-6 mb-8">
        <div className="flex flex-wrap gap-6 items-center">
          <div className="flex items-center gap-4">
            <span className="font-medium text-white">Servings:</span>
            <button onClick={() => setServings(Math.max(1, servings - 1))} className="w-8 h-8 bg-gray-800 border border-gray-700 rounded-full text-white">−</button>
            <span className="font-semibold text-white">{servings}</span>
            <button onClick={() => setServings(servings + 1)} className="w-8 h-8 bg-gray-800 border border-gray-700 rounded-full text-white">+</button>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-500 text-white">Units:</span>
            <button onClick={() => setUnitSystem('us')} className={`px-3 py-1 rounded ${unitSystem === 'us' ? 'bg-primary-600 text-white' : 'bg-gray-800 border border-gray-700 text-white'}`}>US</button>
            <button onClick={() => setUnitSystem('metric')} className={`px-3 py-1 rounded ${unitSystem === 'metric' ? 'bg-primary-600 text-white' : 'bg-gray-800 border border-gray-700 text-white'}`}>Metric</button>
          </div>
          <button
            onClick={() => setMichelinMode(!michelinMode)}
            className={`px-4 py-2 rounded-lg border ${michelinMode ? 'bg-amber-600 text-white border-amber-600' : 'bg-gray-800 border-gray-700 text-white'}`}
          >
            👨‍🍳 Michelin Mode
          </button>
          <button
            onClick={handleAddToShoppingList}
            className={`px-4 py-2 rounded-lg border ${addedToList ? 'bg-green-600 text-white border-green-600' : 'bg-gray-800 border-gray-700 text-white'}`}
          >
            {addedToList ? '✅ Added!' : '🛒 Add to List'}
          </button>
        </div>
      </div>

      <section className="mb-8">
        <h2 className="text-2xl font-bold text-white mb-4">Ingredients</h2>
        <ul className="space-y-2">
          {scaledIngredients.map((ing, i) => (
            <li key={i} className="flex justify-between py-2 border-b border-gray-800 text-gray-300">
              <span>{ing}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* Nutrition Info */}
      {recipe.nutrition && (
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-white mb-4">📊 Nutrition Facts</h2>
          <div className="bg-gray-900 rounded-xl p-6">
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-center">
              <div className="bg-gray-800 rounded-lg p-4">
                <div className="text-2xl font-bold text-white">{recipe.nutrition.calories || '—'}</div>
                <div className="text-sm text-gray-400">Calories</div>
              </div>
              <div className="bg-gray-800 rounded-lg p-4">
                <div className="text-2xl font-bold text-white">{recipe.nutrition.protein || '—'}g</div>
                <div className="text-sm text-gray-400">Protein</div>
              </div>
              <div className="bg-gray-800 rounded-lg p-4">
                <div className="text-2xl font-bold text-white">{recipe.nutrition.carbs || '—'}g</div>
                <div className="text-sm text-gray-400">Carbs</div>
              </div>
              <div className="bg-gray-800 rounded-lg p-4">
                <div className="text-2xl font-bold text-white">{recipe.nutrition.fat || '—'}g</div>
                <div className="text-sm text-gray-400">Fat</div>
              </div>
              <div className="bg-gray-800 rounded-lg p-4">
                <div className="text-2xl font-bold text-white">{servings}</div>
                <div className="text-sm text-gray-400">Servings</div>
              </div>
            </div>
            <p className="text-sm text-gray-500 mt-4 text-center">Per serving</p>
          </div>
        </section>
      )}

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

      {/* Comments Section */}
      <section className="mb-8">
        <h2 className="text-2xl font-bold text-white mb-4">💬 Comments ({comments.length})</h2>
        
        <div className="mb-6">
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Share your thoughts about this recipe..."
            className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500"
            rows={3}
          />
          <button
            onClick={handleAddComment}
            disabled={!newComment.trim()}
            className="mt-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Post Comment
          </button>
        </div>

        {comments.length === 0 ? (
          <p className="text-gray-500">No comments yet. Be the first to share your thoughts!</p>
        ) : (
          <div className="space-y-4">
            {comments.map((comment) => (
              <div key={comment.id} className="bg-gray-900 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium text-white">{comment.author}</span>
                  <span className="text-sm text-gray-500">
                    {new Date(comment.date).toLocaleDateString()}
                  </span>
                </div>
                <p className="text-gray-300">{comment.content}</p>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
