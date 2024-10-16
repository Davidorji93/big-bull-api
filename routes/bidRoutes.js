const express = require('express');
const router = express.Router();
const bidController = require('../controllers/bidController');

// Place a bid on an auction
router.post('/auctions/:auctionId/bids', bidController.placeBid);

// Get all bids for a specific auction
router.get('/auctions/:auctionId/bids', bidController.getAuctionBids);

module.exports = router;
