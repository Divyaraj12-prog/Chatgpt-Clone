require('dotenv').config();
const http = require('http');
const app = require('./src/app');
const initSocketServer = require('./src/sockets/socket.server');
const connectDB = require('./src/db/db');

const PORT = process.env.PORT || 3000;

const startServer = async () => {
  try {
    await connectDB();
    const server = http.createServer(app);
    initSocketServer(server);
    
    server.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer();