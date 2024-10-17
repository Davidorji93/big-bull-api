const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController.js');


// Get a user by ID
router.get('/users/:id', userController.getUserById);

// Update user level (increase level)
router.patch('/users/:id/level', userController.updateUserLevel);

// Refuel user tapping tank (using free refills)
router.patch('/users/:id/refuel', userController.refuelTappingTank);

module.exports = router;
