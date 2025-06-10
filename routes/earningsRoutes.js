const express = require('express');
const router = express.Router();
const { getUserEarnings } = require('../controllers/earningsController');

router.get('/:userId', getUserEarnings);

module.exports = router;
