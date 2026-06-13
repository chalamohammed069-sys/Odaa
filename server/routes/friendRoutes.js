/**
 * Friend Routes
 * Defines routes for friend operations
 */

const express = require('express');
const router = express.Router();
const authenticate = require('../middleware/authMiddleware');
const {
  sendFriendRequest,
  getFriendRequests,
  acceptFriendRequest,
  rejectFriendRequest,
  removeFriend,
} = require('../controllers/friendController');

// Send friend request
router.post('/request/send', authenticate, sendFriendRequest);

// Get friend requests
router.get('/requests', authenticate, getFriendRequests);

// Accept friend request
router.post('/request/accept', authenticate, acceptFriendRequest);

// Reject friend request
router.post('/request/reject', authenticate, rejectFriendRequest);

// Remove friend
router.post('/remove', authenticate, removeFriend);

module.exports = router;
