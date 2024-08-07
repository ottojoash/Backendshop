// models/category.model.js
const mongoose = require('mongoose');

const CategorySchema = new mongoose.Schema({
  image: {
    type: String,
    required: false,  // Make it optional since it might not be always present
  },
  name: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('Category', CategorySchema);
