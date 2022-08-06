const ErrorHandler = require("../utils/errorhandler")
const catchAsyncErrors = require('../middleware/catchAsyncError');
const User = require('../models/userModel');
const sendToken = require("../utils/jwtToken");
const sendEmail = require("../utils/sendEmail")
const crypto = require('crypto');

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

//Create reset password link
exports.forgotPassword = catchAsyncErrors(async(req,res,next)=>{
    const user = await User.findOne({email: req.body.email})

    if(!user){
        return next(new ErrorHandler("User not found", 404));
    }
    const resetToken = user.getResetToken();

    await user.save({validateBeforeSave:false})

    const resetPasswordUrl = `${req.protocol}://${req.get("host")}/api/v1/password/reset/${resetToken}`

    const message = `Your password reset link:\n\n ${resetPasswordUrl}`

    try {
        await sendEmail({
            host: process.env.EMAIL_HOST,
            port: process.env.EMAIL_PORT,
            email: user.email,
            subject: `Kuro collections password recovery`,
            message
        })
        res.status(200).json({
            success: true,
            message: "email sent"
        })
    } catch (error) {
        user.reserPasswordToken = undefined;
        user.resetPasswordExpire = undefined;
        await user.save();
        return next(new ErrorHandler(error.message, 500))
    }
})

//reset password
exports.resetPassword = catchAsyncErrors(async(req,res,next)=>{
    const reserPasswordToken = crypto.createHash("sha256").update(req.params.token).digest("hex");

    const user = await User.findOne({
        reserPasswordToken,
        resetPasswordExpire:{$gt: Date.now()}
    })

    if(!user){
        return next(new ErrorHandler("Reset link expired", 400));
    }

    if(req.body.password != req.body.confirmPassword){
        return next(new ErrorHandler("Passwords do not match", 400));
    }

    user.password = req.body.password;
    user.reserPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save();

    sendToken(user, 200, res)
})

/**
 * Get user details
 * Called by user after successful login
 */
exports.getUserDetails = catchAsyncErrors(async(req,res)=>{
    const user = await User.findById(req.user.id);

    res.status(200).json({
        success: true,
        user
    }) 
})

/**
 * Update user password
 * USed when user wants to change their password
 */
exports.updatePassword = catchAsyncErrors(async(req,res)=>{
    const user = await User.findById(req.user.id).select("+password");

    const passwordMatched = await user.comparePassword(req.body.oldPassword)

    if(!passwordMatched){
        return next(new ErrorHandler("Wrong password", 400))
    }

    if(req.body.newPassword !== req.body.confirmPassword){
        return next(new ErrorHandler("Passwords do not match", 400))
    }

    user.password = req.body.newPassword
    await user.save()

    sendToken(user, 200, res)
})

/**
 * Update user profile
 */
exports.updateProfile = catchAsyncErrors(async(req,res)=>{
    const newData = {name: req.body.name, email:req.body.email}
    const user = await User.findByIdAndUpdate(req.user.id, newData, {
        new:true,
        runValidators: true,
        useFindAndModify: false
    })

    res.status(200).json({
        success: true,

    })
})

/**
 * Get all users (admin)
 */
exports.getUsers = catchAsyncErrors(async(req,res)=>{
    const users = await User.find();

    res.status(200).json({
        success: true,
        users
    })
})

/**
 * Get single user (admin)
 */
exports.getOneUser = catchAsyncErrors(async(req,res,next)=>{
    const user = await User.findById(req.params.id)
    if(!user){
        return next(new ErrorHandler("User does not exist", 404))
    }

    res.status(200).json({
        success:true,
        user
    })
})

/**
 * Update user role (admin)
 */
exports.updateRole = catchAsyncErrors(async(req,res)=>{
    const newData = {name: req.body.name, email:req.body.email, role:req.body.role}
    const user = await User.findByIdAndUpdate(req.user.id, newData, {
        new:true,
        runValidators: true,
        useFindAndModify: false
    })

    res.status(200).json({
        success: true,
    })
})

/**
 * Delete user (admin)
 */
exports.deleteUser = catchAsyncErrors(async(req,res)=>{
    const user = await User.findById(req.params.id);

    if(!user){return next(new ErrorHandler("user not found", 404))}

    await user.remove()

    res.status(200).json({
        success: true,
    })
})

