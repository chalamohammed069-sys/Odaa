/**
 * User Routes
 * Defines routes for user profile operations
 */

const express = require('express');
const router = express.Router();
const authenticate = require('../middleware/authMiddleware');
const {
  getUserProfile,
  updateUserProfile,
  getUserPosts,
  getFriends,
  searchUsers,
} = require('../controllers/userController');

// Get user profile
router.get('/:id', authenticate, getUserProfile);

// Update user profile
router.put('/:id', authenticate, updateUserProfile);

// Get user's posts
router.get('/:id/posts', authenticate, getUserPosts);

// Get user's friends
router.get('/:id/friends', authenticate, getFriends);

// Search users
router.get('/search/query', authenticate, searchUsers);

module.exports = router;
