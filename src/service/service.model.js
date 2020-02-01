const mongoose = require('mongoose');

const schema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: false
    },
    suggested_value: {
        type: Number,
        required: false
    }
}, { timestamps: true });

module.exports = mongoose.model('Service', schema, 'services');