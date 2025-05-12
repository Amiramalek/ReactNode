import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getAllServices, updateService, deleteService } from '../../api'; // Adjust path if needed

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
            <button className='w-full bg-[#8B6D5C] hover:bg-[#7a5f50] text-white py-2 px-4 rounded-md text-base font-medium transition-all duration-200 mb-5' onClick={onConfirm}>Yes</button>
            <button className='w-full border border-[#8B6D5C] text-[#8B6D5C] py-2 px-4 rounded-md text-base font-medium hover:bg-[#f3ece9] transition-all duration-200' onClick={onClose}>No</button>
          </div>
        )}
      </div>
    </div>
  );
};

const Services = () => {
  const [services, setServices] = useState([]);
  const [showEditModal, setShowEditModal] = useState(false);
  const [currentService, setCurrentService] = useState({});
  const [heading, setHeading] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);
  const [popup, setPopup] = useState(null); // For showing popup notifications

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const data = await getAllServices();
        setServices(data);
      } catch (err) {
        setPopup({ message: 'Failed to fetch services.', type: 'error' });
      }
    };

    fetchServices();
  }, []);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentServices = services.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(services.length / itemsPerPage);

  const handleEditClick = (service) => {
    setCurrentService(service);
    setHeading(service.name);
    setDescription(service.description);
    setImage(null);
    setShowEditModal(true);
  };

  const handleCloseModal = () => {
    setShowEditModal(false);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    if (!heading || !description) {
      setPopup({ message: 'All fields are required!', type: 'error' });
      return;
    }

    const updatedServiceData = new FormData();
    updatedServiceData.append('name', heading);
    updatedServiceData.append('description', description);

    if (image) {
      updatedServiceData.append('image', image);
    } else {
      updatedServiceData.append('image', currentService.image);
    }

    try {
      await updateService(currentService._id, updatedServiceData);
      setPopup({ message: 'Service updated successfully!', type: 'success' });
      window.location.reload();
    } catch (error) {
      setPopup({ message: 'Failed to update service.', type: 'error' });
    }
  };

  const handleDelete = async (id) => {
    setPopup({
      message: 'Are you sure you want to delete this service?',
      type: 'confirm',
      onConfirm: async () => {
        try {
          await deleteService(id);
          setPopup({ message: 'Service deleted successfully!', type: 'success' });
          setServices(services.filter(service => service._id !== id));
        } catch (error) {
          setPopup({ message: 'Failed to delete service.', type: 'error' });
        }
      },
      onClose: () => setPopup(null), // Close the popup when the user clicks outside or confirms.
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
    }
  };

  return (
    <div className='p-6'>
      <div className='bg-white p-4 rounded shadow'>
        <div className='flex justify-between mb-6'>
          <h2 className='text-xl font-semibold text-[#8B6D5C] mb-4'>Services Management</h2>
          <Link
            to="/admin/new"
            className='bg-[#8B6D5C] text-white px-4 py-2 rounded hover:bg-white hover:text-[#8B6D5C] hover:border-[#8B6D5C] border'
          >
            Add New Service
          </Link>
        </div>
        <table className='w-full text-left'>
          <thead>
            <tr className='text-[#8B6D5C] border-b'>
              <th className='p-2'>Image</th>
              <th className='p-2'>Heading</th>
              <th className='p-2 w-3/5'>Description</th>
              <th className='p-2'>Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentServices.length === 0 ? (
              <tr className='hover:bg-blue-50 text-gray-700'>
                <td colSpan="4" className='p-2'>
                  No services found.
                </td>
              </tr>
            ) : (
              currentServices.map((service) => (
                <tr key={service._id} className='hover:bg-blue-50 text-gray-700'>
                  <td className='p-2'>
                    <img
                      src={`http://localhost:5000/${service.image}`}
                      alt={service.name}
                      style={{ width: '100px', height: '100px', objectFit: 'cover' }}
                    />
                  </td>
                  <td className='p-2'>{service.name}</td>
                  <td className='p-2'>
                    {service.description}
                  </td>
                  <td className='items-center gap-5 p-2'>
                    <button className='bg-[#8B6D5C] text-white rounded-lg py-2 px-8 mr-4'
                      onClick={() => handleEditClick(service)}
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(service._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>

        {/* Pagination Controls */}
        <div className='text-center'>
          <button
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            style={{ padding: '8px 12px', marginRight: '10px' }}
            className='disabled:bg-gray-400 bg-[#8B6D5C] px-6 py-3 text-white rounded-lg'
          >
            Previous
          </button>
          <span>Page {currentPage} of {totalPages}</span>
          <button
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            style={{ padding: '8px 12px', marginLeft: '10px' }}
            className='disabled:bg-gray-400 bg-[#8B6D5C] px-6 py-3 text-white rounded-lg'
          >
            Next
          </button>
        </div>

        {/* Edit Modal */}
        {showEditModal && (
          <div className='fixed w-full top-0 left-0 bg-black bg-opacity-30 h-screen'>
            <div className='bg-white w-1/3 fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded p-6'>
              <h2 className='text-xl font-semibold text-[#8B6D5C] mb-6'>Edit Service</h2>
              <form onSubmit={handleUpdate} encType="multipart/form-data">
                <div className='relative z-0 w-full mb-6 group'>
                  <input
                    type="text"
                    value={heading}
                    onChange={(e) => setHeading(e.target.value)}
                    required
                    placeholder=" " // <-- placeholder space for label animation
                    className='block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent
                    border-0 border-b-2 border-gray-300 appearance-none
                    focus:outline-none focus:ring-0 focus:border-[#8B6D5C] peer
                    transition-all duration-300 ease-in-out'
                  />
                  <label className='absolute text-sm text-gray-500 duration-300 transform
                    -translate-y-6 scale-75 top-3 -z-10 origin-[0]
                    peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0
                    peer-focus:scale-75 peer-focus:-translate-y-6
                    transition-all duration-300 ease-in-out'><strong>Heading</strong></label>
                </div>

                <div className="relative z-0 w-full mb-6 group">
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder=" "
                    required
                    className='block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent
                    border-0 border-b-2 border-gray-300 appearance-none
                    focus:outline-none focus:ring-0 focus:border-[#8B6D5C] peer
                    transition-all duration-300 ease-in-out h-[150px]'
                  />
                  <label className='absolute text-sm text-gray-500 duration-300 transform
                    -translate-y-6 scale-75 top-3 -z-10 origin-[0]
                    peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0
                    peer-focus:scale-75 peer-focus:-translate-y-6
                    transition-all duration-300 ease-in-out'><strong>Description</strong></label>
                </div>

                <div className='mb-4'>
                  <label className="block mb-2 text-sm text-gray-500"><strong>Upload Image:</strong></label>
                  {currentService.image && !image && (
                    <div className="mb-2 text-xs text-gray-500">
                      <strong>Current Image:</strong><br />
                      <img
                        src={`http://localhost:5000/${currentService.image}`}
                        alt="Current service"
                        style={{
                          width: '100px',
                          height: '100px',
                          objectFit: 'cover',
                          marginBottom: '10px'
                        }}
                      />
                    </div>
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="block w-full text-sm text-gray-500
                    file:mr-4 file:py-2 file:px-4
                    file:rounded-full file:border-0
                    file:text-sm file:font-semibold
                    file:bg-[#8B6D5C] file:text-white
                    hover:file:bg-[#a58673]
                    transition-all duration-300"
                  />
                </div>

                <div className="flex gap-4">
                  <button
                    type="submit"
                    className="bg-[#8B6D5C] hover:bg-[#a58673] text-white py-2 px-4 rounded transition-all"
                  >
                    Save Changes
                  </button>
                  <button
                    type="button"
                    onClick={handleCloseModal}
                    className="bg-gray-300 hover:bg-gray-400 text-gray-800 py-2 px-4 rounded transition-all"
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

export default Services;