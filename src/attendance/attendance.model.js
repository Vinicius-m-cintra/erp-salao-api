const mongoose = require('mongoose');

const schema = mongoose.Schema({
    discount:{
      type: Number,
      required: true,
      default: 0
    },
    total: {
      type: Number,
      required: true
    },
    customer: {
        name: {
          type: String,
          required: true
        },
        cellphone: {
          type: String,
          required: true
        },
        url_img: {
          type: String,
        }
    },
    product_service: [{
        name: {
          type: String,
          required: true
        },
        description: {
          type: String,
          required: true
        },
        value: {
          type: Number,
          required: true
        }
    }]
}, { timestamps: true });

module.exports = mongoose.model('Attendance', schema, 'attendances');