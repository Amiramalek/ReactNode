// src/components/Sidebar.js
import React from 'react';
import { Link } from 'react-router-dom';
import admin from '../../assets/whiteAdmin.png';
const Sidebar = ({onLogout}) => {
  const userRole = localStorage.getItem('userRole');  // Get user role from localStorage

  return (
    <div className='bg-[#8B6D5C] h-screen md:w-1/6'>
      <h3 className='text-3xl text-center py-4 font-semibold text-white'>{userRole === 'Admin' ? <img src={admin} /> : 'Customer'}</h3>
      <ul>
        {userRole === 'Admin' ? (
          <>
            <li className='hover:bg-[#fff] hover:text-[#8B6D5C] p-4 text-[#fff] border-b'><Link to="/admin/dashboard">Dashboard</Link></li>
            <li className='hover:bg-[#fff] hover:text-[#8B6D5C] p-4 text-[#fff] border-b'><Link to="/admin/profile">Profile</Link></li>
            <li className='hover:bg-[#fff] hover:text-[#8B6D5C] p-4 text-[#fff] border-b'><Link to="/admin/users">Users</Link></li>
            <li className='hover:bg-[#fff] hover:text-[#8B6D5C] p-4 text-[#fff] border-b'><Link to="/admin/services">Services</Link></li>
            <li className='hover:bg-[#fff] hover:text-[#8B6D5C] p-4 text-[#fff] border-b'><Link to="/admin/blogs">Blogs</Link></li>
            <li className='hover:bg-[#fff] hover:text-[#8B6D5C] p-4 text-[#fff] border-b'><Link to="/admin/appointments">Appointments</Link></li>
            <li className='hover:bg-[#fff] hover:text-[#8B6D5C] p-4 text-[#fff] border-b'><Link to="/admin/reviews">Reviews</Link></li>
          </>
        ) : (
          <>
            <li className='hover:bg-[#fff] hover:text-[#8B6D5C] p-4 text-[#fff] border-b'><Link to="/admin/dashboard">Dashboard</Link></li>
            <li className='hover:bg-[#fff] hover:text-[#8B6D5C] p-4 text-[#fff] border-b'><Link to="/admin/profile">Profile</Link></li>
            <li className='hover:bg-[#fff] hover:text-[#8B6D5C] p-4 text-[#fff] border-b'><Link to="/admin/appointments">Appointments</Link></li>
            <li className='hover:bg-[#fff] hover:text-[#8B6D5C] p-4 text-[#fff] border-b'><Link to="/admin/reviews">Reviews</Link></li>
          </>
        )}
      </ul>
      <button onClick={onLogout} className='hover:bg-[#fff] hover:text-[#8B6D5C] w-full p-4 text-[#fff] border-b text-left'>
        Logout
      </button>
    </div>
  );
};

export default Sidebar;
