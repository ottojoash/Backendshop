// routes/category.routes.js
const express = require('express');
const router = express.Router();
const {
  getCategories,
  createCategory,
  getCategoryById,
  updateCategory,
  deleteCategory
} = require('../controllers/category');

// Route to get all categories
router.get('/categories', getCategories);

// Route to create a new category
router.post('/categories', createCategory);

// Route to get a single category by ID
router.get('/categories/:categoryId', getCategoryById);

// Route to update a category by ID
router.put('/categories/:categoryId', updateCategory);

// Route to delete a category by ID
router.delete('/categories/:categoryId', deleteCategory);

module.exports = router;
