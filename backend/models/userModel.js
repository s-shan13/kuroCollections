const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto')

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true, "Please Enter Your Name"],
        maxLength:[30, "Name must be less than 30 characters"],
        minLength:[3, "Name should be at least 3 letters"]
    },
    email:{
        type:String,
        required:[true, "Please Enter Your Email"],
        unique: true,
        validate:[validator.isEmail, "Please Enter a Valid Email"]
    },
    password:{
        type:String,
        required:[true, "Please Enter Your Password"],
        minLength:[8, "Password should be at least 8 letters"],
        select: false
    },
    role:{
        type:String,
        default: "user"
    },
    reserPasswordToken: String,
    resetPasswordExpire: Date
})

userSchema.pre("save", async function(next){
    console.log(1)
    //Only rehash password if it is modified
    if(!this.isModified("password")){
        next()   
        
    }
    this.password = await bcrypt.hash(this.password, 10)
}) 

//JWT token
userSchema.methods.getJWTToken = function(){
    return jwt.sign({id:this._id}, process.env.JWT_SECRET,{
        expiresIn: process.env.JWT_EXPIRE
    })
}

//Compare input password to hashed password
userSchema.methods.comparePassword = async function(enteredPass){
    return await bcrypt.compare(enteredPass, this.password);
}

//Password reset token
userSchema.methods.getResetToken = function(){
    //Generating token
    const resetToken = crypto.randomBytes(20).toString("hex");

    this.reserPasswordToken = crypto.createHash("sha256").update(resetToken).digest("hex");
    this.resetPasswordExpire = Date.now() +10*60*1000 //Reset token valid for 10 mins

    return resetToken;
}

module.exports = mongoose.model("User", userSchema);