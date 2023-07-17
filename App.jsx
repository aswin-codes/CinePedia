import React from 'react';
import {StyleSheet, View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen';
import DetailsScreen from './screens/DetailsScreen';

const Stack = createNativeStackNavigator();
function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{
            headerStyle: {
              backgroundColor: '#21242C',
            },
            title: 'CinePedia',
            headerTitleAlign: 'center',
            headerTitleStyle: styles.titleStyle,
          }}
        />
        <Stack.Screen 
          name="Details" 
          component={DetailsScreen}
          options={{
          
            headerTransparent: true,
            title: "D"
            
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;

const styles = StyleSheet.create({
  titleStyle: {
    fontSize: 24,
    fontWeight: '500',
    color: '#FFF',
  },
  headerBackground: {
    flex: 1,
  },
});
