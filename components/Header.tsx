import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors, theme } from '../themes';

const styles = StyleSheet.create({
  header: {
    width: '100%',
    height: 90,
    paddingTop: 36,
    backgroundColor: colors.mainContrastColor,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const Header = (props: any) => {
  return (
    <View style={styles.header}>
      <Text style={theme.gameTitle}>{props.title}</Text>
    </View>
  );
};

export default Header;
