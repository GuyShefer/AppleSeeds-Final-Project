const Product = require('../models/product.model');
const Purchase = require('../models/purchase.model');


const purchaseProducts = async (req, res) => {
    try {
        const extractPurchase = { products, totalPrice } = req.body;
        if (!await isValiadTotalPrice(extractPurchase)) {
            throw new Error('invalid total price.');
        }
        extractPurchase.owner = req.user.id;
        const purchase = new Purchase(extractPurchase);
        console.log(purchase);
        purchase.save();


        res.status(200).send();
        // have to purchase all the products + 
        // have to update product quantity
    } catch (err) {
        res.status(500).send(err);
    }
}

const isValiadTotalPrice = async (purchase) => { // and update product amount
    const productsArr = purchase.products;
    const expectedTotalPrice = purchase.totalPrice;
    let totalPrice = 0;

    for (let i = 0; i < productsArr.length; i++) {
        const id = productsArr[i].productId;
        const product = await Product.findById(id);
        const price = product.price * productsArr[i].amount;
        totalPrice += price;
    }

    return expectedTotalPrice === totalPrice;
}


module.exports = {
    purchaseProducts,
}