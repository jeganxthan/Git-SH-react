import express from "express";
import { createOnboarding } from "../controller/onboardingController";
import { protect } from "../middleware/authMiddleware";
import { upload } from "../middleware/uploadMiddleware"; // multer setup

const router = express.Router();

router.post("/", protect, upload.single("profileImage"), createOnboarding);

export default router;
