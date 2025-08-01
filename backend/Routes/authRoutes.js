const express = require("express");
const {
  registerUser,
  loginUser,
  getUserProfile
} = require("../controller/authController");
const { protect } = require("../middleware/authMiddleware");
const { profileUpload } = require('../middleware/uploadMiddleware'); 
const { uploadImages } = require("../controller/uploadController");

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/profile", protect, getUserProfile);

router.post("/upload-image", profileUpload.single('profileImage'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "No file uploaded" });
  }
  const imageUrl = `${req.protocol}://${req.get("host")}/uploads/profile/${req.file.filename}`;
  res.status(200).json({ imageUrl });
});

router.put(
  "/upload-profile",
  protect,
  profileUpload.fields([{ name: "profileImage", maxCount: 1 }]), 
  uploadImages
);

module.exports = router;