import React, { useState, useEffect, useCallback } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Alert, StyleSheet, Text, View, Image, ScrollView } from 'react-native';
import * as Location from 'expo-location';
import * as SplashScreen from 'expo-splash-screen';
import axios from 'axios';
import { useFonts } from 'expo-font';

SplashScreen.preventAutoHideAsync();

export default function App () {
  const [location, setLocation] = useState([50.58921087278374, 30.51444583685887]);
  const [address, getAddress] = useState([]);
  const [weather, getWeather] = useState([]);
  const [hourlyForecast, getHourlyForecast] = useState([])
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
    const {data} = await axios.get(`https://eu1.locationiq.com/v1/reverse?key=${API_key_address}&lat=${location[0]}&lon=${location[1]}&format=json&accept-language='en'`)
    getAddress([data.address.country, data.address.city || data.address.village || data.address.town])
  }

  const getWeatherData = async (location) => {
    const {data: {current}} = await axios.get(`https://api.openweathermap.org/data/3.0/onecall?lat=${location[0]}&lon=${location[1]}&appid=${API_key_weather}&units=metric&exclude=minutely,alerts`)
    console.log(current);
    getWeather([current.temp, current.weather[0].main, current.humidity, current.wind_speed]);
    // const {data: } = await axios.get(`https://api.openweathermap.org/data/3.0/onecall?lat=${location[0]}&lon=${location[1]}&appid=${API_key_weather}&units=metric&exclude=current,minutely,alerts`)
    // getHourlyForecast(daily);
    getIconPath(`http://openweathermap.org/img/wn/${current.weather[0].icon}@2x.png`);
    // getDate((new Date(data.daily[0].dt*1000)).toLocaleDateString());
    
  }

  useEffect(() => {
    getCity(location);
    getWeatherData(location);
  }, [location]);

  return (
    <View style={styles.container} onLayout={onLayoutRootView}>
      <View style={styles.user_info}>
        <Text style={styles.location}>{address.join(', ')}</Text>
        <Text style={styles.date}>09/01/23</Text>
      </View>
      
      <View style={styles.main}>
        
        <View style={styles.weather}>
          <View style={styles.main_block}>
            <Image
              style={styles.icon}
              source={{
                uri: `${iconPath}`,
              }}
            />
            <Text style={styles.temp}>{Math.round(weather[0])}°</Text>
          </View>
          
          <Text style={styles.description}>{weather[1]}</Text>

          <View style={styles.second_info}>
            <Image
              style={styles.small_icon}
              source={{
                uri: './assets/heweather-icon-S1-bw-source_399.png',
              }}
            />
            <Text style={styles.info}>{weather[2]}%</Text>
            <Image
              style={styles.small_icon}
              source={{
                uri: `./assets/heweather-icon-S1-bw-source_507.png`,
              }}
            />
            <Text style={styles.info}>{weather[3]}m</Text>
          </View>
          
        </View>
      </View>
      
      <ScrollView horizontal style={styles.forecast}>
        <View style={styles.card}>
          <Text style={styles.item}>1</Text>
          <Text style={styles.item}>2</Text>
          <Text style={styles.item}>3</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.item}>1</Text>
          <Text style={styles.item}>2</Text>
          <Text style={styles.item}>3</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.item}>1</Text>
          <Text style={styles.item}>2</Text>
          <Text style={styles.item}>3</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.item}>1</Text>
          <Text style={styles.item}>2</Text>
          <Text style={styles.item}>3</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.item}>1</Text>
          <Text style={styles.item}>2</Text>
          <Text style={styles.item}>3</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.item}>1</Text>
          <Text style={styles.item}>2</Text>
          <Text style={styles.item}>3</Text>
        </View>
        
      </ScrollView>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(39, 183, 245, 0.8)',
    alignItems: 'center',
  },
  user_info: {
    flex: 1,
    fontFamily: 'Ruluko',
  },
  location: {
    flex: 1,
    fontFamily: 'Ruluko',
    marginTop: 30,
    fontSize: 40,
    color: 'rgba(40, 36, 37, 0.9)'
  },
  date: {
    flex: 1,
    fontFamily: 'Ruluko',
    fontSize: 20,
    color: 'rgba(40, 36, 37, 0.9)',
    textAlign: 'center'
  },
  main: {
    flex: 4,
    width: '100%',
    height: 500,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  main_block: {
    flex: 2,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  icon: {
    width: 200,
    height: 150,
  },
  temp: {
    fontFamily: 'Ruluko',
    fontSize: 40,
    color: 'rgba(40, 36, 37, 0.9)'
  },
  description: {
    fontFamily: 'Ruluko',
    fontSize: 30,
    textAlign: 'center',
  },
  second_info: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  info: {
    fontFamily: 'Ruluko',
    fontSize: 20,
    color: 'rgba(40, 36, 37, 0.9)'
  },
  small_icon: {
    width: 40,
    height: 40,
    color: 'black'
  },
  forecast: {
    borderColor: 'red',
    borderWidth: 1
  },
  card: {
    padding: 20,
    margin: 20,
    borderColor: 'red',
    borderRadius: 5,
    borderStyle: 'solid',
    borderWidth: 1
  },
  item: {
    fontSize: 20,
  }
});
