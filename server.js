const express = require('express');
const mongoose = require('mongoose');
const app = express();
const dotenv = require('dotenv');

// Middleware for JWT token verification
const verifyToken = require('./middleware/verifyToken');

dotenv.config();

// Middleware to parse JSON
app.use(express.json()); 

// Import routes
const userRoutes = require('./routes/userRoutes');
const taskRoutes = require('./routes/taskRoutes');
const predictionRoutes = require('./routes/predictionRoutes');
const auctionRoutes = require('./routes/auctionRoutes');
const bidRoutes = require('./routes/bidRoutes');
const transactionRoutes = require('./routes/transactionRoutes');
const authRoutes = require('./routes/authRoutes');

// Public routes
app.use('/api/auth', authRoutes);

// Protected routes (requires token verification)
app.use('/api/users', verifyToken, userRoutes); // Apply middleware to user routes
app.use('/api/tasks', taskRoutes);
app.use('/api/predictions', predictionRoutes);
app.use('/api/auctions', auctionRoutes);
app.use('/api/bids', bidRoutes);
app.use('/api/transactions', transactionRoutes);

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
