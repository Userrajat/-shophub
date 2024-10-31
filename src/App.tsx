import React, { useState, useMemo } from 'react';
import { CartProvider } from './context/CartContext';
import { Header } from './components/Header';
import { CategoryFilter } from './components/CategoryFilter';
import { ProductGrid } from './components/ProductGrid';
import { Cart } from './components/Cart';
import { products } from './data/products';

function App() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const categories = useMemo(() => 
    Array.from(new Set(products.map(p => p.category))),
    []
  );

  const filteredProducts = useMemo(() => {
    return products
      .filter(p => !selectedCategory || p.category === selectedCategory)
      .filter(p => 
        !searchQuery || 
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
  }, [selectedCategory, searchQuery]);

  return (
    <CartProvider>
      <div className="min-h-screen bg-gray-100">
        <Header 
          onCartOpen={() => setIsCartOpen(true)}
          onSearch={setSearchQuery}
        />

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <CategoryFilter
            categories={categories}
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
          />

          <ProductGrid products={filteredProducts} />
        </main>

        <Cart isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
      </div>
    </CartProvider>
  );
}

export default App;