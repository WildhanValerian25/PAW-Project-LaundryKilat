const express = require('express');
const chatController = require('../controllers/chat.controller');
const chatRateLimiter = require('../middlewares/chatRateLimiter');
const validateChatInput = require('../middlewares/validateChatInput');

const router = express.Router();

// POST /api/chat -> batasi jumlah request, validasi input, lalu ke controller
router.post('/', chatRateLimiter, validateChatInput, chatController.chat);

module.exports = router;