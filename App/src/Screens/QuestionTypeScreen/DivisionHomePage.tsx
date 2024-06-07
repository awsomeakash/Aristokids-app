import React, {useState} from 'react';
import {
    View,
    StyleSheet,
    Text,
    TouchableOpacity,
    TouchableWithoutFeedback,
    Keyboard,
} from 'react-native';
import Header from '../../Components/Header';
import Forms from '../../Components/Forms';
import validateFormData from '../../Utils/ValidateForm';
import globalStyles from '../../Utils/GlobalStyles';

function DivisionHomePage({navigation}: any) {
    const answeredQuestions = 1;
    const correctAnswer = 0;
    const [numberOfdigitDividend, setNumberOfdigitDividend] = useState('');
    const [numberOfQuestions, setNumberOfQuestions] = useState('');
    const [numberOfdigitDivisor, setNumberOfdigitDivisor] = useState('');
    const [timeBetweenNumbers, setTimeBetweenNumbers] = useState('');

    const handleInputChange =
        (setter: React.Dispatch<React.SetStateAction<string>>) =>
        (text: string) => {
            setter(text);
        };

    const handleStart = () => {
        const divFormData = {
            numberOfdigitDividend,
            numberOfQuestions,
            numberOfdigitDivisor,
            timeBetweenNumbers,
            QuestionCategory: 'div',
        };
        const validatedFormResult = validateFormData(divFormData);
        if (validatedFormResult) {
            navigation.replace('Question', {
                divFormData,
                answeredQuestions,
                correctAnswer,
            });
        }
    };

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={globalStyles.container}>
                <Header />
                <Forms
                    name="Enter number digits for Dividend"
                    onInputChange={handleInputChange(setNumberOfdigitDividend)}
                />
                <Forms
                    name="Enter number of digits for Divisor"
                    onInputChange={handleInputChange(setNumberOfdigitDivisor)}
                />
                <Forms
                    name="Enter number of questions"
                    onInputChange={handleInputChange(setNumberOfQuestions)}
                />
                <Forms
                    name="Time in sec between 2 questions"
                    onInputChange={handleInputChange(setTimeBetweenNumbers)}
                />
                <TouchableOpacity
                    style={styles.dropDownButton}
                    onPress={handleStart}>
                    <Text style={styles.dropDownButtonText}>Start</Text>
                </TouchableOpacity>
            </View>
        </TouchableWithoutFeedback>
    );
}

export default DivisionHomePage;

const styles = StyleSheet.create({
    dropDownButton: {
        backgroundColor: 'rgb(79, 171, 92)',
        paddingVertical: 10,
        paddingHorizontal: '37%',
        borderRadius: 20,
        marginTop: 20,
    },
    dropDownButtonText: {
        fontSize: 18,
        color: 'white',
    },
});
