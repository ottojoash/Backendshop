const express = require('express');
const connectDB = require('./server');
const cors = require('cors');
const dotenv = require('dotenv');
const authRoutes = require('./routes/auth')
const shopRoutes = require('./routes/shop')
const orderRoutes = require('./routes/order')
const userRoutes = require('./routes/user')
const categoryRoutes = require('./routes/category');

// app.use(cors());
// app.use(express.json());

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
app.use('/api', orderRoutes);
app.use('/api/users', userRoutes);
app.use('/api/shop', categoryRoutes); 



module.exports = app;
