import { StyleSheet, View, StatusBar } from 'react-native';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import IntroPage from './App/src/Screens/HomeScreen/IntroPage';
import HomePage from './App/src/Screens/QuestionTypeScreen/PlaygroundHomePage'; 
import QuestionPage from './App/src/Screens/QuestionScreen/QuestionPage';
import { PaperProvider , MD3LightTheme as DefaultTheme } from 'react-native-paper';
import AnswerPage from './App/src/Screens/QuestionScreen/AnswerPage';
import ResultPage from './App/src/Screens/ResultScreen/ResultPage';
const Stack = createNativeStackNavigator();

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: 'tomato',
    secondary: 'yellow',
  },
};

function App() {
  return (
    <PaperProvider theme={theme}>
    <View style={styles.mainContainer}>
    <NavigationContainer>
      <StatusBar  hidden={true} />
      <Stack.Navigator initialRouteName="Intro">
        <Stack.Screen
          name="Intro"
          component={IntroPage}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="Home" component={HomePage} options={{ headerShown: false }} />
        <Stack.Screen name="Question" component={QuestionPage} options={{ headerShown: false }} />
        <Stack.Screen name="Answer" component={AnswerPage} options={{ headerShown: false }} />
        <Stack.Screen name="Result" component={ResultPage} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
    </View>
    </PaperProvider>
  );
}

export default App;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: 'black',
  },
});
