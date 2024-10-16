const User = require('../models/User');

// Create a new prediction for a user
exports.createPrediction = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) return res.status(404).json({ error: 'User not found' });

    const { crypto, predicted_price } = req.body;
    const prediction = {
      crypto,
      predicted_price,
    };

    user.predictions.push(prediction);
    await user.save();
    res.status(200).json(user.predictions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Fetch all predictions for a user
exports.getUserPredictions = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) return res.status(404).json({ error: 'User not found' });

    res.status(200).json(user.predictions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
