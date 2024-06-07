import React, { useEffect, useRef } from 'react';
import { StyleSheet, Text, View, Animated, Easing, TouchableOpacity } from 'react-native';
import Svg, { Circle } from 'react-native-svg';
import { useNavigation } from '@react-navigation/native';
import Header from '../../Components/Header';
import globalStyles from '../../Utils/GlobalStyles';

const ResultPage = ({ route }:any) => {
    const navigation = useNavigation();
    const { newCorrectAnswerCount, formData } = route.params;
    const { numberOfQuestions, numberOfDigits, numberOfRows } = formData;

    const percentage = (newCorrectAnswerCount / numberOfQuestions) * 100;

    const animatedValue = useRef(new Animated.Value(0)).current;
    const circleRef = useRef();
    const circumference = 60 * Math.PI * 2;

    useEffect(() => {
        Animated.timing(animatedValue, {
            toValue: percentage,
            duration: 1000,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: false,
        }).start();

        animatedValue.addListener((v) => {
            const maxPerc = 60 * Math.PI * 2;
            const strokeDashoffset = maxPerc - (maxPerc * v.value) / 100;
            if (circleRef.current) {
                (circleRef.current as any).setNativeProps({
                    strokeDashoffset,
                });
            }
        });

        return () => {
            animatedValue.removeAllListeners();
        };
    }, [percentage]);

    return (
        <View style={globalStyles.container}>
            <Header />
            <View style={styles.body}>
                <Text style={styles.infoText}>{numberOfDigits} digits - {numberOfRows} rows</Text>
                <View style={styles.progressContainer}>
                    <Svg width="180" height="180" viewBox="0 0 140 140">
                        <Circle
                            ref={circleRef}
                            cx="70"
                            cy="70"
                            r="60"
                            stroke="#00e0ff"
                            strokeWidth="10"
                            strokeDasharray={circumference}
                            strokeDashoffset={circumference}
                            fill="none"
                        />
                    </Svg>
                    <View style={styles.textContainer}>
                        <Text style={styles.textStyle}>{newCorrectAnswerCount}</Text>
                        <Text style={styles.separator}>-</Text>
                        <Text style={styles.textStyle}>{numberOfQuestions}</Text>
                    </View>
                </View>
                <TouchableOpacity style={styles.homeButton} onPress={() => navigation.navigate('SelectQuestionType')}>
                    <Text style={{color:"white"}}>Retry</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default ResultPage;

const styles = StyleSheet.create({
    textStyle: {
        color: 'white',
        fontSize: 30,
        textAlign: 'center',
        fontWeight: 'bold',
    },

    separator: {
        color: 'white',
        fontSize: 30,
        textAlign: 'center',
        fontWeight: 'bold',
    },
    body: {
        flex: 1,
        backgroundColor: 'black',
        alignItems: 'center',
        justifyContent: 'center',
    },
    progressContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        marginBottom: 20,
    },
    textContainer: {
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center',
    },
    infoText: {
        fontSize: 30,
        textAlign: 'center',
        color: 'white',
        marginBottom: 20,
    },
    homeButton: {
        position: 'absolute',
        bottom: 40,
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: 'rgba(0, 255, 0, 0.5)',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
