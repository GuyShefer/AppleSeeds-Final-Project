const express = require('express');
const userRouter = express.Router();
const userController = require('../controllers/users.controller');
/// have to add authenticate middleware

userRouter.post('/', (req, res) => {
    userController.addUser(req, res);
})


module.exports = userRouter;