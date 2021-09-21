const express = require('express');
const router = express.Router();
const ratingController = require('../controllers/Rating');
router.post('/rating',ratingController.sendPost);
router.get('/rating',ratingController.getPosts);
module.exports = router;