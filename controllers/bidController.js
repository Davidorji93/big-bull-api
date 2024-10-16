const Bid = require('../models/Bid');
const Auction = require('../models/Auction');

// Place a bid on an auction
exports.placeBid = async (req, res) => {
  try {
    const { user_id, bid_amount } = req.body;
    const auction = await Auction.findById(req.params.auctionId);

    if (!auction) return res.status(404).json({ error: 'Auction not found' });

    const bid = new Bid({
      user_id,
      bid_amount,
      auction_id: auction._id,
    });

    await bid.save();
    
    // Update auction with the highest bid
    if (!auction.highest_bid || bid_amount > auction.highest_bid.bid_amount) {
      auction.highest_bid = bid._id;
      await auction.save();
    }

    res.status(201).json(bid);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all bids for an auction
exports.getAuctionBids = async (req, res) => {
  try {
    const bids = await Bid.find({ auction_id: req.params.auctionId });
    res.status(200).json(bids);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
