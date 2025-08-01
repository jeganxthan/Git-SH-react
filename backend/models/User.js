const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        username: {
            type: String,
            required: true,
            unique: true,
        },
        password: { type: String, require: true },
        profileImageUrl: { type: String, default: null },
        bio: {
            type: String,
            default: null
        },
        followers: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
        following: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }]
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model('User', UserSchema);