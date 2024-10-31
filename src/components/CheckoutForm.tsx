import React, { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { CreditCard, Lock } from 'lucide-react';
import { useCart } from '../context/CartContext';

const stripePromise = loadStripe('pk_test_your_publishable_key');

interface CheckoutFormProps {
  onClose: () => void;
}

export const CheckoutForm: React.FC<CheckoutFormProps> = ({ onClose }) => {
  const { state, dispatch } = useCart();
  const [isProcessing, setIsProcessing] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    cardName: '',
    address: '',
    city: '',
    country: '',
    zip: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    try {
      // In a real app, you would:
      // 1. Send order details to your backend
      // 2. Create a payment intent
      // 3. Confirm the payment with Stripe
      // 4. Handle the result

      // Simulating payment processing
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      dispatch({ type: 'CLEAR_CART' });
      onClose();
      alert('Payment successful! Thank you for your order.');
    } catch (error) {
      alert('Payment failed. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="bg-indigo-50 p-4 rounded-lg flex items-center gap-2">
        <Lock className="text-indigo-600" size={20} />
        <p className="text-sm text-indigo-700">
          Your payment information is encrypted and secure
        </p>
      </div>

      <div className="space-y-4">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            value={formData.email}
            onChange={handleInputChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>

        <div>
          <label htmlFor="cardName" className="block text-sm font-medium text-gray-700">
            Name on card
          </label>
          <input
            type="text"
            id="cardName"
            name="cardName"
            required
            value={formData.cardName}
            onChange={handleInputChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>

        <div className="relative">
          <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700">
            Card information
          </label>
          <div className="mt-1 flex items-center">
            <input
              type="text"
              id="cardNumber"
              placeholder="1234 1234 1234 1234"
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              maxLength={19}
              required
            />
            <CreditCard className="absolute right-3 text-gray-400" size={20} />
          </div>
          <div className="mt-2 grid grid-cols-2 gap-2">
            <input
              type="text"
              placeholder="MM / YY"
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              maxLength={5}
              required
            />
            <input
              type="text"
              placeholder="CVC"
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              maxLength={4}
              required
            />
          </div>
        </div>

        <div>
          <label htmlFor="address" className="block text-sm font-medium text-gray-700">
            Address
          </label>
          <input
            type="text"
            id="address"
            name="address"
            required
            value={formData.address}
            onChange={handleInputChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="city" className="block text-sm font-medium text-gray-700">
              City
            </label>
            <input
              type="text"
              id="city"
              name="city"
              required
              value={formData.city}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>
          <div>
            <label htmlFor="zip" className="block text-sm font-medium text-gray-700">
              ZIP / Postal
            </label>
            <input
              type="text"
              id="zip"
              name="zip"
              required
              value={formData.zip}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>
        </div>
      </div>

      <div className="border-t pt-4">
        <div className="mb-4">
          <div className="flex justify-between text-sm text-gray-600 mb-1">
            <span>Subtotal</span>
            <span>${state.total.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-sm text-gray-600 mb-1">
            <span>Shipping</span>
            <span>Free</span>
          </div>
          <div className="flex justify-between text-lg font-bold border-t pt-2">
            <span>Total</span>
            <span>${state.total.toFixed(2)}</span>
          </div>
        </div>

        <button
          type="submit"
          disabled={isProcessing}
          className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition-all transform active:scale-95 font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {isProcessing ? (
            <>
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              Processing...
            </>
          ) : (
            <>Pay ${state.total.toFixed(2)}</>
          )}
        </button>
      </div>
    </form>
  );
};