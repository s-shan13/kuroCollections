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
/**
 * Get average rating
 */

const getAverageRating = (product) =>{
    let avg = 0
    product.reviews.forEach(rev=>{
        avg += rev.rating
    })
    return(avg/product.reviews.length)
}
/**
 * Reviews
 */
exports.handleReview = catchAsyncErrors(async(req,res,next)=>{
    const review = {
        user:req.user._id,
        name: req.user.name,
        rating:Number(req.body.rating),
        comment: req.body.comment
    }

    const product = await Product.findById(req.body.productId);


    const reviewed = product.reviews.find(rev=>rev.user.toString() === req.user._id.toString())
    if(reviewed){
        product.reviews.forEach(rev=>{
            if(rev.user.toString() === req.user._id.toString()){
            rev.rating = req.body.rating
            rev.comment = req.body.comment
            }
        })

    }else{
        product.reviews.push(review)
        product.numOfReviews = product.reviews.length
    }

    product.ratings = getAverageRating(product)
    await product.save({validateBeforeSave: false})

    res.status(200).json({
        success:true
    })
     
})

/**
 * Getting all previews of a product
 */
exports.getProductReviews = catchAsyncErrors(async(req,res,next)=>{
    const product = await Product.findById(req.query.productId);
    if(!product){
        return next(new ErrorHandler("Product not found", 404))
    }
    res.status(200).json({
        success: true,
        reviews: product.reviews
    })
})

/**
 * Delete product review
 */
exports.deleteReview = catchAsyncErrors(async(req,res,next)=>{
    const product = await Product.findById(req.query.productId);
    if(!product){
        return next(new ErrorHandler("Product not found", 404))
    }

    const reviews = product.reviews.filter(
        rev => rev._id.toString() !== req.query.revId.toString()
    )

    const ratings = getAverageRating(product)
    const numOfReviews = reviews.length;
    console.log(numOfReviews)
    await Product.findByIdAndUpdate(req.query.productId, {
        reviews, ratings, numOfReviews
    }, {
        new: true,
        runValidators: true,
        useFindAndModify:false
    });
    res.status(200).json({
        success: true,
        product
    })
})
