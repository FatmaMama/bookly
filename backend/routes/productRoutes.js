const express = require('express');
const router = express.Router();

const { getProducts, addProduct, getProductById } = require ('../controllers/productControllers');

router.route('/product/new').post(addProduct)

router.get('/products', getProducts);

router.get('/product/:id', getProductById);


module.exports = router;