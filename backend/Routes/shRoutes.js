const express = require('express');
const router = express.Router();
const {
    getSH,
    createSH,
    likeSH,
    comments } = require('../controller/ShController')

router.get('/',  getSH);
router.post('/sh', createSH);
router.post('/like', likeSH);
router.post('/comments', comments);
module.exports = router;