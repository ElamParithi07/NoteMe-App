// AuthScreen.js
import React, { useEffect } from 'react';
import { ActivityIndicator, StyleSheet, View,Text } from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

const AuthScreen = () => {
  const navigation = useNavigation();
  
  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const userData = await AsyncStorage.getItem('userdata');
        if (userData) {
          // User is logged in, navigate to UserNavigation component
          navigation.navigate('UserNavigation');
        } else {
          // User is not logged in, navigate to OnboardingPage component
          navigation.navigate('Onboard');
        }
      } catch (error) {
        console.error('Error checking user login status:', error);
        // If there is an error, navigate to the OnboardingPage component as a fallback
        navigation.navigate('Home');
      }
    };

    checkLoginStatus();
  }, []);

  return (
    <View style={styles.container}>
        <Text style={{fontSize:40,fontWeight:'semibold'}}>Note<Text style={{color:'#5865f1'}}>Me</Text></Text>
    </View>
  );
};

export default AuthScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
