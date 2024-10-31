import React, { useEffect, useState } from 'react';
import { X, Minus, Plus, ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { CheckoutForm } from './CheckoutForm';

export const Cart: React.FC<{ isOpen: boolean; onClose: () => void }> = ({
  isOpen,
  onClose,
}) => {
  const { state, dispatch } = useCart();
  const [isCheckout, setIsCheckout] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
      setIsCheckout(false);
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 z-50 animate-fadeIn"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-lg animate-slideIn">
        <div className="p-4 flex justify-between items-center border-b">
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <ShoppingBag className="text-indigo-600" /> 
            {isCheckout ? 'Checkout' : `Shopping Cart (${state.items.reduce((acc, item) => acc + item.quantity, 0)})`}
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-all"
            aria-label="Close cart"
          >
            <X />
          </button>
        </div>

        <div className="p-4 flex-1 overflow-y-auto max-h-[calc(100vh-200px)]">
          {isCheckout ? (
            <CheckoutForm onClose={onClose} />
          ) : state.items.length === 0 ? (
            <div className="text-center py-12">
              <ShoppingBag className="mx-auto h-12 w-12 text-gray-400 mb-4" />
              <p className="text-gray-500">Your cart is empty</p>
              <button
                onClick={onClose}
                className="mt-4 text-indigo-600 hover:text-indigo-700"
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {state.items.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-20 h-20 object-cover rounded-lg"
                  />
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold truncate">{item.name}</h3>
                    <p className="text-gray-600">
                      ${item.price.toFixed(2)} × {item.quantity}
                      <span className="ml-2 font-medium">
                        = ${(item.price * item.quantity).toFixed(2)}
                      </span>
                    </p>
                    <div className="flex items-center gap-2 mt-2">
                      <button
                        onClick={() =>
                          dispatch({
                            type: 'UPDATE_QUANTITY',
                            payload: { id: item.id, quantity: Math.max(0, item.quantity - 1) },
                          })
                        }
                        className="p-1 hover:bg-gray-200 rounded transition-colors"
                        aria-label="Decrease quantity"
                      >
                        <Minus size={16} />
                      </button>
                      <span className="w-8 text-center">{item.quantity}</span>
                      <button
                        onClick={() =>
                          dispatch({
                            type: 'UPDATE_QUANTITY',
                            payload: { id: item.id, quantity: item.quantity + 1 },
                          })
                        }
                        className="p-1 hover:bg-gray-200 rounded transition-colors"
                        aria-label="Increase quantity"
                      >
                        <Plus size={16} />
                      </button>
                    </div>
                  </div>
                  <button
                    onClick={() =>
                      dispatch({ type: 'REMOVE_FROM_CART', payload: item.id })
                    }
                    className="p-2 hover:bg-gray-200 rounded transition-colors"
                    aria-label="Remove item"
                  >
                    <X />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {state.items.length > 0 && !isCheckout && (
          <div className="border-t p-4 bg-white">
            <div className="space-y-2 mb-4">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal</span>
                <span>${state.total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Shipping</span>
                <span>Free</span>
              </div>
              <div className="flex justify-between text-lg font-bold pt-2 border-t">
                <span>Total</span>
                <span>${state.total.toFixed(2)}</span>
              </div>
            </div>
            <button
              onClick={() => setIsCheckout(true)}
              className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition-all transform active:scale-95 font-medium"
            >
              Proceed to Checkout
            </button>
          </div>
        )}
      </div>
    </div>
  );
};