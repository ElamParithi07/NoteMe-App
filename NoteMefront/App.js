import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider } from 'react-redux';
import Home from './components/Home/Home';
import Profile from './components/Profile/Profile';
import EditNote from './components/EditNote.js/EditNote';
import UserLogin from './components/UserLoginSignup/UserLogin';
import UserSignup from './components/UserLoginSignup/UserSignup';
import Onboard from './components/UserLoginSignup/Onboard';
import UserNavigation from './components/UserNavigation.js/UserNavigation';
import Settingspage from './components/Settingspage/Settingspage';
import Multiselect from './components/Exceledit/Multiselect';
import MySheets from './components/Profile/MySheets';
import AuthScreen from './components/AuthScreen/AuthScreen';
import VerifyOtp from './components/UserLoginSignup/VerifyOtp';


const Stack = createStackNavigator();
export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar hidden={true}/>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="AuthScreen">
          <Stack.Screen name='AuthScreen' component={AuthScreen} options={{headerShown:false}}/>
          <Stack.Screen name='UserNavigation' component={UserNavigation} options={{headerShown: false}}/>
          <Stack.Screen name="UserLogin" component={UserLogin} options={{ headerShown: false }} />
          <Stack.Screen name="UserSignup" component={UserSignup} options={{ headerShown: false }} />
          <Stack.Screen name="Onboard" component={Onboard} options={{ headerShown: false }} />
          <Stack.Screen name="Profile" component={Profile} options={{ headerShown: false }} />
          <Stack.Screen name="EditNote" component={EditNote} options={{ headerShown: false }} />
          <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
          <Stack.Screen name="Settingspage" component={Settingspage} options={{ headerShown: false }} />
          <Stack.Screen name="Multiselect" component={Multiselect} options={{ headerShown: false }} />
          <Stack.Screen name="MySheets" component={MySheets} options={{ headerShown: false}} />
          <Stack.Screen name="verifyotp" component={VerifyOtp} options={{ headerShown: false}} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
