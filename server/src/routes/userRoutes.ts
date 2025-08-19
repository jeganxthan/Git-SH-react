import express from "express";
import {
    getUser,
    getAllUsers,
    updateUserProfile,
    getSocialData,
    followUser,
    unfollowUser
} from "../controller/userController";
import { protect } from "../middleware/authMiddleware";
import { upload } from "../middleware/uploadMiddleware";
const router = express.Router();


router.get('/:id/social', protect, getSocialData);
router.get('/:id', protect, getUser);
router.get('/', protect, getAllUsers);
router.put('/update/:id', protect, upload.single("profileImage"), updateUserProfile);
router.post('/follow', protect, followUser);
router.post('/unfollow', protect, unfollowUser);

export default router;
