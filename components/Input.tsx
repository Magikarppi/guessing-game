import React from 'react';
import { View, StyleSheet, TextInput } from 'react-native';

const styles = StyleSheet.create({
  input: {
    height: 30,
    borderBottomColor: 'black',
    borderBottomWidth: 3,
    borderRadius: 3,
    marginVertical: 10,
  },
});

const Input = (props: any) => {
  return <TextInput {...props} style={{ ...styles.input, ...props.style }} />;
};

export default Input;
