const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const auth = require('../middleware/auth');

const { check } = require('express-validator');
const { validate } = require('../middleware/validate');

// @route   POST api/auth/register
// @desc    Register a user
// @access  Public
router.post(
  '/register',
  [
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Please enter a password with 6 or more characters').isLength({ min: 6 })
  ],
  validate,
  authController.registerUser
);

// @route   POST api/auth/login
// @desc    Authenticate user and get token
// @access  Public
router.post(
  '/login',
  [
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password is required').exists()
  ],
  validate,
  authController.loginUser
);

// @route   GET api/auth/user
// @desc    Get authenticated user data
// @access  Private
router.get('/user', auth, authController.getAuthenticatedUser);

module.exports = router;
