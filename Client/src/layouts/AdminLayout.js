import React, { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import { useLocation, useNavigate } from 'react-router-dom';
import Sidebar from '../components/admin/Sidebar';
import { getAppointments, getAllUsers } from '../api';


const AdminLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const handleLogout = () => {
    localStorage.removeItem('token'); 
    localStorage.removeItem('userId'); 
    localStorage.removeItem('userRole');
    localStorage.removeItem('email');
    navigate('/login');  // Redirect to login page
  };

  const path = location.pathname.split('/').pop();
  const title = path.charAt(0).toUpperCase() + path.slice(1);

  const [appointments, setAppointments] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const data = await getAppointments();
        setAppointments(data);
      } catch (err) {
        console.error('Failed to fetch recent appointments', err);
      }
    };

    fetchAppointments();
  }, []);

  const userRole = localStorage.getItem('userRole')?.toLowerCase();

  const fetchUsers = async () => {
    try {
      const dataUsers = await getAllUsers();
      setUsers(dataUsers);
    } catch (err) {
      console.error('Failed to fetch users', err);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);


  return (
    <div style={{ display: 'flex' }}>
      <Sidebar onLogout={handleLogout} />
      <div className='w-5/6'>
        <header className="flex justify-between items-center p-6">
          <h1 className="text-3xl font-semibold text-[#8B6D5C]">{title}</h1>
          <button onClick={handleLogout} className="bg-[#8B6D5C] text-white px-4 py-2 rounded hover:bg-white hover:text-[#8B6D5C] hover:border-[#8B6D5C] border">
            Logout
          </button>
        </header>

        {/* Stats Cards */}
        {userRole === 'admin' && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 p-6">
            <div className="bg-white p-4 rounded shadow">
              <h2 className="text-sm text-gray-500">Today’s Appointments</h2>
              <p className="text-2xl font-bold text-[#8B6D5C]">{appointments.length}</p>
            </div>
            <div className="bg-white p-4 rounded shadow">
              <h2 className="text-sm text-gray-500">Total Patients</h2>
              <p className="text-2xl font-bold text-[#8B6D5C]">{users.length}</p>
            </div>
            <div className="bg-white p-4 rounded shadow">
              <h2 className="text-sm text-gray-500">Dentists On Duty</h2>
              <p className="text-2xl font-bold text-[#8B6D5C]">5</p>
            </div>
            <div className="bg-white p-4 rounded shadow">
              <h2 className="text-sm text-gray-500">This Month’s Revenue</h2>
              <p className="text-2xl font-bold text-[#8B6D5C]">$8,750</p>
            </div>
          </div>
        )}
        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout;
