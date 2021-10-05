 const catchAsyncErrors = require('./asyncErrors');
 const ErrorHandler = require('../utils/errorHandler');
 const jwt = require('jsonwebtoken');
 const User = require('../models/userModel');

//check if user is authenticated or not
exports.isAuthenticated = catchAsyncErrors( async (req, res, next) =>{
     const { token } = req.cookies

     if(!token){
         next(new ErrorHandler('Login to access this resource', 401))
     }

     const verified = jwt.verify(token, process.env.JWT_SECRET);
     req.user = await User.findOne(verified.id);

     next()
})