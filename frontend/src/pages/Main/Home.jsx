import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Swal from 'sweetalert2';
import DashboardLayout from '../../components/DashboardLayout';
import FeaturedHero from '../../components/FeaturedHero';
import CategoryFilter from '../../components/CategoryFilter';
import ProductGrid from '../../components/ProductGrid';
import ProductDetail from '../../components/ProductDetail'; // Import the new component

export default function Home() {
  const [categorizedProducts, setCategorizedProducts] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState(null); // New state for expanded view

  useEffect(() => {
    const fetchHomeRecommendations = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(`${import.meta.env.VITE_BACKEND_ORIGIN}/recommend/home`, {
          method: "GET",
          headers: { 'Content-Type': 'application/json' }
        });

        const result = await response.json();

        if (!response.ok || !result.success) {
          throw new Error(result.message || "Failed to load products from the server.");
        }

        const rawData = result.data;
        const formattedCategories = {};

        Object.keys(rawData).forEach(categoryName => {
          formattedCategories[categoryName] = rawData[categoryName].map(item => ({
            ...item,
            id: item._id,
            imageUrl: item.image,
            price: `₹${item.discount_price}`,
            originalPrice: `₹${item.actual_price}`,
            rating: item.ratings,
          }));
        });

        setCategorizedProducts(formattedCategories);
      } catch (err) {
        Swal.fire({
          title: 'Connection Error',
          text: err.message || 'We could not load your recommendations. Please try again.',
          icon: 'error',
          confirmButtonColor: '#1A3626',
          customClass: { popup: 'rounded-3xl shadow-xl' }
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchHomeRecommendations();
  }, []);

  const categoryNames = Object.keys(categorizedProducts);
  let featuredItem = null;
  if (categoryNames.length > 0 && categorizedProducts[categoryNames[0]].length > 0) {
    featuredItem = categorizedProducts[categoryNames[0]][0];
  }

  // Handle the click from the ProductCard
  const handleProductClick = (product) => {
    window.scrollTo({ top: 0, behavior: 'smooth' }); // Scroll to top when opening detail
    setSelectedProduct(product);
  };

  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="flex-grow flex flex-col items-center justify-center min-h-[60vh] gap-5">
          <motion.div animate={{ rotate: 360 }} transition={{ duration: 1.2, repeat: Infinity, ease: "linear" }} className="w-14 h-14 border-4 border-gray-200 border-t-[#1A3626] rounded-full shadow-lg" />
          <p className="text-[#1A3626] font-medium animate-pulse tracking-wide">Curating your space...</p>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      {/* If a product is selected, show ONLY the ProductDetail view */}
      {selectedProduct ? (
        <ProductDetail 
          product={selectedProduct} 
          onBack={() => setSelectedProduct(null)} 
        />
      ) : (
        /* Otherwise, show the normal Dashboard view */
        <motion.div 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          exit={{ opacity: 0 }}
        >
          {featuredItem ? (
            <FeaturedHero product={featuredItem} title="Curated For You" ctaText="View Product" />
          ) : (
            <FeaturedHero /> 
          )}

          <div className="mt-8">
            <CategoryFilter categories={categoryNames} />
          </div>

          <div className="flex flex-col gap-12 sm:gap-16 mt-4 pb-12">
            {categoryNames.length > 0 ? (
              categoryNames.map((categoryTitle) => (
                <ProductGrid 
                  key={categoryTitle} 
                  title={categoryTitle.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())} 
                  info={categorizedProducts[categoryTitle]} 
                  onProductClick={handleProductClick} // Pass the click handler down
                />
              ))
            ) : (
              <p className="text-center py-20 text-gray-500">No products found.</p>
            )}
          </div>
        </motion.div>
      )}
    </DashboardLayout>
  );
}