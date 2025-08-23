import { Request, Response } from "express";
import Message from "../models/Message";
import { AuthRequest } from "../types";

export const getMessage = async (req: AuthRequest, res: Response) => {
    try {
        const { userId } = req.params;
        const currentUserId = req.user?.id;
        if (!currentUserId) {
            return res.status(401).json({ message: "Unauthorized" })
        }
        const messages = await Message.find({
            $or: [
                { sender: currentUserId, receiver: userId },
                { sender: userId, receiver: currentUserId },
            ]
        })
            .sort({ createdAt: 1 })
            .lean()
        res.status(200).json(messages);
    } catch (error: any) {
        res.status(500).json({ message: "Error fetching messages", error: error.message });
    }
}