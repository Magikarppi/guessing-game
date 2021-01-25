import React from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';
import { colors, theme } from '../themes';

const styles = StyleSheet.create({
  baseHeader: {
    width: '100%',
    height: 90,
    paddingTop: 36,
    alignItems: 'center',
    justifyContent: 'center',
  },
  androidHeader: {
    backgroundColor: colors.mainContrastColor,
  },
  iosHeader: {
    backgroundColor: '#8722c9',
  },
});

const Header = (props: any) => {
  return (
    <View
      style={{
        ...styles.baseHeader,
        ...Platform.select({
          ios: styles.iosHeader,
          android: styles.androidHeader,
        }),
      }}
    >
      <Text style={theme.gameTitle}>{props.title}</Text>
    </View>
  );
};

export default Header;
