import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import Swal from 'sweetalert2';
import DashboardLayout from '../../components/DashboardLayout'; // Adjust path as needed
import ProductGrid from '../../components/ProductGrid';
import ProductDetail from '../../components/ProductDetail';

export default function SearchResults() {
  const [searchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState(null);

  // Extract the query parameter 'q' from the URL
  const searchQuery = searchParams.get('q') || '';

  useEffect(() => {
    const fetchSearchResults = async () => {
      if (!searchQuery.trim()) {
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        setSelectedProduct(null); // Reset detail view on new search

        const response = await fetch(`${import.meta.env.VITE_BACKEND_ORIGIN}/recommend/search`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            query: searchQuery // Sending the query to your backend
          })
        });

        const result = await response.json();

        if (!response.ok || !result.success) {
          throw new Error(result.message || 'Failed to fetch search results.');
        }

        // Format backend data to match ProductCard expectations
        const formattedProducts = (result.data || []).map(item => ({
          ...item,
          id: item._id,
          imageUrl: item.image,
          price: `₹${item.discount_price}`,
          originalPrice: `₹${item.actual_price}`,
          rating: item.ratings,
        }));

        setProducts(formattedProducts);

      } catch (err) {
        console.error("Search error:", err);
        Swal.fire({
          title: 'Search Failed',
          text: err.message || 'Something went wrong while fetching products.',
          icon: 'error',
          confirmButtonColor: '#1A3626',
          customClass: { popup: 'rounded-3xl shadow-xl border border-gray-100' }
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchSearchResults();
  }, [searchQuery]);

  const handleProductClick = (product) => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setSelectedProduct(product);
  };

  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="flex-grow flex flex-col items-center justify-center min-h-[60vh] gap-5">
          <motion.div 
            animate={{ rotate: 360 }}
            transition={{ duration: 1.2, repeat: Infinity, ease: "linear" }}
            className="w-14 h-14 border-4 border-gray-200 border-t-[#1A3626] rounded-full shadow-lg"
          />
          <p className="text-[#1A3626] font-medium animate-pulse tracking-wide">
            Searching for "{searchQuery}"...
          </p>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      {selectedProduct ? (
        <ProductDetail 
          product={selectedProduct} 
          onBack={() => setSelectedProduct(null)} 
        />
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="w-full"
        >
          {/* Header */}
          <div className="mb-6 px-1">
            <span className="text-sm font-medium text-gray-400">Search Results for</span>
            <h1 className="text-2xl sm:text-4xl font-bold text-gray-900 tracking-tight mt-1">
              "{searchQuery}"
            </h1>
          </div>

          {/* Grid or Empty State */}
          {products.length > 0 ? (
            <ProductGrid 
              title="Matched Products" 
              info={products} 
              onProductClick={handleProductClick}
            />
          ) : (
            <div className="flex flex-col items-center justify-center py-20 text-center bg-white rounded-[2rem] border border-gray-100 shadow-sm max-w-4xl mx-auto mt-4">
              <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-4">
                <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">No Matches Found</h3>
              <p className="text-gray-500 max-w-sm px-4">
                We couldn't find anything matching your exact query. Try checking your spelling or using alternative keywords.
              </p>
            </div>
          )}
        </motion.div>
      )}
    </DashboardLayout>
  );
}