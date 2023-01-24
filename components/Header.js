import React from 'react';
import { Text, View, Image, ScrollView, StyleSheet, Button, TouchableOpacity  } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';

const logo = require('../assets/favicon.png');
const updateIcon = require('../assets/reload.png');
const settingsIcon = require('../assets/settings.png');


export default function Header () {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>

      <TouchableOpacity onPress ={() => navigation.navigate('Home')} style={styles.logo}>
        <MaterialCommunityIcons name="home" size={26} />
      </TouchableOpacity>
        
      <TouchableOpacity onPress ={() => navigation.navigate('Location')} style={styles.logo}>
        <MaterialCommunityIcons name="update" size={26} />
      </TouchableOpacity>

      <TouchableOpacity onPress ={() => navigation.navigate('Settings')} style={styles.logo}>
        <MaterialCommunityIcons name="cog" size={26} />
      </TouchableOpacity>

    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    height: 30,
  },
  logo: {
    height: 20,
    width: 20,
    flex: 1,
    marginHorizontal: 50,
    marginTop: 10
  }
})