const http = require('http');
const app = require('./app');
const connectDB = require('./config/db');
require('dotenv').config();

const PORT = process.env.PORT || 5000;

// MongoDB connect
connectDB();

// Create HTTP server
const server = http.createServer(app);

// WebSocket setup (optional for now)
const { Server } = require('socket.io');
const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST']
  }
});

io.on('connection', (socket) => {
  console.log('🟢 Client connected: ' + socket.id);
  socket.on('disconnect', () => {
    console.log('🔴 Client disconnected: ' + socket.id);
  });
});

// Attach io to app if needed later
app.set('io', io);

// ✅ Start server
server.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
