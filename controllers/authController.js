
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Signup Controller
const signup = async (req, res) => {
  const { telegram_account } = req.body;

  try {

      // Check if the account is at least 3 years old
      const currentDate = new Date();
      const accountAgeInYears = (currentDate - user.createdAt) / (1000 * 60 * 60 * 24 * 365); 
  
      if (accountAgeInYears < 3) {
        return res.status(400).json({ message: 'Your account must be at least 3 years old to log in.' });
      }
 

  

    // Create new user
    const newUser = new User({ telegram_account });
    await newUser.save();

         
    // Check if the user already exists
    const existingUser = await User.findOne({ telegram_account });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists.' });
    }

    // Generate a token
    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    
    res.status(201).json({ token, user: newUser });
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// Login Controller
const login = async (req, res) => {
  const { telegram_account } = req.body;

  try {
    const user = await User.findOne({ telegram_account });
    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    // Here, you would typically compare passwords if applicable.
    // const isPasswordValid = await bcrypt.compare(password, user.password);
    // if (!isPasswordValid) {
    //   return res.status(401).json({ message: 'Invalid credentials.' });
    // }

    // Generate a token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    
    res.status(200).json({ token, user });
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

module.exports = { signup, login };
