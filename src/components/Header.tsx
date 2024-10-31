import React from 'react';
import { ShoppingCart as CartIcon, Search } from 'lucide-react';

interface HeaderProps {
  onCartOpen: () => void;
  onSearch: (query: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ onCartOpen, onSearch }) => {
  return (
    <header className="bg-white shadow-sm sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center gap-8">
          <h1 className="text-2xl font-bold text-gray-900 whitespace-nowrap">ShopHub</h1>
          
          <div className="flex-1 relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="search"
              placeholder="Search products..."
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg bg-gray-50 focus:ring-2 focus:ring-indigo-600 focus:border-transparent"
              onChange={(e) => onSearch(e.target.value)}
            />
          </div>

          <button
            onClick={onCartOpen}
            className="p-2 hover:bg-gray-100 rounded-full relative transition-colors"
            aria-label="Open cart"
          >
            <CartIcon size={24} />
          </button>
        </div>
      </div>
    </header>
  );
};