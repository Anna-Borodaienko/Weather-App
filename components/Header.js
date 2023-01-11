import React from 'react';
import { StyleSheet, Text, View, Image, ScrollView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import App from '../App';

const logo = require('../assets/favicon.png');
const updateIcon = require('../assets/reload.png');
const settingsIcon = require('../assets/settings.png');

const Stack = createNativeStackNavigator();

export default function Header () {
  return (
    <Text></Text>
  //   <NavigationContainer>
  //   <Stack.Navigator>
  //     <Stack.Screen name="Update" component={App} />
  //   </Stack.Navigator>
  // </NavigationContainer>

    // <View style={styles.container}>
    //   <Image 
    //     style={styles.logo}
    //     source={logo}
    //   />
    //   <Image 
    //     style={styles.logo}
    //     source={updateIcon}
    //   />
    //   <Image 
    //     style={styles.logo}
    //     source={settingsIcon}
    //   />
    // </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 30,
  },
  logo: {
    height: 20,
    width: 20,
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center'
  }
})