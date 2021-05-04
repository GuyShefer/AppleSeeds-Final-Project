const express = require('express');
const purchaseRouter = express.Router();
const auth = require('../middleware/auth');
const adminAuth = require('../middleware/adminAuth');
const purchaseController = require('../controllers/purchases.controller');

// purchase products
purchaseRouter.put('/', auth, (req, res) => {
    purchaseController.purchaseProducts(req, res);
});

// get all purchases

// get purchases from specific user (history)

// delete purchase






module.exports = purchaseRouter;