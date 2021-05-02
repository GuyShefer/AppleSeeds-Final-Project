const Product = require('../models/product.model');

const createProduct = async (req, res) => {
    const extractProduct = { type, material, price, quantity, name, description, image, bestSeller } = req.body;
    try {
        const product = new Product(extractProduct);
        await product.save();
        res.status(201).send({ messege: 'Product has been created.' });
    } catch (err) {
        res.status(400).send(err.message);
    }
}





module.exports = {
    createProduct,

}