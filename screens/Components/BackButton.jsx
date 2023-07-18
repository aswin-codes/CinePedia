import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';

const BackButton = () => {
  return <View style={styles.container}>
    <Icon name='arrow-back-ios' size={24} color='white'/>
  </View>;
};

export default BackButton;

const styles = StyleSheet.create({
  container: {
    height: 40,
    width: 40,
    paddingHorizontal: 12,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100,
    backgroundColor: 'rgba(0,0,0,0.75)',
  },
});
