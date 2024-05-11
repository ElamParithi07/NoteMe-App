import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import { AntDesign } from '@expo/vector-icons';


const Onboard = () => {
  const navigation = useNavigation();
  const navigateToNextScreen = () => {
    // Implement your logic to navigate to the main app screen
    navigation.navigate('UserLogin');
  };

  return (
    <View style={styles.container}>
      <View style={styles.imagecontainer}>
        <Image 
          source={{
          uri:'https://images-platform.99static.com//fPMlaxHf9DZuDLgRunsu4eAknPw=/102x0:1099x997/fit-in/500x500/projects-files/84/8452/845209/aff8386a-a9f3-4b9f-98cc-5ebc7e60d212.jpg'
          }}
          resizeMode='cover'
          style={styles.onboardimage}
        />
      </View>
      <View style={styles.onboardcontainer}>
        <View style={styles.onboardtext}>
          <Text style={styles.text1}>Stay <Text style={{color:'#5865f1'}}>Organized</Text></Text>
          <Text style={styles.text}>Always In Your Pocket</Text>
          <Text><Text style={{color:'#5865f1'}}>Get</Text> Started</Text>
        </View>
        <View style={styles.onboardctc}>
          <TouchableOpacity style={styles.onboardbutton} onPress={()=>navigateToNextScreen()}>
            <AntDesign name="arrowright" size={24} color="white" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};



const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imagecontainer: {
    height: '60%',
    width: '100%',
  },
  onboardcontainer: {
    width: '100%',
    height: '40%',
    backgroundColor:'white'
  },
  onboardtext: {
    height: '50%',
    alignItems:'center',
    justifyContent:'center',
    gap:10
  },
  onboardctc: {
    height: '50%',
    alignItems: 'flex-end',
    justifyContent:'center',
    paddingHorizontal:30
  },
  onboardimage:{
    height:'100%',
    width:'100%',
  },
  text1: {
    fontSize: 35,
    fontWeight:'medium'
  },
  text: {
    fontSize: 23,
    fontWeight:'medium',
  },
  onboardbutton:{
    backgroundColor:'#5865f1',
    padding:20,
    borderRadius:50
  }
});

export default Onboard;
