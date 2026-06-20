import React from 'react';
import { motion } from 'framer-motion';

export default function FeaturedHero({ 
  product, 
  title = "Elevate Your Space", 
  description = "Discover handcrafted, ergonomically designed items for modern living. Limited editions available.",
  ctaText = "Shop Collection" 
}) {
  // Safely destructure the product data, providing fallbacks if the data is loading or missing
  const {
    name = "Exclusive Item",
    price = "Price Varies",
    imageUrl = "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?q=80&w=800&auto=format&fit=crop"
  } = product || {};

  return (
    <motion.section 
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
      className="bg-[#1A3626] rounded-[2rem] p-10 md:p-12 lg:p-16 flex flex-col md:flex-row gap-10 md:gap-16 items-center justify-between overflow-hidden relative shadow-[0_20px_60px_-15px_rgba(0,0,0,0.2)] border border-white/5"
    >
      
      {/* Background Ambient Elements */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <motion.div 
          animate={{ scale: [1, 1.05, 1], opacity: [0.15, 0.3, 0.15] }} 
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[20%] right-[-10%] w-80 h-80 bg-[#2A4B38] rounded-full blur-[120px]"
        />
        <motion.div 
          animate={{ y: [0, -25, 0], opacity: [0.1, 0.25, 0.1] }} 
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute bottom-[-15%] left-[-10%] w-60 h-60 bg-white/5 rounded-full blur-[100px]"
        />
      </div>

      {/* Left Column: Text Content & CTA */}
      <div className="flex-1 text-center md:text-left relative z-10 flex flex-col items-center md:items-start gap-5">
        <h2 className="text-white text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight">
          {title}
        </h2>
        <p className="text-gray-300 text-lg max-w-lg md:max-w-md lg:max-w-lg">
          {description}
        </p>
        
        {/* Dynamic product info snippet */}
        <div className="mt-4 p-5 bg-white/5 border border-white/10 rounded-3xl flex flex-col items-center md:items-start gap-1 w-full max-w-sm md:max-w-none">
            <span className="text-sm font-medium text-gray-400">Featured:</span>
            <span className="text-xl font-bold text-white tracking-tight line-clamp-1">{name}</span>
            <span className="text-3xl font-extrabold text-[#A2B3A8]">{price}</span>
        </div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.98 }}
          className="mt-6 md:mt-8 px-8 py-4 bg-white text-[#1A3626] rounded-full font-semibold text-lg lg:text-xl shadow-2xl shadow-white/10 hover:bg-gray-100 transition-colors flex items-center justify-center gap-2.5"
        >
          {ctaText}
          <svg className="w-5 h-5 lg:w-6 lg:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </motion.button>
      </div>

      {/* Right Column: Floating Product Image */}
      <div className="flex-1 flex justify-center items-center relative z-10 w-full max-w-md md:max-w-none h-[300px] md:h-[400px] lg:h-[500px]">
        <motion.div
            animate={{ 
                y: [0, -15, 0], 
                rotate: [0, 1.5, 0] 
            }} 
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="w-full h-full flex justify-center items-center"
        >
            <img 
                src={imageUrl} 
                alt={name} 
                className="w-auto h-auto max-w-[95%] max-h-[95%] rounded-3xl object-contain drop-shadow-[0_30px_60px_rgba(255,255,255,0.2)]" 
            />
        </motion.div>
      </div>

    </motion.section>
  );
}