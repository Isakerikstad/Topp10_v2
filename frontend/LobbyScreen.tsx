import React from 'react';
import { View, Text, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const LobbyScreen = () => {
  const navigation = useNavigation();

  return (
    <View>
      <Text>Lobby Screen</Text>
      <Button title="Start Quiz" onPress={() => navigation.navigate('Quiz')} />
    </View>
  );
};

export default LobbyScreen;
