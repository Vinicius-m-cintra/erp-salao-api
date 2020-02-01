const mongoose = require('mongoose');

const schema = mongoose.Schema({
  id_customer: {
    type: mongoose.ObjectId,
    ref: 'Customer',
    required: true
  },
  value: {
    type: Number,
    required: true
  }
}, { timestamps: true });

module.exports = mongoose.model('Payment', schema, 'payments');