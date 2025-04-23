const mongoose = require('mongoose');
// Slide schema and model
const slideSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String, required: true }
});
const Slide = mongoose.model('Slide', slideSchema);
module.exports = Slide;
