const express = require('express');
const router = express.Router();
const { getProducts, createProduct, getProductById } = require ('../controllers/shop');

// Route to get products
router.get('/products', getProducts);

// Route to create a new product
router.post('/products', createProduct);

// Route to get a single product by ID
router.get('/products/:productId', getProductById);

module.exports = router;
