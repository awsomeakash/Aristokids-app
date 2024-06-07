import React, { useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, Keyboard } from 'react-native';
import Header from '../../Components/Header';
import Forms from '../../Components/Forms';
import DropDown from '../../Components/DropDown';
import globalStyles from '../../Utils/globalStyles';


function AddSubHomePage ({ navigation }: any)  {
    const initialValues = [
        { label: 'Addition', checked: true, disabled: true },
        { label: 'Subtraction', checked: true }
    ];
    const answeredQuestions =  1;
    const correctAnswer = 0;
    const [numberOfRows, setNumberOfRows] = useState('');
    const [numberOfQuestions, setNumberOfQuestions] = useState('');
    const [numberOfDigits, setNumberOfDigits] = useState('');
    const [timeBetweenNumbers, setTimeBetweenNumbers] = useState('');
    const [checkboxOptions, setCheckboxOptions] = useState(initialValues);

    const handleInputChange = (setter: React.Dispatch<React.SetStateAction<string>>) => (text: string) => {
        setter(text);
    };

    const handleOptionsChange = (options: { label: string; checked: boolean; }[]) => {
        setCheckboxOptions(options);
    };

    const handleStart = () => {
        const formData = {
            numberOfRows,
            numberOfQuestions,
            numberOfDigits,
            timeBetweenNumbers,
            operations: checkboxOptions.filter(option => option.checked).map(option => option.label),
            QuestionCategory: 'pla',
            
        };
        navigation.replace('Question', { formData, answeredQuestions, correctAnswer });
    };

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={globalStyles.container}>
                <Header />
                <Forms name="Enter number of rows" onInputChange={handleInputChange(setNumberOfRows)} />
                <Forms name="Enter number of questions" onInputChange={handleInputChange(setNumberOfQuestions)} />
                <Forms name="Enter number of digits" onInputChange={handleInputChange(setNumberOfDigits)} />
                <Forms name="Time in sec between 2 questions" onInputChange={handleInputChange(setTimeBetweenNumbers)} />
                <DropDown initialValues={initialValues} onOptionsChange={handleOptionsChange} />
                <TouchableOpacity style={styles.dropDownButton} onPress={handleStart}>
                    <Text style={styles.dropDownButtonText}>Start</Text>
                </TouchableOpacity>
            </View>
        </TouchableWithoutFeedback>
    );
}

export default AddSubHomePage

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
})