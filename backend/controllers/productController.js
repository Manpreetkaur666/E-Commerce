const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const Product = require("../models/Product");
const ApiFeatures = require("../utils/apiFeatures");
const ErrorHandler = require("../utils/errorHandler");

/***********************Create a product --- ADMIN required*************************/
exports.createProduct = catchAsyncErrors(async (req, res) => {
    req.body.user = req.user.id;
    let product = await Product.create(req.body);
    res.status(200).json({ success: true, product });
});


/***********************************Get all Products********************************/

exports.getAllProducts = catchAsyncErrors(async (req, res, next) => {
    const resultPerPage = 8;
    const productsCount = await Product.countDocuments();
    const apifeature = new ApiFeatures(Product.find(), req.query)
        .search()
        .filter()
        .pagination(resultPerPage);
    const products = await apifeature.query;
    let filteredProductsCount = products.length;
    // let ratings = products.ratings;
    // apifeature.pagination(resultPerPage);

    res.status(200).json({ success: true, products, productsCount, resultPerPage, filteredProductsCount });
});


/***********************************Get all Products -- Admin********************************/

exports.getAdminProducts = catchAsyncErrors(async (req, res, next) => {
    
    const products = await Product.find();

    res.status(200).json({ success: true, products });
});



/********************************Get one Product Details*************************/
exports.getProductDetails = catchAsyncErrors(async (req, res, next) => {
    const product = await Product.findById(req.params.id);
    if (!product) {
        return next(new ErrorHandler("Could not find this Product!", 404));
    }
    res.status(200).json({ success: true, product });
});


/*****************************Update Products --- ADMIN required***********************/
exports.updateProduct = catchAsyncErrors(async (req, res, next) => {
    let product = await Product.findById(req.params.id);
    if (!product) {
        return res
            .status(500)
            .json({ success: false, message: "Could not found this product!" });
    }
    let newProduct = req.body;
    product = await Product.findByIdAndUpdate(
        req.params.id,
        { $set: newProduct },
        { new: true }
    );
    res.json({ sucess: true, product });
});


/***************************DELETE product -- ADMIN required*******************************/
exports.deleteProduct = catchAsyncErrors(async (req, res, next) => {
    let product = await Product.findById(req.params.id);
    if (!product) {
        return res
            .status(500)
            .json({ error, message: "Could not find this product!" });
    }
    // let newProduct = "";
    product = await Product.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: "Successfully deleted product" });
});


/***************************Add Review or update the review********************************/
exports.addProductReview = catchAsyncErrors(async (req, res, next) => {

    const { rating, comment, productId } = req.body;
    const review = {
        user: req.user._id,
        name: req.user.name,
        rating: Number(rating),
        comment: comment
    }
    let product = await Product.findById(productId);
    if (!product) {
        return res
            .status(500)
            .json({ error, message: "Could not find this product!" });
    }

    //Check if the user has already added the reviews if so update that review with new
    const isReviewed = product.Reviews.find(rev => rev.user.toString() === req.user._id.toString())
    if (isReviewed) {
        product.Reviews.forEach((rev) => {
            if (rev.user.toString() === req.user._id.toString()) {
                rev.rating = rating,
                    rev.comment = comment
            }
        })
    } else {
        product.Reviews.push(review);
        product.totalReviews = product.Reviews.length;
    }
    //Average of all the reviews to calculate TotalRatings.
    let avg = 0;
    product.Reviews.forEach((rev) => {
        avg += rev.rating
    });
    product.ratings = avg / product.Reviews.length;
    await product.save({ validateBeforeSave: false });
    res.status(200).json({ success: true, product });
});

/***************************GET All Reviews of the single product******************************/
exports.getProductReviews = catchAsyncErrors(async (req, res, next) => {

    const product = await Product.findById(req.query.id);
    if (!product) {
        return res.status(500).json({ error, message: "Could not find this product!" });
    }
    const reviews = product.Reviews;
    res.status(200).json({success: true, reviews})
})

/****************************Delete  Reviews of the product******************************/
exports.deleteProductReview = catchAsyncErrors(async (req, res, next) => {

    let product = await Product.findById(req.query.productId);

    if (!product) {
        return next(new ErrorHandler("Product not found",404))
    }

    const reviews = product.Reviews.filter(
        (rev) => rev._id.toString() !== req.query.id.toString());

    let avg = 0;

    reviews.forEach((rev) => { avg += rev.rating });
      
    let ratings = 0;
      
    if (reviews.length === 0) {
          ratings = 0;
    } else {
          ratings = avg / reviews.length;
        }
      
    const totalReviews = reviews.length;

    await Product.findByIdAndUpdate(
        req.query.productId,
        {
            Reviews: reviews,
            ratings,
            totalReviews
        },
        {
            new: true,
            runValidatores: true,
            useFindAndModify: false
        })
        res.status(200).json({success: true, reviews})
});


