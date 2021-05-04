const mongoose = require('mongoose');
const validator = require("validator");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

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
    userType: {
        type: String,
        required: true,
        enum: ['client', 'admin'],
        default: 'client',
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
    phone: {
        type: String,
        required: true,
    },
    tokens: [{
        token: {
            type: String,
        }
    }]
});

// make a relationship between User and Purchase
userSchema.virtual('purchases', {
    ref: 'Purchase',
    localField: '_id',
    foreignField: 'owner',
})

// create user token
userSchema.methods.generateAuthToken = async function () {
    const user = this;
    const token = jwt.sign({ _id: user.id.toString() }, process.env.TOKEN_SECURITY);
    user.tokens = user.tokens.concat({ token });
    await user.save();
    return token;
}

// hash user-password before saving
userSchema.pre('save', async function (next) {
    const user = this;
    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8);
    }
    next();
})

// valid user by email and password
userSchema.statics.findByCredentials = async (email, password) => {
    const user = await User.find({ email });
    if (!user) {
        throw new Error('Unable to login');
    }
    const isMatch = await bcrypt.compare(password, user[0].password);
    if (!isMatch) {
        throw new Error('Unable to login');
    }
    return user;
}

// filtering user object for display
userSchema.methods.toJSON = function () {
    const user = this;
    const userObject = user.toObject();

    delete userObject.password;
    delete userObject.tokens;

    return userObject;
}

const User = mongoose.model('User', userSchema);

module.exports = User;