import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { Server } from 'socket.io';

import './config/mongo.js';

import { VerifyToken, VerifySocketToken } from './middlewares/VerifyToken.js';
import chatRoomRoutes from './routes/chatRoom.js';
import chatMessageRoutes from './routes/chatMessage.js';
import userRoutes from './routes/user.js';

dotenv.config();

const app = express();

// CORS configuration for Express
app.use(cors({
  origin: 'http://localhost:3000', // Adjust this if your frontend is hosted elsewhere
  methods: ['GET', 'POST'],
  credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(VerifyToken);

const PORT = process.env.PORT || 8080;

app.use('/api/room', chatRoomRoutes);
app.use('/api/message', chatMessageRoutes);
app.use('/api/user', userRoutes);

// Create HTTP server
const server = app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

// Configure Socket.IO
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:3000', // Adjust this if your frontend is hosted elsewhere
    methods: ['GET', 'POST'],
    credentials: true
  }
});

io.use(VerifySocketToken);

// Store online users
global.onlineUsers = new Map();

const getKey = (map, val) => {
  for (let [key, value] of map.entries()) {
    if (value === val) return key;
  }
};

// Handle Socket.IO connections
io.on('connection', (socket) => {
  console.log('New WebSocket connection');

  global.chatSocket = socket;

  socket.on('addUser', (userId) => {
    global.onlineUsers.set(userId, socket.id);
    io.emit('getUsers', Array.from(global.onlineUsers));
  });

  socket.on('sendMessage', ({ senderId, receiverId, message }) => {
    const sendUserSocket = global.onlineUsers.get(receiverId);
    if (sendUserSocket) {
      socket.to(sendUserSocket).emit('getMessage', {
        senderId,
        message
      });
    }
  });

  socket.on('disconnect', () => {
    global.onlineUsers.delete(getKey(global.onlineUsers, socket.id));
    io.emit('getUsers', Array.from(global.onlineUsers));
  });
});
