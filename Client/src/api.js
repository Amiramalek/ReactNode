// src/api.js
import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

// Register function
export const registerUser = async (name, email, password) => {
  try {
    const response = await axios.post(`${API_URL}/auth/register`, { name, email, password });
    return response.data;
  } catch (error) {
    console.error('Registration failed', error);
    throw error;
  }
};

// registerUser.js
export const registerUsers = async ({ name, email, password }) => {
  try {
    const response = await axios.post(`${API_URL}/auth/register`, { name, email, password });
    return response.data;
  } catch (error) {
    console.error('Registration failed', error.response?.data || error);
    throw error;
  }
};


// Login function
export const loginUser = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}/auth/login`, { email, password });
    const { token, userId, role, name } = response.data;
    localStorage.setItem('token', token);
    localStorage.setItem('userId', userId);
    localStorage.setItem('userRole', role);
    localStorage.setItem('email', email);
    localStorage.setItem('name', name);
    return response.data;
  } catch (error) {
    console.error('Login failed', error);
    throw error;
  }
};



// ✅ Add New Post with image
export const addPost = async (heading, description, image) => {
  const token = localStorage.getItem('token');

  const formData = new FormData();
  formData.append('name', heading);
  formData.append('description', description);
  formData.append('image', image);

  try {
    const response = await axios.post(`${API_URL}/posts`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Post creation failed', error);
    throw error;
  }
};


// ✅ Fetch all posts
export const getAllPosts = async () => {
  const token = localStorage.getItem('token');

  try {
    const response = await axios.get(`${API_URL}/posts`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Fetching all posts failed', error);
    throw error;
  }
};

// ✅ Fetch a single post by slug
export const getPostBySlug = async (slug) => {
  try {
    const response = await axios.get(`${API_URL}/posts/${slug}`);
    console.log('Post Data:', response.data);
    return response.data;
  } catch (error) {
    console.error(`Error fetching post with slug ${slug}:`, error);
    throw error;
  }
};



// ✅ Update a post
export const updatePost = async (postId, formData) => {
  const token = localStorage.getItem('token');

  try {
    const response = await axios.put(`${API_URL}/posts/${postId}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Failed to update post', error);
    throw error;
  }
};


// ✅ Delete a post
export const deletePost = async (postId) => {
  const token = localStorage.getItem('token');

  try {
    const response = await axios.delete(`${API_URL}/posts/${postId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error deleting post:', error);
    throw error;
  }
};

// ✅ Corrected: Add New Service with image
export const addService = async (heading, description, image) => {
  const token = localStorage.getItem('token');

  const formData = new FormData();
  formData.append('name', heading);
  formData.append('description', description);
  formData.append('image', image);

  try {
    const response = await axios.post(`${API_URL}/services`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Service creation failed', error);
    throw error;
  }
};


// ✅ Fetch all services (posts)
export const getAllServices = async () => {
  const token = localStorage.getItem('token');

  try {
    const response = await axios.get(`${API_URL}/services`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Fetching all services failed', error);
    throw error;
  }
};


// Update a service
export const updateService = async (serviceId, formData) => {
  const token = localStorage.getItem('token');

  try {
    const response = await axios.put(`${API_URL}/services/${serviceId}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Failed to update service', error);
    throw error;
  }
};


// Delete a service
export const deleteService = async (serviceId) => {
  const token = localStorage.getItem('token');

  try {
    const response = await axios.delete(`${API_URL}/services/${serviceId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error deleting service:', error);
    throw error;
  }
};


// Users

// ✅ Add New User
export const addUser = async (name, email, password, role = 'Customer') => {
  const token = localStorage.getItem('token');

  try {
    const response = await axios.post(`${API_URL}/users`, {
      name,
      email,
      password,
      role,
    }, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('User creation failed', error);
    throw error;
  }
};


// ✅ Fetch all users
export const getAllUsers = async () => {
  const token = localStorage.getItem('token');

  try {
    const response = await axios.get(`${API_URL}/users`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Fetching all users failed', error);
    throw error;
  }
};


// ✅ Update a user
export const updateUser = async (userId, updatedData) => {
  const token = localStorage.getItem('token');

  try {
    const response = await axios.put(`${API_URL}/users/${userId}`, updatedData, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Failed to update user', error);
    throw error;
  }
};

// Delete a user
export const deleteUser = async (userId) => {
  const token = localStorage.getItem('token');

  try {
    const response = await axios.delete(`${API_URL}/users/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error deleting user:', error);
    throw error;
  }
};

export const bookAppointment = async (appointmentData) => {
  const token = localStorage.getItem('token'); // Get token from localStorage (if exists)
  
  try {
    // Prepare headers
    const headers = {};
    if (token) {
      headers['Authorization'] = `Bearer ${token}`; // Only add Authorization header if token exists
    }

    // Make the API request with or without the token in headers
    const response = await axios.post(`${API_URL}/appointments`, appointmentData, {
      headers: headers,
    });
    
    return response.data;
  } catch (error) {
    console.error('Error booking appointment:', error);
    throw error;
  }
};


// Fetch all appointments (Protected route)
export const getAppointments = async () => {
  const token = localStorage.getItem('token');
  try {
    const response = await axios.get(`${API_URL}/appointments`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Failed to fetch appointments:', error);
    throw error;
  }
};

// Update appointment status
export const updateAppointmentStatus = async (id, status) => {
  const token = localStorage.getItem('token');

  try {
    const response = await axios.put(`${API_URL}/appointments/${id}/status`, 
      { status }, 
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error('Failed to update appointment status', error);
    throw error;
  }
};

// Delete appointment
export const deleteAppointment = async (id) => {
  const token = localStorage.getItem('token');
  
  try {
    const response = await axios.delete(`${API_URL}/appointments/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error deleting appointment:', error);
    throw error;
  }
};

// Get customers appointment only
export const getMyAppointments = async () => {
  const response = await fetch('http://localhost:5000/api/appointments/my', {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });
  if (!response.ok) throw new Error('Failed to fetch my appointments');
  return await response.json();
};
export const getUserDetails = async (userId) => {
  
  const response = await fetch(`${API_URL}/users/${userId}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });
  if (!response.ok) throw new Error('Failed to fetch my profile');
  return await response.json();
};
export const updateUserDetails = async ({ name, email, userId }) => {
  const token = localStorage.getItem('token');

  // Send the user details as an object
  const response = await axios.put(`${API_URL}/users/${userId}`, { name, email }, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const updatePassword = async (password) => {
  const token = localStorage.getItem('token');
  const userId = localStorage.getItem('userId'); 
  
  const response = await axios.put(`${API_URL}/users/${userId}`, password, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};


// const token = localStorage.getItem('token');

// Submit review
export const submitReview = async (formData) => {
  const token = localStorage.getItem('token');
  const userId = localStorage.getItem('userId');
  const name = localStorage.getItem('name');
  const email = localStorage.getItem('email');

  try {
    const res = await axios.post(`${API_URL}/reviews`, {
      rating: formData.rating,
      comment: formData.comment,
      userId,
      name,
      email,
    }, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    return res.data;
  } catch (error) {
    console.error('Error submitting review:', error.response?.data || error.message);
    throw error;
  }
};



// Get all reviews (Admin)
export const getAllReviews = async () => {
  const token = localStorage.getItem('token');
  
  try {
    const headers = {};
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    const res = await axios.get(`${API_URL}/reviews`, { headers });
    
    return res.data;
  } catch (error) {
    console.error('Error fetching reviews:', error.response ? error.response.data : error.message);
    throw new Error('Failed to fetch reviews');
  }
};


// Delete review (Admin)
export const deleteReview = async (id) => {
  const token = localStorage.getItem('token');
  try {
    const res = await axios.delete(`${API_URL}/reviews/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
  } catch (error) {
    console.error('Error deleting review:', error.response ? error.response.data : error.message);
    throw new Error('Failed to delete review');
  }
};

// Optional helper
export const apiCallWithToken = (url, method = 'GET', data = {}) => {
  const token = localStorage.getItem('token');
  return axios({
    method,
    url: `${API_URL}${url}`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data,
  });
};
