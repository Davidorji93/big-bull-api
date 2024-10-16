const mongoose = require('mongoose');

const referralSchema = new mongoose.Schema({
  referrer: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  referred: { type: String, required: true }, // Telegram account of the referred user
  referral_bonus: { type: Number, default: 0.1 },
  created_at: {
    type: Date,
    default: Date.now
  }
});

const Referral = mongoose.model('Referral', referralSchema);

module.exports = Referral;
