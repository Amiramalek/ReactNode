const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  rating: { type: Number, required: true },
  message: { type: String, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
  name: { type: String, required: true },  // Store the name of the user
  email: { type: String, required: true },  // Store the email of the user
  date: { type: Date, default: Date.now },  // Store the date the review was created
});

// Create and export the model
const Review = mongoose.model('Review', reviewSchema);
module.exports = Review;
