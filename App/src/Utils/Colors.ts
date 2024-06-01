import { StyleSheet } from 'react-native';

export const getTextStyle = (operation: string) => {
  switch (operation) {
    case '+':
      return styles.greenText;
    case '-':
      return styles.orangeText;
    case 'X':
      return styles.whiteText;
    case '÷':
      return styles.redText;
    default:
      return styles.whiteText;
  }
};

const styles = StyleSheet.create({
  greenText: {
    color: 'green',
  },
  orangeText: {
    color: 'orange',
  },
  whiteText: {
    color: 'white',
  },
  redText: {
    color: 'red',
  },
});
