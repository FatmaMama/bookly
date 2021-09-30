const Product = require('../models/productModel');

//Add a product /api/v1/product/new
exports.addProduct = async (req, res, next) => {
    const product = await Product.create(req.body);
    res.status(201).json({
        success: true,
        product
    })
}

//Get all products  /api/v1/products
exports.getProducts = async (req, res) => {
    const products = await Product.find();
    res.status(200).json({
        success: true,
        count : products.length,
        products
    })
};

//Get a product /api/v1/product/:id
exports.getProductById = async (req, res) => {
    const product = await Product.findById(req.params.id);

    if(!product) {
        res.status(404).json({
            success : false,
            message : "Product Not Found"
        })
    };
    
    res.status(200).json({
        success: true,
        product
    })
}