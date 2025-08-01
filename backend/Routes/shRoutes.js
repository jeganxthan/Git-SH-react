const express = require('express');
const router = express.Router();
const {protect } = require('../middleware/authMiddleware')
const {
    getSH,
    createSH,
    likeSH,
    comments } = require('../controller/ShController')

router.get('/', protect, getSH);
router.post('/sh',protect, createSH);
router.post('/like',protect, likeSH);
router.post('/comments',protect, comments);
module.exports = router;