const mongoose = require('mongoose');

const schema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    birth: {
        type: Date,
        required: true
    },
    postcode: {
        type: String,
        required: true
    },
    street: {
        type: String,
        required: true
    },
    neighbourhood: {
        type: String,
        required: true
    },
    number: {
        type: Number,
        required: true
    },
    complement: {
        type: String
    },
    cellphone: {
        type: String,
        required: true
    },
    url_img: {
        type: String
    },
    email: {
        type: String,
        required: true,
        index: { unique: true}
    },
    debt: {
        type: Number,
        required: true,
        default: 0
    }
}, { timestamps: true });

module.exports = mongoose.model('Customer', schema, 'customers');