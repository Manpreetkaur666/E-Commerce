const Order = require('../models/Order')
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const Product = require("../models/Product");
const ErrorHandler = require("../utils/errorHandler");

/***********************Create a order*************************/
exports.createOrder = catchAsyncErrors(async(req, res, next) => {
    const {
        shippingInfo,
        orderItems,
        paymentInfo,
        itemPrice,
        taxPrice,
        shippingPrice,
        totalPrice,   
    } = req.body;

    let order = await Order.create({
        shippingInfo,
        orderItems,
        paymentInfo,
        itemPrice,
        taxPrice,
        shippingPrice,
        totalPrice, 
        paidAt: Date.now(),
        user: req.user._id, 
    })
    // req.body.user = req.user.id;
    // req.body.orderItems.product = req.query.productId;
    // let order = await Order.create(req.body)
    res.status(201).json({success: true, order})
})

/***********************Get all orders -- User*************************/
exports.getOrders = catchAsyncErrors(async (req, res, next) => {
    const orders = await Order.find({user: req.user.id});
    if(!orders){
        return next(new ErrorHandler("Order not found",404))
    }
    res.status(200).json({success: true, orders})
})

/***********************Get single order -- User*************************/
exports.getSingleOrder = catchAsyncErrors(async (req, res, next) => {
    const order = await Order.findById(req.params.id).populate('user','name email');
    if(!order){
        return next(new ErrorHandler("Order not found", 404))
    }

    res.status(200).json({success: true, order})
})

/***********************Get All orders -- Admin*************************/
exports.getAllOrders = catchAsyncErrors(async (req, res, next) => {
    const orders = await Order.find({});
    if(!orders){
        return next(new ErrorHandler("Order not found",404))
    }
    let totalAmount = 0;

    orders.forEach((order) => {
        totalAmount += order.totalPrice
    });
    res.status(200).json({success: true,totalAmount,orders})
})

/***********************Update order Status -- Admin************************/
exports.updateOrderStatus = catchAsyncErrors(async (req, res, next) => {

    const order = await Order.findById(req.params.id);

    if(!order){
        return next(new ErrorHandler("Order not found",404))
    }

    if(order.orderStatus === "Delivered"){
        return next(new ErrorHandler("Order is already delivered!", 400))
    }
    order.orderItems.forEach(async(order) => {
        await updateStock(order.product,order.quantity)
    });

    order.orderStatus = req.body.status

    if(req.body.status === "Delivered"){
        order.delieveredAt = Date.now();
    }

    await order.save({validateBeforeSave: false})

    res.status(200).json({success: true})

});

async function updateStock(id, quantity){
    const product = await Product.findById(id)

    product.stock -= quantity;
    await product.save({validateBeforeSave: false});
}

/***********************Delete Order -- Admin************************/
exports.deleteOrder = catchAsyncErrors(async (req, res, next) => {

    const order = await Order.findById(req.params.id)

    if(!order){
        return next(new ErrorHandler("Order not found",404))
    }
    await order.remove();

    res.status(200).json({success: true, message: "Successfully deleted Order!"})
})