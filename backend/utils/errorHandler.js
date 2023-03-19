//Error is deafult class from node - Errorhandler is inheriting the Error Class
class ErrorHandler extends Error{
    constructor(message,statusCode){
        //super is constructor of Error class
        super(message);
        this.statusCode = statusCode
        //this - ErrorHandler
        //this.constructor - constructor
        Error.captureStackTrace(this,this.constructor);

    }
    
}

module.exports = ErrorHandler

//we have to make middleware to use this class in errorhandling