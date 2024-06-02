import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import QuizService from './QuizService';

const QuizDetailScreen = () => {
    const route = useRoute();
    const navigation = useNavigation();
    const { quizId } = route.params;
    const [quiz, setQuiz] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!quizId) {
            console.error('quizId is undefined');
            setLoading(false);
            return;
        }

        const fetchQuiz = async () => {
            try {
                console.log('Fetching quiz with ID:', quizId);
                const fetchedQuiz = await QuizService.getQuiz(quizId);
                console.log('Fetched quiz:', fetchedQuiz);
                setQuiz(fetchedQuiz);
            } catch (error) {
                console.error('Error fetching quiz:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchQuiz();
    }, [quizId]);

    if (loading) {
        return (
            <View style={styles.container}>
                <Text>Loading...</Text>
            </View>
        );
    }

    if (!quiz) {
        return (
            <View style={styles.container}>
                <Text>Quiz not found</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{quiz.title}</Text>
            <Text style={styles.description}>This quiz contains {quiz.questions.length} questions. Answer each question to the best of your ability.</Text>
            <Button
                title="Start Quiz"
                onPress={() => navigation.navigate('Quiz', { quiz })}
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
    description: {
        fontSize: 18,
        marginBottom: 20,
        textAlign: 'center',
    },
});

export default QuizDetailScreen;
