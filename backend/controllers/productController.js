const Product = require("../models/productModel")
const ErrorHandler = require("../utils/errorhandler")
const catchAsyncErrors = require('../middleware/catchAsyncError')
const ApiFeatures = require("../utils/ApiFeatures")

//Create product (admin)
exports.createProduct = catchAsyncErrors(async(req, res, next)=>{
    const product = await Product.create(req.body)

    res.status(201).json({success:true, product})
}) 

//Get all products from the database
exports.getAllProducts = catchAsyncErrors(async(req,res)=>{

    const resultPerPage = 5;

    const apiFeature = new ApiFeatures(Product.find(), req.query).search().filter().pagination(resultPerPage);
    const products = await apiFeature.results;

    res.status(200).json({
        success: true,
        products    
    })
})

//Get single product details
exports.getProductDetails = catchAsyncErrors(async(req, res, next)=>{
    const product = await Product.findById(req.params.id)

    if(!product){
        return next(new ErrorHandler("Poduct not found", 404))
    }
    res.status(200).json({
        success: true,
        product
    })
})

//update a product (admin)
exports.updateProduct = catchAsyncErrors(async(req, res)=>{

    let product = await Product.findById(req.params.id);

    if(!product){
        return next(new ErrorHandler("Poduct not found", 404))
    }

    product = await Product.findByIdAndUpdate(req.params.id, req.body, {new:true, runValidators:true, useFindAndModify:false });

    res.status(200).json({
        success: true,
        product
    })

})

//Delete product
exports.deleteProduct = catchAsyncErrors(async(req, res, next)=>{
    const product = await Product.findById(req.params.id)

    if(!product){
        return next(new ErrorHandler("Poduct not found", 404))
    }

    await product.remove()
    res.status(200).json({
        success: true,
        message: "product deleted "
    })
})