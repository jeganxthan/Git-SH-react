import express from "express";
import { registerUser, loginUser, getUserProfile, verifyOtp, resendOtp } from "../controller/authController";
import { protect } from "../middleware/authMiddleware";

const router = express.Router();

router.post("/register", registerUser);
router.post("/verify-otp", verifyOtp);
router.post("/resend", resendOtp);
router.post("/login", loginUser);
router.get("/profile", protect, getUserProfile);

export default router;
