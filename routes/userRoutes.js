// routes/userRoutes.js

const express = require('express');
const router = express.Router();
const { registerUser } = require('../controllers/userController');

router.post('/signup', registerUser); // 👈 this must be a function!

module.exports = router;
