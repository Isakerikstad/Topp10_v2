// frontend/QuizScreen.tsx

import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { getQuizzes } from './QuizService';

const QuizScreen = () => {
    const [quizzes, setQuizzes] = useState([]);

    useEffect(() => {
        const fetchQuizzes = async () => {
            try {
                const fetchedQuizzes = await getQuizzes();
                console.log('Fetched Quizzes:', fetchedQuizzes); // Add this line
                setQuizzes(fetchedQuizzes);
            } catch (error) {
                console.error('Error fetching quizzes:', error);
            }
        };

        fetchQuizzes();
    }, []);

    const renderQuiz = ({ item }) => (
        <View style={styles.quizContainer}>
            <Text style={styles.quizTitle}>{item.title}</Text>
            {item.questions && item.questions.map((question, index) => (
                <View key={index} style={styles.questionContainer}>
                    <Text style={styles.questionTitle}>{question.title}</Text>
                    <Text>{question.question}</Text>
                </View>
            ))}
        </View>
    );

    return (
        <View style={styles.container}>
            {quizzes.length > 0 ? (
                <FlatList
                    data={quizzes}
                    renderItem={renderQuiz}
                    keyExtractor={(item) => item._id}
                />
            ) : (
                <Text>No quizzes available</Text>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#fff'
    },
    quizContainer: {
        marginBottom: 16
    },
    quizTitle: {
        fontSize: 24,
        fontWeight: 'bold'
    },
    questionContainer: {
        marginTop: 8,
        padding: 8,
        backgroundColor: '#f9f9f9',
        borderRadius: 8
    },
    questionTitle: {
        fontSize: 18,
        fontWeight: 'bold'
    }
});

export default QuizScreen;
