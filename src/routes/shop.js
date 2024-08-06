const express = require('express');
const router = express.Router();
const { upload, uploadToFirebase } = require('../middleware/upload');
const { createProduct, getProducts, getProductById } = require('../controllers/product');

// Route to upload image
router.post('/upload-image', upload.single('image'), uploadToFirebase, (req, res) => {
  if (req.file && req.file.firebaseUrl) {
    res.json({ imageUrl: req.file.firebaseUrl });
  } else {
    res.status(400).send('No file uploaded');
  }
});

// Route to create a product with file upload
router.post('/products', upload.single('image'), uploadToFirebase, createProduct);

// Route to get all products
router.get('/products', getProducts);

// Route to get a product by ID
router.get('/products/:productId', getProductById);

module.exports = router;
