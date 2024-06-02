import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './HomeScreen';
import QuizListScreen from './QuizListScreen';
import QuizDetailScreen from './QuizDetailScreen';
import QuizScreen from './QuizScreen';
import QuizSummary from './QuizSummary';
import LobbyScreen from './LobbyScreen';

const Stack = createStackNavigator();

const App = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Home">
                <Stack.Screen name="Home" component={HomeScreen} />
                <Stack.Screen name="Lobby" component={LobbyScreen} />
                <Stack.Screen name="QuizList" component={QuizListScreen} />
                <Stack.Screen name="QuizDetail" component={QuizDetailScreen} />
                <Stack.Screen name="Quiz" component={QuizScreen} />
                <Stack.Screen name="QuizSummary" component={QuizSummary} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default App;
