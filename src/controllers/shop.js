const Product = require('../models/Product');
const multer = require('multer');
const path = require('path');

// Set up multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Change 'uploads/' to your desired directory
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage }).single('image');

// Controller to get a single product by ID
const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.productId);
    if (!product) {
      return res.status(404).json({ msg: 'Product not found' });
    }
    res.json(product);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Product not found' });
    }
    res.status(500).send('Server error');
  }
};

// Controller to get products
const getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// Controller to create a new product
const createProduct = async (req, res) => {
    try {
        const { title, category, description, rating, price, originalPrice } = req.body;
        const image = req.file ? req.file.path.replace(/\\/g, "/") : ''; // Adjust path for cross-platform compatibility
        
        const newProduct = new Product({
            title,
            image,
            category,
            description,
            rating,
            price,
            originalPrice
        });

        await newProduct.save();
        res.status(201).json(newProduct);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

module.exports = { getProducts, createProduct, getProductById };
