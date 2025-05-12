const express = require('express');
const multer = require('multer');
const path = require('path');
const Review = require('../models/reviews');
const auth = require('../middleware/auth');
const router = express.Router();

// Upload config (for potential image attachments)
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname)),
});
const upload = multer({ storage });

// Get all reviews (Admin)
router.get('/', auth, async (req, res) => {
  try {
    const reviews = await Review.find();
    res.json(reviews);
  } catch (err) {
    res.status(500).json({ message: 'Server serror' });
  }
});

// Get my review (User)
router.get('/me', auth, async (req, res) => {
  try {
    const review = await Review.findOne({ userId: req.user.id });
    res.json(review);
  } catch (err) {
    res.status(500).json({ message: 'Servers error' });
  }
});

// POST endpoint for creating reviews
router.post('/', async (req, res) => {
  try {
    const { rating, comment, userId } = req.body; // Ensure userId is part of the request body
    const userName = req.body.name;  // Assuming user name is passed in the body or from your session
    const userEmail = req.body.email; // Assuming email is passed in the body or from your session
    const currentDate = new Date(); // Get the current date

    if (!rating || !comment || !userId || !userName || !userEmail) {
      return res.status(400).json({ error: 'Rating, comment, userId, name, and email are required' });
    }

    const newReview = new Review({
      rating: Number(rating),  // Ensure it's a number
      message: comment,
      userId: userId,  // Add userId to the review
      name: userName,  // Add the name to the review
      email: userEmail, // Add the email to the review
      date: currentDate, // Add the current date to the review
    });

    await newReview.save();
    res.status(201).json(newReview); // Send the created review back as a response
  } catch (error) {
    console.error('Error creating review:', error.message || error);
    res.status(500).json({ error: 'Failed to create review', details: error.message || error });
  }
});



// Delete review (Admin)
router.delete('/:id', auth, async (req, res) => {
  try {
    const review = await Review.findByIdAndDelete(req.params.id);
    res.json({ message: 'Review deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Server errosr' });
  }
});

module.exports = router;
