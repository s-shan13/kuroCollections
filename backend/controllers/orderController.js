const Order = require("../models/orderModel")
const Product = require("../models/productModel")
const ErrorHandler = require("../utils/errorhandler")
const catchAsyncErrors = require('../middleware/catchAsyncError')

/**
 * Create new order
 */
exports.newOrder = catchAsyncErrors(async(req,res,next)=>{
    const {shippingInfo, orderItems, paymentInfo,itemsPrice,taxPrice,shippingPrice,totalPrice} = req.body

    const order = await Order.create({
        shippingInfo, orderItems, paymentInfo,itemsPrice,taxPrice,shippingPrice,totalPrice,
        paidAt: Date.now(),
        user: req.user._id
    })

    res.status(201).json({
        success: true,
        order
    })
})

/**
 * Get single order
 */
exports.getSingleOrder = catchAsyncErrors(async(req,res,next)=>{
    const order = await Order.findById(req.params.id).populate("user","name email")
    //.populate() populates "user" field in the order with the name and email from user database  

    if(!order){
        return next(new ErrorHandler("Order not found", 404))
    }
    res.status(200).json({
        success:true,
        order
    })
})

/**
 * Get my orders
 */
exports.myOrders = catchAsyncErrors(async(req,res,next)=>{
    //Find orders with the user field of the id of logged in user
    const orders = await Order.find({ user: req.user._id })

    res.status(200).json({
        success:true,
        orders
    })
})