import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { Server } from "socket.io";

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();

// Set environment-specific configuration
const PORT = process.env.PORT || 8080;
const CLIENT_URL = process.env.NODE_ENV === "production"
    ? "https://chatify-three-blush.firebaseapp.com" // Firebase Hosting URL
    : "http://localhost:3000"; // Local development URL

// CORS configuration to allow requests from Firebase Hosting
app.use(
    cors({
      origin: CLIENT_URL, // Allow only Firebase Hosting URL
      methods: ["GET", "POST"],
      credentials: true, // Allow cookies or credentials in the requests
    })
);

// Middleware to parse incoming requests
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Example routes (replace with your actual routes)
app.get("/", (req, res) => {
  res.send("Backend is running");
});

// JWT Middleware and other routes (e.g. /api/user, /api/room) go here
// Example: app.use("/api/room", chatRoomRoutes);

// Socket.IO Configuration
const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Initialize Socket.IO
const io = new Server(server, {
  cors: {
    origin: CLIENT_URL, // Allow only Firebase Hosting URL
    methods: ["GET", "POST"],
    credentials: true, // Allow cookies or credentials in the requests
  },
});

// Handle WebSocket connections
io.on("connection", (socket) => {
  console.log("New WebSocket connection");

  // Example socket events
  socket.on("disconnect", () => {
    console.log("User disconnected");
  });

  // Handle other events like 'sendMessage', 'addUser' here
});

