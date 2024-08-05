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

// Static Files
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/shop', shopRoutes);
app.use('/api/orders', orderRoutes); // Changed to /api/orders to be consistent
app.use('/api/users', userRoutes);
app.use('/api/categories', categoryRoutes); // Changed to /api/categories to be consistent

module.exports = app;
