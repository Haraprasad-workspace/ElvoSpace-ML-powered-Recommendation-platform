import React, { useState } from 'react';
import { motion } from 'framer-motion';

export default function ProductCard({ 
  product = {
    id: 1,
    name: "Sienna Lounge Chair",
    category: "Lounge",
    price: "$550",
    originalPrice: "$600",
    discount: "-5%",
    imageUrl: "https://images.unsplash.com/photo-1506898667545-14f28a54ef22?q=80&w=600&auto=format&fit=crop", // Placeholder
    isNew: true,
  }
}) {
  const [isHovered, setIsHovered] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  return (
    <motion.div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="group relative bg-white rounded-[2rem] p-4 border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgb(0,0,0,0.08)] transition-shadow duration-500 flex flex-col"
    >
      {/* Top Section: Image Canvas */}
      <div className="relative w-full aspect-square bg-[#F8F9F8] rounded-3xl overflow-hidden mb-5 flex items-center justify-center">
        
        {/* Badges (New, Discount) */}
        <div className="absolute top-4 left-4 z-10 flex flex-col gap-2">
          {product.isNew && (
            <span className="bg-white text-[#1A3626] text-xs font-bold px-3 py-1.5 rounded-full shadow-sm">
              New
            </span>
          )}
          {product.discount && (
            <span className="bg-[#1A3626] text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-sm">
              {product.discount}
            </span>
          )}
        </div>

        {/* Favorite Button */}
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={() => setIsLiked(!isLiked)}
          className="absolute top-4 right-4 z-10 w-9 h-9 bg-white rounded-full flex items-center justify-center shadow-sm text-gray-400 hover:text-red-500 transition-colors"
        >
          <svg 
            className={`w-5 h-5 transition-colors ${isLiked ? 'fill-red-500 text-red-500' : 'fill-transparent'}`} 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
        </motion.button>

        {/* Floating Product Image */}
        <motion.div
          animate={{ 
            y: isHovered ? -10 : 0,
            scale: isHovered ? 1.05 : 1
          }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="w-full h-full p-6 flex justify-center items-center"
        >
          <img 
            src={product.imageUrl} 
            alt={product.name} 
            className="w-full h-full object-contain drop-shadow-[0_20px_30px_rgba(0,0,0,0.15)]"
          />
        </motion.div>
      </div>

      {/* Bottom Section: Details */}
      <div className="px-2 flex flex-col flex-grow">
        <span className="text-gray-400 text-xs font-medium uppercase tracking-wider mb-1">
          {product.category}
        </span>
        <h3 className="text-gray-900 font-bold text-lg leading-tight mb-4 line-clamp-2">
          {product.name}
        </h3>
        
        {/* Price & Action Row */}
        <div className="mt-auto flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-xl font-extrabold text-[#1A3626]">
              {product.price}
            </span>
            {product.originalPrice && (
              <span className="text-sm text-gray-400 line-through font-medium">
                {product.originalPrice}
              </span>
            )}
          </div>

          {/* Add to Cart Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-11 h-11 bg-[#1A3626] text-white rounded-full flex items-center justify-center shadow-lg hover:bg-[#12271a] transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 4v16m8-8H4" />
            </svg>
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}