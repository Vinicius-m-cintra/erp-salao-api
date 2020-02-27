const mongoose = require('mongoose');

const schema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  cust_price: {
    type: Number,
  },
  stock: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
  },
  sku: {
    type: String,
  },
  provider: {
    type: mongoose.ObjectId,
    ref: 'Provider',
  },
});

module.exports = mongoose.model('Product', schema, 'products');
