const mongoose = require('mongoose');
const validator = require("validator");

const purchaseSchema = new mongoose.Schema({
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        trim: true,
        ref: 'User',
    },
    products: [{
        productId: {
            type: String,
            required: true,
            trim: true,
        },
        amount: {
            type: Number,
            required: true,
            min: 1,
            default: 1,
        }
    }],
    totalPrice: {
        type: Number,
        required: true,
        min: 0,
    },
    data: {
        type: Date,
        default: Date.now,
    }
});

const Purchase = mongoose.model('Purchase', purchaseSchema);

module.exports = Purchase;