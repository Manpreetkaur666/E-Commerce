const mongoose = require('mongoose')
const { Schema } = mongoose;
const validator = require('validator');
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
const ErrorHandler = require('../utils/errorHandler');
require('dotenv').config({path: 'backend/config/config.env'})
const crypto = require('crypto') //build-in module

const JWT_SECRET = process.env.JWT_SECRET;

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please Enter your Name!"],
        maxLength: [30, "Name must not exceed 30 characters."],
        minLength: [6, "Name must be atleast 6 characters."]
    },
    email: {
        type: String,
        required: [true, "Please Enter valid Email!"],
        unique: true,
        validate: [validator.isEmail, "Please enter a valid Email!"]

    },
    password: {
        type: String,
        required: [true, "Please Enter valid Password!"],
        minLength: [6, "Password must be atleast 6 characters!"],
        select: false, //if Admin search and see all users the password will not be listed.
    },
    avatar: {
        public_id: {
            type: String,
            required: true
        },
        url: {
            type: String,
            required: true
        }
    },
    role: {
        type: String,
        default: "user",
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date,
});

//using function keyword instead of arrow function because we can not use this inside arrow function 
UserSchema.pre("save", async function(next){
    if(!this.isModified("password")){
        next(); 
    }
    //10 is the power shows how strong password should be. 10 Char- recommeneded vlaue
    this.password = await bcrypt.hash(this.password,10)
})

//Token
UserSchema.methods.getJWTToken = function () {
    return  jwt.sign({id: this._id}, JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE,
    });
              
}

//authenticate the password 
UserSchema.methods.comparePassword = function (password) {
    //compare user password using bcrypt
    const passwordCompare = bcrypt.compareSync(password,this.password);
    return passwordCompare;
}

//Reset Password
UserSchema.methods.getResetToken = function() {

    const resetToken = crypto.randomBytes(20).toString('hex');
    this.resetPasswordToken = crypto.createHash('SHA256').update(resetToken).digest('hex');
    this.resetPasswordExpire = Date.now() + 15 * 60 * 1000;
    return resetToken;
}

module.exports = mongoose.model('user', UserSchema);