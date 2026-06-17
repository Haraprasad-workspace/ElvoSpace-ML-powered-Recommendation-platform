import React from 'react';
import { motion } from 'framer-motion';
import Navbar from './Navbar'; // Adjust the import path if necessary

export default function DashboardLayout({ children }) {
  return (
    <div className="min-h-screen bg-[#F2F4F3] font-sans relative overflow-hidden selection:bg-[#1A3626] selection:text-white">
      
      {/* Global Ambient Background Elements */}
      {/* We make these fixed so they don't scroll with the content, providing a smooth parallax-like depth */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <motion.div 
          animate={{ 
            y: [0, -30, 0], 
            opacity: [0.03, 0.08, 0.03],
            scale: [1, 1.1, 1]
          }} 
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[-10%] left-[-10%] w-[40rem] h-[40rem] bg-[#1A3626] rounded-full blur-[120px]"
        />
        <motion.div 
          animate={{ 
            y: [0, 40, 0], 
            opacity: [0.02, 0.06, 0.02],
            scale: [1, 1.2, 1]
          }} 
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute top-[40%] right-[-10%] w-[50rem] h-[50rem] bg-[#2A4B38] rounded-full blur-[150px]"
        />
      </div>

      {/* Main UI Layer */}
      <div className="relative z-10 flex flex-col min-h-screen">
        
        {/* The Floating Navbar */}
        <Navbar />

        {/* Main Content Container 
          Uses max-w-7xl to keep the UI from stretching too far on ultrawide monitors,
          and flex-col with gap-8 to naturally space out your bento components.
        */}
        <motion.main 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="flex-grow w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 flex flex-col gap-6 sm:gap-10"
        >
          {children}
        </motion.main>
        
      </div>
    </div>
  );
}