const Product = require('../models/product.model');
const Purchase = require('../models/purchase.model');
const User = require('../models/user.model');

const purchaseProducts = async (req, res) => {
    try {
        const extractPurchase = { products, totalPrice } = req.body;
        if (products.length < 1) {
            return res.status(404).send('There are no items in the cart');
        }
        else if (!await isValiadTotalPriceAndQuantity(extractPurchase) || totalPrice < 0) {
            return res.status(404).send('Total price is not valid');
        }

        extractPurchase.owner = req.user.id;
        extractPurchase.ownerName = `${req.user.firstName} ${req.user.lastName}`;
        const purchase = new Purchase(extractPurchase);
        if (!purchase) {
            return res.status(404).send();
        }
        purchase.save();
        await updateProductsQuantity(products);
        res.status(200).send(purchase);
    } catch (err) {
        res.status(500).send(err.message);
    }
}

const getAllPurchases = async (req, res) => {
    try {
        const purchases = await Purchase.find({}, {totalPrice : 1, ownerName: 1, date: 1});
        if (!purchases) {
            return res.status(404).send();
        }
        res.status(200).json(purchases);
    } catch (err) {
        res.status(500).send(err.message);
    }
}

const getAllUserPurchases = async (req, res) => {
    try {
        await req.user.populate('purchases').execPopulate();
        res.status(200).json(req.user.purchases);

    } catch (err) {
        res.status(500).send(err.message);
    }
}

const deletePurchaseById = async (req, res) => {
    try {
        const id = req.params.id
        if (id.length < 15) {
            res.status(400).send('Id is not valid');
        }
        await Purchase.findByIdAndDelete(id);
        res.status(200).send();
    } catch (err) {
        res.status(500).send(err.message);
    }
}


// validations

const isValiadTotalPriceAndQuantity = async (purchase) => {
    const productsArr = purchase.products;
    const expectedTotalPrice = purchase.totalPrice;
    let totalPrice = 0;
    let validQuantity = true;

    for (let i = 0; i < productsArr.length; i++) {
        const id = productsArr[i].productId;
        const product = await Product.findById(id);
        const price = product.price * productsArr[i].amount;
        totalPrice += price;
        if (product.quantity - productsArr[i].amount < 0) {
            validQuantity = false;
        }
    }

    return expectedTotalPrice === totalPrice && validQuantity;
}

const updateProductsQuantity = async (productsArr) => {
    for (let i = 0; i < productsArr.length; i++) {
        const id = productsArr[i].productId;
        await Product.findByIdAndUpdate(id, { $inc: { quantity: -productsArr[i].amount } }, { new: true, runValidators: true })
    }
}

module.exports = {
    purchaseProducts,
    getAllPurchases,
    getAllUserPurchases,
    deletePurchaseById,
}