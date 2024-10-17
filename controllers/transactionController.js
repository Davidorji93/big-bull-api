const jwt = require('jsonwebtoken');
const Transaction = require('../models/Transaction');

// Middleware to extract and verify token
const extractUserIdFromToken = (req) => {
  const token = req.headers.authorization?.split(' ')[1]; // Extract token from 'Bearer <token>'
  if (!token) {
    throw new Error('Authorization token is missing');
  }

  const decodedToken = jwt.verify(token, process.env.JWT_SECRET); // Verify token
  return decodedToken.id; // Assuming 'id' is stored in the token
};

// Create a transaction (withdrawal or deposit)
exports.createTransaction = async (req, res) => {
  try {
    const user_id = extractUserIdFromToken(req); // Extract user ID from token
    const { transaction_type, amount } = req.body;

    const transaction = new Transaction({
      user_id,
      transaction_type,
      amount,
    });

    await transaction.save();
    res.status(201).json(transaction);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all transactions for a user
exports.getUserTransactions = async (req, res) => {
  try {
    const user_id = extractUserIdFromToken(req); // Extract user ID from token

    const transactions = await Transaction.find({ user_id });
    res.status(200).json(transactions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
