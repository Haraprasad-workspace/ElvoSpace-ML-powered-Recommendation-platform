import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    // The wrapper is sticky so it stays at the top when scrolling through products
    <div className="sticky top-0 z-50 w-full pt-4 px-4 sm:px-8 pb-4 bg-[#F2F4F3]/80 backdrop-blur-md">
      <motion.nav 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="max-w-7xl mx-auto bg-white rounded-full h-[72px] px-4 sm:px-6 flex items-center justify-between shadow-[0_10px_40px_-10px_rgba(0,0,0,0.08)] border border-gray-100"
      >
        
        {/* Left: Brand / Logo */}
        <div className="flex items-center gap-2 cursor-pointer">
          <div className="w-10 h-10 bg-[#1A3626] rounded-full flex items-center justify-center text-white font-bold text-lg shadow-md">
            E
          </div>
          <span className="hidden sm:block font-bold text-xl text-gray-900 tracking-tight">
            ElvoSpace.
          </span>
        </div>

        {/* Center: Search Bar (Hidden on smaller mobile, visible on md and up) */}
        <div className="hidden md:flex flex-1 max-w-md mx-6 lg:mx-12">
          <div className="relative w-full flex items-center">
            <input 
              type="text" 
              placeholder="Search products, categories..." 
              className="w-full bg-gray-50 border border-gray-100 rounded-full py-2.5 pl-6 pr-12 text-sm focus:outline-none focus:ring-2 focus:ring-[#1A3626]/20 focus:border-[#1A3626] transition-all text-gray-800 placeholder-gray-400"
            />
            {/* Dark Search Button inside the input (matches your reference UI) */}
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="absolute right-1.5 w-8 h-8 bg-[#1A3626] rounded-full flex items-center justify-center text-white"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </motion.button>
          </div>
        </div>

        {/* Right: Actions (Cart, Orders, Profile) */}
        <div className="flex items-center gap-2 sm:gap-4">
          
          {/* Categories & Orders Links (Desktop only) */}
          <div className="hidden lg:flex items-center gap-6 mr-4">
            <a href="#" className="text-sm font-medium text-gray-600 hover:text-[#1A3626] transition-colors">Categories</a>
            <a href="#" className="text-sm font-medium text-gray-600 hover:text-[#1A3626] transition-colors">Orders</a>
          </div>

          {/* Cart Icon Button */}
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="relative w-10 h-10 bg-gray-50 hover:bg-gray-100 rounded-full flex items-center justify-center text-gray-700 transition-colors border border-gray-100"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
            {/* Notification Dot */}
            <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
          </motion.button>

          {/* User Profile Capsule */}
          <motion.div 
            whileHover={{ scale: 1.02 }}
            className="hidden sm:flex items-center gap-3 pl-2 pr-1.5 py-1.5 bg-gray-50 border border-gray-100 rounded-full cursor-pointer hover:bg-gray-100 transition-colors"
          >
            <span className="text-sm font-medium text-gray-700 pl-2">Alex R.</span>
            <div className="w-8 h-8 rounded-full bg-[#1A3626] text-white flex items-center justify-center text-xs font-bold border-2 border-white shadow-sm">
              AR
            </div>
          </motion.div>

          {/* Mobile Menu Toggle Button */}
          <motion.button 
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden w-10 h-10 bg-gray-50 rounded-full flex items-center justify-center text-gray-700"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isMobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
            </svg>
          </motion.button>
        </div>
      </motion.nav>

      {/* Mobile Dropdown Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute top-[88px] left-4 right-4 bg-white rounded-3xl shadow-xl border border-gray-100 p-4 flex flex-col gap-4 md:hidden z-40"
          >
            {/* Mobile Search */}
            <div className="relative w-full flex items-center">
              <input 
                type="text" 
                placeholder="Search products..." 
                className="w-full bg-gray-50 border border-gray-100 rounded-xl py-3 pl-4 pr-12 text-sm focus:outline-none focus:border-[#1A3626]"
              />
              <button className="absolute right-2 w-8 h-8 bg-[#1A3626] rounded-lg flex items-center justify-center text-white">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
            </div>
            
            {/* Mobile Links */}
            <div className="flex flex-col gap-2">
              <a href="#" className="px-4 py-3 bg-gray-50 rounded-xl text-sm font-medium text-gray-700">Categories</a>
              <a href="#" className="px-4 py-3 bg-gray-50 rounded-xl text-sm font-medium text-gray-700">My Orders</a>
              <a href="#" className="px-4 py-3 bg-gray-50 rounded-xl text-sm font-medium text-gray-700">Account Settings</a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}