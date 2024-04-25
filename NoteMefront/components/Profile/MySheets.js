import { Dimensions, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import SheetCard from './SheetCard';
const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

const MySheets = () => {
  const navigation = useNavigation();
  const data = [
    {
      id: 1,
      SheetName: 'Company Db',
      SheetUrl: 'https://resumelink.com',
    },
    {
      id: 2,
      SheetName: 'Kovai.Co',
      SheetUrl: 'https://resumelink.com',
    },
    {
      id: 3,
      SheetName: 'Digital Back Office DB',
      SheetUrl: 'https://resumelink.com',
    },
  ]
  const renderItem = ({ item }) => (
    <View style={{ padding: 10 }}>
      <SheetCard data={item} />
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.headercontainer}>
        <View style={styles.headerinnercontainer}>
          <TouchableOpacity onPress={() => { navigation.goBack() }}>
            <AntDesign name="arrowleft" size={24} color="black" />
          </TouchableOpacity>
          <Text style={styles.headerText}>My Sheets</Text>
        </View>
      </View>
      <View style={styles.bodycontainer}>
        <FlatList
          data={data}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </View>
  )
}

export default MySheets

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headercontainer: {
    height: (height * 10) / 100,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffff',
    borderBottomWidth: 2,
    borderColor: '#5865f1',
  },
  headerinnercontainer: {
    width: '67%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15
  },
  headerText: {
    fontSize: 19
  },
  bodycontainer: {
    flex: 1,
  }
})