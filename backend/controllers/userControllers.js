const User = require('../models/userModel');
const catchAsyncErrors = require('../middlewares/asyncErrors');
const ErrorHandler = require('../utils/errorHandler');
const sendToken = require('../utils/jwtToken');
const sendEmail = require('../utils/sendEmail');
const crypto = require('crypto')

//Regiter user   api/v1/register
exports.registerUser = catchAsyncErrors(async (req, res, next) => {
    const {name, email, password } = req.body;

    const user = await User.create({
        name,
        email,
        password,
        avatar: {
            public_id: 'avatars/kccvibpsuiusmwfepb3m',
            url: 'https://res.cloudinary.com/shopit/image/upload/v1606305757/avatars/kccvibpsuiusmwfepb3m'
        }
    });

    sendToken(user, 200, res);
});

//Login user   api/v1/login
exports.loginUser = catchAsyncErrors(async (req, res, next) => {
    const { email, password } = req.body;

    //check if email or password are entered
    if (!email || !password){
        return next( new ErrorHandler("Please enter your email and password", 400))
    };

    //find user in database
    const user = await User.findOne({ email }).select('+password');
    if (!user){
        return next(new ErrorHandler("No account with this email has been registered.", 401))
    }

    //check if password is correct or not
    const isMatch = await user.comparePassword(password);

    if(!isMatch){
        return next(new ErrorHandler("Invalid Credentials", 401))
    };

    sendToken(user, 200, res);
});

//logout user   api/v1/logout
exports.logoutUser = catchAsyncErrors( async (req,res,next) =>{
    res.cookie('token', null, {
        expires: new Date(Date.now()),
        httpOnly: true
    });

    res.status(200).json({
        success: true,
        message: "logged out"
    })
});

//forgot password   api/v1/password/forgot
exports.forgotPassword = catchAsyncErrors( async(req, res, next) => {
    const user = await User.findOne({ email : req.body.email });

    if(!user){
        return next(new ErrorHandler('User not found with this email', 404))
    };

    const resetToken = user.getResetPasswordToken();

    await user.save({ validateBeforeSave: false });

    //Create reset password url
    const resetUrl = `${req.protocol}://${req.get('host')}/api/v1/password/reset/${resetToken}`;

    const message = `your password reset token is as follow: \n\n${resetUrl}\n\n
    if you have not requested this email, then ignore it.`;

    //send email
    try {
        await sendEmail({
            email: user.email,
            subject: 'Fantasia password recovery',
            message
        });

        res.status(200).json({
            success: true,
            message: `email sent to ${user.email}`
        })
        
    } catch (error) {
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;

        await user.save({ validateBeforeSave: false });
        return next(new ErrorHandler(error.message, 500))
    }
});

//reset password   api/v1/password/reset
exports.resetPassword = catchAsyncErrors( async (req,res,next) => {
    //Hash url token
    const resetPasswordToken = crypto.createHash('sha256').update(req.params.token).digest('hex');

    const user = await User.findOne({
        resetPasswordToken,
        resertPasswordExpire : { $gt : Date.now() }
    });

    if(!user){
        return next(new ErrorHandler('Password reset token is invalid or has been expired', 400))
    };

    if(req.body.password !== req.body.confirmPassword){
        return next(new ErrorHandler('Password does not match', 400))
    };

    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();
    sendToken(user, 200, res)
});

//get currently logged in user   api/v1/me
exports.getUserProfile = catchAsyncErrors( async (req, res, next) => {
    const user = await User.findById(req.user.id);

    res.status(200).json({
        success: true,
        user
    })
});

//Update/change password   api/v1/password/update
exports.updatePassword = catchAsyncErrors ( async (req, res, next) =>{
    const user = await User.findById(req.user.id).select('+password');

    //check previous user password
    const isMatched = await user.comparePassword(req.body.oldPassword);
    if(!isMatched){
        return next(new ErrorHandler('old password is incorrect', 400))
    };

    user.password = req.body.password;
    user.save();
    sendToken(user, 200, res)
})

//Update user Profile    api/v1/me/update
exports.updateProfile = catchAsyncErrors( async (req, res, next) => {
    const newUserData = {
        name: req.body.name,
        email: req.body.email
    };

    //update avatar...

    const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
        new: true,
        runValidators: true,
        useFindAndModify : false
    });

    res.status(200).json({
        success: true,
        user
    })
});

//Admin routes
//Get all users   api/v1/admin/users
exports.allUsers = catchAsyncErrors( async (req, res, next) => {
    const users = await User.find();

    res.status(200).json({
        success: true,
        users
    })
})