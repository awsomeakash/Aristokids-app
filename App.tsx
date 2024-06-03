import { StyleSheet, View, StatusBar } from 'react-native';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import IntroPage from './App/src/Screens/HomeScreen/IntroPage';
import PlaygroundHomePage from './App/src/Screens/QuestionTypeScreen/PlaygroundHomePage'; 
import QuestionPage from './App/src/Screens/QuestionScreen/QuestionPage';
import { PaperProvider , MD3LightTheme as DefaultTheme } from 'react-native-paper';
import AnswerPage from './App/src/Screens/QuestionScreen/AnswerPage';
import ResultPage from './App/src/Screens/ResultScreen/ResultPage';
import SelectQuestionTypePage from './App/src/Screens/QuestionTypeSelectScreen/SelectQuestionTypePage';
import AddSubHomePage from './App/src/Screens/QuestionTypeScreen/AddSubHomePage';
import MultiplicationHomePage from './App/src/Screens/QuestionTypeScreen/MultiplicationHomePage';
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

    <View style={styles.mainContainer}>
    <NavigationContainer>
      <StatusBar  hidden={true} />
      <Stack.Navigator initialRouteName="Intro">
        <Stack.Screen
          name="Intro"
          component={IntroPage}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="PlaygroundHome" component={PlaygroundHomePage} options={{ headerShown: false }} />
        <Stack.Screen name="MultiplicationHome" component={MultiplicationHomePage} options={{ headerShown: false }} />
        <Stack.Screen name="AddSubHome" component={AddSubHomePage} options={{ headerShown: false }} />
        <Stack.Screen name="Question" component={QuestionPage} options={{ headerShown: false }} />
        <Stack.Screen name="Answer" component={AnswerPage} options={{ headerShown: false }} />
        <Stack.Screen name="SelectQuestionType" component={SelectQuestionTypePage} options={{ headerShown: false }} />
        <Stack.Screen name="Result" component={ResultPage} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
    </View>
  );
}

export default App;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: 'black',
  },
});
