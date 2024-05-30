import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen.js';
import CreateQuizScreen from '../screens/CreateQuizScreen.js';
import QuizListScreen from '../screens/QuizListScreen.js';

const Stack = createStackNavigator();

function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="CreateQuiz" component={CreateQuizScreen} />
        <Stack.Screen name="QuizList" component={QuizListScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AppNavigator;
