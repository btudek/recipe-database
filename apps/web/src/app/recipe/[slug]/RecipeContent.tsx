'use client';

import { useState, useMemo } from 'react';
import { scaleIngredient, UnitSystem, SCALE_FACTORS } from 'shared';

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
  title: string;
  description: string;
  seoDescription: string;
  prepTime: number;
  cookTime: number;
  totalTime: number;
  yield: number;
  cuisine: { name: string; slug: string };
  category: { name: string; slug: string };
  imageUrl: string;
  ingredients: Ingredient[];
  steps: Step[];
  proTips?: string;
  storageInfo?: string;
  nutrition?: { calories: number; protein: number; carbs: number; fat: number };
}

export function RecipeContent({ recipe }: { recipe: Recipe }) {
  const [servings, setServings] = useState(recipe.yield);
  const [unitSystem, setUnitSystem] = useState<UnitSystem>('us');
  const [michelinMode, setMichelinMode] = useState(false);
  const [showPrint, setShowPrint] = useState(false);

  // Calculate scale factor
  const scaleFactor = servings / recipe.yield;

  // Scale ingredients
  const scaledIngredients = useMemo(() => {
    return recipe.ingredients.map(ing => {
      const scaled = scaleIngredient(ing, {
        factor: scaleFactor,
        system: unitSystem,
        originalYield: recipe.yield,
        targetYield: servings,
      });
      return {
        ...scaled,
        display: `${scaled.displayQuantity} ${scaled.displayUnit} ${scaled.name}${scaled.notes ? `, ${scaled.notes}` : ''}`.trim(),
      };
    });
  }, [recipe.ingredients, scaleFactor, servings, unitSystem, recipe.yield]);

  const handlePrint = () => {
    setShowPrint(true);
    setTimeout(() => {
      window.print();
      setShowPrint(false);
    }, 100);
  };

  return (
    <div className="recipe-container max-w-4xl mx-auto px-4 py-8">
      {/* Print-only JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org/',
            '@type': 'Recipe',
            name: recipe.title,
            image: recipe.imageUrl,
            description: recipe.seoDescription,
            prepTime: `PT${recipe.prepTime}M`,
            cookTime: `PT${recipe.cookTime}M`,
            totalTime: `PT${recipe.totalTime}M`,
            recipeYield: `${recipe.yield} servings`,
            recipeIngredient: recipe.ingredients.map(i => `${i.quantity} ${i.unit} ${i.name}`),
            recipeInstructions: recipe.steps.map(s => ({
              '@type': 'HowToStep',
              position: s.stepNumber,
              text: s.instruction,
            })),
          }),
        }}
      />

      {/* Breadcrumb */}
      <nav className="text-sm text-gray-500 mb-4 no-print">
        <a href="/" className="hover:text-primary-600">Home</a>
        <span className="mx-2">›</span>
        <a href={`/cuisine/${recipe.cuisine.slug}`} className="hover:text-primary-600">{recipe.cuisine.name}</a>
        <span className="mx-2">›</span>
        <span className="text-gray-700">{recipe.title}</span>
      </nav>

      {/* Title */}
      <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{recipe.title}</h1>
      
      {/* Description */}
      <p className="text-gray-600 mb-6">{recipe.description}</p>

      {/* Time & Yield */}
      <div className="flex flex-wrap gap-4 mb-8 text-sm no-print">
        <div className="flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-lg">
          <span className="text-gray-500">⏱️</span>
          <span><strong>Prep:</strong> {recipe.prepTime} min</span>
        </div>
        <div className="flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-lg">
          <span className="text-gray-500">🍳</span>
          <span><strong>Cook:</strong> {recipe.cookTime} min</span>
        </div>
        <div className="flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-lg">
          <span className="text-gray-500">⏰</span>
          <span><strong>Total:</strong> {recipe.totalTime} min</span>
        </div>
        <button
          onClick={handlePrint}
          className="flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors"
        >
          <span>🖨️</span>
          <span>Print</span>
        </button>
      </div>

      {/* Controls - No Print */}
      <div className="bg-gray-50 rounded-xl p-6 mb-8 no-print">
        <div className="flex flex-wrap gap-6 items-center justify-between">
          {/* Servings */}
          <div className="flex items-center gap-4">
            <span className="font-medium">Servings:</span>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setServings(Math.max(1, servings - 1))}
                className="w-8 h-8 rounded-full bg-white border border-gray-300 hover:bg-gray-100 flex items-center justify-center"
              >
                −
              </button>
              <span className="w-12 text-center font-semibold">{servings}</span>
              <button
                onClick={() => setServings(servings + 1)}
                className="w-8 h-8 rounded-full bg-white border border-gray-300 hover:bg-gray-100 flex items-center justify-center"
              >
                +
              </button>
            </div>
          </div>

          {/* Quick Servings */}
          <div className="flex gap-2">
            {SCALE_FACTORS.map(factor => (
              <button
                key={factor}
                onClick={() => setServings(recipe.yield * factor)}
                className={`px-3 py-1 rounded-lg text-sm ${
                  servings === recipe.yield * factor
                    ? 'bg-primary-600 text-white'
                    : 'bg-white border border-gray-300 hover:bg-gray-100'
                }`}
              >
                {factor}x
              </button>
            ))}
          </div>

          {/* Unit Toggle */}
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-500">Units:</span>
            <div className="flex bg-white rounded-lg border border-gray-300 overflow-hidden">
              <button
                onClick={() => setUnitSystem('us')}
                className={`px-3 py-1 text-sm ${unitSystem === 'us' ? 'bg-primary-600 text-white' : 'hover:bg-gray-100'}`}
              >
                US
              </button>
              <button
                onClick={() => setUnitSystem('metric')}
                className={`px-3 py-1 text-sm ${unitSystem === 'metric' ? 'bg-primary-600 text-white' : 'hover:bg-gray-100'}`}
              >
                Metric
              </button>
            </div>
          </div>

          {/* Michelin Mode */}
          <button
            onClick={() => setMichelinMode(!michelinMode)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg border ${
              michelinMode 
                ? 'bg-amber-500 text-white border-amber-500' 
                : 'bg-white border-gray-300 hover:bg-gray-100'
            }`}
          >
            <span>👨‍🍳</span>
            <span className="text-sm font-medium">Michelin Mode</span>
          </button>
        </div>
      </div>

      {/* Ingredients */}
      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Ingredients</h2>
        <ul className="space-y-2">
          {scaledIngredients.map((ing, idx) => (
            <li key={idx} className="recipe-ingredient">
              <span>{ing.display}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* Instructions */}
      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Instructions</h2>
        <ol className="space-y-6">
          {recipe.steps.map(step => (
            <li key={step.stepNumber} className="recipe-step">
              <div className="flex gap-4">
                <span className="flex-shrink-0 w-8 h-8 bg-primary-600 text-white rounded-full flex items-center justify-center font-bold">
                  {step.stepNumber}
                </span>
                <div className="flex-1">
                  <p className="text-gray-800">{step.instruction}</p>
                  {michelinMode && step.michelinNote && (
                    <div className="mt-2 p-3 bg-amber-50 border border-amber-200 rounded-lg">
                      <span className="text-amber-700 font-medium text-sm">👨‍🍳 Chef's Note: </span>
                      <span className="text-amber-800 text-sm">{step.michelinNote}</span>
                    </div>
                  )}
                </div>
              </div>
            </li>
          ))}
        </ol>
      </section>

      {/* Pro Tips */}
      {recipe.proTips && (
        <section className="mb-8 p-4 bg-blue-50 border border-blue-200 rounded-lg no-print">
          <h3 className="font-semibold text-blue-900 mb-2">💡 Pro Tips</h3>
          <p className="text-blue-800">{recipe.proTips}</p>
        </section>
      )}

      {/* Storage */}
      {recipe.storageInfo && (
        <section className="mb-8 p-4 bg-gray-100 rounded-lg no-print">
          <h3 className="font-semibold text-gray-700 mb-2">📦 Storage & Reheating</h3>
          <p className="text-gray-600">{recipe.storageInfo}</p>
        </section>
      )}

      {/* Nutrition */}
      {recipe.nutrition && (
        <section className="mb-8 no-print">
          <h3 className="font-semibold text-gray-700 mb-3">Nutrition per serving</h3>
          <div className="grid grid-cols-4 gap-4 text-center">
            <div className="bg-gray-100 rounded-lg p-3">
              <div className="text-2xl font-bold text-gray-900">{recipe.nutrition.calories}</div>
              <div className="text-xs text-gray-500">Calories</div>
            </div>
            <div className="bg-gray-100 rounded-lg p-3">
              <div className="text-2xl font-bold text-gray-900">{recipe.nutrition.protein}g</div>
              <div className="text-xs text-gray-500">Protein</div>
            </div>
            <div className="bg-gray-100 rounded-lg p-3">
              <div className="text-2xl font-bold text-gray-900">{recipe.nutrition.carbs}g</div>
              <div className="text-xs text-gray-500">Carbs</div>
            </div>
            <div className="bg-gray-100 rounded-lg p-3">
              <div className="text-2xl font-bold text-gray-900">{recipe.nutrition.fat}g</div>
              <div className="text-xs text-gray-500">Fat</div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
