const mongoose = require('mongoose');

const auctionSchema = new mongoose.Schema({
  item_name: { type: String, required: true },
  starting_bid: { type: Number, required: true },
  highest_bid: { type: mongoose.Schema.Types.ObjectId, ref: 'Bid' }, // Reference to the highest bid
  status: {
    type: String,
    enum: ['open', 'closed'],
    default: 'open'
  },
  created_at: {
    type: Date,
    default: Date.now
  }
});

const Auction = mongoose.model('Auction', auctionSchema);

module.exports = Auction;
