const User = require('../models/user.model');
const validator = require("validator");

const addUser = async (req, res) => {
    const extractUser = { email, password, firstName, lastName, address } = req.body;
    if (email == null || password == null || firstName == null || lastName == null || address == null) {
        return res.status(404).send('Invalid user details');
    }
    else if (!validator.isEmail(email)) {
        return res.status(404).send('Invalid Email');
    }
    else if (!(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/).test(password)) {
        return res.status(404).send('password must contain at least 8 characters, and iclude one uppercase and one lowercase letter and one number.  ')
    }
    else if (await isEmailExist(email)) {
        return res.status(404).send('Email is already exists');
    }
    try {
        const user = new User(extractUser);
        await user.save();
        const token = await user.generateAuthToken();
        res.status(201).send({ messege: 'User has been created.', token });
    } catch (err) {
        res.status(400).send(err.message);
    }
}

const login = async (req, res) => {
    const { email, password } = req.body;
    if (email == null || password == null) {
        return res.status(404).send('Invalid login details');
    }

    try {
        const user = await User.findByCredentials(email, password);
        const token = await user[0].generateAuthToken();
        res.status(200).send({ user, token });
    } catch (err) {
        res.status(400).send(err.message);
    }
}

const logout = async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter(token => token.token !== req.token);
        await req.user.save();
        res.send();
    } catch (err) {
        res.status(500).send();
    }
}

const logoutAll = async (req, res) => {
    const user = req.user
    try {
        user.tokens = [];
        await req.user.save();
        res.send();
    } catch (err) {
        res.status(500).send();
    }
}

const getAllUsers = async (req, res) => {
    try {
        const users = await User.find({});
        if (!users) {
            return res.status(206).send('No users.');
        }
        else if (users.length === 0) {
            return res.status(200).send('No users')
        }
        res.status(200).json(users);
    } catch (err) {
        res.status(500).send();
    }
}

const updateUser = async (req, res) => {
    const updates = Object.keys(req.body);
    const allowUpdates = ['email', 'password', 'firstName', 'lastName', 'address', 'phone'];
    const isValidOperation = updates.every(update => allowUpdates.includes(update));

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates.' })
    }
    else if (req.body.password != null) {
        if (!(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/).test(req.body.password)) {
            return res.status(404).send('password must contain at least 8 characters, and iclude one uppercase and one lowercase letter and one number.  ')
        }
    }
    else if (req.body.email != null) {
        if (!validator.isEmail(req.body.email)) {
            return res.status(404).send('Invalid Email');
        }
        else if (await isEmailExist(req.body.email)) {
            return res.status(404).send('Email is already exists');
        }
    }
    try {
        const user = req.user;
        updates.forEach(update => user[update] = req.body[update]);
        await user.save();
        res.status(200).json(user);
    } catch (err) {
        res.status(500).send(err.message);
    }
}

const isEmailExist = (async (email) => {
    const user = await User.find({ email });
    return user[0] ? true : false;
});

module.exports = {
    addUser,
    login,
    logout,
    logoutAll,
    getAllUsers,
    updateUser,
}