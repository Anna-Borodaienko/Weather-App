import { View, Text, StyleSheet } from "react-native";

export default function Address ({address}) {
  return (
    <View style={styles.container}>
      <Text style={styles.location}>{address.join(', ')}</Text>
    </View>
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