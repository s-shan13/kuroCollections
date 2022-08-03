const ErrorHandler = require('../utils/errorhandler');

module.exports = (err, req, res, next)=>{
    err.statusCode = err.statusCode || 500;
    err.message = err.message || "Internal server error";

    //Mongodb cast error handling
    if(err.name==="CastError"){
        const message = `Resource not found. Invalid: ${err.path}`;
        err = new ErrorHandler(message, 400)
    }

    //Duplicate key error
    if (err.code===11000){
        const message = `${Object.keys(err.keyValue)} already in use`;
        err = new ErrorHandler(message, 400);
    }

    // Wrong jwt token 
    if(err.name==="JsonWebTokenError"){
        const message = `Web token invalid try again`;
        err = new ErrorHandler(message, 400)
    }

    //Token expire error
    if(err.name==="TokenExpiredError"){
        const message = `Web token expired`;
        err = new ErrorHandler(message, 400)
    }

    res.status(err.statusCode).json({
        success: false,
        message: err.message
    })
}