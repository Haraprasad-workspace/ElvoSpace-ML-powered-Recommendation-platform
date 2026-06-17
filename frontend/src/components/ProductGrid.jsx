import React from 'react';
import { motion } from 'framer-motion';
import ProductCard from './ProductCard';

// Dummy data array - replace this with your API state later
const dummyProducts = [
  {
    id: 1,
    name: "Sienna Lounge Chair",
    category: "Lounge",
    price: "$550",
    originalPrice: "$600",
    discount: "-5%",
    imageUrl: "https://images.unsplash.com/photo-1506898667545-14f28a54ef22?q=80&w=600&auto=format&fit=crop",
    isNew: true,
  },
  {
    id: 2,
    name: "Mollis Accent Chair",
    category: "Living",
    price: "$320",
    imageUrl: "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?q=80&w=600&auto=format&fit=crop",
    isNew: false,
  },
  {
    id: 3,
    name: "Elvo Minimalist Desk",
    category: "Office",
    price: "$500",
    originalPrice: "$650",
    discount: "-23%",
    imageUrl: "https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?q=80&w=600&auto=format&fit=crop",
    isNew: false,
  },
  {
    id: 4,
    name: "Kivi Rocking Chair",
    category: "Rocking",
    price: "$245",
    imageUrl: "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?q=80&w=600&auto=format&fit=crop",
    isNew: true,
  },
  {
    id: 5,
    name: "Aura Table Lamp",
    category: "Lighting",
    price: "$120",
    imageUrl: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?q=80&w=600&auto=format&fit=crop",
    isNew: false,
  },
  {
    id: 6,
    name: "Orris Velvet Sofa",
    category: "Lounge",
    price: "$1,200",
    originalPrice: "$1,350",
    discount: "-10%",
    imageUrl: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=80&w=600&auto=format&fit=crop",
    isNew: false,
  }
];

// Framer Motion variants for the staggered cascade effect
const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1 // Delays each child card by 0.1s
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  show: { 
    opacity: 1, 
    y: 0,
    transition: { type: "spring", stiffness: 300, damping: 24 }
  }
};

export default function ProductGrid({ products = dummyProducts, title = "Trending Now" }) {
  return (
    <section className="w-full mt-4">
      {/* Header Section for the Grid */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">
            {title}
          </h2>
          <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm font-medium">
            {products.length} items
          </span>
        </div>

        {/* Minimalist Sort/Filter Dropdown Trigger (Visual only for now) */}
        <motion.button 
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="hidden sm:flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-xl text-sm font-medium text-gray-700 shadow-sm hover:border-[#1A3626]/30 transition-colors"
        >
          <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12" />
          </svg>
          Sort by: Featured
        </motion.button>
      </div>

      {/* The CSS Grid Container */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8"
      >
        {products.map((product) => (
          /* Wrap the ProductCard in a motion.div to catch the staggered animation */
          <motion.div key={product.id} variants={itemVariants}>
            <ProductCard product={product} />
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}