// src/pages/admin/NewService.js

import React, { useState } from 'react';
import { addService } from '../../api'; // Adjust path if needed

const NewService = () => {
  const [heading, setHeading] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!heading || !description || !image) {
      alert('All fields are required!');
      return;
    }

    try {
      await addService(heading, description, image);
      alert('Service added successfully!');
      window.location.href = '/admin/services';
    } catch (error) {
      alert('Failed to add service.');
    }
  };

  return (
    <div className='p-6'>
      <div className='w-full shadow-lg rounded p-6'>
        <h2 className='text-xl font-semibold text-[#8B6D5C] mb-4'>Add New Service</h2>
        <form onSubmit={handleSubmit} encType="multipart/form-data" className="space-y-6">
          {/* Heading Field */}
          <div className="relative z-0 w-full group">
            <input
              type="text"
              value={heading}
              onChange={(e) => setHeading(e.target.value)}
              placeholder=" "
              required
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent
              border-0 border-b-2 border-gray-300 appearance-none
              focus:outline-none focus:ring-0 focus:border-[#8B6D5C] peer
              transition-all duration-300 ease-in-out"
            />
            <label className="absolute text-sm text-gray-500 duration-300 transform
              -translate-y-6 scale-75 top-3 -z-10 origin-[0]
              peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0
              peer-focus:scale-75 peer-focus:-translate-y-6
              transition-all duration-300 ease-in-out">
              <strong>Heading</strong>
            </label>
          </div>

          {/* Description Field */}
          <div className="relative z-0 w-full group">
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder=" "
              required
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent
              border-0 border-b-2 border-gray-300 appearance-none
              focus:outline-none focus:ring-0 focus:border-[#8B6D5C] peer
              transition-all duration-300 ease-in-out h-[150px]"
            />
            <label className="absolute text-sm text-gray-500 duration-300 transform
              -translate-y-6 scale-75 top-3 -z-10 origin-[0]
              peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0
              peer-focus:scale-75 peer-focus:-translate-y-6
              transition-all duration-300 ease-in-out">
              <strong>Description</strong>
            </label>
          </div>

          {/* Image Upload Field */}
          <div className="mb-4">
            <label className="block mb-2 text-sm font-semibold text-gray-700"><strong>Upload Image:</strong></label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setImage(e.target.files[0])}
              required
              className="block w-full text-sm text-gray-500
              file:mr-4 file:py-2 file:px-4
              file:rounded-full file:border-0
              file:text-sm file:font-semibold
              file:bg-[#8B6D5C] file:text-white
              hover:file:bg-[#a58673]
              transition-all duration-300"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="bg-[#8B6D5C] hover:bg-[#a58673] text-white py-2 px-4 rounded transition-all"
          >
            Save Service
          </button>
        </form>

      </div>
    </div>
  );
};

export default NewService;
