const Earning = require('../models/Earning');
const mongoose = require('mongoose');

const getUserEarnings = async (req, res) => {
  try {
    const userId = req.params.userId;

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: 'Invalid user ID format' });
    }

    const earnings = await Earning.find({ user: userId });

    const total = earnings.reduce((sum, e) => sum + e.amount, 0);
    const level1 = earnings.filter(e => e.level === 1).reduce((sum, e) => sum + e.amount, 0);
    const level2 = earnings.filter(e => e.level === 2).reduce((sum, e) => sum + e.amount, 0);

    res.json({
      userId,
      totalEarnings: total,
      level1Earnings: level1,
      level2Earnings: level2,
      breakdown: earnings
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { getUserEarnings };
