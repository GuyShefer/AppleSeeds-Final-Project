const User = require('../models/user.model');


const addUser = async (req, res) => {
    const extractUser = { email, password, firstName, lastName, address } = req.body;

    // controller validation
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
    // controller validation

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
    try {
        req.user.tokens = [];
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


module.exports = {
    addUser,
    login,
    logout,
    logoutAll,
    getAllUsers,
}