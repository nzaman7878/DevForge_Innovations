const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const auth = require('../middleware/auth');
const adminOnly = require('../middleware/adminOnly');

router.get('/stats', auth, adminOnly, adminController.getStats);

module.exports = router;
