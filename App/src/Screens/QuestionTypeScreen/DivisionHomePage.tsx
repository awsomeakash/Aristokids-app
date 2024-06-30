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
import globalStyles from '../../Utils/globalStyles';
import CheckBox from '../../Components/CheckBox';
import {setLocalStorage} from '../../Utils/SetLocalStorage';

export const STORAGE_KEY = 'divFormData';
function DivisionHomePage({navigation, route}: any) {
    const answeredQuestions = 1;
    const correctAnswer = 0;
    const savedFormData = route.params?.savedFormData || {};
    const [numberOfdigitDividend, setNumberOfdigitDividend] = useState(
        savedFormData.numberOfdigitDividend || '',
    );
    const [numberOfQuestions, setNumberOfQuestions] = useState(
        savedFormData.numberOfQuestions || '',
    );
    const [numberOfdigitDivisor, setNumberOfdigitDivisor] = useState(
        savedFormData.numberOfdigitDivisor || '',
    );
    const [timeBetweenNumbers, setTimeBetweenNumbers] = useState(
        savedFormData.timeBetweenNumbers || '',
    );
    const [saveInput, setSaveInput] = useState(false);

    const handleInputChange =
        (setter: React.Dispatch<React.SetStateAction<string>>) =>
        (text: string) => {
            setter(text);
        };

    const handleSaveInputChange = () => {
        setSaveInput(!saveInput);
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
            if (saveInput) {
                setLocalStorage(divFormData, STORAGE_KEY);
            }
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
                    value={numberOfdigitDividend}
                />
                <Forms
                    name="Enter number of digits for Divisor"
                    onInputChange={handleInputChange(setNumberOfdigitDivisor)}
                    value={numberOfdigitDivisor}
                />
                <Forms
                    name="Enter number of questions"
                    onInputChange={handleInputChange(setNumberOfQuestions)}
                    value={numberOfQuestions}
                />
                <Forms
                    name="Time in sec between 2 questions"
                    onInputChange={handleInputChange(setTimeBetweenNumbers)}
                    value={timeBetweenNumbers}
                />
                <TouchableOpacity
                    style={styles.dropDownButton}
                    onPress={handleStart}>
                    <Text style={styles.dropDownButtonText}>Start</Text>
                </TouchableOpacity>
                <View style={globalStyles.checkboxContainer}>
                    <CheckBox
                        checked={saveInput}
                        onChange={handleSaveInputChange}
                    />
                    <Text style={globalStyles.checkboxLabel}>Save Input</Text>
                </View>
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
