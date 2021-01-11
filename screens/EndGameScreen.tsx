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
  card: {
    marginBottom: 10,
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
      <Card style={styles.card}>
        <Text>
          Congratulations! You survived {numberOfRounds} rounds! Time to die!
        </Text>
      </Card>
      <Button title="Wanna play again?" onPress={() => restartGame()} />
    </View>
  );
};

export default EndGameScreen;
