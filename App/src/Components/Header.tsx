import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'

const Header = () => {
  return (
      <Image source={require('../assets/images/headerLogo.png')}  style={styles.imageStyle} />
  )
}

export default Header

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        // marginBottom: 20,
        backgroundColor: 'black',
      },
      imageStyle: {
        width: '90%',
        height: '10%',
        marginBottom: 20,
        resizeMode: 'contain',
      },
})