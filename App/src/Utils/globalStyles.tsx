import {StyleSheet} from 'react-native';

const globalStyles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: 'black',
        paddingTop: 15,
    },
    textStyle: {
        color: 'white',
        fontSize: 50,
        fontWeight: 'bold',
    },
    checkboxContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 20,
        marginRight: '50%',
    },
    checkboxLabel: {
        marginLeft: 8,
        fontSize: 16,
        color: 'white',
    },
});

export default globalStyles;
