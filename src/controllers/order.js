const Order = require('../models/Order');

// Controller to create a new order
const createOrder = async (req, res) => {
  const { order, image, name, size, amount, price, userId } = req.body;

  try {
    const newOrder = new Order({
      order,
      image,
      name,
      size,
      amount,
      price,
      userId,
    });

    await newOrder.save();
    res.status(201).json(newOrder);
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

module.exports = { createOrder, getOrderHistory };
