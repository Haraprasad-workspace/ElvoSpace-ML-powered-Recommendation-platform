import React, { useState } from 'react';
import { motion } from 'framer-motion';
import useCartStore from '../Global Store/useCartStore'; // Adjust path as needed

export default function CartButton({ product }) {
  const [isLoading, setIsLoading] = useState(false);
  
  // Select only the specific quantity for this product from the global store
  const quantity = useCartStore((state) => state.items[product] || 0);
  const incrementQuantity = useCartStore((state) => state.incrementQuantity);
  const decrementQuantity = useCartStore((state) => state.decrementQuantity);

  const handleIncrement = async (e) => {
    e.stopPropagation(); // Prevents triggering clicks on the parent ProductCard
    if (isLoading) return;
    
    setIsLoading(true);
    try {
        console.log(product)
      const response = await fetch(`${import.meta.env.VITE_BACKEND_ORIGIN}/cart/AddtoCart`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({ productId: product._id })
      });

      if (response.ok) {
        // Only update the global Zustand state if the backend confirms the addition
        incrementQuantity(product);
      } else {
        const data = await response.json();
        console.error("Failed to add to cart:", data.message);
      }
    } catch (error) {
      console.error("Network error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDecrement = async (e) => {
    e.stopPropagation();
    if (isLoading) return;

    setIsLoading(true);
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_ORIGIN}/cart/DeleteFromCart`, {
        method: 'DELETE', // Adjust to DELETE if your backend requires it
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        } , 
        body: JSON.stringify({ productId: product._id})
      });

      if (response.ok) {
        // Only update the global Zustand state if the backend confirms the deletion
        decrementQuantity(product._id);
      } else {
        const data = await response.json();
        console.error("Failed to remove from cart:", data.message);
      }
    } catch (error) {
      console.error("Network error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // UI STATE 1: Not in cart (Quantity === 0) -> Show (+)
  if (quantity === 0) {
    return (
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={handleIncrement}
        disabled={isLoading}
        className={`w-11 h-11 bg-[#1A3626] text-white rounded-full flex items-center justify-center shadow-lg transition-colors ${
          isLoading ? 'opacity-70 cursor-not-allowed' : 'hover:bg-[#12271a]'
        }`}
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 4v16m8-8H4" />
        </svg>
      </motion.button>
    );
  }

  // UI STATE 2: In cart (Quantity > 0) -> Show (- 1 +)
  return (
    <div className="flex items-center justify-between bg-[#1A3626] rounded-full shadow-lg h-11 px-1 min-w-[100px]">
      {/* Minus Button */}
      <motion.button
        whileTap={{ scale: 0.9 }}
        onClick={handleDecrement}
        disabled={isLoading}
        className={`w-9 h-9 flex items-center justify-center text-white rounded-full transition-colors ${
          isLoading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-white/20'
        }`}
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M20 12H4" />
        </svg>
      </motion.button>

      {/* Quantity Display */}
      <span className="w-6 text-center text-white font-bold text-sm select-none">
        {isLoading ? '...' : quantity}
      </span>

      {/* Plus Button */}
      <motion.button
        whileTap={{ scale: 0.9 }}
        onClick={handleIncrement}
        disabled={isLoading}
        className={`w-9 h-9 flex items-center justify-center text-white rounded-full transition-colors ${
          isLoading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-white/20'
        }`}
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M12 4v16m8-8H4" />
        </svg>
      </motion.button>
    </div>
  );
}