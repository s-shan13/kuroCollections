const ErrorHandler = require("../utils/errorhandler")
const catchAsyncErrors = require('../middleware/catchAsyncError');
const User = require('../models/userModel');

//Register user
exports.registerUser = catchAsyncErrors(async(req,res,next)=>{
    const {name, email, password} = req.body

    const user = await User.create({name, email, password})

    res.status(201).json({
        success: true,
        user
    })
})