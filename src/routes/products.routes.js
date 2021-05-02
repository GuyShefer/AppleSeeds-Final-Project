const express = require('express');
const productRouter = express.Router();
const auth = require('../middleware/auth');
const productController = require('../controllers/products.controller');

productRouter.post('/', auth, (req, res) => {
    productController.createProduct(req, res);
})

module.exports = productRouter;