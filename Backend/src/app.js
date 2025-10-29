const cookieParser = require('cookie-parser');
const express = require('express');
const cors = require('cors');
const app = express();

const authRoutes = require('./routes/auth.routes');
const chatRoutes = require('./routes/chat.routes');

const corsOptions = {
  origin: [
    'http://localhost:5173',
    'https://chatgpt-clone-phi-one.vercel.app',
    'https://chatgpt-clone-q2kvbued7-purohitdivyaraj000-2228s-projects.vercel.app'
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Cookie']
};

// Apply middlewares
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

// Mount routes
app.use('/api/auth', authRoutes);
app.use('/api/chat', chatRoutes);

module.exports = app;