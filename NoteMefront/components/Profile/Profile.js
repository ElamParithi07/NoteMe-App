import { StyleSheet, Text, View, Image, TouchableOpacity, Pressable } from 'react-native'
import React from 'react'
import { AntDesign } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { MaterialIcons, FontAwesome  } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
const Profile = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.topcontainer}>
        <View style={styles.settingcontainer}>
          <View style={styles.settingicon}>
            <Text style={styles.appname}>NoteMe</Text>
            <Pressable
              onPress={()=>navigation.navigate('Settingspage')}
            ><Ionicons name="settings-sharp" size={24} color="white" /></Pressable>
          </View>
        </View>
      </View>
      <View style={styles.bodycontainer}>
        <View style={styles.imagecontainer}>
          <Image
            source={{ uri: 'https://w7.pngwing.com/pngs/867/134/png-transparent-giant-panda-dog-cat-avatar-fox-animal-tag-mammal-animals-carnivoran-thumbnail.png' }}
            style={styles.profileimage}
          />
          
          <View style={styles.hash}>
              <Text style={{color:'#5865f1',fontWeight:'bold',fontSize:16}}>#</Text>
          </View>
        </View>
        <View style={styles.profiledetailscard}>
          <View style={styles.profiledetails}>
            <Text style={styles.name}>Elamparithi</Text>
            <Text style={styles.email}>elamparithi@gmail.com</Text>
          </View>
          <View style={styles.editbtncontainer}>
            <TouchableOpacity style={styles.editprofilebtn}>
              <MaterialIcons name="mode-edit" size={22} color="grey" />
              <Text style={styles.editText}>Edit Profile</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.professionalcard}>
          <Text style={styles.professionalcardtext}>My Sheets</Text>
          <TouchableOpacity onPress={()=>navigation.navigate('MySheets')}><AntDesign name="rightcircleo" size={24} color="grey" /></TouchableOpacity>
        </View>
        <View style={styles.membercard}>
          <Text style={styles.membercardtitle}>Member Since</Text>
          <Text style={styles.joineddate}>Jan 21, 2024</Text>
        </View>
      </View>
    </View>
  )
}

export default Profile

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  topcontainer: {
    height: '18%',
    backgroundColor: 'black',
    width: '100%',
  },
  settingcontainer: {
    alignItems: 'flex-end'
  },
  settingicon: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 10,
    marginRight: 20
  },
  appname: {
    color: 'white',
    fontSize: 15,
    fontWeight: 'bold',
    padding: 5,
  },
  bodycontainer: {
    height: '80%',
    width: '100%',
    backgroundColor: '#f2f3f5',
    paddingHorizontal: 15
  },
  imagecontainer: {
    height:'16%'
  },
  hash:{
    width:25,
    height:25,
    borderRadius:50,
    backgroundColor:'white',
    position:'absolute',
    borderRadius:'50%',
    right:0,
    top:10,
    borderRadius:50,
    alignItems:'center',
    justifyContent:'center',
  },
  profileimage: {
    height: 100,
    width: 100,
    top: -30,
    borderWidth: 7,
    borderColor: '#f2f3f5',
    borderRadius: 90,
  },
  profiledetailscard:{
    height:'25%',
    backgroundColor:'white',
    borderRadius:10,
    padding:20,
  },
  profiledetails:{
    height:'50%',
    justifyContent:'center',
    gap:7,
  },
  editbtncontainer:{
    height:'50%',
    flexDirection:'row',
    alignItems:'flex-end'
  },
  editprofilebtn:{
    width:'100%',
    flexDirection:'row',
    justifyContent:'center',
    alignItems:'center',
    gap:4,
    borderWidth:1,
    borderColor:'#f2f3f5',
    borderRadius:10,
    padding:5,
  },
  name:{
    fontSize:24,
    fontWeight:'medium'
  },
  email:{
    color:'grey'
  },
  editText:{
    color:'grey'
  },
  professionalcard:{
    height:'13%',
    backgroundColor:'white',
    borderRadius:10,
    marginVertical:15,
    paddingVertical:10,
    paddingHorizontal:20,
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-between'
  },
  professionalcardtext:{
    color:'grey'
  },
  membercard:{
    height:'15%',
    backgroundColor:'white',
    borderRadius:10,
    paddingVertical:10,
    paddingHorizontal:20,
    justifyContent:'center',
    gap:10
  },
  membercardtitle:{
    fontSize:15,
    color:'grey',
    fontWeight:'light'
  },
  joineddate:{
    fontWeight:'medium',
    fontSize:18
  }
})