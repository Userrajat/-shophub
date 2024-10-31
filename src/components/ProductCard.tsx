import React from 'react';
import { ShoppingCart, Plus } from 'lucide-react';
import { Product } from '../types';
import { useCart } from '../context/CartContext';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { state, dispatch } = useCart();
  const cartItem = state.items.find(item => item.id === product.id);

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl group">
      <div className="relative h-48 overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300" />
      </div>
      <div className="p-4">
        <div className="flex items-start justify-between gap-2">
          <h3 className="text-lg font-semibold text-gray-800 flex-1">{product.name}</h3>
          <span className="text-xl font-bold text-indigo-600 whitespace-nowrap">
            ${product.price.toFixed(2)}
          </span>
        </div>
        <p className="text-sm text-gray-600 mt-1 line-clamp-2">{product.description}</p>
        <div className="mt-4 flex items-center justify-between">
          <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded">
            {product.category}
          </span>
          {cartItem ? (
            <div className="flex items-center gap-2">
              <button
                onClick={() =>
                  dispatch({
                    type: 'UPDATE_QUANTITY',
                    payload: { id: product.id, quantity: Math.max(0, cartItem.quantity - 1) },
                  })
                }
                className="p-2 hover:bg-gray-100 rounded transition-colors"
                aria-label="Decrease quantity"
              >
                -
              </button>
              <span className="w-8 text-center">{cartItem.quantity}</span>
              <button
                onClick={() =>
                  dispatch({
                    type: 'UPDATE_QUANTITY',
                    payload: { id: product.id, quantity: cartItem.quantity + 1 },
                  })
                }
                className="p-2 hover:bg-gray-100 rounded transition-colors"
                aria-label="Increase quantity"
              >
                <Plus size={16} />
              </button>
            </div>
          ) : (
            <button
              onClick={() => dispatch({ type: 'ADD_TO_CART', payload: product })}
              className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-all transform active:scale-95"
            >
              <ShoppingCart size={20} />
              Add to Cart
            </button>
          )}
        </div>
      </div>
    </div>
  );
};