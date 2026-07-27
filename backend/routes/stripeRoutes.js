const express = require('express');
const router = express.Router();
const stripeController = require('../controllers/stripeController');

// Standard JSON parser for checkout
router.post('/create-checkout-session', express.json(), stripeController.createCheckoutSession);

module.exports = router;
