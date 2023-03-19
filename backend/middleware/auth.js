var jwt = require('jsonwebtoken');
const ErrorHandler = require('../utils/errorHandler');
const catchAsyncErrors = require('./catchAsyncErrors');
require('dotenv').config({path: 'backend/config/config.env'});
const User = require("../models/User");

const authenticateuser = catchAsyncErrors(async(req, res, next) => {
    //GET the user from the JWT and add id to req object
    // const token = req.header('auth-token');
    const {token} = req.cookies;
    console.log("token is " + token);
    if(!token){
        return next(new ErrorHandler("Please Login to access this resource,token doesn't exists", 401));
    }
        var data = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await User.findById(data.id);
        next();
});

const authorizeRole = (...roles) => {
  return(req,res,next) => {
    if(!roles.includes(req.user.role)){
        return next(
       new ErrorHandler(`Role: ${req.user.role} is not allowed to access this resource`,403));
    };
    next();
  }
}

module.exports = {authenticateuser, authorizeRole};