import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  Text,
  Button,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
} from 'react-native';
import Card from '../components/Card';
import Input from '../components/Input';
import { colors, theme } from '../themes';

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
    alignItems: 'center',
  },
  inputContainer: { width: 300, maxWidth: '80%', alignItems: 'center' },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginVertical: 10,
    width: '100%',
  },
  button: {
    width: 85,
  },
  input: { width: '20%', textAlign: 'center' },
});

const StartGameScreen = (props: any) => {
  const [enteredValue, setEnteredValue] = useState<String>('');
  const [gameTargetValue, setGameTargetValue] = useState<Number | undefined>(
    undefined
  );

  const enterValueHandler = (num: string) => {
    const valNum = num.replace(/[^0-9]/g, '');

    setEnteredValue(valNum);
  };

  const resetInputHandler = () => {
    setEnteredValue('');
  };

  const confirmEnteredValueHandler = (enteredValue: string) => {
    const enteredNumber = parseInt(enteredValue);
    if (isNaN(enteredNumber) || enteredNumber <= 0 || enteredNumber > 99) {
      Alert.alert(
        'Not a valid number',
        'Chosen number has to be between 1-99',
        [{ text: 'Okay!', style: 'destructive', onPress: resetInputHandler }]
      );
      return;
    }
    setGameTargetValue(enteredNumber);
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.screen}>
        <Text style={theme.subTitle}>Start a New Game!</Text>
        <Card style={styles.inputContainer}>
          <Text>Select a Number</Text>
          <Input
            style={styles.input}
            blurOnSubmit
            keyboardType={'number-pad'}
            maxLength={2}
            onChangeText={enterValueHandler}
            value={enteredValue}
          />
          <View style={styles.buttonContainer}>
            <View style={styles.button}>
              <Button
                title="Reset"
                onPress={() => resetInputHandler()}
                color={colors.buttonCancel}
              />
            </View>
            <View style={styles.button}>
              <Button
                title="Confirm"
                onPress={() => confirmEnteredValueHandler(enteredValue)}
                color={colors.buttonConfirm}
              />
            </View>
          </View>
        </Card>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default StartGameScreen;
