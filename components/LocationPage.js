import { useEffect, useState } from 'react';
import { Text, View, Image, ScrollView, TextInput, StyleSheet, Button, FlatList } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { addressService } from '../api/services/Address';
import AddressesList from './AddressesList';

export default function LocationPage ({navigation}) {
  const [text, setText] = useState('');
  const [searchLocation, setSearchLocation] = useState('');
  const [searchAddresses, setSearchAddresses] = useState([]);

  const getAddresses = async (searchLocation) => {
    const addresses = await addressService.getAddressByName(searchLocation);

    setSearchAddresses(addresses);
  }

  useEffect(() => {
    if (searchLocation) {
      getAddresses(searchLocation)
    }
    console.log(searchAddresses)
  }, [searchLocation]);

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

    {searchAddresses && <AddressesList addresses={searchAddresses} />}

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
    height: 50,
    borderColor: 'black',
    borderStyle: 'solid',
    borderWidth: 1,
    borderRadius: 3,
    backgroundColor: 'white',
  }
})