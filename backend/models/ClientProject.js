const mongoose = require('mongoose');

const clientProjectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  client: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  status: {
    type: String,
    enum: ['Planning', 'Development', 'Review', 'Completed'],
    default: 'Planning',
  },
  progress: {
    type: Number,
    min: 0,
    max: 100,
    default: 0,
  },
  documents: [{
    name: String,
    url: String
  }]
}, { timestamps: true });

module.exports = mongoose.model('ClientProject', clientProjectSchema);
