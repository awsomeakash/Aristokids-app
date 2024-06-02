import { StyleSheet, Text, View, Image, Animated } from 'react-native';
import React, { useRef, useEffect } from 'react';
import globalStyles from '../../Utils/globalStyles';


function IntroPage({ navigation }:any) {
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 2000,
      useNativeDriver: true,
    }).start(() => {
      setTimeout(() => {
        navigation.replace('SelectQuestionType');
      }, 2000); // 2 seconds
    });

    return () => {
      fadeAnim.stopAnimation();
    };
  }, [fadeAnim, navigation]);

  return (
    <View style={globalStyles.container}>
      <Animated.View
        style={[
         
          {
            opacity: fadeAnim, 
          },
        ]}
      >
        <Image source={require('../../assets/images/companyLogo.png')} style={styles.imageStyle} />
      </Animated.View>
    </View>
  );
}

export default IntroPage;

const styles = StyleSheet.create({
  imageStyle: {
    width: 400,
    height: 400,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'black',
  },
});
