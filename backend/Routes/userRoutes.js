const express = require('express');
const router = express.Router();
const {authenticateUser } = require('../middleware/authMiddleware')
const { getAllUsers,
    getUser,
    getSocialData,
    followUser,
    unfollowUser,
    createUser,
    updateUser,
} = require('../controller/UserController');

router.get('/:userId/social',authenticateUser, getSocialData);
router.get('/:clerkId',authenticateUser, getUser);
router.get('/',authenticateUser, getAllUsers);
router.post('/create',authenticateUser, createUser);
router.put('/update/:id',authenticateUser, updateUser);
router.post('/follow',authenticateUser, followUser);
router.post('/unfollow',authenticateUser, unfollowUser);

module.exports = router;
