const Product = require('../models/productModel');

//Add a product /api/v1/product/new
exports.addProduct = async (req, res, next) => {
    const product = await Product.create(req.body);
    res.status(201).json({
        success: true,
        product
    })
}

exports.getProducts = (req, res, next) => {
    res.status(200).json({message: "this route will show all products"})
    
}