const express = require('express');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');
const purchaseRoutes = require('./routes/purchaseRoutes');
const earningsRoutes = require('./routes/earningsRoutes');


const app = express();

// ✅ Important: Middleware for JSON parsing
app.use(cors());
app.use(express.json()); // <<--- this line is mandatory

// Routes
app.use('/api/users', userRoutes);
app.use('/api/purchase', purchaseRoutes);
app.use('/api/earnings', earningsRoutes);

app.get('/', (req, res) => {
  res.send('Referral System API is Running');
});

module.exports = app;
