const express = require('express');
const router = express.Router();
const leadController = require('../controllers/leadController');
const auth = require('../middleware/auth');
const adminOnly = require('../middleware/adminOnly');
const { check } = require('express-validator');
const { validate } = require('../middleware/validate');

router.post(
  '/', 
  [
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check('projectType', 'Project type is required').not().isEmpty(),
  ],
  validate,
  leadController.createLead
);
router.get('/', auth, adminOnly, leadController.getLeads);
router.put('/:id/status', auth, adminOnly, leadController.updateLeadStatus);
router.delete('/:id', auth, adminOnly, leadController.deleteLead);

module.exports = router;
