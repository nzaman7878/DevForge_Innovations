const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const helmet = require('helmet');
const compression = require('compression');
const rateLimit = require('express-rate-limit');
require('dotenv').config({ path: path.join(__dirname, '.env') });

const app = express();
const PORT = process.env.PORT || 5000;

app.use(helmet());
app.use(compression());
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:5173',
  credentials: true,
}));

// Stripe webhook must be before express.json
const stripeController = require('./controllers/stripeController');
app.post('/api/payments/webhook', express.raw({ type: 'application/json' }), stripeController.webhook);

app.use(express.json());

const authLimiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 10, message: 'Too many attempts' });
const apiLimiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 100 });

// Routes
app.use('/api/auth', authLimiter, require('./routes/authRoutes'));
app.use('/api/projects', apiLimiter, require('./routes/projectRoutes'));
app.use('/api/posts', apiLimiter, require('./routes/postRoutes'));
app.use('/api/leads', apiLimiter, require('./routes/leadRoutes'));
app.use('/api/client-projects', apiLimiter, require('./routes/clientProjectRoutes'));
app.use('/api/payments', apiLimiter, require('./routes/stripeRoutes'));
app.use('/api/admin', apiLimiter, require('./routes/adminRoutes'));
app.use('/api/users', apiLimiter, require('./routes/userRoutes'));

// Basic route
app.get('/api/health', (req, res) => {
  const dbState = mongoose.connection.readyState === 1 ? 'connected' : 'disconnected';
  res.json({ status: 'ok', message: 'DevForge Innovations API is running', database: dbState, timestamp: new Date().toISOString() });
});

// Centralized error handler should be last
const errorHandler = require('./middleware/errorHandler');
app.use(errorHandler);

// Database connection
const MONGODB_URI = process.env.MONGODB_URI;
mongoose.connect(MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err));

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
