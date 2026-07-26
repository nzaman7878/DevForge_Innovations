const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
    enum: ['Web', 'Mobile', 'SaaS', 'AI', 'Ecommerce', 'Other'],
  },
  imageUrl: {
    type: String,
    required: true,
  },
  clientName: {
    type: String,
    trim: true,
  },
  technologies: [{
    type: String,
  }],
  liveLink: {
    type: String,
  },
  githubLink: {
    type: String,
  },
}, { timestamps: true });

module.exports = mongoose.model('Project', projectSchema);
