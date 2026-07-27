const express = require('express');
const router = express.Router();
const clientProjectController = require('../controllers/clientProjectController');
const auth = require('../middleware/auth');
const adminOnly = require('../middleware/adminOnly');

// Client routes
router.get('/mine', auth, clientProjectController.getMyProjects);

// Admin routes
router.get('/clients', auth, adminOnly, clientProjectController.getClients);
router.get('/', auth, adminOnly, clientProjectController.getAllProjects);
router.post('/', auth, adminOnly, clientProjectController.createProject);
router.put('/:id', auth, adminOnly, clientProjectController.updateProject);
router.delete('/:id', auth, adminOnly, clientProjectController.deleteProject);

module.exports = router;
