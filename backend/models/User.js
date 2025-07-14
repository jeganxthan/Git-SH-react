const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema(
    {
        clerkId: {
            type: String,
            required: true,
            unique: true

        },
        name: {
            type: String,
            required: true,
        },
        username: {
            type: String,
            required: true,
            unique: true,
        },
        profileImage: {
            type: String,
            default: null,
        },
        bio:{
            type:String,
            default: null
        },
        followers:[{type: mongoose.Schema.Types.ObjectId, ref:"User"}],
        following:[{type: mongoose.Schema.Types.ObjectId, ref:"User"}]
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model('User', UserSchema);
