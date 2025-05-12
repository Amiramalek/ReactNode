import React, { useEffect, useState } from 'react';
import { getAllReviews, submitReview, deleteReview } from '../../api';

const Reviews = () => {
  const [reviews, setReviews] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const [formData, setFormData] = useState({
    rating: '',
    comment: '',
  });

  const [hasSubmittedReview, setHasSubmittedReview] = useState(false);

  const userRole = localStorage.getItem('userRole')?.toLowerCase();
  const userEmail = localStorage.getItem('email');

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const allReviews = await getAllReviews();

        if (userRole === 'customer') {
          const userReviews = allReviews.filter((review) => review.email === userEmail);
          setReviews(userReviews);
          setHasSubmittedReview(userReviews.length > 0);
        } else if (userRole === 'admin') {
          setReviews(allReviews);
        }
      } catch (err) {
        console.error('Failed to fetch reviews.', err);
      }
    };

    if (userRole) fetchReviews();
  }, [userRole, userEmail]);

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const name = localStorage.getItem('name');
    const email = localStorage.getItem('email');
    const userId = localStorage.getItem('userId');

    const payload = {
      rating: formData.rating,
      comment: formData.comment,
      userId,
      name,
      email
    };

    try {
      const response = await submitReview(payload);
      setReviews((prev) => [...prev, response]);
      setFormData({ rating: '', comment: '' });
      setHasSubmittedReview(true);
    } catch (err) {
      alert('Failed to submit review');
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteReview(id);
      const updatedReviews = reviews.filter((item) => item._id !== id);
      setReviews(updatedReviews);

      // If user is customer, check again
      if (userRole === 'customer') {
        setHasSubmittedReview(updatedReviews.length > 0);
      }
    } catch (err) {
      alert('Failed to delete review');
    }
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentReviews = reviews.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(reviews.length / itemsPerPage);

  return (
    <div className="p-6">
      <h2 className="text-3xl font-semibold mb-6">
        {userRole === 'admin' ? 'All Customer Reviews (Admin Panel)' : 'My Submitted Reviews'}
      </h2>

      {userRole === 'customer' && !hasSubmittedReview && (
        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
          <h3 className="text-2xl font-semibold mb-4">Submit Your Review</h3>
          <form onSubmit={handleFormSubmit}>
            <div className="mb-4">
              <label htmlFor="rating" className="block text-lg font-medium text-gray-700">Rating</label>
              <select
                id="rating"
                value={formData.rating}
                onChange={(e) => setFormData({ ...formData, rating: e.target.value })}
                className="w-full p-2 border border-gray-300 rounded-md"
                required
              >
                <option value="">Select Rating</option>
                {[1, 2, 3, 4, 5].map(num => (
                  <option key={num} value={num}>{`${num} Star${num > 1 ? 's' : ''}`}</option>
                ))}
              </select>
            </div>
            <div className="mb-4">
              <label htmlFor="comment" className="block text-lg font-medium text-gray-700">Review Message</label>
              <textarea
                id="comment"
                value={formData.comment}
                onChange={(e) => setFormData({ ...formData, comment: e.target.value })}
                className="w-full p-2 border border-gray-300 rounded-md"
                rows="4"
                required
              />
            </div>
            <button type="submit" className="bg-[#8B6D5C] text-white p-3 rounded-md w-full hover:bg-[#7a5f50] transition">
              Submit Review
            </button>
          </form>
        </div>
      )}

      {userRole === 'admin' && (<h3 className="text-xl font-semibold mb-4">Total Reviews: {reviews.length}</h3>)}
      <table className="min-w-full table-auto border-collapse border border-gray-300 mb-6">
        <thead>
          <tr>
            <th className="py-3 px-6 text-left bg-gray-100 border-b">Name</th>
            <th className="py-3 px-6 text-left bg-gray-100 border-b">Email</th>
            <th className="py-3 px-6 text-left bg-gray-100 border-b">Review</th>
            <th className="py-3 px-6 text-left bg-gray-100 border-b">Rating</th>
            <th className="py-3 px-6 text-left bg-gray-100 border-b">Date</th>
            {/* <th className="py-3 px-6 bg-gray-100 border-b">Status</th> */}
            <th className="py-3 px-6 bg-gray-100 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentReviews.length === 0 ? (
            <tr>
              <td colSpan={7} className="text-center py-6 text-gray-500">
                No reviews found.
              </td>
            </tr>
          ) : (
            currentReviews.map((review) => (
              <tr key={review._id} className="hover:bg-gray-50">
                <td className="py-4 px-6 border-b">{review.name}</td>
                <td className="py-4 px-6 border-b">{review.email}</td>
                <td className="py-4 px-6 border-b">{review.comment || review.message}</td>
                <td className="py-4 px-6 border-b">{review.rating}</td>
                <td className="py-4 px-6 border-b">{new Date(review.date).toLocaleDateString()}</td>
                {/* <td className="py-4 px-6 border-b">{review.status || 'Pending'}</td> */}
                <td className="py-4 px-6 border-b">
                  <button
                    onClick={() => handleDelete(review._id)}
                    className="bg-red-600 text-white py-1 px-3 rounded-md hover:bg-red-700 transition"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {userRole === 'admin' && (
        <div className="flex justify-center space-x-4 mt-4">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-indigo-600 text-white rounded-md disabled:bg-gray-400 hover:bg-indigo-700 transition"
          >
            Previous
          </button>
          <span className="py-2">{`Page ${currentPage} of ${totalPages}`}</span>
          <button
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="px-4 py-2 bg-indigo-600 text-white rounded-md disabled:bg-gray-400 hover:bg-indigo-700 transition"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default Reviews;
