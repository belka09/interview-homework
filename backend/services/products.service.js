const Product = require('../models/product.model');

function fetchAll() {
  return Product.find();
}

module.exports = { fetchAll };
