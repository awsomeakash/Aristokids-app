import React, { useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, Keyboard } from 'react-native';
import Header from '../../Components/Header';
import Forms from '../../Components/Forms';
import DropDown from '../../Components/DropDown';
import globalStyles from '../../Utils/GlobalStyles';

function MultiplicationHomePage ({ navigation }: any)  {
    const initialValues = [
        { label: 'Addition', checked: true, disabled: true },
        { label: 'Subtraction', checked: true }
    ];
    const answeredQuestions =  1;
    const correctAnswer = 0;
    const [numberOfdigitMultiplier, setNumberOfdigitMultiplier] = useState('');
    const [numberOfQuestions, setNumberOfQuestions] = useState('');
    const [numberOfdigitMultiplicand, setNumberOfdigitMultiplicand] = useState('');
    const [timeBetweenNumbers, setTimeBetweenNumbers] = useState('');


    const handleInputChange = (setter: React.Dispatch<React.SetStateAction<string>>) => (text: string) => {
        setter(text);
    };

    const handleStart = () => {
        const mulFormData = {
            numberOfdigitMultiplier,
            numberOfQuestions,
            numberOfdigitMultiplicand,
            timeBetweenNumbers,
            QuestionCategory: 'mul',
        };
        navigation.replace('Question', { mulFormData, answeredQuestions, correctAnswer });
    };

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={globalStyles.container}>
                <Header />
                <Forms name="Enter number digits for Multiplier" onInputChange={handleInputChange(setNumberOfdigitMultiplier)} />
                <Forms name="Enter number of digits for Multiplicand" onInputChange={handleInputChange(setNumberOfdigitMultiplicand)} />
                <Forms name="Enter number of questions" onInputChange={handleInputChange(setNumberOfQuestions)} />
                <Forms name="Time between two numbers in seconds" onInputChange={handleInputChange(setTimeBetweenNumbers)} />
                <TouchableOpacity style={styles.dropDownButton} onPress={handleStart}>
                    <Text style={styles.dropDownButtonText}>Start</Text>
                </TouchableOpacity>
            </View>
        </TouchableWithoutFeedback>
    );
}

export default MultiplicationHomePage

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