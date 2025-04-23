import React, { useEffect, useState } from 'react';
import { getUserDetails, updateUserDetails, updatePassword } from '../../api';
import profileBanner from '../../assets/banner-img.png';

const Profile = () => {
  const [userDetails, setUserDetails] = useState({
    name: '',
    email: '',
    userId: '', // Make sure to include userId here
  });
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  // Fetch user details on component mount
  useEffect(() => {
    const userId = localStorage.getItem('userId'); // Get userId from localStorage

    if (userId) {
      const fetchUserDetails = async () => {
        try {
          const data = await getUserDetails(userId); // Pass userId to API function
          setUserDetails({ name: data.name, email: data.email, userId: userId });
        } catch (err) {
          setError('Failed to fetch user details.');
        }
      };
      fetchUserDetails();
    } else {
      setError('User ID not found.');
    }
  }, []);

  const handleUpdateDetails = async (e) => {
    e.preventDefault();
    try {
      const userId = localStorage.getItem('userId');
      await updateUserDetails({ name: userDetails.name, email: userDetails.email, userId: userDetails.userId });
      setSuccessMessage('Profile details updated successfully!');
    } catch (err) {
      setError('Failed to update details.');
    }
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
  
    const currentPassword = ''; 
  
    try {
      await updatePassword({ password: newPassword });
      setSuccessMessage('Password updated successfully!');
      setNewPassword('');
      setConfirmPassword('');
    } catch (err) {
      setError('Failed to update password.');
    }
  };
  

  return (
    <>
    <div className='w-full p-6'>
      <div className='md:flex md:gap-10 md:justify-between'>
        <div className='w-full shadow-lg rounded p-6'>
          <h2 className='text-xl font-semibold text-[#8B6D5C] mb-4'>Change Profile</h2>
          {error && <div style={{ color: 'red' }}>{error}</div>}
          {successMessage && <div style={{ color: 'green' }}>{successMessage}</div>}

          <form onSubmit={handleUpdateDetails} className="bg-white">
            {/* Name Field */}
            <div className="relative z-0 w-full mb-6 group">
              <input
                type="text"
                name="name"
                id="name"
                value={userDetails.name}
                onChange={(e) => setUserDetails({ ...userDetails, name: e.target.value })}
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-[#8B6D5C] peer"
                placeholder=" "
                required
              />
              <label
                htmlFor="name"
                className="absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] 
                peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 
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
                value={userDetails.email}
                onChange={(e) => setUserDetails({ ...userDetails, email: e.target.value })}
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-[#8B6D5C] peer"
                placeholder=" "
                required
              />
              <label
                htmlFor="email"
                className="absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] 
                peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 
                peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Email
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-[#8B6D5C] hover:bg-[#7a5f50] text-white py-2 px-4 rounded-md text-base font-medium transition-all duration-200"
            >
              Save Changes
            </button>
          </form>

        </div>
        <div className='w-full shadow-lg rounded p-6'>
          <h3 className='text-xl font-semibold text-[#8B6D5C] mb-4'>Change Password</h3>
          <form onSubmit={handleChangePassword} className="bg-white">
            {/* New Password Field */}
            <div className="relative z-0 w-full mb-6 group">
              <input
                type="password"
                name="newPassword"
                id="newPassword"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-[#8B6D5C] peer"
                placeholder=" "
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
              />
              <label
                htmlFor="newPassword"
                className="absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-placeholder-shown:translate-y-0 
                peer-placeholder-shown:scale-100 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                New Password
              </label>
            </div>

            {/* Confirm Password Field */}
            <div className="relative z-0 w-full mb-6 group">
              <input
                type="password"
                name="confirmPassword"
                id="confirmPassword"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-[#8B6D5C] peer"
                placeholder=" "
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
              <label
                htmlFor="confirmPassword"
                className="absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-placeholder-shown:translate-y-0 
                peer-placeholder-shown:scale-100 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Confirm Password
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-[#8B6D5C] hover:bg-[#7a5f50] text-white py-2 px-4 rounded-md text-base font-medium transition-all duration-200"
            >
              Change Password
            </button>
          </form>

        </div>
      </div>
    </div>  
    </>
  );
};

export default Profile;
