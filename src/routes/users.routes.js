const express = require('express');
const userRouter = express.Router();
const userController = require('../controllers/users.controller');
const auth = require('../middleware/auth');
const adminAuth = require('../middleware/adminAuth');

userRouter.post('/', (req, res) => {
    userController.addUser(req, res);
});

userRouter.get('/getAccInfo', auth, (req, res) => {
    userController.getUserInfo(req, res);
})

userRouter.post('/login', (req, res) => {
    userController.login(req, res);
});

userRouter.post('/logout', auth, (req, res) => {
    userController.logout(req, res);
});

userRouter.post('/logout/all', auth, (req, res) => {
    userController.logoutAll(req, res);
});

userRouter.get('/', auth, adminAuth, (req, res) => {
    userController.getAllUsers(req, res);
});

userRouter.put('/', auth, (req, res) => {
    userController.updateUser(req, res);
});

module.exports = userRouter;