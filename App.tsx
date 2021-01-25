import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, View } from 'react-native';
import * as Font from 'expo-font';
import AppLoading from 'expo-app-loading';

import Header from './components/Header';
import EndGameScreen from './screens/EndGameScreen';
import GameScreen from './screens/GameScreen';
import StartGameScreen from './screens/StartGameScreen';
import { ShowScreen } from './types';

const fetchFonts = () => {
  return Font.loadAsync({
    'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
    'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf'),
  });
};

const App = () => {
  const [dataLoaded, setDataLoaded] = useState(false);
  const [showScreen, setShowScreen] = useState<ShowScreen>('StartGameScreen');
  const [gameTargetValue, setGameTargetValue] = useState<number>(1);
  const [numberOfRounds, setNumberOfRounds] = useState<number>(1);
  const [pastGuesses, setPastGuesses] = useState<number[]>([]);

  if (!dataLoaded) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => setDataLoaded(true)}
        onError={(error) => console.log('error', error)}
      />
    );
  }

  const gameTargetHandler = (targetNum: number) => {
    setGameTargetValue(targetNum);
  };

  const changeGameScreenHandler = (gameScreen: ShowScreen) => {
    console.log('change screen to:', gameScreen);
    setShowScreen(gameScreen);
  };

  const roundsHandler = () => {
    setNumberOfRounds((prevState) => prevState + 1);
  };

  const pastGuessesHandler = (pastGuess: number) => {
    setPastGuesses((curState) => [...curState, pastGuess]);
  };

  const restartGameHandler = () => {
    setShowScreen('StartGameScreen');
    setNumberOfRounds(1);
    setGameTargetValue(1);
    setPastGuesses([]);
  };

  let content;

  switch (showScreen) {
    case 'StartGameScreen':
      content = (
        <StartGameScreen
          onScreenChange={changeGameScreenHandler}
          onTargetValueChange={gameTargetHandler}
        />
      );
      break;
    case 'GameScreen':
      content = (
        <GameScreen
          onScreenChange={changeGameScreenHandler}
          gameTargetValue={gameTargetValue}
          roundsHandler={roundsHandler}
          pastGuessesHandler={pastGuessesHandler}
          pastGuesses={pastGuesses}
          numberOfRounds={numberOfRounds}
        />
      );
      break;
    case 'EndGameScreen':
      content = (
        <EndGameScreen
          numberOfRounds={numberOfRounds}
          restartGame={restartGameHandler}
        />
      );
      break;
    default:
      content = (
        <StartGameScreen
          onScreenChange={changeGameScreenHandler}
          onTargetValueChange={gameTargetHandler}
        />
      );
  }

  return (
    <SafeAreaView style={styles.screen}>
      <Header title={'Guess a Number bro'} />
      {content}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
});

export default App;
