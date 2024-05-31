// QuizService.tsx
import axios from 'axios';

const API_URL = 'http://localhost:5500/quizzes';

export const getQuizzes = async () => {
    try {
        const response = await axios.get(API_URL);
        return response.data;
    } catch (error) {
        console.error('Error fetching quizzes:', error);
        throw error;
    }
};
