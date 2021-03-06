const express = require('express');
const router = express.Router();
const { isAuthenticated, authorizeRoles } = require('../middlewares/auth')
const { registerUser, 
        loginUser, 
        logoutUser, 
        forgotPassword, 
        resetPassword, 
        getUserProfile, 
        updatePassword, 
        updateProfile, 
        allUsers, 
        getUserDetails,
        updateUser,
        deleteUser
    } = require('../controllers/userControllers');

router.post('/register', registerUser);

router.post('/login', loginUser);

router.get('/logout', logoutUser);

router.post('/password/forgot', forgotPassword);

router.put('/password/reset/:token', resetPassword);

router.get('/me', isAuthenticated, getUserProfile);

router.put('/password/update', isAuthenticated, updatePassword);

router.put('/me/update', isAuthenticated, updateProfile);

router.get('/admin/users', isAuthenticated, authorizeRoles('admin'), allUsers);

router.get('/admin/user/:id', isAuthenticated, authorizeRoles('admin'), getUserDetails);

router.put('/admin/user/:id', isAuthenticated, authorizeRoles('admin'), updateUser);

router.delete('/admin/user/:id', isAuthenticated, authorizeRoles('admin'), deleteUser);

module.exports = router;