const express = require('express');
const router = express.Router();
const auctionController = require('../controllers/auctionController');

// Create a new auction
router.post('/auctions', auctionController.createAuction);

// Get all auctions
router.get('/auctions', auctionController.getAuctions);

// Get a specific auction by ID
router.get('/auctions/:id', auctionController.getAuctionById);

module.exports = router;
