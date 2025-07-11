const express = require('express');
const router = express.Router();
const { getAllUsers,
    getUser,
    getSocialData,
    followUser,
    unfollowUser } = require('../controller/UserController');

router.get('/', getAllUsers);
router.get('/:userId/social', getSocialData);
router.get('/:clerkId', getUser);

router.post('/follow', followUser);
router.post('/unfollow', unfollowUser)

module.exports = router;
