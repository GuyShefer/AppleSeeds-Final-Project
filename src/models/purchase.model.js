const mongoose = require('mongoose');
const validator = require("validator");

const purchaseSchema = new mongoose.Schema({
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        trim: true,
        ref: 'User',
    },
    ownerName: {
        type: String,
        trim: true,
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
    date: {
        type: Date,
        default: () => new Date().addHours(3)
    }

});

const Purchase = mongoose.model('Purchase', purchaseSchema);

module.exports = Purchase;

Date.prototype.addHours = function (h) {
    this.setTime(this.getTime() + (h * 60 * 60 * 1000));
    return this;
}