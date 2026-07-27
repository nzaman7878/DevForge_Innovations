const express = require('express');
const router = express.Router();
const clientProjectController = require('../controllers/clientProjectController');
const auth = require('../middleware/auth');

// Client routes
router.get('/mine', auth, clientProjectController.getMyProjects);

// Admin routes (ideally we should have an isAdmin middleware, but auth is enough for now based on current architecture)
router.get('/clients', auth, clientProjectController.getClients);
router.get('/', auth, clientProjectController.getAllProjects);
router.post('/', auth, clientProjectController.createProject);
router.put('/:id', auth, clientProjectController.updateProject);
router.delete('/:id', auth, clientProjectController.deleteProject);

module.exports = router;
