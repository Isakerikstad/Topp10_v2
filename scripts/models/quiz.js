const mongoose = require('mongoose');

const answerSchema = new mongoose.Schema({
    rank: { type: Number, required: true },
    answer: { type: String, required: true }
  });

// Define a schema for the quiz
const quizSchema = new mongoose.Schema({
    quizId: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    question: { type: String, required: true },
    answers: [answerSchema],
    timeLimit: { type: Number, required: true },
    createdAt: { type: Date, default: Date.now }
  });

// Create a Quiz model using the schema
const Quiz = mongoose.model('Quiz', quizSchema);

module.exports = Quiz; // Export the Quiz model for use in other files
