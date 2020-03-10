const mongoose = require('mongoose');

const schema = mongoose.Schema(
  {
    discount: {
      type: Number,
      required: true,
      default: 0,
    },
    total: {
      type: Number,
      required: true,
    },
    paid_value: {
      type: Number,
      required: true,
    },
    customer: {
      type: mongoose.ObjectId,
      ref: 'Customer',
    },
    product_service: [
      {
        name: {
          type: String,
          required: true,
        },
        description: {
          type: String,
        },
        value: {
          type: Number,
          required: true,
        },
      },
    ],
    comment: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Attendance', schema, 'attendances');
