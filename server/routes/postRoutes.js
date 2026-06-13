/**
 * Post Routes
 * Defines routes for post operations
 */

const express = require('express');
const router = express.Router();
const authenticate = require('../middleware/authMiddleware');
const { validatePost, validateComment, validateInput } = require('../middleware/validation');
const {
  getPosts,
  createPost,
  updatePost,
  deletePost,
  likePost,
  addComment,
  deleteComment,
} = require('../controllers/postController');

// Get all posts
router.get('/', authenticate, getPosts);

// Create post
router.post('/', authenticate, validatePost, validateInput, createPost);

// Update post
router.put('/:id', authenticate, updatePost);

// Delete post
router.delete('/:id', authenticate, deletePost);

// Like post
router.post('/:id/like', authenticate, likePost);

// Add comment
router.post('/:id/comment', authenticate, validateComment, validateInput, addComment);

// Delete comment
router.delete('/:id/comment/:commentId', authenticate, deleteComment);

module.exports = router;
