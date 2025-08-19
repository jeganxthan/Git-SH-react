import { Request, Response } from "express";
import mongoose from "mongoose";
import User, { IUser } from "../models/User";
import cloudinary from "../config/cloudinary";


export interface AuthRequest extends Request {
  user?: { id: string };       
  body: {
    bio?: string;             
  };
  file?: Express.Multer.File;  
}
export const createOnboarding = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const { bio } = req.body;
    let profileImageUrl: string | null = null;

    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "profile_images",
      });
      profileImageUrl = result.secure_url;
    }

    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    user.bio = bio || user.bio;
    if (profileImageUrl) user.profileImage = profileImageUrl;

    await user.save();

    res.status(200).json({
      message: "Onboarding completed successfully",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        username: user.username,
        bio: user.bio,
        profileImage: user.profileImage,
      },
    });
  } catch (error: any) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
