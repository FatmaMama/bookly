const express = require('express');
const router = express.Router();
const { isAuthenticated, authorizeRoles } = require('../middlewares/auth');
const { newOrder, myOrders, getSingleOrder, allOrders, updateOrder } = require('../controllers/orderControllers');

router.post('/order/new', isAuthenticated, newOrder);

router.get('/order/:id', isAuthenticated, getSingleOrder);

router.get('/orders/me', isAuthenticated, myOrders);

router.get('/admin/orders', isAuthenticated, authorizeRoles('admin'), allOrders);

router.put('/admin/order/:id', isAuthenticated, authorizeRoles('admin'), updateOrder);

module.exports = router;