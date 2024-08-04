const Order = require('../models/Order');

// Controller to create a new order
const createOrder = async (req, res) => {
  const { order, image, name, size, amount, price,phoneNumber, userId } = req.body;

  try {
    const newOrder = new Order({
      order,
      image,
      name,
      size,
      amount,
      price,
      phoneNumber,
      userId,
    });

    await newOrder.save();
    res.status(201).json(newOrder);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// Controller to get all orders
const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find();
    res.json(orders);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// Controller to get order history for a user
const getOrderHistory = async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.params.userId });
    res.json(orders);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// Controller to get details of a specific order
const getOrderDetails = async (req, res) => {
  try {
    const order = await Order.findById(req.params.orderId);
    if (!order) {
      return res.status(404).json({ msg: 'Order not found' });
    }
    res.json(order);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

module.exports = { createOrder, getAllOrders, getOrderHistory, getOrderDetails };
