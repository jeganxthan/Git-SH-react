import express from "express";
import { getMessage } from "../controller/MessageController";
import { protect } from "../middleware/authMiddleware";

const router = express.Router();

router.get("/:userId", protect, getMessage)

export default router;