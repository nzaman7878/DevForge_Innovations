const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ['admin', 'client'],
    default: 'client',
  },
  avatarUrl: {
    type: String,
    default: '',
  },
  bio: {
    type: String,
    default: '',
  },
  company: {
    type: String,
    default: '',
  },
  preferences: {
    emailNotifications: { type: Boolean, default: true },
    marketingEmails: { type: Boolean, default: false },
    publicProfile: { type: Boolean, default: true }
  }
}, { timestamps: true });

userSchema.index({ email: 1 });

module.exports = mongoose.model('User', userSchema);
