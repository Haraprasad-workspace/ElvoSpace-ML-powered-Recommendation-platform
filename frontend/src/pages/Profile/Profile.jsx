import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '../../components/DashboardLayout'; // Adjust path as needed

export default function Profile() {
  const [profileData, setProfileData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem('token');
      
      if (!token) {
        navigate('/login');
        return;
      }

      try {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_ORIGIN}/user/profile`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}` // Passing the token for authentication
          }
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || 'Failed to fetch profile');
        }

        setProfileData(data.user);
      } catch (error) {
        console.error("Profile fetch error:", error);
        // Handle error (e.g., clear token if invalid and redirect to login)
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfile();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="flex justify-center items-center min-h-[50vh]">
          <div className="w-12 h-12 border-4 border-gray-200 border-t-[#1A3626] rounded-full animate-spin"></div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-3xl mx-auto w-full bg-white rounded-[2rem] border border-gray-100 shadow-sm p-8 sm:p-12 mt-8"
      >
        <div className="flex items-center gap-6 mb-8 pb-8 border-b border-gray-100">
          <div className="w-24 h-24 bg-[#1A3626] rounded-full flex items-center justify-center text-white text-3xl font-bold shadow-lg">
            {profileData?.name?.charAt(0).toUpperCase() || 'U'}
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{profileData?.name || 'User Profile'}</h1>
            <p className="text-gray-500 mt-1">{profileData?.email || 'No email provided'}</p>
          </div>
        </div>

        {/* Placeholder for future profile settings / order history */}
        <div className="space-y-6">
          <h3 className="text-xl font-semibold text-gray-800">Account Settings</h3>
          <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100">
            <p className="text-sm text-gray-500 mb-4">Manage your preferences and tracking data.</p>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleLogout}
              className="px-6 py-3 bg-red-50 text-red-600 font-medium rounded-xl border border-red-100 hover:bg-red-100 transition-colors"
            >
              Sign Out
            </motion.button>
          </div>
        </div>
      </motion.div>
    </DashboardLayout>
  );
}