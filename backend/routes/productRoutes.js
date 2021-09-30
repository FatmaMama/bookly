const express = require('express');
const router = express.Router();

const { getProducts, addProduct, getProductById, updateProduct, deleteProduct } = require ('../controllers/productControllers');

router.route('/admin/product/new').post(addProduct)

router.get('/products', getProducts);

router.get('/product/:id', getProductById);

router.put('/admin/product/:id', updateProduct);

router.delete('/admin/product/:id', deleteProduct)


module.exports = router;