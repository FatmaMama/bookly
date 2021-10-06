const express = require('express');
const router = express.Router();
const { isAuthenticated } = require('../middlewares/auth')
const { registerUser, loginUser, logoutUser, forgotPassword, resetPassword, getUserProfile } = require('../controllers/userControllers');

router.post('/register', registerUser);

router.post('/login', loginUser);

router.get('/logout', logoutUser);

router.post('/password/forgot', forgotPassword);

router.put('/password/reset/:token', resetPassword);

router.get('/me', isAuthenticated, getUserProfile)

module.exports = router;