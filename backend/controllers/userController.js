const User = require('../models/User');
const imagekit = require('../config/imagekit');

exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

exports.updateProfile = async (req, res) => {
  const { name, bio, company } = req.body;

  try {
    let user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }

    user.name = name || user.name;
    user.bio = bio !== undefined ? bio : user.bio;
    user.company = company !== undefined ? company : user.company;

    await user.save();
    
    // Return updated user without password
    const updatedUser = await User.findById(req.user.id).select('-password');
    res.json(updatedUser);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

exports.updateAvatar = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ msg: 'No image uploaded' });
    }

    let user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }

    // Upload to ImageKit
    const uploadResponse = await imagekit.upload({
      file: req.file.buffer, // memory buffer from multer
      fileName: `avatar_${req.user.id}_${Date.now()}`,
      folder: '/devforge/avatars'
    });

    user.avatarUrl = uploadResponse.url;
    await user.save();

    res.json({ avatarUrl: user.avatarUrl, msg: 'Avatar updated successfully' });
  } catch (err) {
    console.error('ImageKit Upload Error:', err);
    res.status(500).json({ msg: 'Server error during image upload' });
  }
};

exports.removeAvatar = async (req, res) => {
  try {
    let user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }

    user.avatarUrl = '';
    await user.save();

    res.json({ msg: 'Avatar removed successfully' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};
