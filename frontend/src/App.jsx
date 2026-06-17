import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import Dashboard from './pages/Main/Dashboard';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>

        {/* Public Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register/>} />
        <Route path="/Dashboard" element={<Dashboard/>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App