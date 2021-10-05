 const catchAsyncErrors = require('./asyncErrors');
 const ErrorHandler = require('../utils/errorHandler');
 const jwt = require('jsonwebtoken');
 const User = require('../models/userModel');

//check if user is authenticated or not
exports.isAuthenticated = catchAsyncErrors( async (req, res, next) =>{
     const { token } = req.cookies

     if(!token){
         return next(new ErrorHandler('Login to access this resource', 401))
     }

     const verified = jwt.verify(token, process.env.JWT_SECRET);
     req.user = await User.findById(verified.id);

     next()
});

exports.authorizeRoles = (...roles) =>{
    return (req,res,next) => {
        if(!roles.includes(req.user.role)){
            return next(new ErrorHandler(`Role (${req.user.role}) is not allowed to access this resource`))
        }
        next()
    }    
}