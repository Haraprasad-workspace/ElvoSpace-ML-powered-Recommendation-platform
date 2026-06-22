import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import SearchResults from './pages/Main/SearchResults';
import Profile from './pages/Profile/Profile'
import Home from './pages/Main/Home';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>

        {/* Public Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register/>} />
        <Route path="/home" element={<Home/>} />
        <Route path='/search' element={<SearchResults/>}/>
        <Route path='/user/profile' element={<Profile/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App