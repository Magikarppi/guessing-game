import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import Header from './components/Header';
import EndGameScreen from './screens/EndGameScreen';
import GameScreen from './screens/GameScreen';
import StartGameScreen from './screens/StartGameScreen';

type ShowScreen = 'StartGameScreen' | 'GameScreen' | 'EndGameScreen';

const App = () => {
  const [showScreen, setShowScreen] = useState<ShowScreen>('StartGameScreen');

  const changeGameScreenHandler = (gameScreen: ShowScreen) => {
    setShowScreen(gameScreen);
  };

  let content = <StartGameScreen onScreenChange={changeGameScreenHandler} />;

  switch (showScreen) {
    case 'StartGameScreen':
      content = <StartGameScreen />;
    case 'GameScreen':
      content = <GameScreen />;
    case 'EndGameScreen':
      content = <EndGameScreen />;
  }

  return (
    <View style={styles.screen}>
      <Header title={'Guess a Number bro'} />
      {content}
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
});

export default App;
