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
import DropDown from '../../Components/DropDown';
import globalStyles from '../../Utils/globalStyles';
import validateFormData from '../../Utils/ValidateForm';
import {setLocalStorage} from '../../Utils/SetLocalStorage';
import CheckBox from '../../Components/CheckBox';

export const STORAGE_KEY = 'formData';

function PlaygroundHomePage({navigation, route}: any) {
    const initialValues = [
        {label: 'Addition', checked: false},
        {label: 'Subtraction', checked: false},
        {label: 'Multiplication', checked: false},
        {label: 'Division', checked: false},
    ];
    const answeredQuestions = 1;
    const correctAnswer = 0;
    const savedFormData = route.params?.savedFormData || {};
    const [numberOfRows, setNumberOfRows] = useState(
        savedFormData.numberOfRows || '',
    );
    const [numberOfQuestions, setNumberOfQuestions] = useState(
        savedFormData.numberOfQuestions || '',
    );
    const [numberOfDigits, setNumberOfDigits] = useState(
        savedFormData.numberOfDigits || '',
    );
    const [timeBetweenNumbers, setTimeBetweenNumbers] = useState(
        savedFormData.timeBetweenNumbers || '',
    );
    const [checkboxOptions, setCheckboxOptions] = useState(initialValues);
    const [saveInput, setSaveInput] = useState(false);

    const handleInputChange =
        (setter: React.Dispatch<React.SetStateAction<string>>) =>
        (text: string) => {
            setter(text);
        };

    const handleOptionsChange = (
        options: {label: string; checked: boolean}[],
    ) => {
        setCheckboxOptions(options);
    };

    const handleSaveInputChange = () => {
        setSaveInput(!saveInput);
    };

    const handleStart = () => {
        const formData = {
            numberOfRows,
            numberOfQuestions,
            numberOfDigits,
            timeBetweenNumbers,
            operations: checkboxOptions
                .filter(option => option.checked)
                .map(option => option.label),
            QuestionCategory: 'pla',
        };
        const validatedFormResult = validateFormData(formData);
        if (validatedFormResult) {
            if (saveInput) {
                setLocalStorage(formData, STORAGE_KEY);
            }
            navigation.replace('Question', {
                formData,
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
                    name="Enter number of rows"
                    onInputChange={handleInputChange(setNumberOfRows)}
                    value={numberOfRows}
                />
                <Forms
                    name="Enter number of questions"
                    onInputChange={handleInputChange(setNumberOfQuestions)}
                    value={numberOfQuestions}
                />
                <Forms
                    name="Enter number of digits"
                    onInputChange={handleInputChange(setNumberOfDigits)}
                    value={numberOfDigits}
                />
                <Forms
                    name="Time in sec between 2 questions"
                    onInputChange={handleInputChange(setTimeBetweenNumbers)}
                    value={timeBetweenNumbers}
                />
                <DropDown
                    initialValues={initialValues}
                    onOptionsChange={handleOptionsChange}
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

export default PlaygroundHomePage;
