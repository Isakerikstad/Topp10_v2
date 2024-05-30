// src/controllers/quizController.js
const Quiz = require('../models/quiz'); // Import the Quiz model

// Handler for creating a new quiz
const createQuiz = async (req, res) => {
    try {
        // Create a new quiz using data from the request body
        const quiz = new Quiz({
            title: req.body.title, // Quiz title
            category: req.body.category, // Quiz category
            questions: req.body.questions, // Quiz questions
            createdBy: req.user._id // ID of the user creating the quiz (assumes req.user is set after authentication)
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
        // Fetch all quizzes and populate the createdBy field with the user's name and email
        const quizzes = await Quiz.find().populate('createdBy', 'name email');
        res.status(200).json(quizzes); // Respond with the list of quizzes
    } catch (error) {
        res.status(500).json({ error: error.message }); // Handle server errors
    }
};

module.exports = {
    createQuiz, // Export the createQuiz handler
    getQuizzes // Export the getQuizzes handler
};
