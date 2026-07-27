const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const auth = require('../middleware/auth');
const upload = require('../middleware/upload');

// @route   GET api/users/profile
router.get('/profile', auth, userController.getProfile);

// @route   PUT api/users/profile
router.put('/profile', auth, userController.updateProfile);

// @route   POST api/users/profile/avatar
router.post('/profile/avatar', auth, upload.single('avatar'), userController.updateAvatar);

// @route   DELETE api/users/profile/avatar
router.delete('/profile/avatar', auth, userController.removeAvatar);

module.exports = router;
