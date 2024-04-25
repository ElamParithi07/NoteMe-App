import { FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Feather, MaterialIcons, EvilIcons } from '@expo/vector-icons';
import { useRoute } from '@react-navigation/native';


const Multiselect = () => {
  const route = useRoute();
  const [list, setList] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [check, setcheck] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredData, setFilteredData] = useState(route.params.data);


  useEffect(() => {
    if (route.params && route.params.data) {
      setList(route.params.data)
    }
  }, [route])

  const toggleItemSelection = (itemName) => {
    if (itemName === 'Select all') {
      if (check) {
        setSelectedItems([]);
        setcheck(false);
      } else {
        const allItemNames = filteredData.map(item => item.name);
        setSelectedItems(allItemNames);
        setcheck(true);
      }
    } else {
      const index = selectedItems.indexOf(itemName);
      if (index !== -1) {
        setSelectedItems(selectedItems.filter((name) => name !== itemName));
      } else {
        setSelectedItems([...selectedItems, itemName]);
      }
    }
  };

  const handleSearch = (text) => {
    setSearchQuery(text);
    const filtered = data.filter(item => item.name.toLowerCase().includes(text.toLowerCase()));
    setFilteredData(filtered);
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={{
        paddingHorizontal: 40,
        paddingVertical: 20,
        backgroundColor: selectedItems.includes(item.name) ? 'lightblue' : 'white',
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        margin:2,
        borderRadius:10
      }}
      onPress={() => toggleItemSelection(item.name)}
    >
      <Text>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.headercontainer}>
        <View style={styles.searchbar}>
          <Feather name="search" size={24} color="black" />
          <TextInput
            placeholder='Search'
            style={styles.input}
            value={searchQuery}
            onChangeText={handleSearch}
          />
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center', height: 30, justifyContent: 'space-evenly', width: '90%', gap: 10, }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}>
            <TouchableOpacity style={styles.checkbox} onPress={() => toggleItemSelection('Select all')}>
              {check && <MaterialIcons name="check" size={20} color="black" />}
            </TouchableOpacity>
            <Text>Select all</Text>
          </View>
          <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}>
            <Text>Save and continue</Text>
            <EvilIcons name="arrow-right" size={24} color="black" />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.bodycontainer}>
        <FlatList
          data={filteredData}
          keyExtractor={item => item.id}
          renderItem={renderItem}
        />
      </View>
    </View>
  )
}

export default Multiselect

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headercontainer: {
    alignItems: 'center',
    justifyContent: 'space-evenly',
    height: 150,
    borderBottomWidth: 0.5,
    borderColor: '#D9D9D9',
    paddingVertical: 10,
  },
  searchbar: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
    width: '90%',
    height: 50,
    backgroundColor: 'white',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  input: {
    fontSize: 16,
    width: '90%'
  },
  checkbox: {
    height: 20,
    width: 20,
    borderWidth: 0.5,
    borderColor: 'grey',
    borderRadius: 5
  },
  bodycontainer: {
    flex: 1,
  }
})
