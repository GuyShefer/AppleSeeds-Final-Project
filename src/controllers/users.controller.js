const User = require('../models/user.model');


const addUser = async (req, res) => {
    const extractUser = { email, password, firstName, lastName, address } = req.body;

    // controller validation
    try {
        const user = new User(extractUser);
        await user.save();
        res.status(201).send({ messege: 'User has been created.' });
    } catch (err) {
        res.status(400).send(err.message);
    }
}



module.exports = {
    addUser,
}