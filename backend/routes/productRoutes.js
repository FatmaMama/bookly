const express = require('express');
const router = express.Router();

const { getProducts, addProduct } = require ('../controllers/productControllers');

router.route('/product/new').post(addProduct)

router.get('/products', getProducts);

module.exports = router;