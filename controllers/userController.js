// controllers/userController.js

const User = require('../models/User');

// Random referral code generator
const generateReferralCode = () => {
  return Math.random().toString(36).substring(2, 8).toUpperCase();
};

const registerUser = async (req, res) => {
  try {
    const { name, email, referredBy } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    let referralCode;
    let isUnique = false;
    while (!isUnique) {
      referralCode = generateReferralCode();
      const check = await User.findOne({ referralCode });
      if (!check) isUnique = true;
    }

    let level = 1;
    let parentUser = null;

    if (referredBy) {
      parentUser = await User.findOne({ referralCode: referredBy });
      if (!parentUser) {
        return res.status(400).json({ message: 'Invalid referral code' });
      }
      if (parentUser.referrals.length >= 8) {
        return res.status(400).json({ message: 'Referral limit exceeded' });
      }
      level = parentUser.level + 1;
    }

    const newUser = new User({
      name,
      email,
      referralCode,
      referredBy,
      level
    });

    await newUser.save();

    if (parentUser) {
      parentUser.referrals.push(newUser._id);
      await parentUser.save();
    }

    res.status(201).json({
      message: 'User registered successfully',
      referralCode: newUser.referralCode,
      level: newUser.level
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { registerUser };
