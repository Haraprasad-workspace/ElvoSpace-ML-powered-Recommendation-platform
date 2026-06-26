import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import DashboardLayout from '../../components/DashboardLayout'; 
import CartButton from '../../components/CartButton'; 
import useCartStore from '../../Global Store/useCartStore'; 

const CartFallbackImage = ({ category }) => (
  <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-[#F2F4F3] to-[#EAECEB] text-center p-2">
    <svg className="w-6 h-6 text-[#1A3626] mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </svg>
    <span className="text-[8px] font-bold text-[#1A3626] uppercase tracking-widest line-clamp-1">
      {category || 'Item'}
    </span>
  </div>
);

export default function Cart() {
  const cartItemsMap = useCartStore((state) => state.items);
  const cartItems = Object.values(cartItemsMap);
  console.log(cartItemsMap);
  console.log(cartItems);

  const [imgErrors, setImgErrors] = useState({});
  
  const handleImgError = (id) => {
    setImgErrors(prev => ({ ...prev, [id]: true }));
  };

  const subtotal = cartItems.reduce((acc, cartData) => {
    const { product, quantity } = cartData;
    const cleanPrice = parseFloat(String(product.discount_price).replace(/[^0-9.]/g, '')) || 0;
    return acc + (cleanPrice * quantity);
  }, 0);

  const shipping = subtotal > 0 ? (subtotal > 2000 ? 0 : 49) : 0; 
  const grandTotal = subtotal + shipping;

  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto w-full pb-12 mt-4 lg:mt-8">
        
        <div className="mb-8 px-2 flex justify-between items-end">
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 tracking-tight">Your Cart</h1>
            <p className="text-gray-500 mt-2">
              {cartItems.length} {cartItems.length === 1 ? 'item' : 'items'} in your cart
            </p>
          </div>
          
          {/* Quick link to keep shopping */}
          {cartItems.length > 0 && (
            <Link to="/home" className="hidden sm:inline-flex text-sm font-bold text-[#1A3626] hover:underline">
              Continue Shopping &rarr;
            </Link>
          )}
        </div>

        {cartItems.length === 0 ? (
          <motion.div 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center justify-center py-24 bg-white rounded-[2rem] border border-gray-100 shadow-sm text-center px-4"
          >
            <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mb-6">
              <svg className="w-12 h-12 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">Your cart is empty</h2>
            <p className="text-gray-500 mb-8 max-w-md">Discover our latest collections and find something you love.</p>
            <Link to="/home">
              <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="px-8 py-4 bg-[#1A3626] text-white rounded-full font-bold shadow-lg hover:bg-[#12271a] transition-colors">
                Start Shopping
              </motion.button>
            </Link>
          </motion.div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
            
            <div className="flex-1">
              <div className="bg-white rounded-[2rem] border border-gray-100 shadow-sm overflow-hidden p-4 sm:p-6">
                <AnimatePresence>
                  {cartItems.map(({ product, quantity }) => (
                    <motion.div 
                      key={product._id}
                      initial={{ opacity: 0, height: 0, marginBottom: 0 }}
                      animate={{ opacity: 1, height: 'auto', marginBottom: 24 }}
                      exit={{ opacity: 0, height: 0, marginBottom: 0, scale: 0.95 }}
                      transition={{ duration: 0.3 }}
                      className="flex flex-col sm:flex-row gap-4 sm:gap-6 items-center p-4 rounded-2xl border border-gray-50 bg-gray-50/50 hover:bg-gray-50 transition-colors"
                    >
                      {/* Product Image - Now a clickable link */}
                      <Link to={`/search?q=${encodeURIComponent(product.name)}`} className="w-24 h-24 sm:w-32 sm:h-32 bg-white rounded-xl overflow-hidden flex-shrink-0 border border-gray-100 flex items-center justify-center p-2 cursor-pointer hover:shadow-md transition-shadow">
                        {imgErrors[product._id] || !product.image ? (
                          <CartFallbackImage category={product.main_category} />
                        ) : (
                          <img 
                            src={product.image} 
                            alt={product.name} 
                            onError={() => handleImgError(product._id)}
                            className="w-full h-full object-contain"
                          />
                        )}
                      </Link>

                      {/* Product Details - Title is now a clickable link */}
                      <div className="flex-1 flex flex-col w-full text-center sm:text-left">
                        <span className="text-[10px] sm:text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">
                          {product.main_category}
                        </span>
                        <Link to={`/search?q=${encodeURIComponent(product.name)}`}>
                          <h3 className="text-base sm:text-lg font-bold text-gray-900 leading-tight mb-2 line-clamp-2 hover:text-[#1A3626] transition-colors cursor-pointer">
                            {product.name}
                          </h3>
                        </Link>
                        <p className="text-lg font-extrabold text-[#1A3626] mb-4 sm:mb-0">
                          {product.discount_price || 'Price varies'}
                        </p>
                      </div>

                      {/* Controls & Total */}
                      <div className="flex flex-row sm:flex-col items-center sm:items-end justify-between w-full sm:w-auto gap-4 sm:gap-0">
                        <div className="scale-90 sm:scale-100 origin-right">
                          <CartButton product={product} />
                        </div>
                        
                        <div className="sm:mt-auto pt-2 text-right">
                          <p className="text-xs text-gray-500 font-medium mb-0.5">Item Total</p>
                          <p className="text-lg font-bold text-gray-900">
                            ₹{(parseFloat(String(product.discount_price).replace(/[^0-9.]/g, '')) * quantity).toLocaleString()}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </div>

            {/* Right: Order Summary Sidebar */}
            <div className="w-full lg:w-[380px] flex-shrink-0">
              <div className="bg-white rounded-[2rem] border border-gray-100 shadow-sm p-6 sm:p-8 sticky top-28">
                <h3 className="text-xl font-bold text-gray-900 mb-6">Order Summary</h3>
                
                <div className="space-y-4 text-sm font-medium text-gray-600 border-b border-gray-100 pb-6 mb-6">
                  <div className="flex justify-between">
                    <span>Subtotal ({cartItems.length} items)</span>
                    <span className="text-gray-900">₹{subtotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Estimated Shipping</span>
                    <span className={shipping === 0 ? "text-green-600 font-bold" : "text-gray-900"}>
                      {shipping === 0 ? 'FREE' : `₹${shipping}`}
                    </span>
                  </div>
                </div>

                <div className="flex justify-between items-end mb-8">
                  <span className="text-gray-900 font-bold">Total</span>
                  <div className="text-right">
                    <span className="block text-3xl font-extrabold text-[#1A3626]">
                      ₹{grandTotal.toLocaleString()}
                    </span>
                    <span className="text-xs text-gray-400 font-medium">Includes all taxes</span>
                  </div>
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-4 bg-[#1A3626] text-white rounded-2xl font-bold text-lg shadow-lg hover:bg-[#12271a] transition-colors flex items-center justify-center gap-2"
                >
                  Proceed to Checkout
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                </motion.button>
              </div>
            </div>

          </div>
        )}
      </div>
    </DashboardLayout>
  );
}