const mongoose = require('mongoose');

const schema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    suggested_value: {
      type: Number,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Service', schema, 'services');
