import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User, { IUser } from "../models/User";
import OTP from "../models/OTP";
import { sendEmail } from "../utils/sendEmail";
import { otpTemplate } from "../utils/EmailTemplate";

export interface AuthRequest extends Request {
  user?: { id: string };
}

const generateToken = (userId: string) => {
  if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET is not defined in env variables");
  }
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: "7d" });
};


export const registerUser = async (req: Request, res: Response) => {
  try {
    const { name, email, username, password } = req.body;
    if (!name || !email || !username || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const userExists = await User.findOne({ email });
    if (userExists) return res.status(400).json({ message: "Email already exists" });

    const usernameExists = await User.findOne({ username });
    if (usernameExists) return res.status(400).json({ message: "Username already exists" });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create user with isVerified: false
    const user = await User.create({
      name,
      email,
      username,
      password: hashedPassword,
      isVerified: false,
    });

    // Generate OTP
    const otpCode = Math.floor(100000 + Math.random() * 900000).toString();
    const otpExpiry = new Date(Date.now() + 5 * 60 * 1000); // 5 min

    await OTP.create({
      email,
      otp: otpCode,
      expiresAt: otpExpiry,
    });

    // Send OTP via email
    await sendEmail(email, "Verify your account", otpTemplate(name, otpCode));

    res.status(201).json({ message: "User registered. Please verify OTP sent to your email." });
  } catch (error: any) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};


export const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ message: "All fields are required" });

    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ message: "Invalid email or password" });

    const isMatch = await user.matchPassword(password);
    if (!isMatch) return res.status(401).json({ message: "Invalid email or password" });

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      username: user.username,
      token: generateToken(user._id.toString()),
    });
  } catch (error: any) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const verifyOtp = async (req: Request, res: Response) => {
  try {
    const { email, otp } = req.body;
    if (!email || !otp) return res.status(400).json({ message: "Email and OTP required" });

    const record = await OTP.findOne({ email, otp });
    if (!record) return res.status(400).json({ message: "Invalid OTP" });

    if (record.expiresAt < new Date()) {
      await OTP.deleteMany({ email });       // always clean OTPs
      return res.status(400).json({ message: "OTP expired, please request a new one" });
    }

    await User.findOneAndUpdate({ email }, { isVerified: true });
    await OTP.deleteMany({ email });

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      username: user.username,
      token: generateToken(user._id.toString()),
    });
  } catch (error: any) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};



export const getUserProfile = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user) return res.status(401).json({ message: "Unauthorized" });

    const user = await User.findById(req.user.id).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });

    res.json(user);
  } catch (error: any) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
export const resendOtp = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ message: "Email is required" });
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    if (user.isVerified) {
      return res.status(400).json({ message: "User is already verified" });
    }

    // Delete any old OTPs for this user
    await OTP.deleteMany({ email });

    // Generate new OTP
    const otpCode = Math.floor(100000 + Math.random() * 900000).toString();
    const otpExpiry = new Date(Date.now() + 5 * 60 * 1000); // 5 min

    await OTP.create({
      email,
      otp: otpCode,
      expiresAt: otpExpiry,
    });

    // Send OTP via email
    await sendEmail(email, "Resend OTP - Verify your account", otpTemplate(user.name, otpCode));

    res.status(200).json({ message: "New OTP sent to your email." });
  } catch (error: any) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
