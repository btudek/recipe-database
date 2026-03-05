import Link from 'next/link';
import { AdUnit } from './AdUnit';

export function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-12 border-t border-gray-800 no-print">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="text-2xl">🍳</span>
              <span className="font-bold text-xl text-white">Recipe Database</span>
            </div>
            <p className="text-sm text-gray-400">
              Discover and cook amazing recipes with professional techniques and precise measurements.
            </p>
          </div>

          {/* Browse */}
          <div>
            <h4 className="font-semibold text-white mb-4">Browse</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/recipes" className="hover:text-white">All Recipes</Link></li>
              <li><Link href="/cuisines" className="hover:text-white">Cuisines</Link></li>
              <li><Link href="/categories" className="hover:text-white">Categories</Link></li>
              <li><Link href="/search" className="hover:text-white">Search</Link></li>
            </ul>
          </div>

          {/* User */}
          <div>
            <h4 className="font-semibold text-white mb-4">Account</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/login" className="hover:text-white">Sign In</Link></li>
              <li><Link href="/register" className="hover:text-white">Create Account</Link></li>
              <li><Link href="/favorites" className="hover:text-white">My Favorites</Link></li>
              <li><Link href="/shopping-list" className="hover:text-white">Shopping List</Link></li>
            </ul>
          </div>
        </div>

        {/* Ad in Footer */}
        <div className="mt-8">
          <AdUnit slot="4582969457" />
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-sm text-center text-gray-500">
          <p>© {new Date().getFullYear()} Recipe Database. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
