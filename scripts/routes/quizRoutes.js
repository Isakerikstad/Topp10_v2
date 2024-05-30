// src/routes/quizRoutes.js
const express = require('express');
const router = express.Router();
const quizController = require('../controllers/quizController'); // Import the quiz controller
const authMiddleware = require('../middleware/auth'); // Import authentication middleware to protect routes

// Route to create a new quiz (protected by authentication middleware)
router.post('/create', authMiddleware, quizController.createQuiz);

// Route to get all quizzes
router.get('/', quizController.getQuizzes);

module.exports = router; // Export the router for use in the main app
