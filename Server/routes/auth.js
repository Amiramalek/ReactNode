// routes/auth.js
const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/Users');
const router = express.Router();
require('dotenv').config();



// Register
router.post('/register', async (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({ message: 'Missing required fields' });
    }

    try {
        const existingUser = await User.findOne({ email });

        if (existingUser) {
        return res.status(200).json({ message: 'User already exists', existing: true });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new User({ name, email, password: hashedPassword });
        await user.save();

        res.status(201).json({ message: 'User registered successfully', existing: false });

    } catch (error) {
        console.error("Error registering user:", error);
        res.status(500).json({ message: 'Error registering user' });
    }
});
  
  

// Register
// router.post('/register', async (req, res) => {
//     const { name, email, password } = req.body;
//     try {
//         const hashedPassword = await bcrypt.hash(password, 10);
//         const user = new User({ name, email, password: hashedPassword });
//         await user.save();
//         res.status(201).json({ message: 'User registered successfully' });
//     } catch (error) {
//         res.status(400).json({ message: 'Error registering user' });
//     }
// });

// Login
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: 'Invalid email or password' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: 'Invalid email or password' });

        const token = jwt.sign({ userId: user._id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '30d' });

        res.json({ message: 'Login successful', token, userId: user._id, email: user.email, name: user.name, role: user.role });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
