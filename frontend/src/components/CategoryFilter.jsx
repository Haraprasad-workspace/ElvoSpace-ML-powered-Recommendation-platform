import React, { useState } from 'react';
import { motion } from 'framer-motion';

// Dummy categories - easily swappable with API data
const categories = [
  "All Products", 
  "Lounge", 
  "Office", 
  "Dining", 
  "Rocking", 
  "Lighting", 
  "Accessories",
  "Decor"
];

export default function CategoryFilter() {
  // In a real app, you would likely lift this state up to the DashboardLayout 
  // or use a Context/Redux store to actually filter the ProductGrid
  const [activeCategory, setActiveCategory] = useState("All Products");

  return (
    <div className="w-full relative mt-2 mb-6">
      
      {/* Scroll hints: Faded gradient edges to show there is more content to scroll */}
      <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-[#F2F4F3] to-transparent z-10 pointer-events-none"></div>
      <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-[#F2F4F3] to-transparent z-10 pointer-events-none"></div>

      {/* Scrollable Container
        We use custom Tailwind arbitrary variants to hide the scrollbar while keeping it scrollable 
      */}
      <div className="flex items-center gap-3 overflow-x-auto py-2 px-2 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        {categories.map((category) => {
          const isActive = activeCategory === category;

          return (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`relative px-6 py-3 rounded-full text-sm font-semibold whitespace-nowrap transition-colors duration-300 outline-none ${
                isActive ? "text-white" : "text-gray-600 hover:text-gray-900 bg-white border border-gray-200 shadow-sm hover:shadow"
              }`}
            >
              {/* The sliding background animation */}
              {isActive && (
                <motion.div
                  layoutId="activeCategoryPill"
                  className="absolute inset-0 bg-[#1A3626] rounded-full z-0 shadow-md"
                  transition={{ 
                    type: "spring", 
                    stiffness: 400, 
                    damping: 30 
                  }}
                />
              )}
              
              {/* Text label sits above the animated background */}
              <span className="relative z-10">{category}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}