const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    type: {
        type: String,
        trim: true,
        lowercase: true,
        required: true,
        enum: ['earrings', 'ring', 'necklace', 'bracelet', 'piercings', 'macrame'],
    },
    material: {
        type: String,
        trim: true,
        lowercase: true,
        enum: ['sterling silver', 'pure brass', 'silver'],
    },
    price: {
        type: Number,
        required: true,
        min: 0,
    },
    quantity: {
        type: Number,
        required: true,
        min: 0,
    },
    name: {
        type: String,
        trim: true,
        lowercase: true,
        required: true,
    },
    description: {
        type: String,
        trim: true,
        lowercase: true,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    bestSeller : {
        type: Boolean,
        required : true,
    },
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;