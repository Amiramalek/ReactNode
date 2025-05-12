// src/components/frontend/Register.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../../api';
import { Link } from 'react-router-dom'; // Import Link here

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await registerUser(name, email, password);
      navigate('/login'); // Redirect to login page after successful registration
    } catch (err) {
      setError('Error registering user');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md sm:max-w-lg bg-white p-8 sm:p-10 rounded-lg shadow-lg">
        <h2 className="text-center text-2xl sm:text-3xl font-bold text-gray-800 mb-6">Register</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-5">
            <label className="block text-gray-700 mb-1 text-sm sm:text-base">Full Name</label>
            <input
              type="text"
              placeholder="Enter your full name"
              className="w-full px-4 py-2.5 sm:py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#8B6D5C]"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="mb-5">
            <label className="block text-gray-700 mb-1 text-sm sm:text-base">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full px-4 py-2.5 sm:py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#8B6D5C]"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 mb-1 text-sm sm:text-base">Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              className="w-full px-4 py-2.5 sm:py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#8B6D5C]"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
          <button
            type="submit"
            className="w-full bg-[#8B6D5C] text-white py-3 rounded-md text-base sm:text-lg hover:bg-[#7a5f50] transition duration-200"
          >
            Register
          </button>
        </form>

        {/* Login Section */}
        <div className="mt-6 text-center">
          <p className="text-sm sm:text-base text-gray-700">Already have an account?</p>
          <Link
            to="/login"
            className="inline-block mt-2 bg-[#8B6D5C] text-white px-6 py-2 rounded-md hover:bg-[#7a5f50] transition duration-200"
          >
            Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
