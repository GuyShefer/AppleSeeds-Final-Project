const mongoose = require('mongoose');
const validator = require("validator");
// bcrypt for hash password
// jwt for json web token

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        trim: true,
        lowercase: true,
        unique: true,
        required: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Invalid Email');
            }
        }
    },
    password: {
        type: String,
        required: true,
        minLength: [8, 'Password must includes 8 characters minimum'],
    },
    firstName: {
        type: String,
        trim: true,
        lowercase: true,
        required: true,
        minLength: 2,
    },
    lastName: {
        type: String,
        trim: true,
        lowercase: true,
        required: true,
        minLength: 2,
    },
    type: {
        type: String,
        required: true,
        enum: ['client', 'admin'],
        default : 'client',
    },
    address: {
        city: {
            type: String,
            trim: true,
            lowercase: true,
            required: true,
        },
        street: {
            type: String,
            trim: true,
            lowercase: true,
            required: true,
        },
        houseNumber: {
            type: Number,
            required: true,
        },
        zip: {
            type: Number,
            required: true,
        }
    },
    tokens: [{
        token: {
            type: String,
            // required: true
        }
    }]
});

const User = mongoose.model('User', userSchema);

module.exports = User;