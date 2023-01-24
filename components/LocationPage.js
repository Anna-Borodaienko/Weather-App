import { useState } from 'react';
import { Text, View, Image, ScrollView, TextInput, StyleSheet, Button } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import debounce from 'lodash.debounce';

export default function LocationPage ({navigation}) {
  const [text, setText] = useState('');
  const [searchLocation, setSearchLocation] = useState('');


  const debouncedSetText = debounce(setText, 500);

  const onChange = (text) => {
    debouncedSetText(text);
  };

  return (
    <View style={styles.container}>
      <View style={styles.icon}>
        <MaterialCommunityIcons name='keyboard-backspace' size={26} />
      </View>
      <TextInput
        label="location"
        placeholder="Input your location"
        value={text}
        inputMode='text'
        onChangeText={text => setText(text)}
        
        style={styles.input}
      />
      <Button 
        title='Search'
        onPress={() => setSearchLocation(text)}
      />
    </View>
    
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(39, 183, 245, 0.8)',
  },
  icon: {
    margin: 15,
  },
  input: {
    margin: 15,
    height: 25,
    borderColor: 'black',
    borderStyle: 'solid',
    borderWidth: 1,
    borderRadius: 3,
    backgroundColor: 'white',
  }
})