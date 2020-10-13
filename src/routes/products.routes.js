const router = require('express').Router();

const {
    getProducts,
    getProduct,
    getUserProducts,
    getAll,
    createProduct,
    deleteProduct
} = require('../controllers/products.controllers');

router.get('/products', getProducts)
router.get('/product/:id', getProduct)
router.get('/products/:id', getUserProducts)
router.get('/allProducts/:id', getAll)

router.post('/product', createProduct)

router.delete('/product/:id', deleteProduct)


module.exports = router;