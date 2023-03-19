require('dotenv').config({path: 'backend/config/config.env'})

const sendToken = (user,res,status) =>{
    //call getJWTToken is User.js 
    const token = user.getJWTToken();

    //options for cookie - saving token in cookies
    const options = {
        expires: new Date(
            Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
        ),
        httpOnly: true
    }
    res.status(status).cookie("token",token,options).json({ success: true, user,token });
}
module.exports = sendToken;