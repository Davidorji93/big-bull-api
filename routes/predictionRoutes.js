const express = require('express');
const router = express.Router();
const predictionController = require('../controllers/predictionController.js');

// Create a new prediction for a user
router.post('/users/:userId/predictions', predictionController.createPrediction);

// Get all predictions for a user
router.get('/users/:userId/predictions', predictionController.getUserPredictions);

module.exports = router;
