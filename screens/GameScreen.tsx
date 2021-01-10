import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Button, Text, Alert } from 'react-native';
import ChosenNumberContainer from './ChosenNumberContainer';

import { ShowScreen } from '../types';
import Card from '../components/Card';

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
    alignItems: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
    width: 300,
    maxWidth: '80%',
  },
});

const randomNumberGenerator = (
  min: number,
  max: number,
  exclude: number
): number => {
  min = Math.ceil(min);
  max = Math.floor(max);

  const randomNum = Math.floor(Math.random() * (max - min)) + min;

  if (randomNum === exclude) {
    return randomNumberGenerator(min, max, exclude);
  }

  return randomNum;
};

const GameScreen = ({
  gameTargetValue,
  onScreenChange,
  roundsHandler,
}: {
  gameTargetValue: number;
  onScreenChange: (gameScreen: ShowScreen) => void;
  roundsHandler: () => void;
}) => {
  const [maxNum, setMaxNum] = useState<number>(100);
  const [minNum, setMinNum] = useState<number>(1);
  const [currentGuess, setCurrentGuess] = useState<number>(
    randomNumberGenerator(1, 100, gameTargetValue)
  );

  useEffect(() => {
    if (currentGuess === gameTargetValue) {
      onScreenChange('EndGameScreen');
    }
  }, [gameTargetValue, currentGuess, onScreenChange]);

  const handleGuessLower = () => {
    if (currentGuess > gameTargetValue) {
      setCurrentGuess((prevState) =>
        randomNumberGenerator(minNum, prevState, currentGuess)
      );
      setMaxNum(currentGuess);
      roundsHandler();
      return;
    } else {
      Alert.alert(
        'Play fair!',
        "The number you chose IS higher than the poor AI's guess, don't be mean to your future overlord.",
        [{ text: "I'll obey.", style: 'cancel' }]
      );
      return;
    }
  };

  const handleGuessHigher = () => {
    if (currentGuess < gameTargetValue) {
      setCurrentGuess((prevState) =>
        randomNumberGenerator(prevState, maxNum, currentGuess)
      );
      setMinNum(currentGuess);
      roundsHandler();
      return;
    } else {
      Alert.alert(
        'Play fair!',
        "The number you chose IS lower than the poor AI's guess, don't be mean to your future overlord.",
        [{ text: "I'll obey.", style: 'cancel' }]
      );
      return;
    }
  };

  return (
    <View style={styles.screen}>
      <Card>
        <Text>Target number</Text>
        <ChosenNumberContainer>{gameTargetValue}</ChosenNumberContainer>
      </Card>
      <Text>AI guessed: {currentGuess}</Text>
      <Card style={styles.buttonContainer}>
        <Button title="Lower" onPress={() => handleGuessLower()} />
        <Button title="Higher" onPress={() => handleGuessHigher()} />
      </Card>
    </View>
  );
};

export default GameScreen;
