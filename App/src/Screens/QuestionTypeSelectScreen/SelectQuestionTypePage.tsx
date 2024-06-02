import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React from 'react';
import globalStyles from '../../Utils/globalStyles';
import Header from '../../Components/Header';
import { questionTypeSelect, questionTypeSelectMapper } from '../../Utils/Constants';

function SelectQuestionTypePage() {
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
                  onPress={() => {
                    console.warn(`You have selected ${questionType}`);
                  }}>
                  <Text style={styles.optionText}>{questionType}</Text>
                </TouchableOpacity>
                {questionTypeSelect[index + 1] && (
                  <TouchableOpacity
                    style={styles.touchableStyle}
                    onPress={() => {
                      console.warn(`You have selected ${questionTypeSelect[index + 1]}`);
                    }}>
                    <Text style={styles.optionText}>{questionTypeSelect[index + 1]}</Text>
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
    // justifyContent: 'center',
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
    // marginTop: '10%',
  },
  optionText:{
    color: 'black',
    fontSize: 18,
    fontWeight: 'bold',
  }
});
