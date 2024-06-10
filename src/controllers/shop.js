// const Product = require('../models/Product');

const Product = require('../models/Product');


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
    // Fetch all products
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// module.exports = { getProducts };



// const Product = require('../models/Product');

// Controller to create a new product
const createProduct = async (req, res) => {
  try {
    const { id, title, image, rating, price, brandName, description, amount } = req.body;
    
    // Check if product with given id already exists
    const existingProduct = await Product.findOne({ id });
    if (existingProduct) {
      return res.status(400).json({ msg: 'Product with this ID already exists' });
    }

    // Create new product
    const newProduct = new Product({
      id,
      title,
      image,
      rating,
      price,
      brandName,
      description,
      amount
    });

    await newProduct.save();
    res.status(201).json(newProduct); // Return newly created product
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

module.exports = { getProducts, createProduct, getProductById };
