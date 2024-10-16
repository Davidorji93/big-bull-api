const User = require('../models/User');
const Task = require('../models/Task');

// Assign a task to a user
exports.assignTask = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) return res.status(404).json({ error: 'User not found' });

    const { task_type, BB, USDT } = req.body;
    const task = {
      task_type,
      reward: { BB, USDT }
    };
    
    user.tasks_completed.push(task);
    await user.save();
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Fetch all tasks completed by a user
exports.getUserTasks = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) return res.status(404).json({ error: 'User not found' });
    
    res.status(200).json(user.tasks_completed);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
