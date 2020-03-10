const mongoose = require('mongoose');

const schema = mongoose.Schema(
  {
    description: {
      type: String,
      required: true,
    },
    value: {
      type: Number,
      required: true,
    },
    customer: {
      type: mongoose.ObjectId,
      ref: 'Customer',
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Payment', schema, 'payments');
