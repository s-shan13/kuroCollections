const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true, "Enter product name"],
        trim:true
    },
    description:{
        type:String,
        required:[true, "Enter product description"]
    },
    price:{
        type:Number,
        required:[true, "Enter price"]
    },
    rating:{
        type:Number,
        default:0
    },
    images:[
        {
            public_id:{
                type:String,
                required:true
            },
            url:{
                type:String,
                required:true
            }
        }
    ],
    stock:{
        type:Number,
        required:[true, "Enter stock"]
    },
    numOfReviews:{
        type:Number,
        default:0
    },
    reviews:[
        {
            name:{
                type:String,
                required:true
            },
            rating:{
                type:Number,
                required: true
            },
            comment:{
                type:String,
                required:true
            }
        }
    ],
    createdAt:{
        type:Date,
        default: Date.now
    }
})

module.exports = mongoose.model("Product", productSchema)