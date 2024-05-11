import { useFocusEffect, useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ToastAndroid, Alert, ActivityIndicator } from 'react-native';
import * as Yup from 'yup'
import { AntDesign, Entypo } from '@expo/vector-icons';
import axios from 'axios';

const UserLogin = ({ route }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [otpindicator, setOtpindicator] = useState(false)
  const [Errors, setErrors] = useState({
    email: "",
    password: ""
  })
  const navigation = useNavigation();
  const [ispasswordvisible, setPasswordvisible] = useState(true)

  const handleLogin = async () => {
    try {
      await validationSchema.validate({ email }, { abortEarly: false });
      setErrors({});
      setOtpindicator(true);
      const response = await axios.post('https://noteme-app.onrender.com/auth/sendotp', { email: email });
      if (response.data.status === false) {
        setOtpindicator(false);
        alert(response.data.message);
        return;
      }
      setOtpindicator(false);
      showToast(response.data.message);
      navigation.navigate('verifyotp', { email: email });
    } catch (error) {
      setOtpindicator(false);
      if (error.response) {
        // The request was made and the server responded with a status code
        console.error('Response status:', error.response.status);
        if (error.response.status === 404) {
          showToast("User not found!");
        } else {
          // Handle other status codes if needed
          alert("An error occurred. Please try again later.");
        }
      } else if (error.request) {
        // The request was made but no response was received
        console.error('No response received:', error.request);
        alert("No response received from server. Please try again later.");
      } else {
        // Something happened in setting up the request that triggered an error
        console.error('Request setup error:', error.message);
        alert("An error occurred. Please check your network connection and try again.");
      }
      // Handle validation errors
      const newErrors = {};
      if (error.inner) {
        error.inner.forEach((err) => {
          newErrors[err.path] = err.message;
        });
      }
      setErrors(newErrors);
    }
  };
  

  useEffect(() => {
    if (route.params) {
      setEmail(route.params.email);
    }
  }, [route.params])

  function showToast(e) {
    ToastAndroid.show(e, ToastAndroid.SHORT);
  }

  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email format").required("Email is required"),
    // password: Yup.string().required("Password is required").min(6, "Password must be atleast 8 characters")
  })

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Log<Text style={{ color: '#5865f1' }}>in</Text></Text>

      <View style={styles.inputcontainer}>
        <TextInput
          style={styles.input}
          placeholder="Email"
          onChangeText={(text) => setEmail(text)}
          value={email}
        />
        {Errors.email && <Text style={{ color: 'red', fontSize: 10 }}>{Errors.email}</Text>}
      </View>

      {/* <View style={styles.inputcontainer}>
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
      </View> */}

      {otpindicator ?
        <View style={styles.button}>
          <ActivityIndicator size={25} color={"white"} />
        </View> :
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Send OTP</Text>
        </TouchableOpacity>}

      <View style={{ flexDirection: 'row', paddingVertical: 20, gap: 10, }}>
        <Text>Not have an account?</Text>
        <TouchableOpacity
          onPress={() => navigation.navigate('UserSignup')}
        >
          <Text style={{ color: '#5865f1' }}>Signup</Text>
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
    gap: 16
  },
  title: {
    fontSize: 28,
    fontWeight: 'medium',
    marginBottom: 16,
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
