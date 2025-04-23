// routes/users.js
const express = require('express');
const User = require('../models/Users');
const bcrypt = require('bcryptjs');
const auth = require('../middleware/auth');
const router = express.Router();

// Get all users (Protected)
router.get('/', auth, async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});

// Get user by ID (Protected)
router.get('/:id', auth, async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(user);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});

// Update user (Protected)
router.put('/:id', auth, async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const userDetails = {};
        if (name) userDetails.name = name;
        if (email) userDetails.email = email;

        if (password) {
            const hashedPassword = await bcrypt.hash(password, 10);
            userDetails.password = hashedPassword;
        }

        const updatedUser = await User.findByIdAndUpdate(
            req.params.id,
            userDetails,
            { new: true }
        );

        res.json(updatedUser);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});

// Delete user (Protected)
router.delete('/:id', auth, async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id);
        res.json({ message: 'User deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
