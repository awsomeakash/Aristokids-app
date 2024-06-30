import {StyleSheet, Text, View, TouchableOpacity, Alert} from 'react-native';
import React, {useState, useRef, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import globalStyles from '../../Utils/globalStyles';
import Header from '../../Components/Header';
import {useFocusEffect} from '@react-navigation/native';
import {getLocalStorageKey} from '../../Utils/SetLocalStorage';

import {
    questionTypeSelect,
    questionTypeSelectMapper,
} from '../../Utils/Constants';
import navigateToSelectedQuestionTypePage, {
    getStorageKey,
} from '../../Utils/navigation';

function SelectQuestionTypePage({navigation}: any) {
    const [savedFormData, setSavedFormData] = useState(null);
    const [STORAGE_KEY, setSTORAGE_KEY] = useState('');
    const [storagekeyChagned, setStoragekeyChagned] = useState(false);

    // useFocusEffect(
    //     React.useCallback(() => {
    //         console.log('30 din barbad');
    //         const loadFormData = async () => {
    //             try {
    //                 const savedData = await AsyncStorage.getItem(STORAGE_KEY);
    //                 console.log('Are we reaching here?::::', savedData);
    //                 if (savedData) {
    //                     setSavedFormData(JSON.parse(savedData));
    //                 }
    //             } catch (error) {
    //                 Alert.alert('Error', 'Failed to load saved data.');
    //             }
    //         };

    //         loadFormData();
    //         return () => {
    //             setStoragekeyChagned(false);
    //         };
    //     }, [storagekeyChagned]),
    // );

    const handleNavigation = async (questionType: string) => {
        const newStorageKey = getStorageKey(questionType);
        const savedFormData = await getLocalStorageKey(newStorageKey);
        console.log('savedFormData KEy Form Data is :::::: ', savedFormData);
        console.log('Storage KEy Form Data is :::::: ', STORAGE_KEY);
        const navigatePage = navigateToSelectedQuestionTypePage(questionType);
        if (navigatePage) {
            console.log('Saved Form Data is :::::: ', savedFormData);
            navigation.navigate(navigatePage, {savedFormData});
        } else {
            console.warn('You have selected ' + questionType);
        }
    };

    return (
        <View style={globalStyles.container}>
            <Header />
            <Text style={styles.textStyle}>Choose your question type</Text>
            <View style={styles.bodyContainer}>
                {questionTypeSelect.map((questionType, index) => {
                    if (index % 2 === 0) {
                        return (
                            <View style={styles.rowContainer} key={index}>
                                <TouchableOpacity
                                    style={styles.touchableStyle}
                                    onPress={() =>
                                        handleNavigation(questionType)
                                    }>
                                    <Text style={styles.optionText}>
                                        {questionType}
                                    </Text>
                                </TouchableOpacity>
                                {questionTypeSelect[index + 1] && (
                                    <TouchableOpacity
                                        style={styles.touchableStyle}
                                        onPress={() =>
                                            handleNavigation(
                                                questionTypeSelect[index + 1],
                                            )
                                        }>
                                        <Text style={styles.optionText}>
                                            {questionTypeSelect[index + 1]}
                                        </Text>
                                    </TouchableOpacity>
                                )}
                            </View>
                        );
                    }
                })}
            </View>
        </View>
    );
}

export default SelectQuestionTypePage;

const styles = StyleSheet.create({
    bodyContainer: {
        flex: 1,
        width: '100%',
        flexDirection: 'column',
        marginTop: '10%',
    },
    rowContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
    },
    touchableStyle: {
        flex: 1,
        marginHorizontal: 5,
        height: 100,
        borderRadius: 10,
        shadowColor: 'green',
        shadowOffset: {
            width: 0,
            height: 10,
        },
        shadowOpacity: 0.25,
        shadowRadius: 10,
        backgroundColor: '#E9F6F2',
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 10,
    },
    textStyle: {
        color: 'white',
        fontSize: 25,
        fontWeight: 'bold',
    },
    optionText: {
        color: 'black',
        fontSize: 18,
        fontWeight: 'bold',
    },
});
