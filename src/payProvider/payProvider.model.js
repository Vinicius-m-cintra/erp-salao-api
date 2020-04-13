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
      required: true,
      default: 'Sem comentário',
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('PayProvider', schema, 'payProviders');
