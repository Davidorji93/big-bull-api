const mongoose = require('mongoose');

const bidSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  bid_amount: { type: Number, required: true },
  auction_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Auction' },
  status: {
    type: String,
    enum: ['pending', 'won', 'lost'],
    default: 'pending'
  },
  created_at: {
    type: Date,
    default: Date.now
  }
});

const Bid = mongoose.model('Bid', bidSchema);

module.exports = Bid;
