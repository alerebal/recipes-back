const productCtrl = {};

const Product = require('../models/Product');

// get product and products
productCtrl.getProducts = async (req, res) => {
    const products = await Product.find().sort({name: 1});
    res.json(products)
}

productCtrl.getProduct = async (req, res) => {
    const {id} = req.params;
    const product = await Product.findById(id);
    res.json(product)
}

// create a product
productCtrl.createProduct = async (req, res) => {
    const {name, kcal} = req.body;
    const product = new Product({name, kcal});
    await product.save(function(err) {
        // if the product name already exists
        if(err) {
            return res.status(400).send({message: 'The ingredient already exists'})
        }
        return res.status(200).send({product})
    })
}

// delete a product
productCtrl.deleteProduct = async (req, res) => {
    const {id} = req.params;
    await Product.findByIdAndRemove(id);
    res.json({})
}

module.exports = productCtrl;