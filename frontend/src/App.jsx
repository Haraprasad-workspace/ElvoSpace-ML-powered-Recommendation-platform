import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import Dashboard from './pages/Main/Dashboard';
import Home from './pages/Main/Home';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>

        {/* Public Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register/>} />
        <Route path="/home" element={<Home/>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App