import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';



export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();


  
  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Basic validation
      if (!email || !password) {
        throw new Error('Please fill in all fields.');
      }

      // Replace this with your actual API endpoint later
      const response = await fetch(`${import.meta.env.VITE_BACKEND_ORIGIN}/login`,{
        method : "POST" ,
        headers:{
            "Content-Type" : "application/json"
        } ,
        body : JSON.stringify({
            email , password
        })
      });

      const data = await response.json() ;

      if(!response.ok){
        throw new Error(data.message || "Login Failed")
      }
       
      localStorage.setItem(
        "token" , data.token
      )
      localStorage.setItem(
        "user",
        JSON.stringify(data.user)
       )
      
      // Success Alert matched to the UI theme
      Swal.fire({
        title: 'Welcome Back!',
        text: 'You have successfully logged in.',
        icon: 'success',
        confirmButtonColor: '#1A3626', // Deep green to match theme
        background: '#ffffff',
        color: '#111827',
        customClass: {
          popup: 'rounded-3xl shadow-xl border border-gray-100',
        }
      });

      navigate("/");

      // Handle successful redirect or token storage here

    } catch (err) {
      // Error Alert matched to the UI theme
      Swal.fire({
        title: 'Login Failed',
        text: err.message || 'Something went wrong.',
        icon: 'error',
        confirmButtonColor: '#1A3626',
        background: '#ffffff',
        color: '#111827',
        customClass: {
          popup: 'rounded-3xl shadow-xl border border-gray-100',
        }
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = () => {
    Swal.fire({
      toast: true,
      position: 'top-end',
      icon: 'info',
      title: 'Redirecting to Google...',
      showConfirmButton: false,
      timer: 2000,
      timerProgressBar: true,
      background: '#1A3626',
      color: '#ffffff',
    });
  };

  return (
    <div className="min-h-screen bg-[#F2F4F3] flex items-center justify-center p-4 sm:p-8 font-sans">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="max-w-5xl w-full bg-white rounded-[2rem] shadow-[0_20px_50px_-12px_rgba(0,0,0,0.1)] overflow-hidden flex flex-col md:flex-row"
      >
        {/* Left Side: Branding/Visual (Deep Green) */}
        <div className="md:w-5/12 bg-[#1A3626] p-10 flex flex-col justify-between relative overflow-hidden">
          {/* Abstract floating shapes */}
          <motion.div 
            animate={{ y: [0, -10, 0] }} 
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -top-10 -right-10 w-40 h-40 bg-white/5 rounded-full blur-2xl"
          />
          <motion.div 
            animate={{ y: [0, 15, 0] }} 
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="absolute -bottom-20 -left-10 w-60 h-60 bg-[#2A4B38] rounded-full blur-3xl"
          />

          <div className="relative z-10">
            <h2 className="text-white text-3xl md:text-4xl font-semibold tracking-tight leading-snug">
              Make Space For<br />Something Better.
            </h2>
            <p className="text-gray-300 mt-4 text-sm max-w-xs">
              Discover exclusive collections designed for modern relaxation spaces.
            </p>
          </div>

          <div className="relative z-10 mt-12 md:mt-0">
            {/* Logo Placeholder */}
            <div className="flex items-center gap-2 text-white font-medium text-lg">
              <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center text-[#1A3626] font-bold">
                E
              </div>
              ElvoSpace
            </div>
          </div>
        </div>

        {/* Right Side: Login Form */}
        <div className="md:w-7/12 p-8 sm:p-12 lg:p-16 flex flex-col justify-center">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h1 className="text-3xl font-bold text-gray-900 mb-2 tracking-tight">Welcome back</h1>
            <p className="text-gray-500 mb-8 text-sm">Please enter your details to access your account.</p>

            <form onSubmit={handleLogin} className="space-y-5">
              {/* Email Input */}
              <div className="space-y-1.5">
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full px-4 py-3.5 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#1A3626]/20 focus:border-[#1A3626] transition-all text-gray-900 placeholder-gray-400"
                  required
                />
              </div>

              {/* Password Input */}
              <div className="space-y-1.5">
                <label className="block text-sm font-medium text-gray-700">Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-4 py-3.5 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#1A3626]/20 focus:border-[#1A3626] transition-all text-gray-900 placeholder-gray-400"
                  required
                />
              </div>

              {/* Forgot Password Link */}
              <div className="flex justify-end">
                <a href="#" className="text-sm font-medium text-[#1A3626] hover:text-[#2A4B38] transition-colors">
                  Forgot Password?
                </a>
              </div>

              {/* Login Button */}
              <motion.button
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={isLoading}
                className="w-full py-3.5 bg-[#1A3626] text-white rounded-2xl font-medium text-base shadow-lg shadow-[#1A3626]/20 hover:bg-[#12271a] transition-colors flex items-center justify-center disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                ) : (
                  'Sign In'
                )}
              </motion.button>

              <div className="relative flex items-center py-4">
                <div className="flex-grow border-t border-gray-200"></div>
                <span className="flex-shrink-0 mx-4 text-gray-400 text-sm">or</span>
                <div className="flex-grow border-t border-gray-200"></div>
              </div>

              {/* Google Login Button */}
              <motion.button
                onClick={handleGoogleLogin}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
                type="button"
                className="w-full py-3.5 bg-white border border-gray-200 text-gray-700 rounded-2xl font-medium text-base hover:bg-gray-50 transition-colors flex items-center justify-center gap-3"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                </svg>
                Continue with Google
              </motion.button>
            </form>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}