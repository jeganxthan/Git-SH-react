// socket/chatSocket.ts
import { Server, Socket } from "socket.io";
import mongoose from "mongoose";
import Message from "../models/Message";

export const handleSocketConnections = (io: Server) => {
  io.on("connection", (socket: Socket) => {
    console.log("✅ New client connected:", socket.id);

    // Join personal room
    socket.on("join_room", (userId: string) => {
      socket.join(userId);
      console.log(`📥 User ${userId} joined room`);
    });

    // Send message
    socket.on("send_message", async (data) => {
      let { sender, receiver, message } = data;
      console.log("📨 Incoming:", data);

      try {
        // ✅ Ensure valid ObjectIds
        const senderId = new mongoose.Types.ObjectId(sender);
        const receiverId = new mongoose.Types.ObjectId(receiver);

        // Save in DB
        const newMsg = await Message.create({
          sender: senderId,
          receiver: receiverId,
          text: message,
        });

        // Emit to receiver
        io.to(receiver).emit("receive_message", {
          sender: sender,
          message,
          createdAt: newMsg.createdAt,
        });

        // Emit back to sender so it updates immediately
        io.to(sender).emit("receive_message", {
          sender: sender,
          message,
          createdAt: newMsg.createdAt,
        });
      } catch (err) {
        console.error("❌ Error saving message:", err);
      }
    });

    socket.on("disconnect", () => {
      console.log("❌ Client disconnected:", socket.id);
    });
  });
};
