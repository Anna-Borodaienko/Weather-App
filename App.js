import { NavigationContainer } from '@react-navigation/native';
// import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, ScrollView } from 'react-native';


import MainPage from './components/MainPage';
import LocationPage from './components/LocationPage';
import SettingsPage from './components/SettingsPage';

// const Tab = createMaterialTopTabNavigator();

const Stack = createNativeStackNavigator();


export default function App () {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen 
          name="Home"
          component={MainPage}
          options={{
            title: 'Home',
          }}
        
        />

        <Stack.Screen 
          name="Location"
          component={LocationPage}
          options={{
            title: 'Location',
          }}
        
        />

        <Stack.Screen 
          name="Settings"
          component={SettingsPage}
          options={{
            title: 'Settings',
          }}
        
        />
      </Stack.Navigator>
    </NavigationContainer>
    
  )
};

const styles = StyleSheet.create({
  // container: {
  //   backgroundColor: 'rgba(39, 183, 245, 0.8)',
  //   // alignItems: 'center',
  //   paddingTop: StatusBar.currentHeight,
  // }
})
