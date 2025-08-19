// src/routes/shRoutes.ts
import { Router } from "express";
import {
  getSH,
  createSH,
  toggleLikeSH,
  addComment,
  deleteComment,
  toggleFollow,
} from "../controller/shController";

const router = Router();

router.get("/", getSH);

router.post("/create/:id", createSH);

router.put("/like/:shId", toggleLikeSH);

router.post("/comment/:shId", addComment);

router.delete("/comment/:shId/:commentId", deleteComment);

router.put("/follow", toggleFollow);

export default router;
