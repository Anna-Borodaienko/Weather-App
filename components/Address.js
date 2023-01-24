import { View, Text, StyleSheet, TouchableOpacity  } from "react-native";
import { useNavigation } from '@react-navigation/native';


export default function Address ({address}) {
  const navigation = useNavigation();

  return (
    <TouchableOpacity  style={styles.container} onPress ={() => navigation.navigate('Location')}>
      <Text style={styles.location}>{address.join(', ')}</Text>
    </TouchableOpacity >
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  location: {
    flex: 1,
    fontFamily: 'Ruluko',
    fontSize: 30,
    color: 'rgba(40, 36, 37, 0.9)',
    paddingTop: 20,
  },
})