import { View, Text, StyleSheet, TouchableOpacity  } from "react-native";
import { useNavigation } from '@react-navigation/native';

export default function AddressesItem ({item}) {
  const navigation = useNavigation();

  const handlePress = (item) => {
    navigation.navigate('Home', {
      lat: item.lat,
      lon: item.lon,
    })
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.card} onPress={() => handlePress(item)}>
        <Text style={styles.item}>{item.display_name}</Text>
      </TouchableOpacity >
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  card: {
    flex: 1,
    flexDirection: 'row',
    padding: 10,
    margin: 10,
    borderColor: 'rgba(38, 162, 225, 0.8)',
    borderRadius: 15,
    borderStyle: 'solid',
    borderWidth: 1,
    backgroundColor: 'rgba(39, 185, 255, 0.5)'
  },
  item: {
    fontSize: 20,
    paddingVertical: 5,
  },
  
})