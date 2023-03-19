const ErrorHandler = require("../utils/errorHandler");

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "Internal Server Error";

  //handle error for wring mongo ID
  if (err.name === 'CastError'){
    const message = `Product not Found, Invalid ${err.path}`
    err = new ErrorHandler(message, 404)
  }

  res.status(err.statusCode).json({
    success: false,
    message: err.message,
  });
};

//import in app.js