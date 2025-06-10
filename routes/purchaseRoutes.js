const express = require('express');
const router = express.Router();
const { makePurchase } = require('../controllers/purchaseController');

router.post('/make', makePurchase);

module.exports = router;
