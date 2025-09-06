import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import http from "http";
import { Server } from "socket.io";
import { connectDB } from "./config/db";

import authRoutes from "./routes/authRoutes";
import userRoutes from "./routes/userRoutes";
import onboardingRoutes from "./routes/onboardingRoutes";
import shRoutes from "./routes/shRoutes";
import { handleSocketConnections } from "./socket/chatSocket";

// Connect DB
connectDB();

const app = express();
app.use(express.json());

// REST CORS
app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    methods: ["GET", "POST"],
    credentials: true,
  },
});

handleSocketConnections(io);

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/upload", onboardingRoutes);
app.use("/api/sh", shRoutes);

// Start the server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));