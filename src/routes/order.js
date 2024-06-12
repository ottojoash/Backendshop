const express = require('express');
const router = express.Router();
const { createOrder, getOrderHistory } = require ('../controllers/order');

// Route to create a new order
router.post('/orders', createOrder);

// Route to get order history for a user
router.get('/orders/:userId', getOrderHistory);

module.exports = router;
