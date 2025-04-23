const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    appointmentDate: { type: Date, required: true },
    dateTime: { type: Date, required: true },
    auditDetails: { type: String },
    contactNumber: { type: String, required: true },
    message: { type: String },
    status: { type: String, default: 'Booked' }
});

const Appointment = mongoose.model('Appointment', appointmentSchema);

module.exports = Appointment;
