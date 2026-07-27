const express = require('express');
const router = express.Router();
const leadController = require('../controllers/leadController');
const auth = require('../middleware/auth');

router.post('/', leadController.createLead);
router.get('/', auth, leadController.getLeads);
router.put('/:id/status', auth, leadController.updateLeadStatus);
router.delete('/:id', auth, leadController.deleteLead);

module.exports = router;
