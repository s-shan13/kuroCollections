const Product = require("../models/productModel")

//Create product (admin)
exports.createProduct = async(req, res, next)=>{
    const product = await Product.create(req.body)

    res.status(201).json({success:true, product})
}

//Get all products from the database
exports.getAllProducts = async(req,res)=>{

    const products = await Product.find();
    res.status(200).json({
        success: true,
        products    
    })
}

//Get single product details
exports.getProductDetails = async(req, res, next)=>{
    const product = await Product.findById(req.params.id)

    if(!product){
        return res.status(500).json({
            success: false,
            message: "Product not found"
        })
    }
    res.status(200).json({
        success: true,
        product
    })
}

//update a product (admin)
exports.updateProduct = async(req, res)=>{

    let product = await Product.findById(req.params.id);

    if(!product){
        return res.status(500).json({
            success: false,
            message: "Product not found"
        })
    }

    product = await Product.findByIdAndUpdate(req.params.id, req.body, {new:true, runValidators:true, useFindAndModify:false });

    res.status(200).json({
        success: true,
        product
    })

}

//Delete product
exports.deleteProduct = async(req, res, next)=>{
    const product = await Product.findById(req.params.id)

    if(!product){
        return res.status(500).json({
            success:false,
            message:"Product not found"
        })
    }

    await product.remove()
    res.status(200).json({
        success: true,
        message: "product deleted "
    })
}