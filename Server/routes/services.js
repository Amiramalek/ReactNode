// routes/blogs.js
const express = require('express');
const multer = require('multer');
const path = require('path');
const Services = require('../models/services');
const auth = require('../middleware/auth');
const router = express.Router();

// Set up multer for image uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    },
});

const upload = multer({ storage });

// Get all posts (Public)
router.get('/', async (req, res) => {
    try {
        const posts = await Services.find();
        res.json(posts);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});

// Get a single post by ID (Public)
router.get('/:id', async (req, res) => {
    try {
        const post = await Services.findById(req.params.id);
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }
        res.json(post);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});

// Create a new post (Protected)
router.post('/', auth, upload.single('image'), async (req, res) => {
    const { name, description } = req.body;
    const image = req.file ? req.file.path : null;

    try {
        const newPost = new Services({
            name,
            description,
            image,
        });

        await newPost.save();
        res.status(201).json(newPost);
    } catch (err) {
        res.status(400).json({ message: 'Error creating post' });
    }
});

// Update an existing post (Protected)
router.put('/:id', auth, upload.single('image'), async (req, res) => {
    try {
        const post = await Services.findById(req.params.id);
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }

        const { name, description } = req.body;
        post.name = name || post.name;
        post.description = description || post.description;

        if (req.file) {
            post.image = req.file.path;
        }

        const updatedPost = await post.save();
        res.json(updatedPost);
    } catch (err) {
        res.status(400).json({ message: 'Error updating post' });
    }
});

// Delete a post (Protected)
router.delete('/:id', auth, async (req, res) => {
    try {
        const post = await Services.findByIdAndDelete(req.params.id);
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }
        res.json({ message: 'Post deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});
 

module.exports = router;
