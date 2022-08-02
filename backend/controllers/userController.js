const ErrorHandler = require("../utils/errorhandler")
const catchAsyncErrors = require('../middleware/catchAsyncError');
const User = require('../models/userModel');
const sendToken = require("../utils/jwtToken");

//Register user
exports.registerUser = catchAsyncErrors(async(req,res,next)=>{
    const {name, email, password} = req.body

    const user = await User.create({name, email, password});

    sendToken(user, 201, res)
})

//login user
exports.loginUser = catchAsyncErrors(async(req,res,next)=>{
    const {email, password} = req.body

    if(!email || !password){
        return next(new ErrorHandler("Enter email and password", 400))
    }

    const user = await User.findOne({ email }).select("+password") //password needs to be selected separatly because select property is false in schema

    //Checking if a user with the enter email exists
    if(!user){
        return next(new ErrorHandler("Invalid email or password", 401))
    }

    //Checking is the entered password matches the password of the email
    const passwordMatched = await user.comparePassword(password) 
    
    if(!passwordMatched){
        return next(new ErrorHandler("Invalid email or password", 401))
    }
    
    sendToken(user, 200, res)
    
});

//logout
exports.logout = catchAsyncErrors(async(req,res,next)=>{

    res.cookie("token", null,{
        expires: new Date(Date.now()),
        httpOnly: true
    })

    res.status(200).json({
        success: true,
        message: "Logged out"
    })
})