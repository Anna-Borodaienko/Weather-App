import { View, Text, StyleSheet, ScrollView, FlatList } from "react-native";
import Day_card from "./Day_card";

export default function Forecast ({hourly}) {
  return (
    
  <FlatList horizontal style={styles.container}
    data={hourly}
    renderItem={({item}) => (<Day_card item={item}/>)}
    keyExtractor={item => item.dt}
  />
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

  },
})