import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const QuizSummary = ({ route }) => {
    const navigation = useNavigation();
    const { quiz, correctAnswers, totalQuestions } = route.params;

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Quiz Completed!</Text>
            <Text style={styles.resultText}>You got {correctAnswers} out of {totalQuestions} correct!</Text>
            <Button title="Back to Home" onPress={() => navigation.navigate('Home')} />
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
    resultText: {
        fontSize: 18,
        marginBottom: 20,
    },
});

export default QuizSummary;
