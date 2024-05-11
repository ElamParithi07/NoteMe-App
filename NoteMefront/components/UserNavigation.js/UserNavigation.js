import { BackHandler, StyleSheet, Text, ToastAndroid, View } from 'react-native'
import React, { Profiler, useEffect } from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../Home/Home';
import Exceledit from '../Exceledit/Exceledit';
import { AntDesign } from '@expo/vector-icons';
import Profile from '../Profile/Profile';
import Polls from '../Polls/Polls';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Tab = createBottomTabNavigator();

const UserNavigation = ({navigation}) => {


  useEffect(() => {
    const handleBackPress = async () => {
      try {
        const userData = await AsyncStorage.getItem('authToken');
        if (userData) {
          if (navigation.isFocused()) {
            BackHandler.exitApp(); // If on the home page, exit the app
            return true; // Prevent default back action
          } else {
            navigation.navigate("Home"); // If not on home page, navigate to home
            return true; // Prevent default back action
          }
        }
        else{
          showToast("Session Expired")
          navigation.navigate("Onboard")
        }
      } catch (error) {
        console.error('Error checking user login status:', error);
      }
      return false; // Allow the default back action
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      handleBackPress
    );

    return () => {
      backHandler.remove();
    };
  }, [navigation]); 

  function showToast(e) {
    ToastAndroid.show(e, ToastAndroid.SHORT);
}



  return (
    <Tab.Navigator
    screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
            size = 23
          if (route.name === "Home") {
            iconName = focused ? "slack-square" : "slack";
          } else if (route.name === "Exceledit") {
            iconName = focused ? "appstore1" : "appstore-o";
          }
          else if(route.name ==="Profile"){
            iconName = focused ? "smile-circle" : "meh";
          }
          else if(route.name ==="Polls"){
            iconName = focused? "piechart":"piechart";
          }
          return <AntDesign name={iconName} size={size} color={color} />;
        },
        tabBarLabelStyle: {
          fontSize: 12,
        },
        tabBarActiveTintColor: 'black',
        tabBarInactiveTintColor: "gray",
        tabBarShowLabel: true,
        tabBarStyle: {
          borderTopWidth: 0,
          borderTopColor: "gray",
          paddingBottom: 8,
          height: 60,
        },
      })}
    >
        <Tab.Screen name='Home' component={Home} options={{ tabBarLabel: "Home", headerShown: false }}/>
        {/* <Tab.Screen name='Polls' component={Polls} options={{ tabBarLabel: "Polls", headerShown: false }}/> */}
        <Tab.Screen name='Exceledit' component={Exceledit} options={{ tabBarLabel: "Sheets", headerShown: false }}/>
        <Tab.Screen name='Profile' component={Profile} options={{ tabBarLabel: "You", headerShown: false }}/>
    </Tab.Navigator>
  )
}

export default UserNavigation

const styles = StyleSheet.create({})