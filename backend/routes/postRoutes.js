const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');

router.get('/', postController.getPosts);
router.get('/:slug', postController.getPostBySlug);
router.post('/', postController.createPost); // Temporary public for easy seeding

module.exports = router;
