import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { colors } from '../themes';

const styles = StyleSheet.create({
  container: {
    borderWidth: 2,
    borderColor: colors.secondaryContrastColor,
    padding: 10,
    borderRadius: 10,
    marginVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  number: {
    color: colors.secondaryContrastColor,
    fontSize: 21,
  },
});

const ChosenNumberContainer = (props: any) => {
  return (
    <View style={styles.container}>
      <Text>{props.children}</Text>
    </View>
  );
};

export default ChosenNumberContainer;
