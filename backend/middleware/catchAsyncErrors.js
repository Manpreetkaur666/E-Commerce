module.exports = (reqErrorHandleFunc) => (req, res, next) => {
    //Promise is javascriot class to resole and reject
    Promise.resolve(reqErrorHandleFunc(req,res,next)).catch(next);
}