const Transaction = require('../models/Transaction');

// Create a transaction (withdrawal or deposit)
exports.createTransaction = async (req, res) => {
  try {
    const { user_id, transaction_type, amount } = req.body;

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
    const transactions = await Transaction.find({ user_id: req.params.userId });
    res.status(200).json(transactions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
