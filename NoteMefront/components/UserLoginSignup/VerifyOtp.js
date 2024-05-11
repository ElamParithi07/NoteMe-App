import { ActivityIndicator, StyleSheet, Text, ToastAndroid, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { TextInput } from 'react-native-gesture-handler';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const VerifyOtp = ({ route }) => {
    const navigation = useNavigation();
    const [email, setEmail] = useState("")
    const [otp, setOtp] = useState("")
    const [otpindicator, setOtpindicator] = useState(false)

    useEffect(() => {
        if (route.params) {
            setEmail(route.params.email)
        }
    }, [route.params])

    const handleVerify = async () => {
        if (!otp) {
            showToast("Enter OTP")
            return;
        }
        if (otp.length < 6) {
            showToast("OTP must be 6 digits")
            return;
        }
        try {
            setOtpindicator(true)
            const response = await axios.post('https://noteme-app.onrender.com/auth/verifyotp', { email: email, otp: otp });
            if (response.data.status == false) {
                showToast(response.data.message)
                setOtpindicator(false)
                return;
            }
            showToast(response.data.message)
            await AsyncStorage.setItem('authToken', response.data.authtoken);
            navigation.navigate('UserNavigation')
        }
        catch (error) {
            setOtpindicator(false);
            if (error.response) {
                // The request was made and the server responded with a status code
                console.error('Response status:', error.response.status);
                console.error(error.response.message)
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
        }
    }


    function showToast(e) {
        ToastAndroid.show(e, ToastAndroid.SHORT);
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Verify OTP</Text>
            <TextInput
                style={styles.otpinput}
                placeholder="Enter 6 digit OTP"
                value={otp}
                onChangeText={(text) => setOtp(text)}
            />
            {otpindicator ?
                <View style={styles.button}>
                    <ActivityIndicator size={25} color={"white"} />
                </View> :
                <TouchableOpacity style={styles.button} onPress={handleVerify}>
                    <Text style={styles.buttonText}>Verify OTP</Text>
                </TouchableOpacity>
            }
        </View>
    )
}

export default VerifyOtp

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        gap: 16
    },
    title: {
        fontSize: 28,
        fontWeight: 'medium',
    },
    otpinput: {
        width: '80%',
        height: 45,
        borderColor: '#D9D9D9',
        borderWidth: 1,
        borderRadius: 4,
        padding: 10,
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
})