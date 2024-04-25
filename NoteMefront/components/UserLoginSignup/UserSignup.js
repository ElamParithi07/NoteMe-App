import { useNavigation } from '@react-navigation/native';
// import axios from 'axios';
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ToastAndroid } from 'react-native';

const UserSignup = () => {
  const [username,setUsername]= useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation= useNavigation();

  const handleSignup = async() => {
    navigation.navigate('UserLogin');
    // if(!username || !email || !password){
    //   showToast("Complete  all fields");
    //   return;
    // }
    // try{
    //   let formData={
    //     username: username,
    //     email: email,
    //     password:password
    //   }
    //   const response = await axios.post('https://testappback.onrender.com/user/createuser',formData);
    //   if(response.data.status===true){
    //     showToast('Account Created!');
    //     console.log(response.data.data);
    //     navigation.navigate('UserLogin');
    //   }
    // }
    // catch(e){
    //   showToast("User Already Exists!");
    //   console.log(e);
    // }
  };

  function showToast(e){
    ToastAndroid.show(e,ToastAndroid.SHORT);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign Up</Text>

      <TextInput
        style={styles.input}
        placeholder="Username"
        keyboardType="default"
        autoCapitalize="none"
        value={username}
        onChangeText={(text) => setUsername(text)}
      />

      <TextInput
        style={styles.input}
        placeholder="Email"
        keyboardType="email-address"
        autoCapitalize="none"
        value={email}
        onChangeText={(text) => setEmail(text)}
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={(text) => setPassword(text)}
      />

      <TouchableOpacity style={styles.button} onPress={handleSignup}>
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>
      <View style={{flexDirection:'row',paddingVertical:20,gap:10,}}>
        <Text>Not have an account?</Text>
        <TouchableOpacity
          onPress={()=>navigation.navigate('UserLogin')}
        >
          <Text style={{color:'#3498db'}}>Login</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

// Styles using StyleSheet
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
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

// Export the SignupPage component
export default UserSignup;
