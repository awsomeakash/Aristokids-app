import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import CheckBox from './CheckBox';

interface DropDownProps {
  initialValues: { label: string; checked: boolean; }[];
  onOptionsChange: (options: { label: string; checked: boolean; }[]) => void;
}

const DropDown: React.FC<DropDownProps> = ({ initialValues, onOptionsChange }) => {
    const [expanded, setExpanded] = useState(false);
    const [options, setOptions] = useState(initialValues);

    useEffect(() => {
        onOptionsChange(options);
    }, [options]);

    const toggleExpand = () => {
        setExpanded(!expanded);
    };

    const handleCheckBoxChange = (index: number) => {
        const updatedOptions = [...options];
        updatedOptions[index].checked = !updatedOptions[index].checked;
        setOptions(updatedOptions);
    };

    const renderOptionsInGrid = () => {
        const rows = [];
        for (let i = 0; i < options.length; i += 2) {
            rows.push(
                <View style={styles.optionRow} key={i}>
                    <View style={styles.optionItem}>
                        <CheckBox checked={options[i].checked} onChange={() => handleCheckBoxChange(i)} />
                        <Text style={styles.optionText}>{options[i].label}</Text>
                    </View>
                    {i + 1 < options.length && (
                        <View style={styles.optionItem}>
                            <CheckBox checked={options[i + 1].checked} onChange={() => handleCheckBoxChange(i + 1)} />
                            <Text style={styles.optionText}>{options[i + 1].label}</Text>
                        </View>
                    )}
                </View>
            );
        }
        return rows;
    };

    return (
        <View>
            <TouchableOpacity onPress={toggleExpand} style={styles.dropDownButton}>
                <Text style={styles.dropDownButtonText}>Operations</Text>
            </TouchableOpacity>
            {expanded && (
                <View style={styles.optionsContainer}>
                    {renderOptionsInGrid()}
                </View>
            )}
        </View>
    );
};

export default DropDown;

const styles = StyleSheet.create({
    dropDownButton: {
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        paddingVertical: 10,
        paddingHorizontal: '29%',
        borderRadius: 5,
        marginTop: 20,
    },
    dropDownButtonText: {
        fontSize: 18,
        color: 'white',
    },
    optionsContainer: {
        marginTop: 10,
        paddingHorizontal: 10,
    },
    optionRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
    },
    optionItem: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 20,
    },
    optionText: {
        fontSize: 16,
        color: 'white',
        marginLeft: 10,
    },
});
