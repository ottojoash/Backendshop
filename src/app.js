const express = require('express');
const connectDB = require('./server');
const cors = require('cors');
const dotenv = require('dotenv');
const authRoutes = require('./routes/auth')
const shopRoutes = require('./routes/shop')
const orderRoutes = require('./routes/order')
const userRoutes = require('./routes/user')

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



module.exports = app;
