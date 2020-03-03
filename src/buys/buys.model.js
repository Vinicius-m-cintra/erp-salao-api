const mongoose = require('mongoose');

const schema = mongoose.Schema({
  provider: {
    type: mongoose.ObjectId,
    ref: 'Provider',
    required: true,
  },
  products: [
    {
      name: {
        type: String,
        required: true,
      },
      cust_price: {
        type: Number,
        required: true,
      },
      description: {
        type: String,
      },
      sku: {
        type: String,
      },
    },
  ],
  total_value: {
    type: Number,
    required: true,
  },
  paid_value: {
    type: Number,
    required: true,
  },
});

module.exports = new mongoose.Model('Buy', schema, 'buys');
