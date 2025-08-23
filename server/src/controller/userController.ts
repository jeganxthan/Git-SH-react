import { Request, Response } from "express";
import mongoose from "mongoose";
import User, { IUser } from "../models/User";
import { AuthRequest } from "../types";
import cloudinary from "../config/cloudinary";


interface UpdateProfileBody {
  name?: string;
  username?: string;
  bio?: string;
}

export const getUser = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.params.id;
    const user = await User.findById(userId)
      .select("_id bio profileImage name username email")
      .lean();

    if (user) {
      const followersCount = await User.countDocuments({ following: user._id });
      const followingCount = await User.countDocuments({ followers: user._id });

      return res.status(200).json({
        ...user,
        followersCount,
        followingCount,
      });
    }

  } catch (error: any) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const getAllUsers = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    
    const search = req.query.search as string;
    const userId = req.user!.id;

    const query: any = search
      ? {
        $and: [
          {
            $or: [
              { name: { $regex: search, $options: "i" } },
              { username: { $regex: search, $options: "i" } },
            ],
          },
          { _id: { $ne: userId } },  
        ],
      }
      : { _id: { $ne: userId } };  

    const users = await User.find(query)
      .select("_id name username email bio profileImage")
      .lean();

    res.status(200).json(users);
  } catch (error: any) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const getCurrentUserWithStats = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const userId = req.params.id;
    const user = await User.findById(userId)
      .select("_id name username email bio profileImage")
      .lean();

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const followersCount = await User.countDocuments({ following: user._id });
    const followingCount = await User.countDocuments({ followers: user._id });

    return res.status(200).json({
      ...user,
      followersCount,
      followingCount,
    });
  } catch (error: any) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};


export const updateUserProfile = async (
  req: AuthRequest<{ id: string }, any, UpdateProfileBody>,
  res: Response
) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const { id } = req.params;
    const { name, username, bio } = req.body;

    const user = await User.findById(id);
    if (!user) return res.status(404).json({ message: "User not found" });

    if (username) {
      const existingUser = await User.findOne({ username });
      if (existingUser && existingUser._id.toString() !== id) {
        return res.status(400).json({ message: "Username already taken" });
      }
      user.username = username;
    }

    user.name = name || user.name;
    user.bio = bio || user.bio;

    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "profile_images",
      });
      user.profileImage = result.secure_url;
    }

    await user.save();

    res.status(200).json({
      message: "Profile updated successfully",
      user: {
        _id: user._id,
        name: user.name,
        username: user.username,
        email: user.email,
        bio: user.bio,
        profileImage: user.profileImage,
      },
    });
  } catch (error: any) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const getSocialData = async (req: AuthRequest<{ id: string }>, res: Response) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id)
      .select("followers following") 
      .populate<{ followers: IUser[]; following: IUser[] }>("followers following", "username profileImage");
    if (!user) return res.status(404).json({ message: "User not found" });

    res.status(200).json(user);
  } catch (error: any) {
    res.status(500).json({ message: "Error fetching user", error: error.message });
  }
};

export const getUserSocialData = async(req:AuthRequest<{id:string}>, res:Response)=>{
  try {
    const userId = req.user?.id
    const user = await User.findById(userId)
    .select("followers following")
    .populate<{follower:IUser[]; following: IUser[]}>("followers following", "username profileImage");
    if(!user)return res.status(404).json({messgae:"User not found"});
    res.status(200).json(user);
  } catch (error:any) {
    res.status(500).json({ message: "Error fetching user", error: error.message });
  }
}

export const followUser = async (req: AuthRequest<{}, {}, { targetUserId: string }>, res: Response) => {
  try {
    if (!req.user) return res.status(401).json({ message: "Unauthorized" });

    const currentUserId = req.user.id;
    const { targetUserId } = req.body;

    if (currentUserId === targetUserId) {
      return res.status(400).json({ message: "You can't follow yourself" });
    }

    const currentUser = await User.findById(currentUserId);
    const targetUser = await User.findById(targetUserId);

    if (!currentUser || !targetUser) {
      return res.status(404).json({ message: "User not found" });
    }

    if (!currentUser.following.includes(targetUser._id)) {
      currentUser.following.push(targetUser._id);
      await currentUser.save();
    }

    if (!targetUser.followers.includes(currentUser._id)) {
      targetUser.followers.push(currentUser._id);
      await targetUser.save();
    }

    res.status(200).json({ message: "Followed successfully" });
  } catch (error: any) {
    res.status(500).json({ message: "Follow error", error: error.message });
  }
};

export const unfollowUser = async (req: AuthRequest<{}, {}, { targetUserId: string }>, res: Response) => {
  try {
    if (!req.user) return res.status(401).json({ message: "Unauthorized" });

    const currentUserId = req.user.id;
    const { targetUserId } = req.body;

    const currentUser = await User.findById(currentUserId);
    const targetUser = await User.findById(targetUserId);

    if (!currentUser || !targetUser) {
      return res.status(404).json({ message: "User(s) not found" });
    }

    currentUser.following = currentUser.following.filter(
      (id) => id.toString() !== targetUserId
    );
    await currentUser.save();

    targetUser.followers = targetUser.followers.filter(
      (id) => id.toString() !== currentUserId
    );
    await targetUser.save();

    res.status(200).json({ message: "Unfollowed successfully" });
  } catch (error: any) {
    res.status(500).json({ message: "Unfollow error", error: error.message });
  }
};