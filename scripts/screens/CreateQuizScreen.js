import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView } from 'react-native';
import axios from 'axios';

function CreateQuizScreen() {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [questions, setQuestions] = useState([{ question: '', options: ['', '', '', ''], correctAnswer: 0 }]);

  const handleAddQuestion = () => {
    setQuestions([...questions, { question: '', options: ['', '', '', ''], correctAnswer: 0 }]);
  };

  const handleCreateQuiz = async () => {
    try {
      const response = await axios.post('http://your-server-address/quizzes/create', {
        title,
        category,
        questions,
      }, {
        headers: { Authorization: `Bearer YOUR_JWT_TOKEN` }
      });
      console.log('Quiz created successfully:', response.data);
    } catch (error) {
      console.error('Error creating quiz:', error);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Create a New Quiz</Text>
      <TextInput
        style={styles.input}
        placeholder="Quiz Title"
        value={title}
        onChangeText={setTitle}
      />
      <TextInput
        style={styles.input}
        placeholder="Category"
        value={category}
        onChangeText={setCategory}
      />
      {questions.map((q, index) => (
        <View key={index} style={styles.questionContainer}>
          <TextInput
            style={styles.input}
            placeholder={`Question ${index + 1}`}
            value={q.question}
            onChangeText={(text) => {
              const newQuestions = [...questions];
              newQuestions[index].question = text;
              setQuestions(newQuestions);
            }}
          />
          {q.options.map((option, i) => (
            <TextInput
              key={i}
              style={styles.input}
              placeholder={`Option ${i + 1}`}
              value={option}
              onChangeText={(text) => {
                const newQuestions = [...questions];
                newQuestions[index].options[i] = text;
                setQuestions(newQuestions);
              }}
            />
          ))}
          <TextInput
            style={styles.input}
            placeholder="Correct Answer (0-3)"
            value={q.correctAnswer.toString()}
            keyboardType="number-pad"
            onChangeText={(text) => {
              const newQuestions = [...questions];
              newQuestions[index].correctAnswer = parseInt(text);
              setQuestions(newQuestions);
            }}
          />
        </View>
      ))}
      <Button title="Add Question" onPress={handleAddQuestion} />
      <Button title="Create Quiz" onPress={handleCreateQuiz} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10,
  },
  questionContainer: {
    marginBottom: 20,
  },
});

export default CreateQuizScreen;
