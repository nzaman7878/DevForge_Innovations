const express = require('express');
const router = express.Router();
const stripeController = require('../controllers/stripeController');

// Standard JSON parser for checkout
router.post('/create-checkout-session', express.json(), stripeController.createCheckoutSession);

// Webhooks require raw body, so we bypass standard JSON parsing if needed, but since it's mounted after express.json in server.js usually, 
// we will handle rawBody logic in server.js, or just accept JSON for testing.
router.post('/webhook', express.raw({type: 'application/json'}), stripeController.webhook);

module.exports = router;
