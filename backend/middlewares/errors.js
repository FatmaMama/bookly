const ErrorHandler = require("../utils/errorHandler");

const errorMiddleware = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
     
    if(process.env.NODE_ENV === 'DEVELOPMENT'){
        res.status(err.statusCode).json({
            success: false,
            error: err,
            errMessage : err.message,
            stack: err.stack
        })
    };
    
    if(process.env.NODE_ENV === "PRODUCTION"){
        let error = { ...err};
        error.message = err.message;

        //Wrong mongoose Object Id error
        if(err.name === "CastError"){
            const message = `Resource not found. Invalid ${err.path}`;
            error = new ErrorHandler(message, 400)
        };

        //Handling Mongoose Validation error
        if(err.name === "ValidatorError"){
            const message = Object.values(err.errors).map(value => value.message);
            error = new ErrorHandler(message, 400)
        };

        //Handling Mongoose duplicate key error
        if(err.code === 11000){
            const message = `Duplicate ${Object.keys(err.keyValue)} entered`;
            error = new ErrorHandler(message, 400)
        };

        //Handling wrong jwt token
        if(err.name === 'jsonWebTokenError'){
            const message = `Json Web Token is Invalid`;
            error = new ErrorHandler(message, 400)
        };

        //Handling expired jwt token
        if(err.name === 'TokenExpiredError'){
            const message = `Json Web Token is Expired`;
            error = new ErrorHandler(message, 400)
        };

        res.status(err.statusCode).json({
            success: false,
            message: error.message || "Internal Server Error"
        })
    }
}

module.exports = errorMiddleware;