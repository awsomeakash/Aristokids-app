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
import globalStyles from '../../Utils/globalStyles';
import validateFormData from '../../Utils/ValidateForm';
import CheckBox from '../../Components/CheckBox';
import {setLocalStorage} from '../../Utils/SetLocalStorage';

export const STORAGE_KEY = 'mulFormData';

function MultiplicationHomePage({navigation, route}: any) {
    const answeredQuestions = 1;
    const correctAnswer = 0;
    const savedFormData = route.params?.savedFormData || {};
    const [numberOfdigitMultiplier, setNumberOfdigitMultiplier] = useState(
        savedFormData.numberOfdigitMultiplier || '',
    );
    const [numberOfQuestions, setNumberOfQuestions] = useState(
        savedFormData.numberOfQuestions || '',
    );
    const [numberOfdigitMultiplicand, setNumberOfdigitMultiplicand] = useState(
        savedFormData.numberOfdigitMultiplicand || '',
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
        const mulFormData = {
            numberOfdigitMultiplier,
            numberOfQuestions,
            numberOfdigitMultiplicand,
            timeBetweenNumbers,
            QuestionCategory: 'mul',
        };
        const validatedFormResult = validateFormData(mulFormData);
        if (validatedFormResult) {
            if (saveInput) {
                setLocalStorage(mulFormData, STORAGE_KEY);
            }
            navigation.replace('Question', {
                mulFormData,
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
                    name="Enter number digits for Multiplier"
                    onInputChange={handleInputChange(
                        setNumberOfdigitMultiplier,
                    )}
                    value={numberOfdigitMultiplier}
                />
                <Forms
                    name="Enter number of digits for Multiplicand"
                    onInputChange={handleInputChange(
                        setNumberOfdigitMultiplicand,
                    )}
                    value={numberOfdigitMultiplicand}
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

export default MultiplicationHomePage;

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
