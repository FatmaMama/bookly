//create and send token and save it in the cookie
const sendToken = (user, statusCode, res) => {
    //create token
    const token = user.getJwtToken();

    //options for cookie
    const options = {
        expires : new Date( Date.now() + process.env.COOKIE_EXPIRES_TIME * 24 * 3600 * 1000),
        httpOnly : true
    }

    res.status(statusCode).cookie('token', token, options).json({
        success: true,
        token,
        user
    })
};

module.exports = sendToken;