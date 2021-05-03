const express = require('express');
const productRouter = express.Router();
const auth = require('../middleware/auth');
const productController = require('../controllers/products.controller');

productRouter.post('/', auth, (req, res) => {
    productController.createProduct(req, res);
});

productRouter.get('/', (req, res) => {
    productController.getAllProducts(req, res);
});

productRouter.get('/:id', (req, res) => {
    productController.getProductById(req, res);
});

productRouter.get('/byType/:type', (req, res) => {
    productController.getAllProductsByType(req, res);
});

productRouter.get('/bestSeller/all', (req, res) => {
    productController.getAllBestSellerProducts(req, res);
});

productRouter.patch('/:id', auth, (req, res) => {
    productController.updateProduct(req, res);
});

productRouter.delete('/:id', auth, (req, res) => {
    productController.deleteProduct(req, res);
});



module.exports = productRouter;