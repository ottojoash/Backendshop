// controllers/category.controller.js
const Category = require('../models/Category');
const uploadToFirebase = require('../middleware/upload').uploadToFirebase; // Import the function to upload image to Firebase

// Get all categories
exports.getCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    res.json(categories);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Create a new category
exports.createCategory = async (req, res) => {
  try {
    const name = req.body.name; // This should be `name` as per the updated schema
    const image = req.file ? req.file.firebaseUrl : ''; // Ensure `req.file.firebaseUrl` is correct

    if (!name) {
      return res.status(400).json({ message: 'Category name is required' });
    }

    const newCategory = new Category({ image, name });
    await newCategory.save();
    
    res.status(201).json(newCategory);
  } catch (error) {
    console.error('Error creating category:', error); // Log the error for debugging
    res.status(500).json({ message: error.message });
  }
};


// Get a category by ID
exports.getCategoryById = async (req, res) => {
  try {
    const category = await Category.findById(req.params.categoryId);
    if (category) {
      res.json(category);
    } else {
      res.status(404).json({ message: 'Category not found' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update a category by ID
exports.updateCategory = async (req, res) => {
  try {
    const updatedCategory = await Category.findByIdAndUpdate(
      req.params.categoryId,
      req.body,
      { new: true }
    );
    res.json(updatedCategory);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Delete a category by ID
exports.deleteCategory = async (req, res) => {
  try {
    const deletedCategory = await Category.findByIdAndDelete(req.params.categoryId);
    if (deletedCategory) {
      res.json({ message: 'Category deleted' });
    } else {
      res.status(404).json({ message: 'Category not found' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
