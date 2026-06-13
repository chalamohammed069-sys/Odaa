/**
 * Notification Routes
 * Defines routes for notification operations
 */

const express = require('express');
const router = express.Router();
const authenticate = require('../middleware/authMiddleware');
const {
  getNotifications,
  markAsRead,
  markAllAsRead,
  getUnreadCount,
} = require('../controllers/notificationController');

// Get notifications
router.get('/', authenticate, getNotifications);

// Get unread count
router.get('/unread/count', authenticate, getUnreadCount);

// Mark notification as read
router.put('/:id/read', authenticate, markAsRead);

// Mark all as read
router.put('/all/read', authenticate, markAllAsRead);

module.exports = router;
