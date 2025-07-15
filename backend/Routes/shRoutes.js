const express = require('express');
const router = express.Router();
const {authenticateUser } = require('../middleware/authMiddleware')
const {
    getSH,
    createSH,
    likeSH,
    comments } = require('../controller/ShController')

router.get('/', authenticateUser, getSH);
router.post('/sh',authenticateUser, createSH);
router.post('/like',authenticateUser, likeSH);
router.post('/comments',authenticateUser, comments);
module.exports = router;