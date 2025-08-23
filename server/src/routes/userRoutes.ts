import express from "express";
import {
  getUser,
  getAllUsers,
  updateUserProfile,
  getSocialData,
  followUser,
  unfollowUser,
  getCurrentUserWithStats,
  getUserSocialData
} from "../controller/userController";
import { protect } from "../middleware/authMiddleware";
import { upload } from "../middleware/uploadMiddleware";

const router = express.Router();

router.get('/alluser/:id', protect, getCurrentUserWithStats);
router.get('/allusers', protect, getAllUsers);
router.get('/social', protect, getUserSocialData);

router.get('/social/:id', protect, getSocialData);
router.get('/:id', protect, getUser);

router.put('/update/:id', protect, upload.single("profileImage"), updateUserProfile);
router.post('/follow', protect, followUser);
router.post('/unfollow', protect, unfollowUser);

export default router;
