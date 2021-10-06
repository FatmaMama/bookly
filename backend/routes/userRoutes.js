const express = require('express');
const router = express.Router();
const { registerUser, loginUser, logoutUser, forgotPassword } = require('../controllers/userControllers');

router.post('/register', registerUser);

router.post('/login', loginUser);

router.get('/logout', logoutUser);

router.post('/password/forgot', forgotPassword);

// router.put()

module.exports = router;