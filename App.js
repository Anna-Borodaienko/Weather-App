import React, { useState, useEffect, useCallback } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Alert, StyleSheet, Text, View, Image, ScrollView } from 'react-native';
import * as Location from 'expo-location';
import * as SplashScreen from 'expo-splash-screen';
import axios from 'axios';
import { useFonts } from 'expo-font';
import Header from './components/Header';
import Day from './components/Day';
import Current from './components/Current';
import Forecast from './components/Forecast';
import Address from './components/Address';

SplashScreen.preventAutoHideAsync();

export default function App () {
  const [location, setLocation] = useState([50.58921087278374, 30.51444583685887]);
  const [address, getAddress] = useState([]);
  const [weather, getWeather] = useState([]);
  const [hourlyForecast, getHourlyForecast] = useState([]);
  const [iconPath, getIconPath] = useState('');
  const [date, getDate] = useState('');
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
    })();
  }, []);

  const getCity = async (location) => {
    const {data} = await axios.get(`https://eu1.locationiq.com/v1/reverse?key=${API_key_address}&lat=${location[0]}&lon=${location[1]}&format=json&accept-language='en'`);
    getAddress([data.address.country, data.address.city || data.address.village || data.address.town]);
  }

  const getWeatherData = async (location) => {
    const {data} = await axios.get(`https://api.openweathermap.org/data/3.0/onecall?lat=${location[0]}&lon=${location[1]}&appid=${API_key_weather}&units=metric&exclude=minutely,alerts`);
    getWeather([data.current.temp, data.current.weather[0].main, data.current.humidity, data.current.wind_speed, data.daily[0].temp.min, data.daily[0].temp.max]);
    getHourlyForecast(data.hourly);
    getIconPath(`http://openweathermap.org/img/wn/${data.current.weather[0].icon}@2x.png`);
    getDate((new Date(data.current.dt*1000)).toLocaleDateString());
    
  }

  useEffect(() => {
    getCity(location);
    getWeatherData(location);
  }, [location]);

  return (
    <View style={styles.container} onLayout={onLayoutRootView}>
      {/* <Header /> */}

      <View style={styles.user_info}>
        <Address address={address}/>
        <Day date={date}/>
      </View>
     
      <Current iconPath={iconPath} weather={weather}/>
     
      <Forecast hourly={hourlyForecast.splice(1, 24)}/>
      
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(39, 183, 245, 0.8)',
    alignItems: 'center',
    paddingTop: StatusBar.currentHeight,
  },

  user_info: {
    flex: 1,
    marginTop: 40,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingHorizontal: 0

  }
  
 
  
 
});
