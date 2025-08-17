const User = require('../models/User')
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

const generateToken = (userId) => {
    return jwt.sign({ id: userId }, process.env.SESSION_SECRET, { expiresIn: "24h" });
};

const registerUser = async (req, res) => {
    try {
        const {name, username, email, password } = req.body || {};

        if (!name || !username || !email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: "Email already exists" });
        }

        const usernameExists = await User.findOne({ username });
        if (usernameExists) {
            return res.status(400).json({ message: "Username has been taken" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = await User.create({
            name,
            username,
            email,
            password: hashedPassword
        });

        res.status(201).json({
            _id: user._id,
            name: user.name,
            username: user.username,
            email: user.email,
            token: generateToken(user._id)
        });
    } catch (error) {
        res.status(400).json({ message: "Server error", error: error.message });
    }
};


const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Invalid Email or password" })
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid password" })
        }
        res.json({
            _id: user._id,
            name: user.name,
            username: user.username,
            email: user.email,
            token: generateToken(user._id)
        })
    } catch (error) {
        res.status(400).json({ message: "server error", error: error.message })

    }
}

const getUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select("-password");
        if (!user) {
            return res.status(404).json({ message: "User not found" })
        }
        res.json(user);
    } catch (error) {
        res.status(400).json({ message: "server error", error: error.message })
    }
}

module.exports = {
    registerUser,
    loginUser,
    getUserProfile,
}