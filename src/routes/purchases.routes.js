const express = require('express');
const purchaseRouter = express.Router();
const auth = require('../middleware/auth');
const adminAuth = require('../middleware/adminAuth');
const purchaseController = require('../controllers/purchases.controller');


purchaseRouter.put('/', auth, (req, res) => {
    purchaseController.purchaseProducts(req, res);
});

purchaseRouter.get('/', auth, adminAuth, (req, res) => {
    purchaseController.getAllPurchases(req, res);
});

purchaseRouter.get('/byUser', auth, (req, res) => {
    purchaseController.getAllUserPurchases(req, res);
});

purchaseRouter.delete('/:id', auth, adminAuth, (req, res) => {
    purchaseController.deletePurchaseById(req, res);
});

module.exports = purchaseRouter;
