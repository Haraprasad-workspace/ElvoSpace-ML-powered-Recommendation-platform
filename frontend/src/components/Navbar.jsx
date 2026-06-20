import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import SearchBar from './SearchBar';

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [userInfo, setUserInfo] = useState({ name: 'Guest', initial: 'G', shortName: 'Guest' });
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        const parsedData = JSON.parse(storedUser);
        const fullName = parsedData.name || 'User';
        const firstName = fullName.split(' ')[0];
        
        setUserInfo({
          name: fullName,
          initial: firstName.charAt(0).toUpperCase(),
          shortName: firstName.length > 4 ? `${firstName.substring(0, 4)}...` : firstName
        });
      } catch (error) {
        console.error("Error parsing user data", error);
      }
    }
  }, []);

  const handleProfileClick = () => {
    navigate('/user/profile');
  };

  return (
    <div className="sticky top-0 z-50 w-full pt-2 sm:pt-4 px-2 sm:px-8 pb-4 bg-[#F2F4F3]/80 backdrop-blur-md">
      <motion.nav 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        // Adjusted padding and gap for tighter mobile layout
        className="max-w-7xl mx-auto bg-white rounded-full h-[60px] sm:h-[72px] px-3 sm:px-6 flex items-center justify-between shadow-[0_10px_40px_-10px_rgba(0,0,0,0.08)] border border-gray-100 gap-2 sm:gap-4"
      >
        {/* Left: Brand / Logo */}
        <Link to="/dashboard" className="flex items-center gap-2 cursor-pointer flex-shrink-0">
          <div className="w-8 h-8 sm:w-10 sm:h-10 bg-[#1A3626] rounded-full flex items-center justify-center text-white font-bold text-sm sm:text-lg shadow-md">
            E
          </div>
          {/* Hide text brand name on mobile to leave maximum room for the search bar */}
          <span className="hidden md:block font-bold text-xl text-gray-900 tracking-tight">
            ElvoSpace.
          </span>
        </Link>

        {/* Center: Search Bar (Now visible on ALL screens) */}
        {/* min-w constraints ensure it doesn't break the flex layout when squeezed */}
        <div className="flex-1 min-w-[120px] max-w-md mx-1 sm:mx-6 lg:mx-12">
          <SearchBar />
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-1.5 sm:gap-4 flex-shrink-0">
          <div className="hidden lg:flex items-center gap-6 mr-4">
            <Link to="/categories" className="text-sm font-medium text-gray-600 hover:text-[#1A3626] transition-colors">Categories</Link>
            <Link to="/orders" className="text-sm font-medium text-gray-600 hover:text-[#1A3626] transition-colors">Orders</Link>
          </div>

          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="relative w-8 h-8 sm:w-10 sm:h-10 bg-gray-50 hover:bg-gray-100 rounded-full flex items-center justify-center text-gray-700 transition-colors border border-gray-100"
          >
            <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
            <span className="absolute top-1 right-1 sm:top-2 sm:right-2 w-1.5 h-1.5 sm:w-2 sm:h-2 bg-red-500 rounded-full border border-white"></span>
          </motion.button>

          {/* Dynamic User Profile Capsule (Hidden on small screens) */}
          <motion.div 
            onClick={handleProfileClick}
            whileHover={{ scale: 1.02 }}
            className="hidden sm:flex items-center gap-3 pl-2 pr-1.5 py-1.5 bg-gray-50 border border-gray-100 rounded-full cursor-pointer hover:bg-gray-100 transition-colors"
          >
            <span className="text-sm font-medium text-gray-700 pl-2">{userInfo.shortName}</span>
            <div className="w-8 h-8 rounded-full bg-[#1A3626] text-white flex items-center justify-center text-xs font-bold border-2 border-white shadow-sm">
              {userInfo.initial}
            </div>
          </motion.div>

          {/* Hamburger Menu Toggle (Mobile) */}
          <motion.button 
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="sm:hidden w-8 h-8 bg-gray-50 rounded-full flex items-center justify-center text-gray-700"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isMobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
            </svg>
          </motion.button>
        </div>
      </motion.nav>

      {/* Mobile Dropdown Menu (Search bar removed) */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute top-[80px] left-4 right-4 bg-white rounded-3xl shadow-xl border border-gray-100 p-5 flex flex-col gap-2 sm:hidden z-40"
          >
            {/* Mobile Links */}
            <Link 
              to="/categories" 
              onClick={() => setIsMobileMenuOpen(false)}
              className="px-4 py-3 bg-gray-50 rounded-xl text-sm font-medium text-gray-700 hover:text-[#1A3626] transition-colors"
            >
              Categories
            </Link>
            <Link 
              to="/orders" 
              onClick={() => setIsMobileMenuOpen(false)}
              className="px-4 py-3 bg-gray-50 rounded-xl text-sm font-medium text-gray-700 hover:text-[#1A3626] transition-colors"
            >
              My Orders
            </Link>
            <Link 
              to="/user/profile" 
              onClick={() => setIsMobileMenuOpen(false)}
              className="px-4 py-3 bg-gray-50 rounded-xl text-sm font-medium text-gray-700 hover:text-[#1A3626] transition-colors flex items-center gap-3"
            >
              <div className="w-6 h-6 rounded-full bg-[#1A3626] text-white flex items-center justify-center text-[10px] font-bold">
                {userInfo.initial}
              </div>
              Account Profile
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}