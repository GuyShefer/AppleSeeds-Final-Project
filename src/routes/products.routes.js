const express = require('express');
const productRouter = express.Router();
const auth = require('../middleware/auth');
const productController = require('../controllers/products.controller');
const adminAuth = require('../middleware/adminAuth');
const upload = require('../middleware/uploadFile');

productRouter.post('/', auth, adminAuth, upload.single('image'), (req, res) => {
    productController.createProduct(req, res);
}, (error, req, res, next) => {
    res.status(400).send({ error: error.message });
});

productRouter.get('/', (req, res) => {
    productController.getAllProducts(req, res);
});

productRouter.patch('/:id', (req, res) => {
    productController.getProductById(req, res);
});

productRouter.get('/byType/:productType', (req, res) => {
    productController.getAllProductsByType(req, res);
});

productRouter.get('/bestSeller/all', (req, res) => {
    productController.getAllBestSellerProducts(req, res);
});

productRouter.put('/updateProduct/byform', auth, adminAuth, upload.single('image'), (req, res) => {
    productController.updateProduct(req, res);
});

productRouter.delete('/:id', auth, adminAuth, (req, res) => {
    productController.deleteProduct(req, res);
});


module.exports = productRouter;