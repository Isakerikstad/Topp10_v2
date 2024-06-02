import axios from 'axios';

const API_URL = 'http://10.125.0.38:5500/quizzes';

const getQuizzes = async () => {
    try {
        const response = await axios.get(API_URL);
        return response.data;
    } catch (error) {
        console.error('Error fetching quizzes:', error);
        throw error;
    }
};

const getQuiz = async (quizId) => {
    try {
        console.log(`Fetching quiz with ID: ${quizId}`);
        const response = await axios.get(`${API_URL}/${quizId}`);
        console.log('Fetched quiz:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error fetching quiz:', error);
        throw error;
    }
};

export default {
    getQuizzes,
    getQuiz,
};
