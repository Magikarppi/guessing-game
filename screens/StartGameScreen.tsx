import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  Text,
  Button,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
  Dimensions,
  KeyboardAvoidingView,
  ScrollView,
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
  inputContainer: {
    width: '80%',
    minWidth: 300,
    maxWidth: '95%',
    alignItems: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginVertical: 10,
    width: '100%',
  },
  button: {
    // width: 85,
    width: Dimensions.get('window').width / 4,
  },
  input: { width: '20%', textAlign: 'center' },
});

const StartGameScreen = (props: any) => {
  const [enteredValue, setEnteredValue] = useState<string>('');
  const [buttonWidth, setButtonWidth] = useState<number>(
    Dimensions.get('window').width / 4
  );

  useEffect(() => {
    const updateLayout = () => {
      setButtonWidth(Dimensions.get('window').width / 4);
    };

    Dimensions.addEventListener('change', updateLayout);
    return () => {
      Dimensions.removeEventListener('change', updateLayout);
    };
  });

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
    props.onScreenChange('GameScreen');
    props.onTargetValueChange(enteredNumber);
  };

  return (
    <ScrollView>
      <KeyboardAvoidingView behavior="position" keyboardVerticalOffset={30}>
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
                <View style={{ width: buttonWidth }}>
                  <Button
                    title="Reset"
                    onPress={() => resetInputHandler()}
                    color={colors.buttonCancel}
                  />
                </View>
                <View style={{ width: buttonWidth }}>
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
      </KeyboardAvoidingView>
    </ScrollView>
  );
};

export default StartGameScreen;
