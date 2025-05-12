const express = require('express');
const multer = require('multer');
const path = require('path');
const Appointment = require('../models/Appointment'); 
const auth = require('../middleware/auth');
const router = express.Router();
const User = require('../models/Users');


// ✅ Fetch all appointments (Public or Protected)
router.get('/', async (req, res) => {
    try {
        const appointments = await Appointment.find();
        res.json(appointments);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});


// PUT /api/appointments/:id/status
router.put('/:id/status', async (req, res) => {
    try {
        const { status } = req.body;

        const appointment = await Appointment.findByIdAndUpdate(
        req.params.id,
        { status },
        { new: true }
        );

        if (!appointment) {
        return res.status(404).json({ message: 'Appointment not found' });
        }

        res.json(appointment);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error while updating status' });
    }
});


// Create a new appointment (Protected)
router.post('/', auth, async (req, res) => {
    const { name, email, appointmentDate, dateTime, auditDetails, contactNumber, message } = req.body;

    try {
        const newAppointment = new Appointment({
            name,
            email,
            appointmentDate,
            dateTime,
            auditDetails,
            contactNumber,
            message,
        });

        await newAppointment.save();
        res.status(201).json(newAppointment);

    } catch (err) {
        console.error('Error creating appointment:', err);  // Log the error to the console
        res.status(400).json({ message: 'Error creating appointment', error: err.message });
    }
});


// Update an existing appointment (Protected)
// router.put('/:id', auth, async (req, res) => {
//     try {
//         const appointment = await Appointment.findById(req.params.id);
//         if (!appointment) {
//             return res.status(404).json({ message: 'Appointment not found' });
//         }

//         const { name, email, appointmentDate, dateTime, auditDetails, contactNumber, message } = req.body;

//         appointment.name = name || appointment.name;
//         appointment.email = email || appointment.email;
//         appointment.appointmentDate = appointmentDate || appointment.appointmentDate;
//         appointment.dateTime = dateTime || appointment.dateTime;
//         appointment.auditDetails = auditDetails || appointment.auditDetails;
//         appointment.contactNumber = contactNumber || appointment.contactNumber;
//         appointment.message = message || appointment.message;

       

//         const updatedAppointment = await appointment.save();
//         res.json(updatedAppointment);
//     } catch (err) {
//         res.status(400).json({ message: 'Error updating appointment' });
//     }
// });

// Delete an appointment (Protected)
router.delete('/:id', auth, async (req, res) => {
    try {
        const appointment = await Appointment.findByIdAndDelete(req.params.id);
        if (!appointment) {
            return res.status(404).json({ message: 'Appointment not found' });
        }
        res.json({ message: 'Appointment deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});

// Get appointments for the logged-in user (Customer)
router.get('/my', auth, async (req, res) => {
  try {
    const userId = req.user.id; // from auth middleware
    const appointments = await Appointment.find({ user: userId });
    res.json(appointments);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
