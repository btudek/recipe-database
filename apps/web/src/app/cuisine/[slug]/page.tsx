'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { getRecipes, getCuisines, getDiets, getRecipeScores } from '@/lib/supabase';
import { getRecipePhoto as getPhoto } from '@/lib/photos';

interface Recipe {
  id: string;
  slug: string;
  title: string;
  description: string;
  prepTime: number;
  cookTime: number;
  imageUrl: string | null;
  cuisine: { name: string; slug: string };
  category: { name: string; slug: string };
  diet: { id: string; name: string } | null;
  healthScore?: number;
}

export default function CuisinePage() {
  const params = useParams();
  const slug = params.slug as string;
  
  const [cuisineName, setCuisineName] = useState<string>('');
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);
  const [diets, setDiets] = useState<any[]>([]);
  const [selectedDiet, setSelectedDiet] = useState('');

  useEffect(() => {
    async function fetchData() {
      if (!slug) return;
      
      try {
        // Get all cuisines to find the cuisine name
        const cuisinesData = await getCuisines();
        const cuisine = (cuisinesData || []).find((c: any) => c.slug === slug);
        setCuisineName(cuisine?.name || slug.charAt(0).toUpperCase() + slug.slice(1));
        
        // Get all diets
        const dietsData = await getDiets();
        setDiets(dietsData || []);
        
        // Get all recipes
        const allRecipes = await getRecipes();
        
        // Filter recipes by cuisine slug
        const cuisineRecipes = (allRecipes || []).filter((r: any) => r.cuisine?.slug === slug);
        
        // Get health scores
        const recipeIds = cuisineRecipes.map((r: any) => r.id);
        const scores = await getRecipeScores(recipeIds);
        
        // Attach scores to recipes
        const recipesWithScores = cuisineRecipes.map((r: any) => ({
          ...r,
          healthScore: scores[r.id] || null
        }));
        
        setRecipes(recipesWithScores);
      } catch (error) {
        console.error('Failed to fetch:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [slug]);

  // Filter recipes by diet
  const filteredRecipes = selectedDiet 
    ? recipes.filter(r => r.diet?.id === selectedDiet)
    : recipes;

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-8">
        <p className="text-gray-500">Loading...</p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-2 text-white">{cuisineName} Recipes</h1>
      <p className="text-gray-400 mb-6">Explore our {cuisineName} recipe collection</p>

      {/* Diet Filter */}
      <div className="flex flex-wrap items-center gap-4 mb-6">
        <span className="text-gray-500">Diet:</span>
        <select
          value={selectedDiet}
          onChange={(e) => setSelectedDiet(e.target.value)}
          className="px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
        >
          <option value="">All Diets</option>
          {diets.map((diet) => (
            <option key={diet.id} value={diet.id}>{diet.name}</option>
          ))}
        </select>
      </div>

      {/* Recipe Count */}
      <p className="text-gray-400 mb-6">{filteredRecipes.length} recipes</p>

      {/* Recipe Grid */}
      {filteredRecipes.length === 0 ? (
        <p className="text-gray-500">No recipes found in this cuisine.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRecipes.map((recipe) => (
            <RecipeCard key={recipe.id} recipe={recipe} diets={diets} />
          ))}
        </div>
      )}
    </div>
  );
}

function RecipeCard({ recipe, diets }: { recipe: Recipe; diets: any[] }) {
  const totalTime = recipe.prepTime + recipe.cookTime;
  const dietInfo = recipe.diet ? diets.find(d => d.id === recipe.diet?.id) : null;
  
  return (
    <Link href={`/recipe/${recipe.slug}`} className="bg-gray-900 rounded-lg overflow-hidden hover:ring-2 hover:ring-primary-500 transition-all">
      <div className="h-48 bg-gray-800 relative overflow-hidden">
        {recipe.slug ? (
          <Image 
            src={getPhoto(recipe.slug)} 
            alt={recipe.title} 
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover"
          />
        ) : (
          <div className="flex items-center justify-center h-full text-5xl">🍽️</div>
        )}
        {recipe.healthScore !== undefined && recipe.healthScore !== null && (
          <HealthScoreBadge score={recipe.healthScore} />
        )}
        {dietInfo && (
          <div className="absolute top-2 left-2 bg-green-600 text-white text-xs font-bold px-2 py-1 rounded-full">
            {dietInfo.name}
          </div>
        )}
      </div>
      <div className="p-4">
        <span className="text-sm text-primary-400 font-medium">{recipe.cuisine?.name}</span>
        <h3 className="font-semibold text-lg mt-1 text-white">{recipe.title}</h3>
        <div className="flex items-center justify-between mt-2 text-sm text-gray-500">
          <span>⏱️ {totalTime} min</span>
        </div>
      </div>
    </Link>
  );
}

function HealthScoreBadge({ score }: { score: number }) {
  let colorClass = '';
  
  if (score >= 75) {
    colorClass = 'bg-green-600';
  } else if (score >= 50) {
    colorClass = 'bg-yellow-500';
  } else if (score >= 25) {
    colorClass = 'bg-orange-500';
  } else {
    colorClass = 'bg-red-600';
  }
  
  return (
    <div className={`absolute top-2 right-2 ${colorClass} text-white text-xs font-bold px-2 py-1 rounded-full`}>
      {score}
    </div>
  );
}
