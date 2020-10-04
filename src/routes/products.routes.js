const router = require('express').Router();

const {
    getProducts,
    getProduct,
    createProduct,
    deleteProduct
} = require('../controllers/products.controllers');

router.get('/products', getProducts)
router.get('/product/:id', getProduct)

router.post('/product', createProduct)

router.delete('/product/:id', deleteProduct)


module.exports = router;