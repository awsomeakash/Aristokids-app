import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { makeQuestionPage } from '../../Utils/makeQuesiton';
import { getTextStyle } from '../../Utils/colors';
import Header from '../../Components/Header';
import { useNavigation, useRoute } from '@react-navigation/native';
import globalStyles from '../../Utils/globalStyles';

interface FormData {
  numberOfRows: string;
  numberOfQuestions: string;
  numberOfDigits: string;
  timeBetweenNumbers: string;
  operations: string[];
  answeredQuestions: number;
}

interface RouteParams {
  formData: FormData;
  answeredQuestions: number;
  correctAnswer: number;
}

const QuestionPage: React.FC = () => {
  const route = useRoute();
  const { formData,  answeredQuestions, correctAnswer } = route.params as RouteParams;
  const [displayQuestion, setDisplayQuestion] = useState<string | null>(null);
  const [answeredQuestion, setAnsweredQuestions] = useState(answeredQuestions);
  const [correctAnswerCount, setCorrectAnswerCount] = useState(correctAnswer);
  const [timeouts, setTimeouts] = useState<any[]>([]);
  const navigation = useNavigation();

  useEffect(() => {
    const generateAndDisplayQuestions = () => {
      const nums = makeQuestionPage(formData);
      const newTimeouts: any[] = [];

      for (let i = 0; i < parseInt(formData.numberOfQuestions); i++) {
        const timeoutId = setTimeout(() => {
          setDisplayQuestion(nums[0].Question[i]);
          if (i === parseInt(formData.numberOfQuestions) - 1) {
            setTimeout(() => {
              setAnsweredQuestions(()=>answeredQuestion + 1);
              console.log("Answered Question from Questiosns",answeredQuestions);
              navigation.navigate('Answer', { 
                answer: nums[0].Answer, 
                formData: formData,
                answeredQuestions: answeredQuestion,
                correctAnswer : correctAnswerCount
              });
              
            }, 1000);
          }
        }, parseInt(formData.timeBetweenNumbers) * 1000 * i);
        newTimeouts.push(timeoutId);
      }

      setTimeouts(newTimeouts);
    };

    generateAndDisplayQuestions();

    return () => {
      timeouts.forEach(clearTimeout);
    };
  }, [formData, navigation]);

  const renderDisplayQuestion = (displayQuestion: string | null) => {
    if (!displayQuestion) return null;

    const [operation, number] = displayQuestion.split(' ');

    return (
      <Text style={styles.numberStyles}>
        <Text style={getTextStyle(operation)}>{operation}</Text>
        <Text style={getTextStyle(operation)}>{number}</Text>
      </Text>
    );
  };

  return (
    <View style={globalStyles.container}>
      <Header />
      <View style={styles.body}>
        {renderDisplayQuestion(displayQuestion)}
      </View>
    </View>
  );
}

export default QuestionPage;

const styles = StyleSheet.create({
  body: {
    flex: 1,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
  },
  numberStyles: {
    fontSize: 100,
    fontWeight: 'bold',
  },
});
