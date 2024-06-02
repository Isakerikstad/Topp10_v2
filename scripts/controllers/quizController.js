// scripts/controllers/quizController.js
const Quiz = require('../models/quiz'); // Import the updated Quiz model

// Handler for creating a new quiz
const createQuiz = async (req, res) => {
    try {
        const { quizId, title, questions } = req.body;

        // Create a new quiz using data from the request body
        const quiz = new Quiz({
            quizId,
            title,
            questions,
            createdAt: new Date()
        });

        // Save the quiz to the database
        const savedQuiz = await quiz.save();
        res.status(201).json(savedQuiz); // Respond with the saved quiz
    } catch (error) {
        res.status(400).json({ error: error.message }); // Handle validation or other errors
    }
};

// Handler for fetching all quizzes
const getQuizzes = async (req, res) => {
    try {
        // Fetch all quizzes
        const quizzes = await Quiz.find();
        res.status(200).json(quizzes); // Respond with the list of quizzes
    } catch (error) {
        res.status(500).json({ error: error.message }); // Handle server errors
    }
};

// Handler for fetching a single quiz by ID
const getQuiz = async (req, res) => {
    try {
        const quizId = req.params.quizId;
        console.log('Fetching quiz with ID:', quizId); // Add debug log
        const quiz = await Quiz.findOne({ quizId });
        if (!quiz) {
            return res.status(404).json({ error: 'Quiz not found' });
        }
        res.status(200).json(quiz); // Respond with the quiz
    } catch (error) {
        console.error('Error fetching quiz:', error); // Add debug log
        res.status(500).json({ error: error.message }); // Handle server errors
    }
};

module.exports = {
    createQuiz, // Export the createQuiz handler
    getQuizzes, // Export the getQuizzes handler
    getQuiz, // Export the getQuiz handler
};
