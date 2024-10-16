const express = require('express');
const router = express.Router();
const transactionController = require('../controllers/transactionController');

// Create a new transaction (withdrawal or deposit)
router.post('/transactions', transactionController.createTransaction);

// Get all transactions for a user
router.get('/users/:userId/transactions', transactionController.getUserTransactions);

module.exports = router;
