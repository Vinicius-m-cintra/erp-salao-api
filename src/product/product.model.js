const mongoose = require('mongoose');

const schema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    cust_price: {
        type: Number
    },
    price: {
        type:Number,
        required: true
    },
    id_provider: {
        type: mongoose.ObjectId,
        ref: 'Provider',
        required: true
    },
    stock: {
        type: Number,
        required: true
    },
    description: {
        type: String
    },
    sku: {
        type: String
    }
}, { timestamps: true });

module.exports = mongoose.model('Product', schema, 'products');