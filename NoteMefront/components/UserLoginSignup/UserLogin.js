import { useFocusEffect,useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet ,ToastAndroid} from 'react-native';

const UserLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation=useNavigation();

  const handleLogin = async() => {
    navigation.navigate('Home');
    // if(!email || !password){
    //   showToast("Complete  all fields");
    //   return;
    // }
    // try{
    //   let formData={
    //     email: email,
    //     password:password
    //   }
    //   const response = await axios.post('https://testappback.onrender.com/user/login',formData);
    //   const { status, data } = response.data;
    //   if(status===true){
    //     showToast('Login Successfull!');
    //     try {
    //       await AsyncStorage.setItem('userdata', JSON.stringify(data));
    //       console.log("Data stored successfully:", data);
    //     } catch (error) {
    //       console.error("Error storing data:", error);
    //     }
    //     navigation.navigate('UserNavigation');
    //   }
    //   else{
    //     showToast(response.message)
    //   }
    // }
    // catch(e){
    //   showToast("Error :"+e);
    //   console.log("Error :"+e.response.data);
    // }
  };
  function showToast(e){
    ToastAndroid.show(e,ToastAndroid.SHORT);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        onChangeText={(text) => setEmail(text)}
        value={email}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        onChangeText={(text) => setPassword(text)}
        value={password}
      />
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
      <View style={{flexDirection:'row',paddingVertical:20,gap:10,}}>
        <Text>Not have an account?</Text>
        <TouchableOpacity
          onPress={()=>navigation.navigate('UserSignup')}
        >
          <Text style={{color:'#3498db'}}>Signup</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  input: {
    width: '80%',
    height: 40,
    borderColor: '#D9D9D9',
    borderWidth: 1,
    borderRadius: 4,
    marginVertical: 10,
    padding: 10,
  },
  button: {
    backgroundColor: '#3498db',
    borderRadius: 4,
    padding: 10,
    width: '80%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
});

export default UserLogin;
