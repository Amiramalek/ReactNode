// src/App.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import AdminLayout from './layouts/AdminLayout';
import FrontendLayout from './layouts/FrontendLayout';

import Dashboard from './pages/admin/Dashboard';
import Users from './pages/admin/Users';
import Services from './pages/admin/Services';
import Posts from './pages/admin/Posts/Posts';
import NewPost from './pages/admin/Posts/NewPost';
import NewService from './pages/admin/NewService';
import Appointments from './pages/admin/Appointments';
import Reviews from './pages/admin/Reviews';
import Profile from './pages/admin/Profile';


import Home from './pages/frontend/Home';
import Login from './components/frontend/Login';
import Register from './components/frontend/Register';
import About from './pages/frontend/About';
import Service from './pages/frontend/Service';
import Faqs from './pages/frontend/Faqs';
import Terms from './pages/frontend/Terms';
import Privacy from './pages/frontend/Privacy';
import Return from './pages/frontend/Return';
import Blogs from './pages/frontend/Blogs';
import BlogDetail from './pages/frontend/BlogDetail';

import PrivateRoute from './components/PrivateRoute';

import './index.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function App() {
  return (
    <Routes>
      {/* Admin Dashboard Routes */} 
      <Route
        path="/admin"
        element={
          <PrivateRoute requiredRole="Admin">
            <AdminLayout />
          </PrivateRoute>
        }
      >
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="users" element={<Users />} />
        <Route path="services" element={<Services />} />
        <Route path="blogs" element={<Posts />} />
        <Route path="new-post" element={<NewPost />} />
        <Route path="new" element={<NewService />} />
        <Route path="appointments" element={<Appointments />} />
        <Route path="profile" element={<Profile />} />
        <Route path="reviews" element={<Reviews />} />
      </Route>

      {/* Frontend Routes */}
      <Route path="/" element={<FrontendLayout />}>
        {/* Index/Home page */}
        <Route index element={<Home />} />

        {/* Auth Pages */}
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />

        {/* Static Pages */}
        <Route path="about" element={<About />} />
        <Route path="services" element={<Service />} />
        <Route path="faqs" element={<Faqs />} />
        <Route path="terms-of-service" element={<Terms />} />
        <Route path="privacy-policy" element={<Privacy />} />
        <Route path="return-policy" element={<Return />} />

        {/* Blog Routes */}
        <Route path="blogs" element={<Blogs />} />
        <Route path="blogs/:slug" element={<BlogDetail />} />
      </Route>
    </Routes>

  );
}

export default App;
