import React from 'react';
import { motion } from 'framer-motion';

export default function ProductDetail({ product, onBack }) {
  if (!product) return null;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-[2rem] border border-gray-100 shadow-sm overflow-hidden flex flex-col md:flex-row min-h-[70vh]"
    >
      {/* Left: Image Viewer */}
      <div className="md:w-1/2 bg-[#F8F9F8] p-8 sm:p-12 relative flex items-center justify-center">
        {/* Back Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onBack}
          className="absolute top-6 left-6 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-md text-gray-700 hover:text-[#1A3626] transition-colors z-10"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7" />
          </svg>
        </motion.button>

        <img 
          src={product.imageUrl} 
          alt={product.name} 
          className="w-full h-auto max-h-[500px] object-contain drop-shadow-[0_20px_40px_rgba(0,0,0,0.15)]"
        />
      </div>

      {/* Right: Details & Actions */}
      <div className="md:w-1/2 p-8 sm:p-12 flex flex-col justify-center">
        <span className="text-[#1A3626] font-semibold tracking-wider uppercase text-sm mb-2">
          {product.main_category}
        </span>
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 leading-tight mb-4">
          {product.name}
        </h1>
        
        {product.rating > 0 && (
          <div className="flex items-center gap-2 mb-6">
            <span className="flex items-center text-[#FFA800]">
              {'★'.repeat(Math.round(product.rating))}
              <span className="text-gray-300">{'★'.repeat(5 - Math.round(product.rating))}</span>
            </span>
            <span className="text-sm font-medium text-gray-500">({product.no_of_ratings} reviews)</span>
          </div>
        )}

        <div className="flex items-end gap-4 mb-8">
          <span className="text-4xl font-extrabold text-[#1A3626]">{product.price}</span>
          {product.originalPrice && (
            <span className="text-xl text-gray-400 line-through font-medium mb-1">
              {product.originalPrice}
            </span>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 mt-auto">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex-1 py-4 bg-[#1A3626] text-white rounded-2xl font-bold text-lg shadow-lg hover:bg-[#12271a] transition-colors"
          >
            Add to Cart
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="px-6 py-4 bg-gray-50 border border-gray-200 text-gray-700 rounded-2xl font-bold text-lg hover:bg-gray-100 transition-colors flex items-center justify-center gap-2"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
            Save
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}