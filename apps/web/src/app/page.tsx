'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { getRecipes, getCuisines, getCategories, getDiets, getRecipeScores } from '@/lib/supabase';
import { getRecipePhoto } from '@/lib/photos';
import { SAMPLE_RECIPES } from '@/lib/sampleData';
import { AdHorizontal, AdFluid } from '@/components/AdUnit';

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

export default function HomePage() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [cuisines, setCuisines] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [diets, setDiets] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Filter states
  const [selectedCuisine, setSelectedCuisine] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedDiet, setSelectedDiet] = useState('');

  useEffect(() => {
    async function fetchData() {
      try {
        const [recipesData, cuisinesData, categoriesData, dietsData] = await Promise.all([
          getRecipes(),
          getCuisines(),
          getCategories(),
          getDiets(),
        ]);
        
        // Get health scores for recipes
        const recipeIds = (recipesData || []).map((r: any) => r.id);
        const scores = await getRecipeScores(recipeIds);
        
        // Attach scores to recipes
        const recipesWithScores = (recipesData || []).map((r: any) => ({
          ...r,
          healthScore: scores[r.id] || null
        }));
        
        setRecipes(recipesWithScores.slice(0, 6));
        setCuisines(cuisinesData || []);
        setCategories(categoriesData || []);
        setDiets(dietsData || []);
      } catch (error) {
        console.error('Failed to fetch:', error);
        // Fallback to sample data
        setRecipes(SAMPLE_RECIPES.slice(0, 6).map(r => ({
          ...r,
          imageUrl: getRecipePhoto(r.slug)
        })));
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  // Fetch recipes when filters change
  useEffect(() => {
    async function fetchFilteredRecipes() {
      setLoading(true);
      try {
        const filters: any = {};
        if (selectedCuisine) filters.cuisine = selectedCuisine;
        if (selectedCategory) filters.category = selectedCategory;
        if (selectedDiet) filters.diet = selectedDiet;
        
        const recipesData = await getRecipes(Object.keys(filters).length > 0 ? filters : undefined);
        
        // Get all diets for lookup
        const dietsData = await getDiets();
        
        // Get health scores for recipes
        const recipeIds = (recipesData || []).map((r: any) => r.id);
        const scores = await getRecipeScores(recipeIds);
        
        // Attach scores and diet names to recipes
        const recipesWithScores = (recipesData || []).map((r: any) => ({
          ...r,
          healthScore: scores[r.id] || null,
          diet: r.diet_id ? { id: r.diet_id, name: dietsData.find((d: any) => d.id === r.diet_id)?.name || null } : null
        }));
        
        setRecipes(recipesWithScores);
        setDiets(dietsData || []);
      } catch (error) {
        console.error('Failed to fetch filtered recipes:', error);
      } finally {
        setLoading(false);
      }
    }
    
    // Only fetch if any filter is selected (after initial load)
    if (selectedCuisine || selectedCategory || selectedDiet) {
      fetchFilteredRecipes();
    }
  }, [selectedCuisine, selectedCategory, selectedDiet]);

  const clearFilters = () => {
    setSelectedCuisine('');
    setSelectedCategory('');
    setSelectedDiet('');
  };

  const hasFilters = selectedCuisine || selectedCategory || selectedDiet;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Hero */}
      <section className="mb-12 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">
          Discover Your Next Favorite Recipe
        </h1>
        <p className="text-lg text-gray-400 mb-8 max-w-2xl mx-auto">
          Explore thousands of original recipes with precise measurements, 
          portion scaling, and chef-quality techniques.
        </p>
        
        <form action="/search" method="GET" className="max-w-xl mx-auto flex gap-2">
          <input
            type="text"
            name="q"
            placeholder="Search recipes, ingredients, cuisines..."
            className="flex-1 px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
          />
          <button type="submit" className="px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700">
            Search
          </button>
        </form>
        
        <div className="mt-6">
          <Link 
            href="/recipes" 
            className="inline-block px-8 py-4 bg-primary-600 text-white text-lg font-semibold rounded-lg hover:bg-primary-700 transition-colors"
          >
            Browse All Recipes
          </Link>
        </div>
      </section>

      {/* Ad */}
      <AdHorizontal />

      {/* Filters */}
      <section className="mb-8 p-4 bg-gray-900 rounded-lg border border-gray-800">
        <div className="flex flex-wrap items-center gap-4">
          <span className="text-white font-medium">Filters:</span>
          
          <select
            value={selectedCuisine}
            onChange={(e) => setSelectedCuisine(e.target.value)}
            className="px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
          >
            <option value="">All Cuisines</option>
            {cuisines.map((cuisine) => (
              <option key={cuisine.id} value={cuisine.id}>{cuisine.name}</option>
            ))}
          </select>
          
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
          >
            <option value="">All Categories</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>{category.name}</option>
            ))}
          </select>
          
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
          
          {hasFilters && (
            <button
              onClick={clearFilters}
              className="px-4 py-2 text-sm bg-gray-700 text-white rounded-lg hover:bg-gray-600"
            >
              Clear Filters
            </button>
          )}
        </div>
      </section>

      {/* Recipes */}
      <section className="mb-12">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-white">
            {hasFilters ? 'Filtered Recipes' : 'Featured Recipes'}
          </h2>
          {!hasFilters && (
            <Link href="/recipes" className="text-primary-400 hover:text-primary-300 font-medium">
              View All →
            </Link>
          )}
        </div>
        {loading ? (
          <p className="text-gray-500">Loading recipes...</p>
        ) : recipes.length === 0 ? (
          <p className="text-gray-500">No recipes found!</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recipes.map((recipe) => (
              <RecipeCard key={recipe.id} recipe={recipe} diets={diets} />
            ))}
          </div>
        )}
      </section>

      {/* Ad */}
      <AdHorizontal />
      <AdFluid />

      {/* Cuisines */}
      <section className="mb-12">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-white">Browse by Cuisine</h2>
          <Link href="/cuisines" className="text-primary-400 hover:text-primary-300 font-medium">
            View All →
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {cuisines.slice(0, 6).map((cuisine) => (
            <CuisineCard key={cuisine.id} name={cuisine.name} slug={cuisine.slug} />
          ))}
        </div>
      </section>

      {/* Categories */}
      <section className="mb-12">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-white">Browse by Category</h2>
          <Link href="/categories" className="text-primary-400 hover:text-primary-300 font-medium">
            View All →
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <CategoryCard name="Breakfast" slug="breakfast" icon="🍳" />
          <CategoryCard name="Lunch" slug="lunch" icon="🥗" />
          <CategoryCard name="Dinner" slug="dinner" icon="🍝" />
          <CategoryCard name="Desserts" slug="desserts" icon="🍰" />
          <CategoryCard name="Appetizers" slug="appetizers" icon="🥟" />
          <CategoryCard name="Soups" slug="soups" icon="🥣" />
          <CategoryCard name="Salads" slug="salads" icon="🥬" />
          <CategoryCard name="Baking" slug="baking" icon="🍞" />
        </div>
      </section>
    </div>
  );
}

function RecipeCard({ recipe, diets }: { recipe: Recipe; diets: any[] }) {
  // Find diet name from diets array
  const dietInfo = recipe.diet ? diets.find(d => d.id === recipe.diet?.id) : null;
  
  return (
    <Link href={`/recipe/${recipe.slug}`} className="bg-gray-900 rounded-lg overflow-hidden hover:ring-2 hover:ring-primary-500 transition-all">
      <div className="h-48 bg-gray-800 flex items-center justify-center overflow-hidden relative">
        {recipe.slug ? (
          <Image 
            src={getRecipePhoto(recipe.slug)} 
            alt={recipe.title} 
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover"
            loading="lazy"
          />
        ) : (
          <span className="text-6xl">🍽️</span>
        )}
        {recipe.healthScore !== undefined && recipe.healthScore !== null && (
          <HealthScoreBadge score={recipe.healthScore} />
        )}
        {/* Diet Tag */}
        {dietInfo && (
          <div className="absolute top-2 left-2 bg-green-600 text-white text-xs font-bold px-2 py-1 rounded-full">
            {dietInfo.name}
          </div>
        )}
      </div>
      <div className="p-4">
        <span className="text-sm text-primary-400 font-medium">{recipe.cuisine?.name}</span>
        <h3 className="font-semibold text-lg mt-1 text-white">{recipe.title}</h3>
        <div className="flex items-center mt-2 text-sm text-gray-500">
          <span>⏱️ {recipe.prepTime + recipe.cookTime} min</span>
        </div>
      </div>
    </Link>
  );
}

function HealthScoreBadge({ score }: { score: number }) {
  let colorClass = '';
  let label = '';
  
  if (score >= 75) {
    colorClass = 'bg-green-600';
    label = 'Excellent';
  } else if (score >= 50) {
    colorClass = 'bg-yellow-500';
    label = 'Good';
  } else if (score >= 25) {
    colorClass = 'bg-orange-500';
    label = 'Fair';
  } else {
    colorClass = 'bg-red-600';
    label = 'Poor';
  }
  
  return (
    <div 
      className={`absolute top-2 right-2 ${colorClass} text-white text-xs font-bold px-2 py-1 rounded-full shadow-lg`}
      title={`Health Score: ${score}/100 (${label})`}
    >
      {score}
    </div>
  );
}

function CuisineCard({ name, slug }: { name: string; slug: string }) {
  return (
    <Link href={`/cuisine/${slug}`} className="block p-4 bg-gray-900 rounded-lg border border-gray-800 hover:border-primary-500 text-center">
      <span className="font-medium text-gray-300">{name}</span>
    </Link>
  );
}

function CategoryCard({ name, slug, icon }: { name: string; slug: string; icon: string }) {
  return (
    <Link href={`/category/${slug}`} className="block p-4 bg-gray-900 rounded-lg border border-gray-800 hover:border-primary-500 text-center">
      <div className="text-2xl mb-1">{icon}</div>
      <span className="font-medium text-gray-300">{name}</span>
    </Link>
  );
}
