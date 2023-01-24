import { View, Text, StyleSheet, Image } from "react-native";

export default function DayCard ({item}) {
  const iconPath = `http://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`;
  const date = (new Date(item.dt*1000)).toLocaleDateString();

  return (
    <View>
      <View style={styles.card}>
      <Text style={styles.date}>{date}</Text>
      <Image
          style={styles.icon}
          source={{uri: `${iconPath}`}}
        />
      <View style={styles.info}>
        <Text style={styles.item}>{Math.round(item.temp.min)}° / </Text>
        <Text style={styles.item}>{Math.round(item.temp.max)}°</Text>
      </View>
      
    </View>
    </View>
  )
}

const styles = StyleSheet.create({
  
  card: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    padding: 10,
    margin: 10,
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
    paddingVertical: 5,
  },
  item: {
    fontSize: 20,
    paddingVertical: 5,
  },
  date: {
    fontSize: 20,
  }
})