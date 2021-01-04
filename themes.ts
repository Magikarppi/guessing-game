import { StyleSheet } from 'react-native';

export const colors = {
  mainContrastColor: '#f7287b',
  titleColor: 'black',
  buttonCancel: '#ff5452',
  buttonConfirm: '#00edb5',
};

export const theme = StyleSheet.create({
  gameTitle: {
    fontSize: 26,
    color: colors.titleColor,
  },
  subTitle: {
    fontSize: 18,
    marginVertical: 10,
    color: colors.titleColor,
  },
});
