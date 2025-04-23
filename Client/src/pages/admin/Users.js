import React, { useEffect, useState } from 'react';
import { getAllUsers, updateUser, deleteUser } from '../../api';

// Popup Notification Component
const Popup = ({ message, type, onClose, onConfirm }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      if (type !== 'confirm') { // Only auto-close non-confirm popups
        onClose();
      }
    }, 3000); // Close after 3 seconds
    return () => clearTimeout(timer);
  }, [onClose, type]);

  return (
    <div className='fixed w-full top-0 left-0 bg-black bg-opacity-30 h-screen'>
      <div className='bg-white w-1/4 fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded p-6'>
        <h3 className='text-xl font-semibold text-[#8B6D5C] mb-6 text-center'>{message}</h3>
        {type === 'confirm' && (
          <div>
            <button onClick={onConfirm} className='w-full bg-[#8B6D5C] hover:bg-[#7a5f50] text-white py-2 px-4 rounded-md text-base font-medium transition-all duration-200 mb-5'>Yes</button>
            <button onClick={onClose} className='w-full border border-[#8B6D5C] text-[#8B6D5C] py-2 px-4 rounded-md text-base font-medium hover:bg-[#f3ece9] transition-all duration-200'>No</button>
          </div>
        )}
      </div>
    </div>
  );
};

const Users = () => {
  const [users, setUsers] = useState([]);
  const [showEditModal, setShowEditModal] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('Customer');
  const [popup, setPopup] = useState(null); // For showing popup notifications

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5; // Updated to 2 items per page

  const fetchUsers = async () => {
    try {
      const data = await getAllUsers();
      setUsers(data);
    } catch (err) {
      console.error('Failed to fetch users', err);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Pagination logic
  const totalPages = Math.ceil(users.length / itemsPerPage);
  const indexOfLastUser = currentPage * itemsPerPage;
  const indexOfFirstUser = indexOfLastUser - itemsPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

  const handleEditClick = (user) => {
    setCurrentUser(user);
    setName(user.name || '');
    setEmail(user.email || '');
    setRole(user.role || 'Customer');
    setShowEditModal(true);
  };

  const handleDeleteUser = async (id) => {
    setPopup({
      message: 'Are you sure you want to delete this user?',
      type: 'confirm', // A new type to handle the confirmation.
      onConfirm: async () => {
        try {
          await deleteUser(id);
          setPopup({ message: 'User deleted successfully!', type: 'success' });
          fetchUsers();
        } catch (err) {
          setPopup({ message: 'Failed to delete user', type: 'error' });
        }
      },
      onClose: () => setPopup(null), // Close the popup when the user clicks outside or confirms.
    });
  };

  const handleUpdateUser = async (e) => {
    e.preventDefault();
    if (!name || !email || !role) {
      setPopup({ message: 'Please fill in all fields.', type: 'error' });
      return;
    }

    try {
      await updateUser(currentUser._id, { name, email, role });
      setPopup({ message: 'User updated successfully!', type: 'success' });
      setShowEditModal(false);
      fetchUsers();
    } catch (err) {
      setPopup({ message: 'Failed to update user', type: 'error' });
    }
  };

  return (
    <div className='p-6'>
      <div className='bg-white p-4 rounded shadow'>
      <h2 className='text-xl font-semibold text-[#8B6D5C] mb-4'>User Management</h2>
      <table className='w-full text-left'>
        <thead>
          <tr className='text-[#8B6D5C] border-b'>
            <th className='p-3'>#</th>
            <th className='p-3'>Name</th>
            <th className='p-3'>Email</th>
            <th className='p-3'>Role</th>
            <th className='p-3'>Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentUsers.length === 0 ? (
            <tr className='hover:bg-blue-50 text-gray-700'>
              <td colSpan="5" style={{ textAlign: 'center', padding: '20px' }}>No users found.</td>
            </tr>
          ) : (
            currentUsers.map((user, index) => ( 
              <tr key={user._id} className='hover:bg-blue-50 text-gray-700'>
                <td className='p-3'>{indexOfFirstUser + index + 1}</td>
                <td className='p-3'>{user.name}</td>
                <td className='p-3'>{user.email}</td>
                <td className='p-3'>{user.role}</td>
                <td className='flex gap-5 p-3'>
                  <button onClick={() => handleEditClick(user)} className='bg-[#8B6D5C] text-white rounded-lg py-2 px-8'>Edit</button>
                  <button onClick={() => handleDeleteUser(user._id)}>Delete</button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {/* Pagination Controls */}
      <div className='flex justify-center gap-5 pt-12 items-center'>
        <button
          onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className='disabled:bg-gray-400 bg-[#8B6D5C] px-6 py-3 text-white rounded-lg'
        >
          Previous
        </button>
        <span>Page {currentPage} of {totalPages}</span>
        <button
          onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
          className='disabled:bg-gray-400 bg-[#8B6D5C] px-6 py-3 text-white rounded-lg'
        >
          Next
        </button>
      </div>

      {/* Edit Modal */}
      {showEditModal && (
        <div className='fixed w-full top-0 left-0 bg-black bg-opacity-30 h-screen'>
       <div className="bg-white w-1/4 fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded p-6">
            <h3 className='text-xl font-semibold text-[#8B6D5C] mb-6'>Edit User</h3>
            <form onSubmit={handleUpdateUser}>
              <div className="relative z-0 w-full mb-6 group">
                <input
                  type="text"
                  name="name"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent 
                            border-0 border-b-2 border-gray-300 appearance-none 
                            focus:outline-none focus:ring-0 focus:border-[#8B6D5C] peer"
                  placeholder=" "
                  required
                />
                <label
                  htmlFor="name"
                  className="absolute text-sm text-gray-500 duration-300 transform 
                            -translate-y-6 scale-75 top-3 -z-10 origin-[0] 
                            peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 
                            peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Name
                </label>
              </div>

              {/* Email Field */}
              <div className="relative z-0 w-full mb-6 group">
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent 
                            border-0 border-b-2 border-gray-300 appearance-none 
                            focus:outline-none focus:ring-0 focus:border-[#8B6D5C] peer"
                  placeholder=" "
                  required
                />
                <label
                  htmlFor="email"
                  className="absolute text-sm text-gray-500 duration-300 transform 
                            -translate-y-6 scale-75 top-3 -z-10 origin-[0] 
                            peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 
                            peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Email
                </label>
              </div>

              {/* Role Dropdown */}
              <div className="relative z-0 w-full mb-6 group">
                <select
                  name="role"
                  id="role"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent 
                            border-0 border-b-2 border-gray-300 appearance-none 
                            focus:outline-none focus:ring-0 focus:border-[#8B6D5C] peer"
                  required
                >
                  <option value="" disabled hidden></option>
                  <option value="Admin">Admin</option>
                  <option value="Customer">Customer</option>
                </select>
                <label
                  htmlFor="role"
                  className="absolute text-sm text-gray-500 duration-300 transform 
                            -translate-y-6 scale-75 top-3 -z-10 origin-[0] 
                            peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 
                            peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Role
                </label>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                  <svg
                    className="w-4 h-4 text-gray-500"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.25a.75.75 0 01-1.06 0L5.25 8.29a.75.75 0 01-.02-1.08z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                            </div>

              {/* Buttons */}
              <div className="flex gap-4">
                <button
                  type="submit"
                  className="w-full bg-[#8B6D5C] hover:bg-[#7a5f50] text-white py-2 px-4 rounded-md text-base font-medium transition-all duration-200"
                >
                  Save
                </button>
                <button
                  type="button"
                  onClick={() => setShowEditModal(false)}
                  className="w-full border border-[#8B6D5C] text-[#8B6D5C] py-2 px-4 rounded-md text-base font-medium hover:bg-[#f3ece9] transition-all duration-200"
                >
                  Cancel
                </button>
              </div>
            </form>

          </div>
        </div>
      
      )}

      {/* Popup Notification */}
      {popup && <Popup message={popup.message} type={popup.type} onClose={() => setPopup(null)} onConfirm={popup.onConfirm} />}
    </div>
    </div>
  );
};

export default Users;
