import { StyleSheet, FlatList } from "react-native";
import AddressesItem from "./AddressesItem";

export default function AddressesList ({addresses}) {
  // console.log(daily.length);
  return (
    
  <FlatList style={styles.container}
    data={addresses}
    renderItem={({item}) => (<AddressesItem item={item} />)}
    keyExtractor={item => item.place_id}
  />
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
  },
})