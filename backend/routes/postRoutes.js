const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');
const auth = require('../middleware/auth');
const adminOnly = require('../middleware/adminOnly');

router.get('/', postController.getPosts);
router.get('/:slug', postController.getPostBySlug);
router.post('/', auth, adminOnly, postController.createPost);
router.put('/:id', auth, adminOnly, postController.updatePost);
router.delete('/:id', auth, adminOnly, postController.deletePost);

module.exports = router;
