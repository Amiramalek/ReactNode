const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();

const authRoutes = require('./routes/auth');
const postRoutes = require('./routes/posts');
const userRoutes = require('./routes/users');
const slideRoutes = require('./routes/slides');
const addressRoutes = require('./routes/address');
const servicesRoutes = require('./routes/services');
const reviewsRoutes = require('./routes/reviews');
const appointmentsRoutes = require('./routes/appointments');
const app = express();
app.use(express.json());
app.use(cors());
app.use('/uploads', express.static('uploads'));

// Connect DB
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/users', userRoutes);
app.use('/api/services', servicesRoutes);
app.use('/api/slides', slideRoutes);
app.use('/api/appointments', appointmentsRoutes);
app.use('/api/addresses', addressRoutes);
app.use('/api/reviews', reviewsRoutes);

app.listen(5000, () => console.log('Server running on port 5000'));
