const Order = require('../models/Order');
const sendOrderEmail = require('../../mailer')


// Controller to create a new order
// const createOrder = async (req, res) => {
//   const { order, username, phoneNumber } = req.body;

//   try {
//     const newOrder = new Order({
//       order,          // Array of items
//       username,       // Username instead of userId
//       phoneNumber,    // Telephone number
//     });

//     await newOrder.save();
//     res.status(201).json(newOrder);
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).send('Server error');
//   }
// };

// Controller to create a new order
const createOrder = async (req, res) => {
  const { order, username, phoneNumber, email } = req.body;

  try {
    const newOrder = new Order({
      order,          // Array of items
      username,       // Username instead of userId
      phoneNumber,    // Telephone number
      email           // Email address for sending order confirmation
    });

    await newOrder.save();

    // Prepare order data for email
    const orderData = {
      order,
      username,
      phoneNumber,
      email
    };

    // Send order confirmation email
    sendOrderEmail(orderData, (error, info) => {
      if (error) {
        return res.status(500).json({ error: 'Failed to send email' });
      }
      res.status(201).json({ message: 'Order placed and email sent', order: newOrder });
    });
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
    const orders = await Order.find({ username: req.params.username }); // Updated to username
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
