import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const Rated = ({rated}) => {
  return (
    <View style={styles.container}>
      <Text>{rated}</Text>
    </View>
  )
}

export default Rated

const styles = StyleSheet.create({
    container: {
        backgroundColor : '#715F00',
        width: 66,
        height: 26,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems:'center'
    }
})