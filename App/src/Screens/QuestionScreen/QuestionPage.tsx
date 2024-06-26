import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {makeQuestionPage} from '../../Utils/MakeQuesiton';
import {getTextStyle} from '../../Utils/Colors';
import Header from '../../Components/Header';
import {useNavigation, useRoute} from '@react-navigation/native';
import globalStyles from '../../Utils/globalStyles';

interface FormData {
    numberOfRows: string;
    numberOfQuestions: string;
    numberOfDigits: string;
    timeBetweenNumbers: string;
    operations: string[];
    answeredQuestions: number;
    QuestionCategory: string;
}

interface MulFormData {
    numberOfdigitMultiplier: string;
    numberOfQuestions: string;
    numberOfdigitMultiplicand: string;
    timeBetweenNumbers: string;
    QuestionCategory: string;
}

interface DivFormData {
    numberOfdigitDividend: string;
    numberOfQuestions: string;
    numberOfdigitDivisor: string;
    timeBetweenNumbers: string;
    QuestionCategory: string;
}

interface RouteParams {
    formData?: FormData;
    mulFormData?: MulFormData;
    divFormData?: DivFormData;
    answeredQuestions: number;
    correctAnswer: number;
}

const QuestionPage: React.FC = () => {
    const route = useRoute();
    const {
        formData,
        answeredQuestions,
        correctAnswer,
        mulFormData,
        divFormData,
    } = route.params as RouteParams;
    const [displayQuestion, setDisplayQuestion] = useState<string | null>(null);
    const [answeredQuestion, setAnsweredQuestions] =
        useState(answeredQuestions);
    const [QuestionCategory, setQuestionCategory] = useState<string | null>(
        formData?.QuestionCategory ||
            mulFormData?.QuestionCategory ||
            divFormData?.QuestionCategory ||
            null,
    );
    const [correctAnswerCount, setCorrectAnswerCount] = useState(correctAnswer);
    const [timeouts, setTimeouts] = useState<any[]>([]);
    const navigation = useNavigation();
    useEffect(() => {
        if (formData) {
            setQuestionCategory(formData.QuestionCategory);
            console.log(
                'DATA :::::::::::::::::::::::::::::::::::::::::::',
                QuestionCategory,
            );
        } else if (mulFormData) {
            console.log(
                'MUL DATA :::::::::::::::::::::::::::::::::::::::::::',
                QuestionCategory,
            );
            setQuestionCategory(mulFormData.QuestionCategory);
        } else if (divFormData) {
            console.log(
                'DIV DATA :::::::::::::::::::::::::::::::::::::::::::',
                QuestionCategory,
            );
            setQuestionCategory(divFormData.QuestionCategory);
        }
    }, [formData, mulFormData]);
    // console.log(QuestionCategory);
    useEffect(() => {
        const generateAndDisplayQuestions = () => {
            const newTimeouts: any[] = [];
            console.log('Atleast reached here');
            if (QuestionCategory === 'pla') {
                if (!formData) return;
                const nums = makeQuestionPage(formData);
                console.log(
                    'Entered HERE::::::::::::::::::::::::::::::::::::::::',
                );
                for (let i = 0; i < parseInt(formData.numberOfRows); i++) {
                    const timeoutId = setTimeout(() => {
                        nums ? setDisplayQuestion(nums[0].Question[i]) : null;
                        if (i === parseInt(formData.numberOfRows) - 1) {
                            setTimeout(() => {
                                setAnsweredQuestions(
                                    () => answeredQuestion + 1,
                                );
                                console.log(
                                    'Answered Question from Questiosns',
                                    answeredQuestions,
                                );
                                navigation.navigate('Answer', {
                                    answer: nums[0].Answer,
                                    formData: formData,
                                    answeredQuestions: answeredQuestion,
                                    correctAnswer: correctAnswerCount,
                                });
                            }, 1000);
                        }
                    }, parseInt(formData.timeBetweenNumbers) * 1000 * i);
                    newTimeouts.push(timeoutId);
                }
            } else if (QuestionCategory === 'mul') {
                const activeMulFormData = mulFormData || formData;
                if (!activeMulFormData) return;
                console.log(
                    'Entered HERE::::::::::::::::::::::::::::::::::::::::MULDATADTA',
                );
                const nums = makeQuestionPage(activeMulFormData);

                if (nums && nums.length > 0 && nums[0].Question) {
                    setDisplayQuestion(nums[0].Question);
                    const timeoutId = setTimeout(() => {
                        setAnsweredQuestions(answeredQuestion + 1);
                        navigation.navigate('Answer', {
                            answer: nums[0].Answer,
                            formData: activeMulFormData,
                            answeredQuestions: answeredQuestion,
                            correctAnswer: correctAnswerCount,
                        });
                    }, parseInt(activeMulFormData.timeBetweenNumbers) * 1000);
                    newTimeouts.push(timeoutId);
                }
            } else if (QuestionCategory === 'div') {
                const activeDivFormData = divFormData || formData;
                if (!activeDivFormData) return;
                console.log(
                    'Entered HERE::::::::::::::::::::::::::::::::::::::::DIVDATA',
                );
                const nums = makeQuestionPage(activeDivFormData);

                if (nums && nums.length > 0 && nums[0].Question) {
                    setDisplayQuestion(nums[0].Question);
                    const timeoutId = setTimeout(() => {
                        setAnsweredQuestions(answeredQuestion + 1);
                        navigation.navigate('Answer', {
                            answer: nums[0].Answer,
                            formData: activeDivFormData,
                            answeredQuestions: answeredQuestion,
                            correctAnswer: correctAnswerCount,
                        });
                    }, parseInt(activeDivFormData.timeBetweenNumbers) * 1000);
                    newTimeouts.push(timeoutId);
                }
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
        if (QuestionCategory === 'pla') {
            console.log(
                'These are single questions ............',
                displayQuestion,
            );
            const [operation, number] = displayQuestion.split(' ');

            return (
                <Text style={styles.numberStyles}>
                    <Text style={getTextStyle(operation)}>{operation}</Text>
                    <Text style={getTextStyle(operation)}>{number}</Text>
                </Text>
            );
        } else if (QuestionCategory === 'mul' || 'div') {
            console.log('MulaForm ::::::::::', displayQuestion);
            return (
                <Text style={styles.numberStyles}>
                    <Text>{displayQuestion}</Text>
                </Text>
            );
        }
    };

    return (
        <View style={globalStyles.container}>
            <Header />
            <View style={styles.body}>
                {renderDisplayQuestion(displayQuestion)}
            </View>
        </View>
    );
};

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
        color: 'white',
    },
});
