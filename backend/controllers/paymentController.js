const catchAsyncErrors = require("../middleware/catchAsyncErrors");
require('dotenv').config({path: 'backend/config/config.env'});

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

exports.processPayment = catchAsyncErrors(async(req, res, next ) => {

    const myPayment =  await stripe.paymentIntents.create({
        amount: req.body.amount,
        currency: "CAD",
        metadata: {
            company: "Ecommerce"
        },
    });

    res.status(200).json({success: true, client_secret: myPayment.client_secret})
});

exports.sendSecretApiKey = catchAsyncErrors(async(req, res, next ) => {

    // console.log("key:" + process.env.STRIPE_API_KEY);
    res.status(200).json({stripeApiKey: process.env.STRIPE_API_KEY});
});