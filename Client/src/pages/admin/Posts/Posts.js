import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getAllPosts, updatePost, deletePost } from '../../../api';

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [showEditModal, setShowEditModal] = useState(false);
  const [currentPost, setCurrentPost] = useState({});
  const [heading, setHeading] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);
  const [popup, setPopup] = useState({ message: '', type: '' });

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [postToDelete, setPostToDelete] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const data = await getAllPosts();
        setPosts(data);
      } catch (err) {
        console.error('Failed to fetch posts', err);
      }
    };

    fetchPosts();
  }, []);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentPosts = posts.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(posts.length / itemsPerPage);

  const showPopup = (message, type = 'success') => {
    setPopup({ message, type });
    setTimeout(() => setPopup({ message: '', type: '' }), 3000);
  };

  const handleEditClick = (post) => {
    setCurrentPost(post);
    setHeading(post.name);
    setDescription(post.description);
    setImage(null);
    setShowEditModal(true);
  };

  const handleCloseModal = () => {
    setShowEditModal(false);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    if (!heading || !description) {
      showPopup('All fields are required!', 'error');
      return;
    }

    const updatedPostData = new FormData();
    updatedPostData.append('name', heading);
    updatedPostData.append('description', description);
    if (image) {
      updatedPostData.append('image', image);
    } else {
      updatedPostData.append('image', currentPost.image);
    }

    try {
      await updatePost(currentPost._id, updatedPostData);
      showPopup('Post updated successfully!', 'success');
      setTimeout(() => {
        window.location.reload();
      }, 1500);
    } catch (error) {
      showPopup('Failed to update post.', 'error');
    }
  };

  const handleDelete = (id) => {
    setPostToDelete(id);
    setShowDeleteConfirm(true);
  };

  const confirmDelete = async () => {
    try {
      await deletePost(postToDelete);
      setPosts(posts.filter(post => post._id !== postToDelete));
      showPopup('Post deleted successfully!', 'success');
    } catch (error) {
      showPopup('Failed to delete post.', 'error');
    } finally {
      setShowDeleteConfirm(false);
      setPostToDelete(null);
    }
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
        <h2 className='text-xl font-semibold text-[#8B6D5C] mb-4'>Posts Management</h2>
        {/* Popup Message */}
        {popup.message && (
          <div>
            {popup.message}
          </div>
        )}

        <Link
          to="/admin/new-post" className='bg-[#8B6D5C] text-white px-4 py-2 rounded hover:bg-white hover:text-[#8B6D5C] hover:border-[#8B6D5C] border'>
          Add New Post
        </Link>
      </div>
      <table className='w-full text-left'>
        <thead>
          <tr className='text-[#8B6D5C] border-b'>
            <th className='p-2'>Image</th>
            <th className='p-2'>Heading</th>
            <th className='p-2'>Description</th>
            <th className='p-2 w-1/6'>Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentPosts.length === 0 ? (
            <tr className='hover:bg-blue-50 text-gray-700'>
              <td colSpan="4">
                No posts found.
              </td>
            </tr>
          ) : (
            currentPosts.map((post) => (
              <tr key={post._id} className='hover:bg-blue-50 text-gray-700'>
                <td className='p-2'>
                  <img
                    src={`http://localhost:5000/${post.image}`}
                    alt={post.name} className='w-[150px]'
                  />
                </td>
                <td className='p-2'>{post.name}</td>
                <td className='p-2 w-1/2'>
                  {post.description}
                </td>
                <td className='items-center gap-5 p-2'>
                  <button className='bg-[#8B6D5C] text-white rounded-lg py-2 px-8 mr-4'
                    onClick={() => handleEditClick(post)}>
                    Edit
                  </button>
                  <button onClick={() => handleDelete(post._id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {/* Pagination */}
      <div className='text-center mt-4 flex justify-center gap-5 items-center'>
        <button
          onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
          disabled={currentPage === 1} className='disabled:bg-gray-400 bg-[#8B6D5C] px-6 py-3 text-white rounded-lg'>
          Previous
        </button>
        <span>Page {currentPage} of {totalPages}</span>
        <button
          onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages} className='disabled:bg-gray-400 bg-[#8B6D5C] px-6 py-3 text-white rounded-lg'>
          Next
        </button>
      </div>

      {/* Edit Modal */}
      {showEditModal && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
        <div className="bg-white rounded-2xl shadow-xl w-full max-w-xl p-6 relative">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4 text-center">Edit Post</h2>
      
          <form onSubmit={handleUpdate} encType="multipart/form-data" className="space-y-4">
            {/* Heading */}
            <div>
              <label className="block font-medium text-gray-700 mb-1">Heading:</label>
              <input
                type="text"
                value={heading}
                onChange={(e) => setHeading(e.target.value)}
                placeholder="Enter post heading"
                required
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
      
            {/* Description */}
            <div>
              <label className="block font-medium text-gray-700 mb-1">Description:</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Enter post description"
                required
                className="w-full px-4 py-2 border rounded-lg h-28 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
      
            {/* Image Upload */}
            <div>
              <label className="block font-medium text-gray-700 mb-1">Upload Image:</label>
              {currentPost.image && !image && (
                <div className="mb-2">
                  <strong className="text-sm text-gray-600">Current Image:</strong><br />
                  <img
                    src={`http://localhost:5000/${currentPost.image}`}
                    alt="Current post"
                    className="mt-1 max-h-40 rounded-md border"
                  />
                </div>
              )}
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="w-full text-sm"
              />
            </div>
      
            {/* Action Buttons */}
            <div className="flex justify-end space-x-3 pt-4">
              <button
                type="button"
                onClick={handleCloseModal}
                className="px-4 py-2 rounded-lg bg-gray-300 hover:bg-gray-400 text-gray-800"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 rounded-lg bg-[#8B6D5C] hover:bg-[#8B6D5C]-700 text-white"
              >
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>
      
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div>
          <div>
            <h3>Confirm Deletion</h3>
            <p>Are you sure you want to delete this post?</p>
            <button
              onClick={confirmDelete}>   
              Yes, Delete
            </button>
            <button
              onClick={() => setShowDeleteConfirm(false)}>
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  </div>
  );
};

export default Posts;
