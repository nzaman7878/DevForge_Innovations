const Post = require('../models/Post');

exports.getPosts = async (req, res) => {
  try {
    // Only return published posts for public endpoint, or we can just return all for this demo.
    // Let's assume all posts created are published for easier testing without admin UI.
    const posts = await Post.find()
      .sort({ createdAt: -1 })
      .populate('author', 'name');
    res.json(posts);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

exports.getPostBySlug = async (req, res) => {
  try {
    const post = await Post.findOne({ slug: req.params.slug })
      .populate('author', 'name');
    
    if (!post) {
      return res.status(404).json({ msg: 'Post not found' });
    }
    
    res.json(post);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

exports.createPost = async (req, res) => {
  try {
    const newPost = new Post(req.body);
    const post = await newPost.save();
    res.json(post);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};
