import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  Button,
  Image,
  Dimensions,
} from 'react-native';
import Card from '../components/Card';

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#1d211e',
  },
  card: {
    marginBottom: Dimensions.get('window').height > 600 ? 10 : 3,
    backgroundColor: 'darkgrey',
  },
  text: {
    textAlign: 'center',
    fontSize: Dimensions.get('window').height > 600 ? 16 : 10,
  },
  subTitle: {
    fontFamily: 'open-sans-bold',
    fontSize: Dimensions.get('window').width > 300 ? 20 : 8,
    color: '#e30000',
  },
  image: {
    width: '95%',
    maxHeight: '40%',
    marginTop: 20,
    borderRadius: 10,
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
      <Text style={styles.subTitle}>Game over!</Text>
      <Card style={styles.card}>
        <Text style={styles.text}>
          Congratulations! You survived {numberOfRounds} rounds! Time to die!
        </Text>
      </Card>
      <Text style={{ ...styles.text, marginVertical: 10, color: 'white' }}>
        Beg the AI overlord for another chance?
      </Text>
      <Button title="I beg" color="#e30000" onPress={() => restartGame()} />
      <Image
        style={styles.image}
        source={require('../assets/MaliciousAI.jpg')}
      />
    </View>
  );
};

export default EndGameScreen;
