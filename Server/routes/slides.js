// routes/slides.js
const express = require('express');
const multer = require('multer');
const path = require('path');
const Slide = require('../models/slide');
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

// Get all slides (Public)
router.get('/', async (req, res) => {
    try {
        const slides = await Slide.find();
        res.json(slides);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});

// Create a new slide (Protected)
router.post('/', auth, upload.single('image'), async (req, res) => {
    const { title, description } = req.body;
    const image = req.file.path;

    try {
        const newSlide = new Slide({ title, description, image });
        await newSlide.save();
        res.status(201).json(newSlide);
    } catch (err) {
        res.status(400).json({ message: 'Error creating slide' });
    }
});

// Update a slide (Protected)
router.put('/:id', auth, upload.single('image'), async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description } = req.body;
        let image = req.body.image;

        if (req.file) {
            image = req.file.path;
        }

        const updatedSlide = await Slide.findByIdAndUpdate(id, { title, description, image }, { new: true });
        res.json(updatedSlide);
    } catch (err) {
        res.status(400).json({ message: 'Error updating slide' });
    }
});

// Delete a slide (Protected)
router.delete('/:id', auth, async (req, res) => {
    try {
        const { id } = req.params;
        await Slide.findByIdAndDelete(id);
        res.json({ message: 'Slide deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
