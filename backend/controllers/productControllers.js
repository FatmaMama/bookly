const Product = require('../models/productModel');
const ErrorHandler = require('../utils/errorHandler');
const catchAsyncErrors = require('../middlewares/asyncErrors');
const ApiFeatures = require('../utils/apiFeatures');

//Add a product   /api/v1/admin/product/new
exports.addProduct = catchAsyncErrors(async (req, res, next) => {
    const product = await Product.create(req.body);
    res.status(201).json({
        success: true,
        product
    })
});

//Get all products    /api/v1/products?keyword=apple
exports.getProducts = catchAsyncErrors(async (req, res) => {
    const apiFeatures = new ApiFeatures(Product.find(), req.query)
                        .search()

    const products = await apiFeatures.query;

    res.status(200).json({
        success: true,
        count : products.length,
        products
    })
});

//Get a product   /api/v1/product/:id
exports.getProductById = catchAsyncErrors(async (req, res, next) => {
    const product = await Product.findById(req.params.id);

    if(!product) {
        return next(new ErrorHandler('Product Not Found', 404))
    };

    res.status(200).json({
        success: true,
        product
    })
});

//Update a product   /api/v1/admin/product/:id
exports.updateProduct = catchAsyncErrors(async (req,res) => {
        let product = await Product.findById(req.params.id);

        if(!product) {
            return next(new ErrorHandler('Product Not Found', 404))
        };

        product = await Product.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
            useFindAndModify: false
        });

        res.status(200).json({
            success: true,
            product
        })
});

//Delete a product   /api/v1/admin/product/:id
exports.deleteProduct = catchAsyncErrors(async (req,res) => {
    try {
        let product = await Product.findById(req.params.id);

        if(!product) {
            return next(new ErrorHandler('Product Not Found', 404))
        };

        product.remove();

        res.status(200).json({
            success: true,
            message: "product deleted"
        });

    } catch (error) {
        console.error(error)
    }
})