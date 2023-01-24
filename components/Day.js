import { View, Text, StyleSheet } from "react-native";

export default function Day ({date}) {
  return (
    <View style={styles.container}>
      <Text style={styles.date}>{date.toLocaleDateString()}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  date: {
    flex: 1,
    fontFamily: 'Ruluko',
    fontSize: 20,
    color: 'rgba(40, 36, 37, 0.9)',
    textAlign: 'center',
  },
})