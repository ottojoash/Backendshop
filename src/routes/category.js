// routes/category.routes.js
const express = require('express');
const router = express.Router();
const { upload, uploadToFirebase } = require('../middleware/upload'); // Ensure this path is correct
const {
  createCategory,
  getCategories,
  getCategoryById,
  updateCategory,
  deleteCategory
} = require('../controllers/category');

// Route to upload image
router.post('/upload-image', upload.single('image'), uploadToFirebase, (req, res) => {
  if (req.file && req.file.firebaseUrl) {
    res.json({ imageUrl: req.file.firebaseUrl });
  } else {
    res.status(400).send('No file uploaded');
  }
});

// Route to create a category with file upload
router.post('/categories', upload.single('image'), uploadToFirebase, createCategory);

// Route to get all categories
router.get('/categories', getCategories);

// Route to get a single category by ID
router.get('/categories/:categoryId', getCategoryById);

// Route to update a category by ID
router.put('/categories/:categoryId', upload.single('image'), uploadToFirebase, updateCategory);

// Route to delete a category by ID
router.delete('/categories/:categoryId', deleteCategory);

module.exports = router;
