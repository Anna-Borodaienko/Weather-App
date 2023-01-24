import { StyleSheet, FlatList } from "react-native";
import DayCard from "./DayCard";

export default function DayForecast ({daily}) {
  // console.log(daily.length);
  return (
    
  <FlatList style={styles.container}
    data={daily.splice(1)}
    renderItem={({item}) => (<DayCard item={item} />)}
    keyExtractor={item => item.dt}
  />
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '80%',
  },
})