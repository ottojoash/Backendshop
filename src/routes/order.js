const express = require('express');
const router = express.Router();
const { createOrder, getAllOrders, getOrderHistory, getOrderDetails } = require('../controllers/order');

// Route to create a new order
router.post('/orders', createOrder);

// Route to get all orders
router.get('/orders', getAllOrders);

// Route to get order history for a user
router.get('/orders/user/:userId', getOrderHistory);

// Route to get details of a specific order
router.get('/orders/:orderId', getOrderDetails);

module.exports = router;
