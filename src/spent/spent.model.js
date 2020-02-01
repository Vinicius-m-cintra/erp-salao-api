const mongoose = require('mongoose');

const schema = mongoose.Schema({
  id_product: {
    type: mongoose.ObjectId,
    ref: 'Product'
  },
  id_service: {
    type: mongoose.ObjectId,
    ref: 'Service'
  },
  cost: {
    type: Number,
    required: true
  },
  comment: {
    type: String
  }
}, { timestamps: true });

module.exports = mongoose.model('Spent', schema, 'spents');