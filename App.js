import React, { useState, useEffect, useCallback } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Alert, StyleSheet, Text, View, Image } from 'react-native';
import * as Location from 'expo-location';
import * as SplashScreen from 'expo-splash-screen';
import axios from 'axios';
import { useFonts } from 'expo-font';

SplashScreen.preventAutoHideAsync();

export default function App () {
  const [location, setLocation] = useState([]);
  const [address, getAddress] = useState([]);
  const [weather, getWeather] = useState([]);
  const [iconPath, getIconPath] = useState('');
  const [fontsLoaded] = useFonts({
    'Ruluko': require('./assets/Ruluko-Regular.ttf'),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  const API_key_address = 'pk.fc03afa61d4356d78259c7c825649670';
  const API_key_weather = 'fdedab4cf64f09bcf6cf202c5ad2426a';

  useEffect(() => {
    (async () => {
      
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission to access location was denied');
      }

      let {coords: {latitude, longitude}} = await Location.getCurrentPositionAsync({});
      setLocation([latitude, longitude]);
      console.log(latitude, longitude);
    })();
    getCity(location);
  }, []);

  const getCity = async (location) => {
    const {data} = await axios.get(`https://eu1.locationiq.com/v1/reverse?key=${API_key_address}&lat=${location[0]}&lon=${location[1]}&format=json&accept-language='en'`)
    getAddress([data.address.country, data.address.city || data.address.village || data.address.town])
  }

  const getWeatherData = async (location) => {
    const {data} = await axios.get(`https://api.openweathermap.org/data/3.0/onecall?lat=${location[0]}&lon=${location[1]}&exclude={part}&appid=${API_key_weather}&units=metric`)
    getWeather([data.current.temp, data.current.weather[0].description]);
    getIconPath(`http://openweathermap.org/img/wn/${data.current.weather[0].icon}@2x.png`);
  }

  useEffect(() => {
    getCity(location);
    getWeatherData(location);
  }, [location]);

  return (
    <View style={styles.container} onLayout={onLayoutRootView}>
      <Text style={styles.location}>{address.join(', ')}</Text>
      <View style={styles.weather}>
        <Text style={styles.temp}>Temp: {Math.round(weather[0])}</Text>
        <Image
          style={styles.icon}
          source={{
            uri: `${iconPath}`,
          }}
        />
        <Text style={styles.description}>{weather[1]}</Text>
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(39, 183, 245, 0.8)',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  location: {
    flex: 1,
    fontFamily: 'Ruluko',
    marginTop: 40,
  },
  weather: {
    flex: 2,
  },
  temp: {
    fontFamily: 'Ruluko',
  },
  icon: {
    width: 60,
    height: 60,
  },
  description: {
    fontFamily: 'Ruluko',
    textDecorationStyle: 'solid'
  }
});
