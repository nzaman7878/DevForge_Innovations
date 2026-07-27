const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/projects', require('./routes/projectRoutes'));
app.use('/api/posts', require('./routes/postRoutes'));
app.use('/api/leads', require('./routes/leadRoutes'));
app.use('/api/client-projects', require('./routes/clientProjectRoutes'));
app.use('/api/payments', require('./routes/stripeRoutes'));
app.use('/api/admin', require('./routes/adminRoutes'));

// Basic route
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'DevForge Innovations API is running' });
});

// Database connection
const MONGODB_URI = process.env.MONGODB_URI;
mongoose.connect(MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err));

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
