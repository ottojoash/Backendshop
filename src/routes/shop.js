const express = require('express');
const router = express.Router();
const { upload, uploadToFirebase } = require('../middleware/upload');
const { createProduct, getProducts, getProductById, updateProduct, deleteProduct } = require('../controllers/product');
const Product = require('../models/Product'); // Import Product model


// Route for handling multiple image uploads
router.post('/products', upload, uploadToFirebase, async (req, res) => {
  try {
    const { title, category, description, rating, price, originalPrice } = req.body;

    // Prepare image URLs
    const images = req.filesFirebaseUrls || []; // Ensure `req.filesFirebaseUrls` is used

    // Create a new product
    const newProduct = new Product({
      title,
      category,
      description,
      rating,
      price,
      originalPrice,
      images // Use the images array
    });

    // Save the product to the database
    await newProduct.save();
    res.status(201).json({ product: newProduct });
  } catch (error) {
    console.error('Error creating product:', error);
    res.status(500).send('Error creating product');
  }
});


// Route to create a product with file upload
router.post('/products', upload, uploadToFirebase, createProduct);

// Route to get all products
router.get('/products', getProducts);

// Route to get a product by ID
router.get('/products/:productId', getProductById);

// Route to update a product with file upload
router.put('/products/:productId', upload, uploadToFirebase, updateProduct);


// Route to delete a product
router.delete('/products/:productId', deleteProduct);

module.exports = router;
