const mongoose = require('mongoose');

// Post schema and model
const postSchema = new mongoose.Schema({
    name: String,
    description: String,
    image: String,
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;