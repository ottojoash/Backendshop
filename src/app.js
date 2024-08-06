const express = require('express');
const connectDB = require('./server');
const cors = require('cors');
const dotenv = require('dotenv');
const authRoutes = require('./routes/auth');
const shopRoutes = require('./routes/shop');
const orderRoutes = require('./routes/order');
const userRoutes = require('./routes/user');
const categoryRoutes = require('./routes/category');
const path = require('path');

dotenv.config();

const app = express();

// Connect Database
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/shop', shopRoutes);
app.use('/api/orders', orderRoutes); // Ensured endpoint consistency
app.use('/api/users', userRoutes);
app.use('/api/categories', categoryRoutes); // Ensured endpoint consistency

// Serve frontend files if needed (optional)
// If you're serving static frontend files from a 'public' directory, uncomment this line:
// app.use(express.static(path.join(__dirname, 'public')));

module.exports = app;
