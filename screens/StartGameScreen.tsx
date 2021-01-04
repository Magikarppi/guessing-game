import React, { useState } from 'react';
import { View, StyleSheet, Text, Button } from 'react-native';
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
  const [enteredNumber, setEnteredNumber] = useState('');

  const enterNumberHandler = (num: string) => {
    const valNum = num.replace(/[^0-9]/g, '');

    setEnteredNumber(valNum);
  };

  return (
    <View style={styles.screen}>
      <Text style={theme.subTitle}>Start a New Game!</Text>
      <Card style={styles.inputContainer}>
        <Text>Select a Number</Text>
        <Input
          style={styles.input}
          blurOnSubmit
          keyboardType={'number-pad'}
          maxLength={2}
          onChangeText={enterNumberHandler}
          value={enteredNumber}
        />
        <View style={styles.buttonContainer}>
          <View style={styles.button}>
            <Button
              title="Reset"
              onPress={() => {}}
              color={colors.buttonCancel}
            />
          </View>
          <View style={styles.button}>
            <Button
              title="Confirm"
              onPress={() => {}}
              color={colors.buttonConfirm}
            />
          </View>
        </View>
      </Card>
    </View>
  );
};

export default StartGameScreen;
