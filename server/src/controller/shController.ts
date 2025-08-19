import { Request, Response } from "express";
import mongoose from "mongoose";
import SH, { IComment, ISH } from "../models/Sh";
import { AuthRequest } from "../types";
import User from "../models/User";

// Get all SH posts
export const getSH = async (req: AuthRequest, res: Response) => {
  try {
    const SHs: ISH[] = await SH.find()
      .populate("user", "username profileImage")
      .populate("likes", "username profileImage")
      .populate("comments.user", "username profileImage");
    res.json(SHs);
  } catch (error: any) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Create a new SH post
export const createSH = async (req: AuthRequest, res: Response) => {
  try {
    const { sh } = req.body;
    const userId = req.params.id;
    if (!userId) return res.status(401).json({ message: "User ID not found" });
    if (!sh) return res.status(400).json({ message: "SH content is required" });

    const newSH = new SH({ user: userId, sh });
    await newSH.save();
    res.status(201).json({ message: "SH posted", post: newSH });
  } catch (error: any) {
    res.status(500).json({ message: "Error creating SH", error: error.message });
  }
};

// Toggle like/unlike
export const toggleLikeSH = async (req: Request, res: Response) => {
  const { shId } = req.params;
  const { userId } = req.body;

  if (!mongoose.Types.ObjectId.isValid(shId))
    return res.status(400).json({ message: "Invalid SH ID" });

  try {
    const sh = await SH.findById(shId);
    if (!sh) return res.status(404).json({ message: "SH not found" });

    const likedIndex = sh.likes.findIndex(id => id.toString() === userId.toString());
    if (likedIndex === -1) sh.likes.push(new mongoose.Types.ObjectId(userId));
    else sh.likes.splice(likedIndex, 1);

    await sh.save();
    res.status(200).json({
      likes: sh.likes,
      message: likedIndex === -1 ? "Liked" : "Unliked",
    });
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// Add a comment
export const addComment = async (req: Request, res: Response) => {
  const { shId } = req.params;
  const { userId, text } = req.body;

  if (!mongoose.Types.ObjectId.isValid(shId))
    return res.status(400).json({ message: "Invalid SH ID" });
  if (!text) return res.status(400).json({ message: "Comment text is required" });

  try {
    const sh = await SH.findById(shId);
    if (!sh) return res.status(404).json({ message: "SH not found" });

    // Add comment directly to the DocumentArray
    sh.comments.push({ user: new mongoose.Types.ObjectId(userId), text });

    await sh.save();
    res.status(201).json({ comments: sh.comments, message: "Comment added" });
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// Delete a comment
export const deleteComment = async (req: Request, res: Response) => {
  const { shId, commentId } = req.params;
  const { userId } = req.body;

  try {
    const sh = await SH.findById(shId);
    if (!sh) return res.status(404).json({ message: "SH not found" });

    // Find comment index
    const commentIndex = sh.comments.findIndex(c => c._id.toString() === commentId);
    if (commentIndex === -1) return res.status(404).json({ message: "Comment not found" });

    // Ownership check
    if (sh.comments[commentIndex].user.toString() !== userId)
      return res.status(403).json({ message: "You can only delete your own comments" });

    // Remove comment in place
    sh.comments.splice(commentIndex, 1);

    await sh.save();
    res.status(200).json({ comments: sh.comments, message: "Comment deleted" });
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// Toggle follow/unfollow
export const toggleFollow = async (req: Request, res: Response) => {
  const { userId, targetId } = req.body;

  if (!mongoose.Types.ObjectId.isValid(userId) || !mongoose.Types.ObjectId.isValid(targetId))
    return res.status(400).json({ message: "Invalid user IDs" });

  try {
    const user = await User.findById(userId);
    const targetUser = await User.findById(targetId);
    if (!user || !targetUser) return res.status(404).json({ message: "User not found" });

    const alreadyFollowing = user.following.includes(targetId);

    if (alreadyFollowing) {
      // Unfollow
      user.following = user.following.filter(id => id.toString() !== targetId);
      targetUser.followers = targetUser.followers.filter(id => id.toString() !== userId);
    } else {
      // Follow
      user.following.push(targetId);
      targetUser.followers.push(userId);
    }

    await user.save();
    await targetUser.save();

    res.status(200).json({
      message: alreadyFollowing ? "Unfollowed" : "Followed",
      following: user.following,
      followers: targetUser.followers,
    });
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};
