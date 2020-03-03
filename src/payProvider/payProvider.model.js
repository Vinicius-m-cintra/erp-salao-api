const mongoose = require('mongoose');

const schema = mongoose.Schema(
  {
    provider: {
      type: mongoose.ObjectId,
      ref: 'Provider',
      required: true,
    },
    total: {
      type: Number,
      required: true,
    },
    comment: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('PayProvider', schema, 'payProviders');
