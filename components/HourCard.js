import { View, Text, StyleSheet, Image } from "react-native";

export default function HourCard ({item, currentHour}) {
  const iconPath = `http://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`;
  const hour = (new Date(item.dt*1000)).getHours();
  return (
    <View style={styles.card}>
      <Text>
        {(hour > currentHour) ? 'Today' : 'Tomorrow' }
      </Text>
      <Text style={styles.hours}>{hour}:00</Text>
      <Image
          style={styles.icon}
          source={{uri: `${iconPath}`}}
        />
      <View style={styles.info}>
        <Text style={styles.item}>{Math.round(item.temp)}° / </Text>
        <Text style={styles.item}>{item.humidity}%</Text>
      </View>
      
    </View>
  )
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 5,
    margin: 5,
    borderColor: 'rgba(38, 162, 225, 0.8)',
    borderRadius: 15,
    borderStyle: 'solid',
    borderWidth: 1,
    backgroundColor: 'rgba(39, 185, 255, 0.5)'
  },
  icon: {
    width: 100,
    height: 50,
  },
  info: {
    flexDirection: 'row',
    // paddingHorizontal: 10,
  },
  item: {
    fontSize: 20,
    paddingVertical: 10,
  },
  hours: {
    fontSize: 20,
  }
})
