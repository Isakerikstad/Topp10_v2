// scripts/routes/quizRoutes.js
const express = require('express');
const { createQuiz, getQuizzes, getQuiz } = require('../controllers/quizController');
const router = express.Router();

router.post('/create', createQuiz);
router.get('/', getQuizzes);
router.get('/:quizId', getQuiz); // Ensure this endpoint is correctly defined

module.exports = router;
