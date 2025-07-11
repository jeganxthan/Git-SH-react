const User = require('../models/User')
const getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: message })
    }
}

const getUser = async () => {
    try {
        const { clerkId } = req.params;
        const user = await User.findOne({ clerkId });
        if (!user) return res.status(404).json({ message: "User not found" })
        res.json(user)
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
}

const getSocialData = async (req, res) => {
    try {
        const { userId } = req.params;;
        const user = await User.findById(userId)
            .select('followers following')
            .populate('followers', 'username profieImage')
            .populate('dollowing', 'username profieImage')
        if (!user) return res.status(404).json({ message: "User not found" });
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: "Error fetching user", error: error.message })
    }
}

const followUser = async (req, res) => {
    try {
        const { currentUserId, targetUserId } = req.body;
        if (currentUserId === targetUserId) {
            return res.status(400).json({ messgae: "You can't follow yourself" })
        }
        const currentUser = await User.findById(currentUserId);
        const targetUser = await User.findById(targetUserId);

        if (!currentUser || !targetUser) {
            return res.status(404).json({ message: 'User(s) not found' });
        }
        if (!currentUser.following.includes(targetUserId)) {
            currentUser.following.push(targetUserId);
            await currentUser.save();
        }
        if (!targetUser.followers.includes(currentUserId)) {
            targetUser.followers.push(currentUserId);
            await targetUser.save();
        }
        res.json({ message: 'Followed successfully' });
    } catch (error) {
        res.status(500).json({ message: "Follow error", error: error.message })
    }
}

const unfollowUser = async () => {
    try {
        const { currentUserId, targetUserId } = req.body;

        const currentUser = await User.findById(currentUserId);
        const targetUser = await User.findById(targetUserId);

        if (!currentUser || !targetUser) {
            return res.status(404).json({ message: 'User(s) not found' });
        }

        currentUser.following = currentUser.following.filter(
            id => id.toString() !== targetUserId
        );
        await currentUser.save();

        targetUser.followers = targetUser.followers.filter(
            id => id.toString() !== currentUserId
        );
        await targetUser.save();

        res.json({ message: 'Unfollowed successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Unfollow error', error: error.message });
    }
}

module.exports = {
    getAllUsers,
    getUser,
    getSocialData,
    followUser,
    unfollowUser
}
