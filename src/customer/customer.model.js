const mongoose = require('mongoose');

const schema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    birth: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    cellphone: {
      type: String,
      required: true,
    },
    postcode: {
      type: String,
      required: true,
    },
    street: {
      type: String,
      required: true,
    },
    neighbourhood: {
      type: String,
      required: true,
    },
    number: {
      type: Number,
      required: true,
    },
    complement: {
      type: String,
    },
    url_img: {
      type: String,
    },
    debt: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Customer', schema, 'customers');
