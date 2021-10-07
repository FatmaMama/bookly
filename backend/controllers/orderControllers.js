const Order = require('../models/orderModel');
const Product = require('../models/productModel');

const ErrorHandler = require('../utils/errorHandler');
const catchAsyncErrors = require('../middlewares/asyncErrors');

//create new order   /api/v1/order/new
exports.newOrder = catchAsyncErrors ( async (req, res, next) => {
    const {
        orderItems, shippingInfo, itemsPrice, taxPrice, shippingPrice, totalPrice, paymentInfo 
    } = req.body;

    const order = await Order.create({
        orderItems, 
        shippingInfo, 
        itemsPrice, 
        taxPrice, 
        shippingPrice, 
        totalPrice, 
        paymentInfo,
        paidAt : Date.now(),
        user : req.user._id
    });

    res.status(200).json({
        success : true,
        order
    })
});

//Get single order   api/v1/order/:id
exports.getSingleOrder = catchAsyncErrors ( async (req, res, next) => {
    const order = await Order.findById(req.params.id).populate('user', 'name email');

    if(!order){
        return next( new ErrorHandler('Not order found with this ID', 404))
    };

    res.status(200).json({
        success : true,
        order
    })
});

//Get logged in user orders   api/v1/orders/me
exports.myOrders = catchAsyncErrors ( async (req, res, next) => {
    const orders = await Order.find({ user : req.user.id})

    res.status(200).json({
        success : true,
        orders
    })
});

