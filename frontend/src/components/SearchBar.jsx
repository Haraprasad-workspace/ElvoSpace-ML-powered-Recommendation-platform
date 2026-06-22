import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

export default function SearchBar({ className = "", onSearch }) {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (!query.trim()) return;

    // Route to the SearchResults page, passing the query in the URL
    navigate(`/search?q=${encodeURIComponent(query.trim())}`);
    
    // Trigger the callback (useful for closing the mobile menu)
    if (onSearch) onSearch();
  };

  return (
    <div className={`w-full flex items-center ${className}`}>
      <form onSubmit={handleSearch} className="relative w-full flex items-center">
        <input 
          type="text" 
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search..." 
          className="w-full bg-gray-50 border border-gray-100 rounded-full py-2 sm:py-2.5 pl-4 sm:pl-5 pr-10 sm:pr-12 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#1A3626]/20 focus:border-[#1A3626] transition-all text-gray-800 placeholder-gray-400 min-w-0"
        />
        <motion.button 
          type="submit"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="absolute right-1 sm:right-1.5 w-7 h-7 sm:w-8 sm:h-8 bg-[#1A3626] rounded-full flex items-center justify-center text-white shadow-sm"
        >
          <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </motion.button>
      </form>
    </div>
  );
}