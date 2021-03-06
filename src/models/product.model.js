const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    productType: {
        type: String,
        trim: true,
        lowercase: true,
        required: true,
        enum: ['earrings', 'rings', 'necklaces', 'bracelets', 'piercings', 'macrame'],
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
    productName: {
        type: String,
        trim: true,
        required: true,
        unique: true,
    },
    image: {
        type: Buffer,
        // required: true,
    },
    bestSeller : {
        type: Boolean,
        required : true,
    },
    impressions : {
        type: Number,
        default: 0,
        min: 0,
    },
    description : {
        type: String,
    }
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;