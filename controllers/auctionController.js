const Auction = require('../models/Auction');

// Create a new auction
exports.createAuction = async (req, res) => {
  try {
    const { item_name, starting_bid } = req.body;
    
    const auction = new Auction({
      item_name,
      starting_bid,
    });

    await auction.save();
    res.status(201).json(auction);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all auctions
exports.getAuctions = async (req, res) => {
  try {
    const auctions = await Auction.find({});
    res.status(200).json(auctions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get auction by ID
exports.getAuctionById = async (req, res) => {
  try {
    const auction = await Auction.findById(req.params.id);
    if (!auction) return res.status(404).json({ error: 'Auction not found' });
    res.status(200).json(auction);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
