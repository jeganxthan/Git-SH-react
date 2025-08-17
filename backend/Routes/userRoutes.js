const express = require('express');
const router = express.Router();
const {protect } = require('../middleware/authMiddleware')
const { getAllUsers,
    getUser,
    getSocialData,
    followUser,
    unfollowUser,
    createUser,
    updateUser,
    onboardingCompeletion,
} = require('../controller/UserController');

router.post('/complete', protect, onboardingCompeletion);
router.get('/:userId/social',protect, getSocialData);
router.get('/:id',protect, getUser);
router.get('/',protect, getAllUsers);
router.post('/create',protect, createUser);
router.put('/update/:id',protect, updateUser);
router.post('/follow',protect, followUser);
router.post('/unfollow',protect, unfollowUser);

module.exports = router;
