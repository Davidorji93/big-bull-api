const mongoose = require('mongoose');

// Subdocument Schema for Predictions
const predictionSchema = new mongoose.Schema({
  crypto: String,
  predicted_price: Number,
  status: {
    type: String,
    enum: ['pending', 'won', 'lost'],
    default: 'pending'
  },
  created_at: {
    type: Date,
    default: Date.now
  }
});

// Subdocument Schema for Tasks
const taskSchema = new mongoose.Schema({
  task_type: String,
  reward: {
    BB: Number,
    USDT: Number
  },
  completed_at: {
    type: Date,
    default: Date.now
  }
});

// User Schema
const userSchema = new mongoose.Schema({
  telegram_account: { type: String, required: true, unique: true },
  balance: { type: Number, default: 0 },
  level: { type: Number, default: 1 },
  energy: { type: Number, default: 3 },
  fuel: { type: Number, default: 100 },
  free_refills: { type: Number, default: 3 },
  tasks_completed: [taskSchema],
  predictions: [predictionSchema],
  created_at: {
    type: Date,
    default: Date.now
  }
});

// User Model
const User = mongoose.model('User', userSchema);

module.exports = User;
