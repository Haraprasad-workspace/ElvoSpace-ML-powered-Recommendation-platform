import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import ProductGrid from './ProductGrid';

// Larger fallback banner for the detail view
const DetailFallbackBanner = ({ category }) => (
  <div className="w-full h-full min-h-[300px] flex flex-col items-center justify-center bg-gradient-to-br from-[#F2F4F3] to-[#EAECEB] rounded-2xl">
    <div className="w-16 h-16 sm:w-20 sm:h-20 mb-4 sm:mb-6 bg-white rounded-full flex items-center justify-center shadow-md">
      <svg className="w-8 h-8 sm:w-10 sm:h-10 text-[#1A3626]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    </div>
    <h3 className="text-lg sm:text-xl font-bold text-[#1A3626] uppercase tracking-widest text-center px-4">
      {category || 'Product Image Unavailable'}
    </h3>
    <p className="text-gray-500 mt-2 text-xs sm:text-sm text-center px-6">
      We couldn't load the image for this item, but it is still available for purchase.
    </p>
  </div>
);

export default function ProductDetail({ product: initialProduct, onBack }) {
  // 1. Internal state to handle the "looping" history
  const [currentProduct, setCurrentProduct] = useState(initialProduct);
  const [historyStack, setHistoryStack] = useState([]);
  
  // 2. Similar products state
  const [similarProducts, setSimilarProducts] = useState([]);
  const [isLoadingSimilar, setIsLoadingSimilar] = useState(false);
  const [imgError, setImgError] = useState(false);

  // Sync state if the parent forces a completely new product
  useEffect(() => {
    setCurrentProduct(initialProduct);
    setHistoryStack([]);
  }, [initialProduct]);

  // Fetch similar products whenever the current product changes
  useEffect(() => {
    const fetchSimilarProducts = async () => {
      if (!currentProduct || !currentProduct.id) return;

      try {
        setIsLoadingSimilar(true);
        setImgError(false); // Reset image error for new product
        
        // Scroll to top of the detail view
        window.scrollTo({ top: 0, behavior: 'smooth' });

        const response = await fetch(`${import.meta.env.VITE_BACKEND_ORIGIN}/recommend/product`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ProductuId: currentProduct.id }) 
        });

        const result = await response.json();

        if (response.ok && result.success) {
          // Map data safely to match ProductCard structure
          const formattedProducts = (result.data || []).map(item => ({
            ...item,
            id: item._id,
            imageUrl: item.image,
            price: `₹${item.discount_price}`,
            originalPrice: `₹${item.actual_price}`,
            rating: item.ratings,
          }));
          
          // Filter out the current product from the recommendations just in case
          setSimilarProducts(formattedProducts.filter(p => p.id !== currentProduct.id));
        }
      } catch (err) {
        console.error("Failed to fetch similar products:", err);
      } finally {
        setIsLoadingSimilar(false);
      }
    };

    fetchSimilarProducts();
  }, [currentProduct]);

  // Handle clicking a product from the Similar Grid
  const handleSimilarProductClick = (selectedProduct) => {
    // Push current product to history stack
    setHistoryStack(prev => [...prev, currentProduct]);
    // Set the new product as active
    setCurrentProduct(selectedProduct);
  };

  // Handle the back button
  const handleBackClick = () => {
    if (historyStack.length > 0) {
      // If there is history, pop the last product and show it
      const newHistory = [...historyStack];
      const previousProduct = newHistory.pop();
      setHistoryStack(newHistory);
      setCurrentProduct(previousProduct);
    } else {
      // If no history, close the detail view entirely via parent callback
      onBack();
    }
  };

  if (!currentProduct) return null;

  return (
    <div className="w-full flex flex-col gap-10 pb-12">
      {/* --- MAIN PRODUCT CARD --- */}
      <motion.div 
        key={currentProduct.id} // Forces re-animation when product changes
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-3xl sm:rounded-[2rem] border border-gray-100 shadow-sm overflow-hidden flex flex-col md:flex-row min-h-[60vh] sm:min-h-[70vh]"
      >
        {/* Left: Image Viewer / Fallback */}
        <div className="md:w-1/2 bg-[#F8F9F8] p-6 sm:p-12 relative flex items-center justify-center min-h-[300px]">
          
          {/* Back Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleBackClick}
            className="absolute top-4 left-4 sm:top-6 sm:left-6 w-9 h-9 sm:w-10 sm:h-10 bg-white rounded-full flex items-center justify-center shadow-md text-gray-700 hover:text-[#1A3626] transition-colors z-10"
          >
            <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7" />
            </svg>
          </motion.button>

          {/* Image or Fallback */}
          {imgError || !currentProduct.imageUrl ? (
            <DetailFallbackBanner category={currentProduct.main_category} />
          ) : (
            <img 
              src={currentProduct.imageUrl} 
              alt={currentProduct.name} 
              onError={() => setImgError(true)}
              className="w-full h-auto max-h-[350px] sm:max-h-[500px] object-contain drop-shadow-[0_20px_40px_rgba(0,0,0,0.15)]"
            />
          )}
        </div>

        {/* Right: Details & Actions */}
        <div className="md:w-1/2 p-6 sm:p-12 flex flex-col justify-center">
          <span className="text-[#1A3626] font-semibold tracking-wider uppercase text-xs sm:text-sm mb-1.5 sm:mb-2">
            {currentProduct.main_category} {currentProduct.sub_category && `• ${currentProduct.sub_category}`}
          </span>
          
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 leading-tight mb-3 sm:mb-4">
            {currentProduct.name}
          </h1>
          
          {currentProduct.rating > 0 && (
            <div className="flex items-center gap-1.5 sm:gap-2 mb-4 sm:mb-6">
              <span className="flex items-center text-[#FFA800] text-sm sm:text-base">
                {'★'.repeat(Math.round(currentProduct.rating))}
                <span className="text-gray-300">{'★'.repeat(5 - Math.round(currentProduct.rating))}</span>
              </span>
              <span className="text-xs sm:text-sm font-medium text-gray-500">
                ({currentProduct.no_of_ratings || 0} reviews)
              </span>
            </div>
          )}

          <div className="flex items-end gap-3 sm:gap-4 mb-6 sm:mb-8">
            <span className="text-3xl sm:text-4xl font-extrabold text-[#1A3626]">
              {currentProduct.price || 'Price Varies'}
            </span>
            {currentProduct.originalPrice && (
              <span className="text-lg sm:text-xl text-gray-400 line-through font-medium mb-1">
                {currentProduct.originalPrice}
              </span>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-auto">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex-1 py-3.5 sm:py-4 bg-[#1A3626] text-white rounded-2xl font-bold text-base sm:text-lg shadow-lg hover:bg-[#12271a] transition-colors"
            >
              Add to Cart
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="px-6 py-3.5 sm:py-4 bg-gray-50 border border-gray-200 text-gray-700 rounded-2xl font-bold text-base sm:text-lg hover:bg-gray-100 transition-colors flex items-center justify-center gap-2"
            >
              <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
              Save
            </motion.button>
          </div>
        </div>
      </motion.div>

      {/* --- SIMILAR PRODUCTS SECTION --- */}
      <div className="w-full mt-4">
        {isLoadingSimilar ? (
          <div className="flex justify-center items-center py-20">
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              className="w-10 h-10 border-4 border-gray-200 border-t-[#1A3626] rounded-full"
            />
          </div>
        ) : (
          similarProducts.length > 0 && (
            <ProductGrid 
              title="Similar Products" 
              info={similarProducts} 
              onProductClick={handleSimilarProductClick} 
            />
          )
        )}
      </div>
    </div>
  );
}