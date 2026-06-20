import React, { useState } from 'react';
import { motion } from 'framer-motion';
import ProductCard from './ProductCard';

const containerVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.05 } } // Faster stagger for mobile
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
};

export default function ProductGrid({ title = "Recommended products", info = [], onProductClick }) {
  const [isExpanded, setIsExpanded] = useState(false);
  
  if (!info || info.length === 0) return null;

  // Show 8 products initially (good for 2 col mobile and 4 col desktop), or all 20 if expanded
  const visibleProducts = isExpanded ? info : info.slice(0, 8);
  const hasMore = info.length > 8;

  return (
    <section className="w-full mt-4">
      <div className="flex items-center justify-between mb-6 sm:mb-8 gap-4 px-1">
        <div className="flex items-center gap-3">
          <h2 className="text-xl sm:text-3xl font-bold text-gray-900 tracking-tight">
            {title}
          </h2>
          <span className="hidden sm:inline-block px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm font-medium">
            {info.length} items
          </span>
        </div>
      </div>

      {/* Changed to grid-cols-2 for mobile base view */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-6 lg:gap-8"
      >
        {visibleProducts.map((product) => (
          <motion.div key={product.id || Math.random()} variants={itemVariants}>
            <ProductCard product={product} onClick={onProductClick} />
          </motion.div>
        ))}
      </motion.div>

      {/* Expand Button */}
      {hasMore && (
        <div className="mt-8 flex justify-center">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setIsExpanded(!isExpanded)}
            className="px-8 py-3 bg-white border border-gray-200 text-gray-700 font-medium rounded-full shadow-sm hover:border-[#1A3626] hover:text-[#1A3626] transition-colors"
          >
            {isExpanded ? 'Show Less' : `View All ${info.length} ${title}`}
          </motion.button>
        </div>
      )}
    </section>
  );
}