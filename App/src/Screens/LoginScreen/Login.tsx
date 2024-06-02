import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Colors from '../../Utils/Colors'

const Login = () => {
  return (
    <View>
      <Image source={require('../../assets/images/login.png')}
      style={styles.loginImage}
      />
       <View style={styles.subContainer}>
            <Text>Hello</Text>
       </View>
    </View>
   
  )
}

export default Login

const styles = StyleSheet.create({
    loginImage:{
        width: 230,
        height:450,
        marginTop: 70,
        borderWidth: 4,
        borderColor: Colors.BLACK,
        borderRadius: 10,
    },
   subContainer: {
        width: '100%',
        backgroundColor:'Grey',
        height: '70%',
        marginTop: -20,
    }
})