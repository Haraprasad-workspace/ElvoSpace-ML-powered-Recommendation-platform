import React, { useState } from 'react';
import { motion } from 'framer-motion';
import CartButton from './CartButton';

// Helper component for the fallback banner
const FallbackBanner = ({ category }) => (
  <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-[#F2F4F3] to-[#EAECEB] p-6 text-center">
    <div className="w-12 h-12 mb-3 bg-white rounded-full flex items-center justify-center shadow-sm">
      <svg className="w-6 h-6 text-[#1A3626]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    </div>
    <span className="text-[10px] sm:text-xs font-bold text-[#1A3626] uppercase tracking-widest line-clamp-2">
      {category || 'Product Category'}
    </span>
  </div>
);

export default function ProductCard({ product, onClick }) {
  const [isHovered, setIsHovered] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [imgError, setImgError] = useState(false); // Track broken images

  const {
    _id = null ,
    name = "Unnamed Product",
    main_category = "Category",
    sub_category = "",
    rating = 0,
    no_of_ratings = 0,
    price,
    originalPrice,
    similarity_score,
    imageUrl = "" 
  } = product || {};

  return (
    <motion.div
      onClick={() => onClick(product)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative bg-white rounded-2xl sm:rounded-[2rem] p-3 sm:p-4 border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgb(0,0,0,0.08)] transition-shadow duration-500 flex flex-col h-full cursor-pointer"
    >
      <div className="relative w-full aspect-square bg-[#F8F9F8] rounded-xl sm:rounded-3xl overflow-hidden mb-3 sm:mb-5 flex items-center justify-center">
        
        {similarity_score && (
          <div className="absolute top-2 left-2 sm:top-4 sm:left-4 z-10 flex flex-col gap-1 sm:gap-2 items-start">
            <span className="bg-[#1A3626] text-white text-[8px] sm:text-[10px] font-bold px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full shadow-sm">
              {Math.round(similarity_score * 100)}% Match
            </span>
          </div>
        )}

        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={(e) => {
            e.stopPropagation(); 
            setIsLiked(!isLiked);
          }}
          className="absolute top-2 right-2 sm:top-4 sm:right-4 z-10 w-7 h-7 sm:w-9 sm:h-9 bg-white rounded-full flex items-center justify-center shadow-sm text-gray-400 hover:text-red-500 transition-colors"
        >
          <svg className={`w-4 h-4 sm:w-5 sm:h-5 transition-colors ${isLiked ? 'fill-red-500 text-red-500' : 'fill-transparent'}`} stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
        </motion.button>

        <motion.div
          animate={{ y: isHovered ? -5 : 0, scale: isHovered ? 1.05 : 1 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="w-full h-full flex justify-center items-center"
        >
          {/* Render Fallback if broken, otherwise try to load image */}
          {imgError || !imageUrl ? (
            <FallbackBanner category={main_category} />
          ) : (
            <img 
              src={imageUrl} 
              alt={name} 
              onError={() => setImgError(true)} // Triggers when image link is broken
              className="w-full h-full object-contain p-4 sm:p-6 drop-shadow-[0_15px_25px_rgba(0,0,0,0.1)]" 
            />
          )}
        </motion.div>
      </div>

      <div className="px-1 sm:px-2 flex flex-col flex-grow">
        <div className="flex items-center justify-between mb-1 sm:mb-1.5">
          <span className="text-gray-400 text-[9px] sm:text-[11px] font-semibold uppercase tracking-wider truncate mr-1 sm:mr-2">
            {main_category}
          </span>
          {rating > 0 && (
            <div className="flex items-center gap-0.5 sm:gap-1 flex-shrink-0 bg-gray-50 px-1 py-0.5 sm:px-1.5 rounded-md">
              <svg className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-[#FFA800] fill-[#FFA800]" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <span className="text-[10px] sm:text-xs font-bold text-gray-700">{Number(rating).toFixed(1)}</span>
            </div>
          )}
        </div>

        <h3 className="text-gray-900 font-bold text-sm sm:text-lg leading-snug sm:leading-tight mb-2 line-clamp-2">
          {name}
        </h3>
        
        <div className="mt-auto flex items-end justify-between">
          <div className="flex flex-col">
            <span className="text-base sm:text-xl font-extrabold text-[#1A3626]">
              {price || 'Price Varies'}
            </span>
            {originalPrice && (
              <span className="text-[10px] sm:text-sm text-gray-400 line-through font-medium">
                {originalPrice}
              </span>
            )}
          </div>

          <div onClick={(e) => e.stopPropagation()}>
            {product ? (
              <CartButton product={product} />
            ) : (
              // Fallback disabled button if somehow no ID is passed
              <button disabled className="w-8 h-8 sm:w-11 sm:h-11 bg-gray-300 text-white rounded-full flex items-center justify-center shadow-lg">
                <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 4v16m8-8H4" />
                </svg>
              </button>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}