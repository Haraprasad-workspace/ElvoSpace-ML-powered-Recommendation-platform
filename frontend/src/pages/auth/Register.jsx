import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Swal from 'sweetalert2';
import { useNavigate } from "react-router-dom"



export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate()

  const handleRegister = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Basic validation including the new phone field
      if (!name || !email || !phone || !password || !confirmPassword) {
        throw new Error('Please fill in all fields.');
      }

      if (password !== confirmPassword) {
        throw new Error('Passwords do not match.');
      }

      if (password.length < 6) {
        throw new Error('Password must be at least 6 characters long.');
      }

      const response = await fetch(`${import.meta.env.VITE_BACKEND_ORIGIN}/register`, {
        method:"POST",
        headers:{
            'Content-Type':'application/json' 
        },
        body:JSON.stringify({
            name , email , phoneNumber:phone , password
        })
      })

      const data = await response.json() ;

      if(!response.ok){
        throw new Error(data.message || "unable to register")
      }

      localStorage.setItem(
        "token" , data.jwt_token
      )

      localStorage.setItem(
        "user",
        JSON.stringify(data.user)
       )
      
      Swal.fire({
        title: 'Account Created!',
        text: 'Welcome to ElvoSpace. Your journey begins here.',
        icon: 'success',
        confirmButtonColor: '#1A3626',
        background: '#ffffff',
        color: '#111827',
        customClass: {
          popup: 'rounded-3xl shadow-xl border border-gray-100',
        }
      });
      navigate("/home")

    } catch (err) {
      Swal.fire({
        title: 'Registration Failed',
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

  const handleGoogleSignup = () => {
    Swal.fire({
      toast: true,
      position: 'top-end',
      icon: 'info',
      title: 'Connecting to Google...',
      showConfirmButton: false,
      timer: 2000,
      timerProgressBar: true,
      background: '#1A3626',
      color: '#ffffff',
    });
  };

  return (
    <div className="min-h-screen bg-[#F2F4F3] flex items-center justify-center p-4 sm:p-8 font-sans relative overflow-hidden">
      
      {/* Background Ambient Elements */}
      <motion.div 
        animate={{ y: [0, -20, 0], opacity: [0.1, 0.2, 0.1] }} 
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[-10%] left-[-5%] w-96 h-96 bg-[#1A3626] rounded-full blur-[100px]"
      />
      <motion.div 
        animate={{ y: [0, 20, 0], opacity: [0.05, 0.15, 0.05] }} 
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute bottom-[-10%] right-[-5%] w-[30rem] h-[30rem] bg-[#2A4B38] rounded-full blur-[120px]"
      />

      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="max-w-3xl w-full bg-white rounded-[2rem] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] overflow-hidden relative z-10"
      >
        {/* Top Branding Banner */}
        <div className="bg-[#1A3626] p-8 sm:p-10 text-center relative overflow-hidden">
          <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-white via-transparent to-transparent"></div>
          <div className="relative z-10 flex flex-col items-center">
            <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-[#1A3626] font-bold text-xl mb-4 shadow-lg">
              E
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">Join ElvoSpace</h1>
            <p className="text-[#A2B3A8] mt-2 text-sm sm:text-base">Elevate your living space today.</p>
          </div>
        </div>

        {/* Form Container */}
        <div className="p-8 sm:p-10 lg:p-12">
          <form onSubmit={handleRegister} className="space-y-6">
            
            {/* Full Name - Spans full width */}
            <div className="space-y-1.5">
              <label className="block text-sm font-medium text-gray-700">Full Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Alex Ryman"
                className="w-full px-4 py-3.5 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#1A3626]/20 focus:border-[#1A3626] transition-all text-gray-900 placeholder-gray-400"
              />
            </div>

            {/* Email and Phone - 2 Column Grid on Desktop */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-1.5">
                <label className="block text-sm font-medium text-gray-700">Email Address</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="alex@example.com"
                  className="w-full px-4 py-3.5 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#1A3626]/20 focus:border-[#1A3626] transition-all text-gray-900 placeholder-gray-400"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-sm font-medium text-gray-700">Phone Number</label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+1 (555) 000-0000"
                  className="w-full px-4 py-3.5 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#1A3626]/20 focus:border-[#1A3626] transition-all text-gray-900 placeholder-gray-400"
                />
              </div>
            </div>

            {/* Passwords - 2 Column Grid on Desktop */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-1.5">
                <label className="block text-sm font-medium text-gray-700">Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-4 py-3.5 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#1A3626]/20 focus:border-[#1A3626] transition-all text-gray-900 placeholder-gray-400"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-sm font-medium text-gray-700">Confirm Password</label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-4 py-3.5 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#1A3626]/20 focus:border-[#1A3626] transition-all text-gray-900 placeholder-gray-400"
                />
              </div>
            </div>

            {/* Actions Section */}
            <div className="pt-2">
              <motion.button
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={isLoading}
                className="w-full py-4 bg-[#1A3626] text-white rounded-2xl font-medium text-base shadow-lg shadow-[#1A3626]/20 hover:bg-[#12271a] transition-colors flex items-center justify-center disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                ) : (
                  'Create Account'
                )}
              </motion.button>

              <div className="relative flex items-center py-6">
                <div className="flex-grow border-t border-gray-200"></div>
                <span className="flex-shrink-0 mx-4 text-gray-400 text-sm font-medium">or continue with</span>
                <div className="flex-grow border-t border-gray-200"></div>
              </div>

              <motion.button
                onClick={handleGoogleSignup}
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
                Google
              </motion.button>
            </div>

            <p className="text-center text-sm text-gray-500 pt-2">
              Already have an account?{' '}
              <a href="/login" className="font-semibold text-[#1A3626] hover:text-[#2A4B38] transition-colors">
                Sign in
              </a>
            </p>
          </form>
        </div>
      </motion.div>
    </div>
  );
}