import { useNavigation } from '@react-navigation/native';
// import axios from 'axios';
import React, { useState } from 'react';
import * as Yup from 'yup'
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ToastAndroid, Alert, ActivityIndicator } from 'react-native';
import { AntDesign, Entypo } from '@expo/vector-icons';
import axios from 'axios';

const UserSignup = () => {
  const [Name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [ispasswordvisible, setPasswordvisible] = useState(true)
  const [otpindicator, setOtpindicator] = useState(false)
  const [Errors, setErrors] = useState({
    Name: "",
    email: "",
    password: ""
  })
  const navigation = useNavigation();

  const validationSchema = Yup.object({
    Name: Yup.string().required("Name is requried"),
    email: Yup.string().email("Invalid email format").required("Email is required"),
    password: Yup.string().required("Password is required").min(6, "Password must be atleast 8 characters")
  })

  const handleSignup = async () => {
    try {
      await validationSchema.validate({ Name, email, password }, { abortEarly: false });
      setErrors({});
      setOtpindicator(true);
      const response = await axios.post('https://noteme-app.onrender.com/auth/register', { name: Name, email: email, password: password });
      if (response.data.status === false) {
        setOtpindicator(false);
        alert(response.data.message);
        return;
      }
      setOtpindicator(false);
      showToast(response.data.message);
      navigation.navigate('UserLogin', { email: response.data.email });
    } catch (error) {
      setOtpindicator(false);
      console.error(error.response.status)
      if(error.response.status==409){
        showToast(error.response.message)
      }
    } 
  };

  function showToast(e) {
    ToastAndroid.show(e, ToastAndroid.SHORT);
  }


  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign <Text style={{ color: '#5865f1' }}>up</Text></Text>

      <View style={styles.inputcontainer}>
        <TextInput
          style={styles.input}
          placeholder="Your Name"
          keyboardType="default"
          autoCapitalize="none"
          value={Name}
          onChangeText={(text) => setName(text)}
        />
        {Errors.Name && <Text style={{ color: 'red', fontSize: 12, textAlign: 'left' }}>{Errors.Name}</Text>}
      </View>
      <View style={styles.inputcontainer}>
        <TextInput
          style={styles.input}
          placeholder="Your Email"
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={(text) => setEmail(text)}
        />
        {Errors.email && <Text style={{ color: 'red', fontSize: 10 }}>{Errors.email}</Text>}
      </View>
      <View style={styles.inputcontainer}>
        <View style={[styles.input, { flexDirection: 'row', justifyContent: 'space-between' }]}>
          <TextInput
            style={styles.passwordinput}
            placeholder="Password"
            value={password}
            secureTextEntry={ispasswordvisible}
            onChangeText={(text) => setPassword(text)}
          />
          <TouchableOpacity onPress={() => setPasswordvisible(!ispasswordvisible)}>{ispasswordvisible ? <AntDesign name="eyeo" size={22} color="grey" /> : <Entypo name="eye-with-line" size={22} color="grey" />}</TouchableOpacity>
        </View>
        {Errors.password && <Text style={{ color: 'red', fontSize: 10 }}>{Errors.password}</Text>}
      </View>

      {otpindicator ?
        <TouchableOpacity style={styles.button}>
          <ActivityIndicator size={25} color={"white"} />
        </TouchableOpacity> :
        <TouchableOpacity style={styles.button} onPress={handleSignup}>
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>}

      <View style={{ flexDirection: 'row', paddingVertical: 20, gap: 10, }}>
        <Text>Not have an account?</Text>
        <TouchableOpacity
          onPress={() => navigation.navigate('UserLogin')}
        >
          <Text style={{ color: '#5865f1' }}>Login</Text>
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
    backgroundColor: '#ffff',
    gap: 15
  },
  title: {
    fontSize: 28,
    fontWeight: 'medium',
    marginBottom: 20,
  },
  inputcontainer: {
    width: '80%'
  },
  input: {
    width: '100%',
    height: 45,
    borderColor: '#D9D9D9',
    borderWidth: 1,
    borderRadius: 4,
    padding: 10,
  },
  passwordinput: {
    width: '85%',
  },
  button: {
    backgroundColor: '#5865f1',
    borderRadius: 4,
    padding: 13,
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
