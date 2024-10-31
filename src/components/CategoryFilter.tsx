import React from 'react';

interface CategoryFilterProps {
  categories: string[];
  selectedCategory: string | null;
  onSelectCategory: (category: string | null) => void;
}

export const CategoryFilter: React.FC<CategoryFilterProps> = ({
  categories,
  selectedCategory,
  onSelectCategory,
}) => {
  return (
    <div className="mb-8 flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
      <button
        onClick={() => onSelectCategory(null)}
        className={`px-4 py-2 rounded-full transition-colors ${
          selectedCategory === null
            ? 'bg-indigo-600 text-white'
            : 'bg-white text-gray-700 hover:bg-gray-50'
        }`}
      >
        All
      </button>
      {categories.map(category => (
        <button
          key={category}
          onClick={() => onSelectCategory(category)}
          className={`px-4 py-2 rounded-full whitespace-nowrap transition-colors ${
            selectedCategory === category
              ? 'bg-indigo-600 text-white'
              : 'bg-white text-gray-700 hover:bg-gray-50'
          }`}
        >
          {category}
        </button>
      ))}
    </div>
  );
};