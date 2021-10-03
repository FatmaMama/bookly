const User = require('../models/userModel');
const catchAsyncErrors = require('../middlewares/asyncErrors');

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
    console.log(password)
    res.status(201).json({
        success:true,
        user
    })
})