const User = require('../models/User');

// Get user by ID (using user_id from token)
exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.user_id); // Get user by extracted user_id
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update user level (increase level)
exports.updateUserLevel = async (req, res) => {
  try {
    const user = await User.findById(req.user_id); // Get user by extracted user_id
    if (!user) return res.status(404).json({ error: 'User not found' });
    
    user.level += 1; // Increment user level
    await user.save();
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Refuel user tapping tank
exports.refuelTappingTank = async (req, res) => {
  try {
    const user = await User.findById(req.user_id); // Get user by extracted user_id
    if (!user) return res.status(404).json({ error: 'User not found' });
    
    if (user.free_refills > 0) {
      user.fuel = 100;  // Refuel to max
      user.free_refills -= 1; // Decrease available free refills
    } else {
      return res.status(400).json({ error: 'No free refills left' });
    }

    await user.save();
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
