/**
 * Authentication Routes
 * Defines routes for authentication operations
 */

const express = require('express');
const router = express.Router();
const { validateRegister, validateLogin, validateInput } = require('../middleware/validation');
const authenticate = require('../middleware/authMiddleware');
const { register, login, getCurrentUser, logout } = require('../controllers/authController');

// Register
router.post('/register', validateRegister, validateInput, register);

// Login
router.post('/login', validateLogin, validateInput, login);

// Get current user
router.get('/me', authenticate, getCurrentUser);

// Logout
router.post('/logout', authenticate, logout);

module.exports = router;
