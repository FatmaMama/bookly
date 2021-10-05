const express = require('express');
const router = express.Router();

const { getProducts, 
        addProduct, 
        getProductById, 
        updateProduct, 
        deleteProduct } = require ('../controllers/productControllers');

const { isAuthenticated, authorizeRoles } = require('../middlewares/auth');



router.post('/admin/product/new',isAuthenticated,authorizeRoles('admin'),addProduct)

router.get('/products',getProducts);

router.get('/product/:id', getProductById);

router.put('/admin/product/:id', isAuthenticated,authorizeRoles('admin'),updateProduct);

router.delete('/admin/product/:id', isAuthenticated,authorizeRoles('admin'),deleteProduct)


module.exports = router;