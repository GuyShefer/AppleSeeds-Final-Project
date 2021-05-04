const Product = require('../models/product.model');
const sharp = require('sharp');


const createProduct = async (req, res) => {
    const extractProduct = { productType, material, price, quantity, productName, description, bestSeller } = req.body;

    try {
        const product = new Product(extractProduct);
        const buffer = await sharp(req.file.buffer).resize({width: 600, height : 600}).png().toBuffer();
        product.image = buffer;
        await product.save();

        res.status(201).send({ messege: 'Product has been created.' });
    } catch (err) {
        console.log(err.message);
        console.log('===');
        res.status(400).send(err.message);
    }
}

const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find({}, { image: 1, price: 1, productName: 1 });
        if (!products) {
            return res.status(404).send();
        }
        res.status(200).json(products);
    } catch (err) {
        res.status(500).send();
    }
}

const getAllBestSellerProducts = async (req, res) => {
    try {
        const products = await Product.find({ bestSeller: true });
        if (!products) {
            return res.status(404).send();
        }
        res.status(200).json(products);
    } catch (err) {
        res.status(500).send(err.messege);
    }
}

const updateProduct = async (req, res) => {
    const updates = Object.keys(req.body);
    const allowUpdates = ['material', 'price', 'quantity', 'productName', 'bestSeller'];
    const isValidOperation = updates.every(update => allowUpdates.includes(update));

    if (!isValidOperation) {
        return res.status(400).send({ error: "Invalid updaes" });
    }

    try {
        const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!product) {
            return res.status(404).send();
        }
        res.send(product);
    } catch {
        res.status(400).send(err);
    }
}

const deleteProduct = async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);
        if (!product) {
            return res.status(404).send();
        }

        res.send(product)
    } catch (err) {
        res.status(500).send(err);
    }
}

const getProductById = async (req, res) => {
    try {
        const id = req.params.id
        // validation for the id ***
        const product = await Product.findByIdAndUpdate(id, {$inc : {impressions : 1}});
        if (!product) {
            return res.status(404).send();
        }
        res.set('Content-Type', 'image/png');
        res.send(product.image); /// <><><><><><><><><><><> have to return all obj
    } catch (err) {
        res.status(500).send(err);
    }
}

const getAllProductsByType = async (req, res) => {
    const productType = req.params.productType;
    const allowTypes = ['earrings', 'ring', 'necklace', 'bracelet', 'piercings', 'macrame'];
    const isValidOperation = allowTypes.includes(productType);

    if (!isValidOperation) {
        return res.status(400).send({ error: "Invalid type" });
    }
    try {
        const products = await Product.find({ productType }, { image: 1, price: 1, productName: 1 });
        res.status(200).json(products);
    } catch (err) {
        res.status(500).send(err);
    }
}

module.exports = {
    createProduct,
    getAllProducts,
    getAllBestSellerProducts,
    updateProduct,
    deleteProduct,
    getProductById,
    getAllProductsByType,
}