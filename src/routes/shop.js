const express = require('express');
const router = express.Router();
const upload = require('../middleware/upload');
const { createProduct, getProducts, getProductById } = require('../controllers/shop');

// Route to handle product creation with image upload
router.post('/products', upload.single('image'), createProduct);

// Route to get all products
router.get('/products', getProducts);

// Route to get a single product by ID
router.get('/products/:productId', getProductById);

module.exports = router;
