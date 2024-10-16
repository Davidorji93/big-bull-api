const User = require('../models/User');

// Create a new user
exports.createUser = async (req, res) => {
  try {
    const { telegram_account } = req.body;
    const user = new User({ telegram_account });
    await user.save();
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get user by ID
exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update user level (increase level)
exports.updateUserLevel = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ error: 'User not found' });
    user.level += 1;
    await user.save();
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Refuel user tapping tank
exports.refuelTappingTank = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ error: 'User not found' });
    
    if (user.free_refills > 0) {
      user.fuel = 100;  // Refuel to max
      user.free_refills -= 1;
    } else {
      res.status(400).json({ error: 'No free refills left' });
      return;
    }
    await user.save();
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
