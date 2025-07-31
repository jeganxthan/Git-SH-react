const express = require('express');
const router = express.Router();
const { getAllUsers,
    getUser,
    getSocialData,
    followUser,
    unfollowUser,
    createUser,
    updateUser,
} = require('../controller/UserController');

router.get('/:userId/social', getSocialData);
router.get('/:clerkId', getUser);
router.get('/', getAllUsers);
router.post('/create', createUser);
router.put('/update/:id', updateUser);
router.post('/follow', followUser);
router.post('/unfollow', unfollowUser);

module.exports = router;
