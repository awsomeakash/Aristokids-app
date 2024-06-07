import React, {useState} from 'react';
import {View, TextInput, StyleSheet} from 'react-native';

interface Props {
    name: string;
    onInputChange: (text: string) => void;
}

const Forms: React.FC<Props> = ({name, onInputChange}) => {
    const [isFocused, setIsFocused] = useState(false);
    const [inputValue, setInputValue] = useState('');

    const handleInputChange = (text: string) => {
        setInputValue(text);
        onInputChange(text);
    };

    return (
        <View style={styles.container}>
            <View style={styles.inputContainer}>
                <View
                    style={[
                        styles.inputBackground,
                        isFocused && styles.inputBackgroundFocused,
                    ]}
                />
                <TextInput
                    style={[styles.input, isFocused && styles.inputFocused]}
                    keyboardType="numeric"
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    placeholder={name}
                    placeholderTextColor="white"
                    value={inputValue}
                    onChangeText={handleInputChange}
                />
            </View>
        </View>
    );
};

export default Forms;

const styles = StyleSheet.create({
    container: {
        width: '100%',
        alignItems: 'center',
    },
    inputContainer: {
        width: '80%',
        marginTop: 20,
        position: 'relative',
    },
    inputBackground: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 191, 255, 0.1)',
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#dddddd',
    },
    inputBackgroundFocused: {
        backgroundColor: 'rgba(0, 191, 255, 0.3)',
    },
    input: {
        height: 50,
        width: '100%',
        paddingHorizontal: 15,
        fontSize: 16,
        color: '#ffffff',
        zIndex: 1,
    },
    inputFocused: {
        backgroundColor: 'transparent',
    },
    placeholder: {
        color: '#777777',
    },
});
