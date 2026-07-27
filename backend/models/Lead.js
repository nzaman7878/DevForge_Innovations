const mongoose = require('mongoose');

const leadSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
    trim: true,
  },
  projectType: {
    type: String,
  },
  budget: {
    type: String,
  },
  company: {
    type: String,
    trim: true,
  },
  message: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ['New', 'Contacted', 'Qualified', 'Closed'],
    default: 'New',
  },
  aiScore: {
    type: Number,
    min: 0,
    max: 100,
    default: null, // To be populated later via Gemini AI integration
  },
}, { timestamps: true });

leadSchema.index({ status: 1 });
leadSchema.index({ email: 1 });

module.exports = mongoose.model('Lead', leadSchema);
