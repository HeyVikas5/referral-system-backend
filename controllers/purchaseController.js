const User = require('../models/User');
const Purchase = require('../models/Purchase');
const Earning = require('../models/Earning');

const makePurchase = async (req, res) => {
  try {
    const { userId, amount } = req.body;

    if (amount < 1000) {
      return res.status(400).json({ message: 'Purchase must be ₹1000 or more' });
    }

    const buyer = await User.findById(userId);
    if (!buyer) return res.status(404).json({ message: 'User not found' });

    // Save the purchase
    const newPurchase = new Purchase({ user: buyer._id, amount });
    await newPurchase.save();

    // Level 1 (direct)
    if (buyer.referredBy) {
      const level1 = await User.findOne({ referralCode: buyer.referredBy });
      if (level1) {
        const earning1 = new Earning({
          user: level1._id,
          sourceUser: buyer._id,
          purchaseAmount: amount,
          amount: amount * 0.05, // 5%
          level: 1
        });
        await earning1.save();

        // Level 2
        if (level1.referredBy) {
          const level2 = await User.findOne({ referralCode: level1.referredBy });
          if (level2) {
            const earning2 = new Earning({
              user: level2._id,
              sourceUser: buyer._id,
              purchaseAmount: amount,
              amount: amount * 0.01, // 1%
              level: 2
            });
            await earning2.save();
          }
        }
      }
    }

    res.status(201).json({ message: 'Purchase recorded and earnings distributed' });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { makePurchase };
