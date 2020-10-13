const productCtrl = {};

const Product = require('../models/Product');

// get product, products and userProducts
productCtrl.getProducts = async (req, res) => {
    const id = process.env.ADMIN_ID;
    const products = await Product.find({userId: id}).sort({name: 1});
    res.json(products)
}

productCtrl.getProduct = async (req, res) => {
    const {id} = req.params;
    const product = await Product.findById(id);
    res.json(product)
}

productCtrl.getUserProducts = async (req, res) => {
    const {id} = req.params;
    const products = await Product.find({userId: id}).sort({name: 1});
    res.json(products)
}

productCtrl.getAll = async (req, res) => {
    const {id} = req.params;
    const adminId = process.env.ADMIN_ID
    const userProducts = await Product.find({userId: id})
    const appProducts = await Product.find({userId: adminId})
    const allProducts = userProducts.concat(appProducts).sort(
        function(a, b) {
            let nameA = a.name;
            let nameB = b.name;
            if (nameA < nameB) {
                return -1
            }
            if (nameA > nameB) {
                return 1
            }
        }
    )
    res.json(allProducts);
}

// create a product
productCtrl.createProduct = async (req, res) => {
    const {name, userId, kcal} = req.body;
    const product = new Product({name, userId, kcal});
    const products = await Product.find({userId})
    const productExist = products.filter(item => item.name === name);
    if (productExist.length > 0) {
        return res.status(400).json({message: 'You already have a ingredient with that name'});
    } else {
        await product.save();
        return res.status(200).json(product);
    }
}

// delete a product
productCtrl.deleteProduct = async (req, res) => {
    const {id} = req.params;
    await Product.findByIdAndRemove(id);
    res.json({})
}

module.exports = productCtrl;