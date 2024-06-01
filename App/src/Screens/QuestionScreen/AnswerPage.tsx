import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Header from '../../Components/Header';

const AnswerPage = ({ route }: any) => {
    const { answer, formData, answeredQuestions: initialAnsweredQuestions, correctAnswer: initialCorrectAnswerCount } = route.params;
    const navigation = useNavigation();
    const [answeredQuestions, setAnsweredQuestions] = useState(initialAnsweredQuestions);
    const [correctAnswerCounts, setCorrectAnswerCounts] = useState(initialCorrectAnswerCount);
    console.log(formData);
    console.log(route.params);
    const incorrectAnswers = [answer - 1, answer + 1, answer + 2, answer - 2];
    const shuffleArray = (array: any[]) => {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    };

    const answers = shuffleArray([answer, ...incorrectAnswers]);

    const handleAnswerSelection = (selectedAnswer: number) => {
        let newCorrectAnswerCount = correctAnswerCounts;
        if (selectedAnswer === answer) {
            console.log("reached here")
            newCorrectAnswerCount += 1;
            setCorrectAnswerCounts(newCorrectAnswerCount);

            console.log("Correct Answer Count", newCorrectAnswerCount);
        }
        setAnsweredQuestions((prevAnsweredQuestions: number) => prevAnsweredQuestions + 1);

        if (answeredQuestions === parseInt(formData.numberOfQuestions)) {
            navigation.replace('Result', {newCorrectAnswerCount,formData});
        } else {
            navigation.replace('Question', { formData, answeredQuestions: answeredQuestions + 1, correctAnswer: newCorrectAnswerCount  });
        }
    };


    return (
        <View style={styles.container}>
            <Header />
            <View style={styles.questionContainer}>
                <Text style={styles.question}>Which one is the correct answer?</Text>
            </View>
            <View style={styles.buttonContainer}>
                {answers.map((answerOption, index) => (
                    <TouchableOpacity key={index} style={styles.answerButton} onPress={() => handleAnswerSelection(answerOption)}>
                        <Text style={styles.answerText}>{answerOption}</Text>
                    </TouchableOpacity>
                ))}
            </View>
        </View>
    );
};

export default AnswerPage;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: 'black',
        paddingTop: 40,
    },
    questionContainer: {
        marginBottom: 20,
    },
    question: {
        fontSize: 20,
        color: 'white',
    },
    buttonContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'black',
        marginTop: '50%',
    },
    answerButton: {
        backgroundColor: '#ccc',
        padding: 10,
        marginBottom: 10,
        borderRadius: 55,
        width: '40%',
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 5,
    },
    answerText: {
        fontSize: 16,
        color: 'black',
    },
});
