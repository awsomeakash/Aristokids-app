import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

function ShowWarning() {
    return (
        <View style={styles.container}>
            <Text>Please fill all the fields</Text>
        </View>
    );
}

export default ShowWarning;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'flex-end',
        marginBottom: 20,
        borderColor: 'black',
        borderWidth: 5,
    },
});
