const mongoose = require('mongoose');

// Define a schema for individual questions
const questionSchema = new mongoose.Schema({
    question: { type: String, required: true }, // The text of the question
    options: [{ type: String, required: true }], // An array of possible answers
    correctAnswer: { type: Number, required: true } // The index of the correct answer in the options array
});

// Define a schema for the quiz
const quizSchema = new mongoose.Schema({
    title: { type: String, required: true }, // The title of the quiz
    category: { type: String, required: true }, // The category the quiz belongs to
    questions: [questionSchema], // An array of questions
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // The user who created the quiz
    createdAt: { type: Date, default: Date.now } // Timestamp of quiz creation
});

// Create a Quiz model using the schema
const Quiz = mongoose.model('Quiz', quizSchema);

module.exports = Quiz; // Export the Quiz model for use in other files
