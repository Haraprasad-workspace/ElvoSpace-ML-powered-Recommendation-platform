import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

export default function SearchBar({ className = "", onSearch }) {
  const [query, setQuery] = useState('');
  const syncIntervalRef = useRef(null);

  const syncProfileData = () => {
    const trackingData = localStorage.getItem('userMetrics');
    const token = localStorage.getItem('token');
    
    if (trackingData && token) {
      const payload = new Blob([trackingData], { type: 'application/json' });
      const success = navigator.sendBeacon(`${import.meta.env.VITE_BACKEND_ORIGIN}/user/sync-metrics`, payload);
      
      if (success) {
        localStorage.removeItem('userMetrics');
      }
    }
  };

  useEffect(() => {
    syncIntervalRef.current = setInterval(syncProfileData, 300000);
    window.addEventListener('beforeunload', syncProfileData);

    return () => {
      clearInterval(syncIntervalRef.current);
      window.removeEventListener('beforeunload', syncProfileData);
    };
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (!query.trim()) return;

    const existingData = JSON.parse(localStorage.getItem('userMetrics') || '{"searches": [], "categoryClicks": {}}');
    
    existingData.searches.push({
      term: query.trim(),
      timestamp: new Date().toISOString()
    });

    localStorage.setItem('userMetrics', JSON.stringify(existingData));
    console.log("Searching for:", query);
    
    if (onSearch) onSearch();
  };

  return (
    <div className={`w-full flex items-center ${className}`}>
      <form onSubmit={handleSearch} className="relative w-full flex items-center">
        <input 
          type="text" 
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          // Using a shorter placeholder on mobile to save space
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