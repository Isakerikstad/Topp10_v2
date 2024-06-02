import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import QuizService from './QuizService'; // Ensure this import is correct

const QuizListScreen = () => {
    const [quizzes, setQuizzes] = useState([]);
    const navigation = useNavigation();

    useEffect(() => {
        const fetchQuizzes = async () => {
            try {
                console.log('Fetching quizzes...');
                const fetchedQuizzes = await QuizService.getQuizzes();
                console.log('Fetched quizzes:', fetchedQuizzes);
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
            <Button
                title="Start Quiz"
                onPress={() => {
                    console.log('Navigating to QuizDetail with quizId:', item.quizId);
                    navigation.navigate('QuizDetail', { quizId: item.quizId });
                }}
            />
        </View>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Select a Quiz</Text>
            <FlatList
                data={quizzes}
                renderItem={renderQuiz}
                keyExtractor={item => item.quizId}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 24,
        marginBottom: 20,
    },
    quizContainer: {
        marginBottom: 20,
        alignItems: 'center',
    },
    quizTitle: {
        fontSize: 18,
    },
});

export default QuizListScreen;
