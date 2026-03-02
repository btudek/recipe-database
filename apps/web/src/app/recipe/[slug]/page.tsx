'use client';

import { useState, useEffect, useMemo } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { getRecipe } from '@/lib/supabase';

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
}

export default function RecipePage() {
  const params = useParams();
  const slug = params?.slug as string;
  
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [loading, setLoading] = useState(true);
  const [servings, setServings] = useState(4);
  const [unitSystem, setUnitSystem] = useState<'us' | 'metric'>('us');
  const [michelinMode, setMichelinMode] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!slug) return;
    
    getRecipe(slug)
      .then(data => {
        setRecipe(data);
        setServings(data?.yield || 4);
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

      <h1 className={`text-3xl md:text-4xl font-bold mb-4 ${michelinMode ? 'text-amber-400' : 'text-white'}`}>
        {recipe.title}
        {michelinMode && <span className="text-2xl ml-2">👨‍🍳</span>}
      </h1>
      
      <p className="text-gray-400 mb-4">{recipe.description}</p>

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
    </div>
  );
}
