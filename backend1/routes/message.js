const express = require('express');
const router = express.Router();
const messageController = require('../controllers/message');
router.post('/contactus',messageController.sendPost);

module.exports = router;