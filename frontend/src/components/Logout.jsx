import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const Logout = ({ className = "", children }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // 1. Clear all local storage data 
    // (This removes 'token', 'user', and Zustand's persisted cart state)
    localStorage.clear();

    // Note: If you only want to remove specific keys instead of wiping everything:
    // localStorage.removeItem('token');
    // localStorage.removeItem('user');
    // localStorage.removeItem('cart-storage'); // Replace with your Zustand persist name if different

    // 2. Navigate the user back to the login page
    navigate('/login', { replace: true });
  };

  return (
    <motion.button
      onClick={handleLogout}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      // ElvoSpace Strict UI constraints applied here:
      className={`bg-[#1A3626] hover:bg-[#12271a] text-white px-6 py-2.5 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] font-medium transition-colors flex items-center justify-center whitespace-nowrap ${className}`}
      aria-label="Log out of ElvoSpace"
    >
      {/* Allows for passing custom text or an icon, defaults to "Logout" */}
      {children || "Logout"}
    </motion.button>
  );
};

export default Logout;