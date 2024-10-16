const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  task_type: { type: String, required: true },
  reward: {
    BB: { type: Number, default: 0 },
    USDT: { type: Number, default: 0 }
  },
  created_at: {
    type: Date,
    default: Date.now
  }
});

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;
