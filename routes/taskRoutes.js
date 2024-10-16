const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');

// Assign a task to a user
router.post('/users/:userId/tasks', taskController.assignTask);

// Get all tasks completed by a user
router.get('/users/:userId/tasks', taskController.getUserTasks);

module.exports = router;
