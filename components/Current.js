import react from "react";
import { View, Text, StyleSheet, Image} from "react-native";

const humidity = require('../assets/humidity.png');
const wind = require('../assets/wind.png');


export default function Current ({iconPath, weather}) {
  return (
    <View style={styles.container}>
        
      <View style={styles.weather}>
        <View style={styles.main_block}>
          <Text style={styles.temp}>{Math.round(weather[0])}°</Text>
          <Image
            style={styles.icon}
            source={{
              uri: `${iconPath}`,
            }}
          />
          <Text style={styles.second_temp}>{Math.round(weather[4])}° / </Text>
          <Text style={styles.second_temp}>{Math.round(weather[5])}°</Text>
        </View>
        
        <Text style={styles.description}>{weather[1]}</Text>

        <View style={styles.second_info}>
          <Image
            style={styles.small_icon}
            source={humidity}
          />
          <Text style={styles.info}>{weather[2]}%</Text>
          <Image
            style={styles.small_icon}
            source={wind}
          />
          <Text style={styles.info}>{weather[3]}m</Text>
        </View>
        
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(39, 185, 255, 1)',
    borderRadius: 20,
    width: '90%',
    height: 200,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  main_block: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    width: 200,
    height: 100,
  },
  temp: {
    fontFamily: 'Ruluko',
    fontSize: 50,
    color: 'rgba(40, 36, 37, 0.9)'
  },
  second_temp: {
    fontFamily: 'Ruluko',
    fontSize: 20,
    color: 'rgba(40, 36, 37, 0.9)'
  },
  description: {
    fontFamily: 'Ruluko',
    fontSize: 25,
    textAlign: 'center',
  },
  second_info: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  info: {
    fontFamily: 'Ruluko',
    fontSize: 20,
    color: 'rgba(40, 36, 37, 0.9)'
  },
  small_icon: {
    width: 40,
    height: 40,
  },
})