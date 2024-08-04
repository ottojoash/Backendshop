// models/category.model.js
const mongoose = require('mongoose');

const CategorySchema = new mongoose.Schema({
  image: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('Category', CategorySchema);
