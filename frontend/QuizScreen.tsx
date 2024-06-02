import React, { useState } from 'react';
import { View, Text, Button, TextInput, StyleSheet } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';

const QuizScreen = () => {
    const route = useRoute();
    const navigation = useNavigation();
    const { quiz } = route.params;
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [answer, setAnswer] = useState('');
    const [feedback, setFeedback] = useState('');
    const [correctAnswers, setCorrectAnswers] = useState(0);
    const [showResult, setShowResult] = useState(false);

    const handleAnswerSubmit = () => {
        const currentQuestion = quiz.questions[currentQuestionIndex];
        const userAnswer = answer.toLowerCase();
        const correctAnswer = currentQuestion.answers.find(a => a.answer.toLowerCase() === userAnswer);

        if (correctAnswer) {
            setFeedback(`Correct! Rank: ${correctAnswer.rank}`);
            setCorrectAnswers(correctAnswers + 1);
        } else {
            setFeedback(`Wrong! Correct answers: ${currentQuestion.answers.map(a => `${a.answer} (Rank: ${a.rank})`).join(', ')}`);
        }

        setAnswer('');
        setShowResult(true);
    };

    const handleNextQuestion = () => {
        if (currentQuestionIndex < quiz.questions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
            setFeedback('');
            setShowResult(false);
        } else {
            navigation.navigate('QuizSummary', { quiz, correctAnswers, totalQuestions: quiz.questions.length });
        }
    };

    const currentQuestion = quiz.questions[currentQuestionIndex];

    return (
        <View style={styles.container}>
            {!showResult ? (
                <>
                    <Text style={styles.question}>{currentQuestion.question}</Text>
                    <TextInput
                        style={styles.input}
                        value={answer}
                        onChangeText={setAnswer}
                        placeholder="Type your answer here"
                    />
                    <Button title="Submit Answer" onPress={handleAnswerSubmit} />
                </>
            ) : (
                <View style={styles.resultContainer}>
                    <Text style={styles.feedback}>{feedback}</Text>
                    <Button title="Next Question" onPress={handleNextQuestion} />
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    question: {
        fontSize: 24,
        marginBottom: 20,
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 20,
        paddingHorizontal: 10,
        width: '80%',
    },
    resultContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    feedback: {
        fontSize: 18,
        marginBottom: 10,
    },
});

export default QuizScreen;
