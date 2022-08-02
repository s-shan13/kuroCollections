const ErrorHandler = require("../utils/errorhandler");
const catchAsyncError = require("./catchAsyncError");
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

exports.isAuthenticated = catchAsyncError( async(req,res,next)=>{
    const {token} = req.cookies

    if(!token){
        return next(new ErrorHandler("Please login", 401))
    }
    //.verify returns entire payload if token is valid
    const decodedData = jwt.verify(token, process.env.JWT_SECRET);

    req.user = await User.findById(decodedData.id)
    next();
})

/**
 * Checks if the role of the sender of the request matches authorised roles
 */
exports.authorizedRoles = (...roles)=>{
    return (req,res,next)=>{
        if(!roles.includes(req.user.role)){
            return next(new ErrorHandler(`Not authorised for ${req.user.role}`, 403))
        }
        next() 
    }
}