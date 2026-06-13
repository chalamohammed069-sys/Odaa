/**
 * Message Routes
 * Defines routes for messaging operations
 */

const express = require('express');
const router = express.Router();
const authenticate = require('../middleware/authMiddleware');
const { getChatHistory, sendMessage, deleteMessage } = require('../controllers/messageController');

// Get chat history
router.get('/:recipientId', authenticate, getChatHistory);

// Send message
router.post('/', authenticate, sendMessage);

// Delete message
router.delete('/:id', authenticate, deleteMessage);

module.exports = router;
