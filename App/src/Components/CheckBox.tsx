import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const CheckBox = ({ checked, onChange }:any) => {
    return (
        <TouchableOpacity onPress={onChange} style={[styles.checkBox, checked && styles.checkBoxChecked]}>
            {checked && <Text style={styles.checkBoxIcon}>✓</Text>}
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    checkBox: {
        width: 20,
        height: 20,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: 'white',
        justifyContent: 'center',
        alignItems:"baseline",
    },
    checkBoxChecked: {
        backgroundColor: 'white',
    },
    checkBoxIcon: {
        fontSize: 14,
        color: 'black',
    },
    
});

export default CheckBox;
