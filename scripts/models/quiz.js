// src/models/quizModel.js
const mongoose = require('mongoose');

const answerSchema = new mongoose.Schema({
    rank: { type: Number, required: true },
    answer: { type: String, required: true }
});

const questionSchema = new mongoose.Schema({
    question: { type: String, required: true },
    answers: [answerSchema],
    timeLimit: { type: Number, required: true }
});

const quizSchema = new mongoose.Schema({
    quizId: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    questions: [questionSchema],
    createdAt: { type: Date, default: Date.now }
});

const Quiz = mongoose.model('Quiz', quizSchema);

module.exports = Quiz;
