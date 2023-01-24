import { StyleSheet, FlatList } from "react-native";
import HourCard from './HourCard';

export default function HourForecast ({hourly}) {
  const currentHour = (new Date(hourly[0].dt*1000)).getHours();
  return (
    
  <FlatList horizontal style={styles.container}
    data={hourly.slice(1)}
    renderItem={({item}) => (<HourCard item={item} currentHour={currentHour}/>)}
    keyExtractor={item => item.dt}
  />
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

  },
})