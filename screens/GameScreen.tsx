import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  Button,
  Text,
  Alert,
  ScrollView,
  Dimensions,
} from 'react-native';
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
    marginTop: Dimensions.get('window').height > 600 ? 20 : 5,
    width: 300,
    maxWidth: '80%',
    marginBottom: 10,
  },
  roundsText: {
    fontSize: Dimensions.get('window').width > 400 ? 23 : 17,
    fontFamily: 'open-sans-bold',
  },
  subTitle: {
    fontSize: 15,
    textDecorationLine: 'underline',
  },
  listItem: {
    borderColor: '#ccc',
    backgroundColor: 'white',
    borderWidth: 1,
    padding: 15,
    marginVertical: 10,
  },
  list: {
    width: '80%',
    alignItems: 'center',
    flex: 1,
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

  if (randomNum === exclude || randomNum > 99 || randomNum < 1) {
    return randomNumberGenerator(min, max, exclude);
  }

  return randomNum;
};

const GameScreen = ({
  gameTargetValue,
  onScreenChange,
  roundsHandler,
  pastGuessesHandler,
  pastGuesses,
  numberOfRounds,
}: {
  gameTargetValue: number;
  onScreenChange: (gameScreen: ShowScreen) => void;
  roundsHandler: () => void;
  pastGuessesHandler: (currentGuess: number) => void;
  pastGuesses: number[];
  numberOfRounds: number;
}) => {
  const [maxNum, setMaxNum] = useState<number>(100);
  const [minNum, setMinNum] = useState<number>(1);
  const [currentGuess, setCurrentGuess] = useState<number>(
    randomNumberGenerator(1, 100, gameTargetValue)
  );

  // useEffect(() => {
  //   if (currentGuess === gameTargetValue) {
  //     onScreenChange('EndGameScreen');
  //   }
  // }, [gameTargetValue, currentGuess, onScreenChange]);

  const handleGuessLower = () => {
    if (currentGuess > gameTargetValue) {
      const randomNum = randomNumberGenerator(
        minNum,
        currentGuess,
        currentGuess
      );
      if (randomNum === gameTargetValue) {
        onScreenChange('EndGameScreen');
        return;
      }
      setCurrentGuess(randomNum);

      // setCurrentGuess((prevState) =>
      //   randomNumberGenerator(minNum, prevState, currentGuess)
      // );
      roundsHandler();
      pastGuessesHandler(currentGuess);

      setMaxNum(currentGuess);
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
      const randomNum = randomNumberGenerator(
        currentGuess + 1,
        maxNum,
        currentGuess
      );
      if (gameTargetValue === randomNum) {
        onScreenChange('EndGameScreen');
        return;
      }

      setCurrentGuess(randomNum);
      // setCurrentGuess((prevState) =>
      //   randomNumberGenerator(prevState, maxNum, currentGuess)
      // );
      roundsHandler();
      pastGuessesHandler(currentGuess);

      setMinNum(currentGuess + 1);
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

  const renderListItem = (item: number) => {
    return (
      <View key={item} style={styles.listItem}>
        <Text>{item}</Text>
      </View>
    );
  };

  return (
    <ScrollView>
      <View style={styles.screen}>
        <Text style={styles.roundsText}>Round number {numberOfRounds}</Text>
        <Card>
          <Text>Target number</Text>
          <ChosenNumberContainer>{gameTargetValue}</ChosenNumberContainer>
        </Card>
        <Text>AI guessed: </Text>
        <ChosenNumberContainer>{currentGuess}</ChosenNumberContainer>
        <Card style={styles.buttonContainer}>
          <Button title="Lower" onPress={() => handleGuessLower()} />
          <Button title="Higher" onPress={() => handleGuessHigher()} />
        </Card>
        <Text style={styles.subTitle}>Past guesses</Text>
        <View style={styles.list}>
          <ScrollView>
            {pastGuesses.map((guess) => renderListItem(guess))}
          </ScrollView>
        </View>
      </View>
    </ScrollView>
  );
};

export default GameScreen;
