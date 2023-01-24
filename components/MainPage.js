import React, { useState, useEffect, useCallback } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Alert, StyleSheet, View } from 'react-native';
import * as Location from 'expo-location';
import * as SplashScreen from 'expo-splash-screen';
import { useFonts } from 'expo-font';
import Current from './Current';
import HourForecast from './HourForecast';
import DayForecast from './DayForecast';
import Address from './Address';
import Day from './Day';
import Header from './Header';
import { addressService } from '../api/services/Address';
import { weatherService } from '../api/services/Weather';

SplashScreen.preventAutoHideAsync();

export default function MainPage ({route, navigation}) {
  
  const [location, setLocation] = useState([50.44962180359622, 30.509305862461215]);
  const [address, setAddress] = useState([]);
  const [date, setDate] = useState(new Date());
  const [currentWeather, setCurrentWeather] = useState({});
  const [hourlyForecast, setHourlyForecast] = useState([]);
  const [dailyForecast, setDailyForecast] = useState([]);
  const [fontsLoaded] = useFonts({
    'Ruluko': require('../assets/Ruluko-Regular.ttf'),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  const getLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();

    if (status !== 'granted') {
      Alert.alert('Permission to access location was denied');
    };

    const {coords: {latitude, longitude}} = await Location.getCurrentPositionAsync({});
    setLocation([latitude, longitude]);
  }
  
  useEffect(() => {
    if (route.params) {
      setLocation([route.params.lat, route.params.lon]);
      return;
    }

    getLocation();
  }, [route]);
  
  const getCity = async (location) => {
    const { address } = await addressService.getAddressByCoords(location);
    
    setAddress([address.country, address.city]);
  };
    
  const getWeatherData = async (location) => {
    const weather = await weatherService.getWeather(location);

    setCurrentWeather(weather.current);
    setHourlyForecast(weather.hourly.splice(0, 13));
    setDailyForecast(weather.daily.splice(0, 4));
  };

  useEffect(() => {
      getCity(location);
      getWeatherData(location);
  }, [location]);

  useEffect(() => {
    if (!currentWeather.dt) {
      return;
    };
    setDate(new Date(currentWeather.dt*1000));

  }, [currentWeather]);


  return (
    <View style={styles.container} onLayout={onLayoutRootView}>
      <Header />

      <View style={styles.user_info}>
        <Address address={address}/>
        <Day date={date}/>
      </View>
     
     {currentWeather.dt && dailyForecast.length > 0 && <Current weather={currentWeather} daily={dailyForecast[0]} /> }
      
     {hourlyForecast.length > 0 && <HourForecast hourly={hourlyForecast}/>}

     {dailyForecast.length > 0 && <DayForecast daily={dailyForecast}/>}
      
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
