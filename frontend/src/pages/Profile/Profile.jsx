import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import DashboardLayout from '../../components/DashboardLayout';

export default function Profile() {
  const [profileData, setProfileData] = useState(null);
  const [preferenceData, setPreferenceData] = useState(null);
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
        setIsLoading(true);
        // Note: Your backend route expected token in req.body. 
        // A GET request usually can't have a body. You might need to change your backend to GET and read from headers, 
        // OR change this fetch to POST if your backend strictly requires it in the body.
        // Assuming you updated backend to read from headers for standard REST practices:
        const response = await fetch(`${import.meta.env.VITE_BACKEND_ORIGIN}/user/profile`, {
          method: 'GET', // Change to POST if your backend hasn't been updated to read headers
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}` 
          }
        });

        const data = await response.json();

        if (!response.ok || !data.success) {
          throw new Error(data.message || 'Failed to fetch profile data.');
        }

        // Map the specific payload structure from your backend
        setProfileData(data.UserProfileData);
        
        // Handle UserPreferenceData (it might return an array if using .find() in mongoose, or an object if using .findOne())
        const prefs = Array.isArray(data.UserPrefenceData) ? data.UserPrefenceData[0] : data.UserPrefenceData;
        setPreferenceData(prefs);

      } catch (error) {
        console.error("Profile fetch error:", error);
        Swal.fire({
          title: 'Session Error',
          text: error.message || 'Please log in again to view your profile.',
          icon: 'error',
          confirmButtonColor: '#1A3626',
          customClass: { popup: 'rounded-3xl shadow-xl border border-gray-100' }
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfile();
  }, [navigate]);

  const handleLogout = () => {
    Swal.fire({
      title: 'Sign Out?',
      text: "Are you sure you want to log out?",
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#e3342f',
      cancelButtonColor: '#1A3626',
      confirmButtonText: 'Yes, sign out',
      customClass: { popup: 'rounded-3xl shadow-xl border border-gray-100' }
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        localStorage.removeItem('userMetrics'); 
        navigate('/login');
      }
    });
  };

  // Helper to get top categories from Map data
  const getTopCategories = (categoryMap, limit = 3) => {
    if (!categoryMap) return [];
    return Object.entries(categoryMap)
      .sort(([, a], [, b]) => b - a)
      .slice(0, limit)
      .map(([key]) => key);
  };

  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="flex-grow flex flex-col items-center justify-center min-h-[60vh] gap-5">
          <motion.div 
            animate={{ rotate: 360 }}
            transition={{ duration: 1.2, repeat: Infinity, ease: "linear" }}
            className="w-14 h-14 border-4 border-gray-200 border-t-[#1A3626] rounded-full shadow-lg"
          />
          <p className="text-[#1A3626] font-medium animate-pulse tracking-wide">
            Loading profile...
          </p>
        </div>
      </DashboardLayout>
    );
  }

  // Derived data for UI
  const topInterests = getTopCategories(preferenceData?.categoryScores);
  const totalSpent = preferenceData?.totalSpending || 0;
  const orderCount = preferenceData?.totalOrders || 0;

  return (
    <DashboardLayout>
      <div className="flex flex-col items-center pb-12 w-full">
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="w-full max-w-5xl bg-white rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 overflow-hidden relative"
        >
          {/* Decorative Header Banner */}
          <div className="h-32 sm:h-40 bg-[#1A3626] relative overflow-hidden">
            <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-white via-transparent to-transparent"></div>
            
            <div className="absolute top-6 left-6 right-6 flex justify-between items-center z-10">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate('/home')}
                className="w-10 h-10 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-white hover:text-[#1A3626] transition-colors"
                aria-label="Go back to home"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7" />
                </svg>
              </motion.button>
              
              <span className="text-white/80 text-sm font-medium tracking-widest uppercase">
                Account Hub
              </span>
            </div>
          </div>

          <div className="px-6 sm:px-12 pb-10">
            {/* Avatar & Basic Info */}
            <div className="flex flex-col sm:flex-row items-center sm:items-end gap-6 -mt-12 sm:-mt-16 mb-10 relative z-10">
              <div className="w-24 h-24 sm:w-32 sm:h-32 bg-white rounded-full p-2 shadow-lg">
                <div className="w-full h-full bg-[#1A3626] rounded-full flex items-center justify-center text-white text-4xl sm:text-5xl font-bold">
                  {profileData?.name ? profileData.name.charAt(0).toUpperCase() : 'U'}
                </div>
              </div>
              
              <div className="text-center sm:text-left mb-2 flex-grow">
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">
                  {profileData?.name || 'ElvoSpace Member'}
                </h1>
                <div className="flex flex-col sm:flex-row items-center sm:items-start gap-2 sm:gap-4 mt-1">
                  <span className="text-gray-500 font-medium flex items-center gap-1.5">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                    {profileData?.email || 'No email'}
                  </span>
                  <span className="hidden sm:inline text-gray-300">•</span>
                  <span className="text-gray-500 font-medium flex items-center gap-1.5">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                    {profileData?.phoneNumber || 'No phone'}
                  </span>
                </div>
              </div>

              {/* Login Provider Badge */}
              <div className="px-4 py-1.5 bg-gray-50 border border-gray-200 rounded-full text-xs font-semibold text-gray-500 flex items-center gap-2">
                {profileData?.providerId === 'Google' ? (
                   <svg className="w-4 h-4" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
                ) : (
                  <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                )}
                {profileData?.providerId} Account
              </div>
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              
              {/* Left Column: Shopping Stats */}
              <div className="lg:col-span-1 space-y-6">
                <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
                  <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
                    <svg className="w-5 h-5 text-[#1A3626]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg>
                    Shopping Activity
                  </h3>
                  
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
                      <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">Total Orders</p>
                      <p className="text-2xl font-extrabold text-[#1A3626]">{orderCount}</p>
                    </div>
                    <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
                      <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">Spent</p>
                      <p className="text-2xl font-extrabold text-[#1A3626]">₹{totalSpent.toLocaleString()}</p>
                    </div>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full py-3 bg-white border border-gray-200 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 hover:border-[#1A3626] transition-colors flex items-center justify-center gap-2"
                  >
                    View Order History
                  </motion.button>
                </div>
              </div>

              {/* Middle & Right Column: Preferences & Recent Activity */}
              <div className="lg:col-span-2 space-y-6">
                
                {/* Interests Section */}
                <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
                  <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <svg className="w-5 h-5 text-[#1A3626]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
                    Your Top Interests
                  </h3>
                  
                  {topInterests.length > 0 ? (
                    <div className="flex flex-wrap gap-2">
                      {topInterests.map((category) => (
                        <span key={category} className="px-4 py-2 bg-white border border-gray-200 rounded-full text-sm font-semibold text-gray-700 shadow-sm">
                          {category}
                        </span>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-gray-500 bg-white p-4 rounded-xl border border-gray-100">
                      We are still learning what you like. Keep browsing to build your profile!
                    </p>
                  )}
                </div>

                {/* Recent Searches Section */}
                <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
                  <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <svg className="w-5 h-5 text-[#1A3626]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                    Recent Searches
                  </h3>
                  
                  {preferenceData?.topSearchKeywords && preferenceData.topSearchKeywords.length > 0 ? (
                    <div className="flex flex-wrap gap-2">
                      {preferenceData.topSearchKeywords.slice(0, 5).map((term, index) => (
                        <span key={index} className="px-4 py-2 bg-white border border-gray-200 rounded-full text-sm font-medium text-gray-600 shadow-sm hover:border-[#1A3626] transition-colors cursor-pointer">
                          {term}
                        </span>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-gray-500 bg-white p-4 rounded-xl border border-gray-100">
                      Your recent searches will appear here.
                    </p>
                  )}
                </div>

                {/* Account Actions */}
                <div className="pt-4 flex justify-end">
                  <motion.button
                    onClick={handleLogout}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="px-8 py-3 bg-red-50 text-red-600 font-bold rounded-xl hover:bg-red-100 transition-colors"
                  >
                    Sign Out
                  </motion.button>
                </div>

              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </DashboardLayout>
  );
}