import React, {useEffect, useState} from 'react';
import messaging from '@react-native-firebase/messaging';
import {PermissionsAndroid} from 'react-native';
import {SafeAreaView, StyleSheet} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from './screens/home';
import AppointmentForm from './screens/appointmentForm';
import PushNotification from 'react-native-push-notification';
import UserHome from './screens/home/user';
import AdminHome from './screens/home/admin';
import ThankYou from './screens/thankyou';

function App() {
  const Stack = createNativeStackNavigator();
  const [fcmToken, setFcmToken] = useState(null);
  PushNotification.configure({
    onNotification: function (notification) {
      console.log('NOTIFICATION:', notification);
    },
    popInitialNotification: true,
    requestPermissions: Platform.OS === 'ios',
  });

  useEffect(() => {
    const requestUserPermission = async () => {
      const authStatus = await messaging().requestPermission();
      const enabled =
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL;

      if (enabled) {
        console.log('Authorization status:', authStatus);
      }
    };

    requestUserPermission();
  }, []);

  useEffect(() => {
    console.log('This is my FCM token : ', fcmToken);
  }, [fcmToken]);
  useEffect(() => {
    PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
    );
    checkFcm();
  }, []);

  const checkFcm = async () => {
    try {
      let fcm = await messaging().getToken();
      setFcmToken(fcm);
    } catch (error) {
      console.log('Failed to get FCM token : ', error);
    }
  };
  return (
    <SafeAreaView style={styles.main}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Home"
            component={Home}
            options={{
              headerTitle: '',
              headerShadowVisible: false,
            }}
          />
          <Stack.Screen
            name="user"
            component={UserHome}
            options={{
              headerTitle: '',
              headerShadowVisible: false,
            }}
          />
          <Stack.Screen
            name="admin"
            component={AdminHome}
            options={{
              headerTitle: '',
              headerShadowVisible: false,
            }}
          />
          <Stack.Screen
            options={{headerShown: false}}
            name="appointment"
            component={AppointmentForm}
          />
          <Stack.Screen
            options={{
              headerTitle: '',
              headerShadowVisible: false,
            }}
            name="thankyou"
            component={ThankYou}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
}

export default App;
const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: 'white',
  },
});
