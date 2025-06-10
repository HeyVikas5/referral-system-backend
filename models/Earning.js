const mongoose = require('mongoose');

const earningSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // who earned
  sourceUser: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // whose purchase
  purchaseAmount: Number,
  amount: Number, // earning
  level: Number, // 1 or 2
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Earning', earningSchema);
