const express = require('express');
const webRoutes = require('./web');
const apiRoutes = require('./api');
const chatRoutes = require('./chat.routes');

const router = express.Router();

router.use('/api/chat', chatRoutes); // Week 9: AI Assistant (Gemini)
router.use('/api', apiRoutes);
router.use('/', webRoutes);

module.exports = router;