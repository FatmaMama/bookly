const User = require('../models/userModel');
const catchAsyncErrors = require('../middlewares/asyncErrors');
const ErrorHandler = require('../utils/errorHandler');
const sendToken = require('../utils/jwtToken');

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
})