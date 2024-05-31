//scripts/routes/authRoutes.js

const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Register a new user
router.post('/register', (req, res, next) => {
  console.log('Register endpoint hit');
  next();
}, authController.registerUser);

// Login a user
router.post('/login', authController.loginUser);

module.exports = router;
