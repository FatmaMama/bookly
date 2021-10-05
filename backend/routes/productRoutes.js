const express = require('express');
const router = express.Router();

const { getProducts, 
        addProduct, 
        getProductById, 
        updateProduct, 
        deleteProduct } = require ('../controllers/productControllers');

const { isAuthenticated } = require('../middlewares/auth');



router.post('/admin/product/new',isAuthenticated,addProduct)

router.get('/products', getProducts);

router.get('/product/:id', getProductById);

router.put('/admin/product/:id', isAuthenticated,updateProduct);

router.delete('/admin/product/:id', isAuthenticated,deleteProduct)


module.exports = router;