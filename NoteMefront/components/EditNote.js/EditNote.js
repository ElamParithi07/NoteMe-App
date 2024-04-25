import { StyleSheet, Text, View, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Ionicons, FontAwesome6, MaterialIcons } from '@expo/vector-icons'
import { useRoute, useNavigation } from '@react-navigation/native';

const EditNote = ({ data }) => {
  const route = useRoute();
  const navigation = useNavigation();
  const [saveindicator, setSaveIndicator] = useState(false);

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  useEffect(() => {
    if (route.params && route.params.data) {
      setTitle(route.params.data.title)
      setContent(route.params.data.content)
    }
  }, [route])

  const closeModal = () => {
    navigation.goBack();
  }

  return (
    <View style={styles.createcontainer}>
      <View style={styles.createcard}>
        <TouchableOpacity style={{ position: 'absolute', top: 10, right: 10 }}
          onPress={closeModal}
        >
          <MaterialIcons name="close" size={29} color="black" />
        </TouchableOpacity>
        <Text style={styles.cardtitle}>Save it <Text style={{ color: '#5865f1' }}>& </Text>Use it</Text>
        <View style={{height:2,width:50,backgroundColor:'#5865f1'}}>

        </View>
        <View style={styles.inputfields}>
          <View>
            <Text style={{ fontSize: 23, color: '#5865f1', }}>{title}</Text>
            <TextInput
              placeholder='Enter title'
              style={styles.input}
              multiline={true}
              value={content}
              onChangeText={setContent}
              editable={true}
            />
          </View>
          <TouchableOpacity style={styles.createbutton} onPress={()=>setSaveIndicator(!saveindicator)}>
            {saveindicator && <ActivityIndicator size={20} color={'#fff'}/>}
            <Text style={styles.btnText}>Save</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}

export default EditNote

const styles = StyleSheet.create({
  createcontainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  createcard: {
    paddingVertical: 20,
    width: '100%',
    height: '100%',
    backgroundColor: 'white',
    elevation: 2,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    gap:20,
    paddingHorizontal:10
  },
  cardtitle: {
    fontSize: 30
  },
  inputfields: {
    width: '100%',
    padding: 15,
  },
  input: {
    padding: 10,
    borderWidth: 0.5,
    borderRadius: 5,
    borderColor: '#D9D9D9',
    marginVertical: 8
  },
  createbutton: {
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 15,
    backgroundColor: '#5865f1',
    borderRadius: 5,
    alignItems: 'center',
    gap: 5,
    marginVertical: 10,
  },
  btnText: {
    color: 'white',
    fontSize: 19,
  },
  selectbox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  selectoption: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    borderWidth: 0.5,
    borderRadius: 5,
    borderColor: '#D9D9D9',
    width: '40%',
    marginVertical: 12,
    gap: 10,
  }
})
