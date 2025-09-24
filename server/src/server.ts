import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import http from "http";
import { connectDB } from "./config/db";

import authRoutes from "./routes/authRoutes";
import userRoutes from "./routes/userRoutes";
import onboardingRoutes from "./routes/onboardingRoutes";
import shRoutes from "./routes/shRoutes";
import messageRoutes from "./routes/messageRoutes";
import { initWebRTCSignaling } from "./server/webrtcSignaling";

connectDB();

const app = express();
app.use(express.json());

app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/user", userRoutes);
app.use("/api/upload", onboardingRoutes);
app.use("/api/sh", shRoutes);

const server = http.createServer(app);

initWebRTCSignaling(server);

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
