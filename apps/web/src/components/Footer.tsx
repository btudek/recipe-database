import Link from 'next/link';

export function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-12 border-t border-gray-800 no-print">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
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
              <li><Link href="/cuisines" className="hover:text-white">All Cuisines</Link></li>
              <li><Link href="/categories" className="hover:text-white">All Categories</Link></li>
              <li><Link href="/trending" className="hover:text-white">Trending</Link></li>
              <li><Link href="/search" className="hover:text-white">Search</Link></li>
            </ul>
          </div>

          {/* Features */}
          <div>
            <h4 className="font-semibold text-white mb-4">Features</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/features/scaling" className="hover:text-white">Portion Scaling</Link></li>
              <li><Link href="/features/michelin" className="hover:text-white">Michelin Mode</Link></li>
              <li><Link href="/features/units" className="hover:text-white">Unit Conversion</Link></li>
              <li><Link href="/features/print" className="hover:text-white">Print View</Link></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-semibold text-white mb-4">Company</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/about" className="hover:text-white">About</Link></li>
              <li><Link href="/contact" className="hover:text-white">Contact</Link></li>
              <li><Link href="/privacy" className="hover:text-white">Privacy</Link></li>
              <li><Link href="/terms" className="hover:text-white">Terms</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-sm text-center text-gray-500">
          <p>© {new Date().getFullYear()} Recipe Database. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
