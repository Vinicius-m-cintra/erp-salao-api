const mongoose = require('mongoose');

const schema = mongoose.Schema({
  id_customer: {
    type: mongoose.ObjectId,
    ref: 'Customer',
    required: true
  },
  discount: {
    type: Number,
    required: true,
    default: 0
  },
  total: {
    type: Number,
    required: true
  },
  spents: [{
    type: mongoose.ObjectId,
    ref: 'Spent',
    required: true
  }]
}, { timestamps: true });

module.exports = mongoose.model('Attendance', schema, 'attendances');