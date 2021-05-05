const Product = require('../models/product.model');
const sharp = require('sharp');


const createProduct = async (req, res) => {
    const extractProduct = { productType, material, price, quantity, productName, bestSeller } = req.body;

    if (productType == null || material == null || price == null || quantity == null || productName == null || bestSeller == null) {
        return res.status(406).send('Invalid product details');
    }
    else if (price < 0 || quantity < 0) {
        return res.status(406).send('Price or Quantity isnt a positive value');
    }

    try {
        const product = new Product(extractProduct);
        const buffer = await sharp(req.file.buffer).resize({ width: 600, height: 600 }).png().toBuffer();
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
        const products = await Product.find({ bestSeller: true }, { image: 1, price: 1, productName: 1 });
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
    else if (req.body.price < 0 || req.body.quantity < 0) {
        return res.status(400).send({ error: "Price or Quantity isnt a positive value " });
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
    const id = req.params.id;
    if (id.length < 15) {
        return res.status(404).send();
    }
    try {
        const product = await Product.findByIdAndDelete(id);
        if (!product) {
            return res.status(404).send();
        }

        res.send(product)
    } catch (err) {
        res.status(500).send(err);
    }
}

const getProductById = async (req, res) => {
    const id = req.params.id;
    if (id.length < 15) {
        return res.status(404).send();
    }
    try {
        const product = await Product.findByIdAndUpdate(id, { $inc: { impressions: 1 } });
        if (!product) {
            return res.status(404).send();
        }
        // res.set('Content-Type', 'image/png');
        res.send(product); /// <><><><><><><><><><><> have to return all obj
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