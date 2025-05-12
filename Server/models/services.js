const mongoose = require('mongoose');

// Services schema and model
const servicesSchema = new mongoose.Schema({
    name: String,
    description: String,
    image: String,
});

const Services = mongoose.model('Services', servicesSchema);

module.exports = Services;