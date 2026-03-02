'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface ShoppingItem {
  recipeId: string;
  recipeTitle: string;
  ingredients: string[];
  addedAt: string;
}

export default function ShoppingListPage() {
  const [items, setItems] = useState<ShoppingItem[]>([]);
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const list = JSON.parse(localStorage.getItem('shoppingList') || '[]');
    setItems(list);
  }, []);

  const toggleItem = (ingredient: string) => {
    setCheckedItems(prev => ({
      ...prev,
      [ingredient]: !prev[ingredient]
    }));
  };

  const clearList = () => {
    localStorage.removeItem('shoppingList');
    setItems([]);
    setCheckedItems({});
  };

  const removeRecipe = (recipeId: string) => {
    const newList = items.filter(item => item.recipeId !== recipeId);
    localStorage.setItem('shoppingList', JSON.stringify(newList));
    setItems(newList);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-white">🛒 Shopping List</h1>
        {items.length > 0 && (
          <button
            onClick={clearList}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
          >
            Clear All
          </button>
        )}
      </div>

      {items.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-4xl mb-4">🛒</p>
          <p className="text-gray-400 mb-4">Your shopping list is empty</p>
          <Link href="/" className="text-primary-400 hover:underline">
            Browse recipes to add ingredients
          </Link>
        </div>
      ) : (
        <div className="space-y-8">
          {items.map((item) => (
            <div key={item.recipeId} className="bg-gray-900 rounded-xl p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-white">
                  <Link href={`/recipe/${item.recipeId}`} className="hover:text-primary-400">
                    {item.recipeTitle}
                  </Link>
                </h2>
                <button
                  onClick={() => removeRecipe(item.recipeId)}
                  className="text-gray-500 hover:text-red-500"
                >
                  ✕
                </button>
              </div>
              <ul className="space-y-2">
                {item.ingredients.map((ing, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <button
                      onClick={() => toggleItem(ing)}
                      className={`w-5 h-5 rounded border flex-shrink-0 flex items-center justify-center ${
                        checkedItems[ing] 
                          ? 'bg-green-600 border-green-600' 
                          : 'border-gray-600 hover:border-gray-500'
                      }`}
                    >
                      {checkedItems[ing] && '✓'}
                    </button>
                    <span className={`${checkedItems[ing] ? 'text-gray-600 line-through' : 'text-gray-300'}`}>
                      {ing}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
