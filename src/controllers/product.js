const Product = require('../models/Product');

// Controller to create a new product
const createProduct = async (req, res) => {
  try {
    const { title, category, description, rating, price, originalPrice } = req.body;
    const image = req.file ? req.file.firebaseUrl : ''; // Ensure req.file.firebaseUrl is available

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
    console.error('Error in createProduct:', err.message);
    res.status(500).send('Server error');
  }
};

// Controller to get all products
const getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    console.error('Error fetching products:', err.message);
    res.status(500).send('Server error');
  }
};

// Controller to get a product by ID
const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.productId);
    if (!product) {
      return res.status(404).json({ msg: 'Product not found' });
    }
    res.json(product);
  } catch (err) {
    console.error('Error fetching product:', err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Product not found' });
    }
    res.status(500).send('Server error');
  }
};

// Controller to update a product
const updateProduct = async (req, res) => {
  try {
    const { title, category, description, rating, price, originalPrice } = req.body;
    const image = req.file ? req.file.firebaseUrl : undefined; // Don't override if no new image

    const productFields = { title, category, description, rating, price, originalPrice };
    if (image) {
      productFields.image = image;
    }

    let product = await Product.findById(req.params.productId);
    if (!product) {
      return res.status(404).json({ msg: 'Product not found' });
    }

    product = await Product.findByIdAndUpdate(
      req.params.productId,
      { $set: productFields },
      { new: true }
    );

    res.json(product);
  } catch (err) {
    console.error('Error updating product:', err.message);
    res.status(500).send('Server error');
  }
};

// Controller to delete a product
const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.productId);
    if (!product) {
      return res.status(404).json({ msg: 'Product not found' });
    }

    await Product.findByIdAndDelete(req.params.productId); // Updated deletion method
    res.json({ msg: 'Product removed' });
  } catch (err) {
    console.error('Error deleting product:', err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Product not found' });
    }
    res.status(500).send('Server error');
  }
};


module.exports = { createProduct, getProducts, getProductById, updateProduct, deleteProduct };
