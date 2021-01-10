import React from 'react';
import { View, StyleSheet, Text, Button } from 'react-native';
import Card from '../components/Card';

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const EndGameScreen = ({
  restartGame,
  numberOfRounds,
}: {
  restartGame: () => void;
  numberOfRounds: number;
}) => {
  return (
    <View style={styles.screen}>
      <Card>
        <Text>
          Congratulations! You survived {numberOfRounds} rounds! Now it's time
          to die!
        </Text>
      </Card>
      <Button title="Wanna play again?" onPress={() => restartGame()} />
    </View>
  );
};

export default EndGameScreen;
