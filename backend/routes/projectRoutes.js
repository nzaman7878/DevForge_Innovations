const express = require('express');
const router = express.Router();
const projectController = require('../controllers/projectController');
const auth = require('../middleware/auth');
const adminOnly = require('../middleware/adminOnly');
const upload = require('../middleware/upload');
const { check } = require('express-validator');
const { validate } = require('../middleware/validate');

router.get('/', projectController.getProjects);
router.post(
  '/', 
  auth, 
  adminOnly, 
  upload.single('image'), 
  [
    check('title', 'Title is required').not().isEmpty(),
    check('category', 'Category is required').not().isEmpty(),
    check('description', 'Description is required').not().isEmpty()
  ],
  validate,
  projectController.createProject
);
router.put('/:id', auth, adminOnly, upload.single('image'), projectController.updateProject);
router.delete('/:id', auth, adminOnly, projectController.deleteProject);

module.exports = router;
