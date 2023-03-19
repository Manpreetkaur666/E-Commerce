const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const User = require("../models/User");
const ApiFeatures = require("../utils/apiFeatures");
const ErrorHandler = require("../utils/errorHandler");
const sendToken = require("../utils/getToken");
const sendEmail = require("../utils/sendEmail");
const cloudinary = require("cloudinary");



//ROUTE 1:  Create a user using :POST "/api/v1/user/register". No login required
exports.createuser = catchAsyncErrors(async (req, res, next) => {
    const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar,{
        folder: "avatar",
        width: 150,
        crop: "scale"
    })

    const {name, email, password} = req.body;

    // let user = await User.create(req.body);
    const user = await User.create({
        name,
        email,
        password,
        avatar: {
            public_id: myCloud.public_id,
            url: myCloud.secure_url
        }
    });
    sendToken(user,res,201)
});

//ROUTE 2 : Authenticate the user using :POST "/api/auth/login".
exports.loginuser = catchAsyncErrors(async (req,res,next) => {
    //using destructring get email and password from user
    const {email,password} = req.body;
    //checking user has enter both email and password
    if(!email || !password){
       return next(new ErrorHandler('Please enter both email and password',401))
    }
    let user = await User.findOne({email}).select("+password");
    if (!user) {
        return next(new ErrorHandler("Invalid email or password", 401));
      }
    const checkPassword = user.comparePassword(password);
     //if password doesn't match throw an error
     if(!checkPassword){
        success = false;
        return next(new ErrorHandler("Please try to login with correct credenrials!",401))
      }
     sendToken(user,res,200) 

})

//ROUTE 3 : Logged out the user using :POST "/api/auth/logout".
exports.logoutuser = catchAsyncErrors(async (req,res,next) => {
    res.cookie("token",null,{
        expires: new Date(Date.now()),
        httpOnly: true
    })
    res.status(200).json({success: true,message: "You are successfully logged out!"})
});


//ROUTE 4 : Forgot Password :POST "/api/auth/forgotpassword".
exports.forgotpassword = catchAsyncErrors(async (req, res, next) => {

    const user = await User.findOne({email: req.body.email})
    if(!user){
        return next(new ErrorHandler("User not found!"),404)
    }
    //GetResetPasswordToken
    const resetToken = user.getResetToken();

    await user.save({validateBeforeSave: false});

    //protocol - http/https
    //host - 3000/5000 etc
    const resetPasswordUrl = `${req.protocol}://${req.get("host")}/api/v1/password/reset/${resetToken}`

    // \n\n means line break of 2lines
    const message = `Click on the link to reset Password :- \n\n ${resetPasswordUrl}`

    //send Email 
    try{
        await sendEmail({
           email: user.email,
           subject: "Manse Password Recovery",
           message
        });
        //After sending emailing
        res.status(200).json({success: true, message: `Successfully sent email to ${user.email}`})

    }catch (error){
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;
    
        await user.save({ validateBeforeSave: false });
    
        return next(new ErrorHandler(error.message, 500));
    }
    
})


//ROUTE 5 : Get User Details :GET "/api/user/userdetail".
exports.getUserDetails = catchAsyncErrors(async (req, res, next) => {
    const user = await User.findById(req.user.id);
    res.status(200).json({ success: true, user });
});

//ROUTE 5 : Update Password :POST "/api/user/userdetail".
exports.updatePassword = catchAsyncErrors(async (req, res, next) => {
    const user = await User.findById(req.user.id).select("+password");
    const checkPassword = user.comparePassword(req.body.oldpassword);
     //if password doesn't match throw an error
     if(!checkPassword){
        success = false;
        return next(new ErrorHandler("Please enter correct password!",401))
      }
      if(req.body.newpassword !== req.body.confirmpassword){
        success = false;
        return next(new ErrorHandler("Confirm password is not matching the new password!",401))
      }
      user.password = req.body.newpassword;
      await user.save();
      sendToken(user, 200, res);
});

//ROUTE 6 : Update Profile :POST "/api/user/updateprofile".
exports.updateProfile = catchAsyncErrors(async (req, res, next) => {
    //change - name, email, avatar
    const newUserData= {
      name : req.body.name,
      email : req.body.email
    }

    if(req.body.avatar !== ""){
        const user = await User.findById(req.user.id);

        const imageId = user.avatar.public_id;

        await cloudinary.v2.uploader.destroy(imageId);

        const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar,{
            folder: "avatar",
            width: 150,
            crop: "scale"
        });

        newUserData.avatar = {
            public_id: myCloud.public_id,
            url: myCloud.secure_url,
        }
    };

      console.log("value of id is" + req.user.id);
      const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
        new: true,
        runValidators: true,
        useFindAndModify: false
      });
    
      res.status(200).json({ success: true, user });
});


//ROUTE 7 : Get All Users :GET "/api/user/getallusers".
exports.getAllUsers = catchAsyncErrors(async (req, res, next) => {
    const resultPerPage = 3;
    const apifeature = new ApiFeatures(User.find(), req.query)
        .search()
        .filter()
        .pagination(resultPerPage);
    const users = await apifeature.query;
    res.status(200).json({ success: true, users });
});

//ROUTE 8 : Get Single User Details -- ADMIN :GET "/api/user/getallusers".
exports.getSingleUser = catchAsyncErrors(async (req, res, next) => {
    
    const user = await User.findById(req.params.id);
    if(!user){
        next(new ErrorHandler(`User does not exist with thid id ${req.params.id}`))
    }
    res.status(200).json({ success: true, user });
});


//ROUTE 9 : Update User Role by Admin :POST "/api/user/updaterole".
exports.updateRole = catchAsyncErrors(async (req, res, next) => {
    //change - name, email, avatar
    const newUser= {
      role : req.body.role
    }
      const user = await User.findByIdAndUpdate(req.params.id,newUser, {
        new: true,
        runValidators: true,
        useFindAndModify: false
      })
      res.status(200).json({ success: true, user });
});

//ROUTE 10 : Delete User Role by Admin :DELETE "/api/user/deleteuser".
exports.deleteUser = catchAsyncErrors(async (req, res, next) => {
    let user = await User.findById(req.params.id);
    if (!user) {
        return res
            .status(500)
            .json({ error, message: "Could not find this user!" });
    }
    // let newProduct = "";
    await user.remove();
    res.json({ success: true, message: "Successfully deleted user" });
});