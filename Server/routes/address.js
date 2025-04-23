// routes/address.js
const express = require('express');
const Address = require('../models/Address');
const auth = require('../middleware/auth');
const router = express.Router();

// Create or update address for a user (Protected)
router.post('/', auth, async (req, res) => {
    const { userId, address } = req.body;

    try {
        // Check if there is an existing address for the userId
        let existingAddress = await Address.findOne({ userId });

        if (existingAddress) {
            // Update existing address
            existingAddress.fullname = address.fullname;
            existingAddress.addressLine1 = address.addressLine1;
            existingAddress.city = address.city;
            existingAddress.state = address.state;
            existingAddress.zip = address.zip;
            existingAddress.country = address.country;

            const updatedAddress = await existingAddress.save();
            res.json(updatedAddress);
        } else {
            // Create new address
            const newAddress = new Address({
                userId,
                ...address,
            });

            const savedAddress = await newAddress.save();
            res.json(savedAddress);
        }
    } catch (error) {
        console.error('Error saving/updating address:', error);
        res.status(500).json({ error: 'Failed to save/update address' });
    }
});

// Get address by user ID (Protected)
router.get('/:id', auth, async (req, res) => {
    const userId = req.params.id;

    try {
        const addresses = await Address.find({ userId: userId }).exec();
        res.json(addresses);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
