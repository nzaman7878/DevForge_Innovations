const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const auth = require('../middleware/auth');

// @route   POST api/auth/register
// @desc    Register a user
// @access  Public
router.post('/register', authController.registerUser);

// @route   POST api/auth/login
// @desc    Authenticate user and get token
// @access  Public
router.post('/login', authController.loginUser);

// @route   GET api/auth/user
// @desc    Get authenticated user data
// @access  Private
router.get('/user', auth, authController.getAuthenticatedUser);

module.exports = router;
