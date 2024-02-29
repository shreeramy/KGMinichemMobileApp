import React, { useEffect, useState } from 'react'
import { View, StyleSheet , Platform } from 'react-native'
import { Loader } from '../Helper'
import Routes from './Routes'
import FlashMessage from 'react-native-flash-message'
import AsyncStorage from "@react-native-async-storage/async-storage";
import messaging from '@react-native-firebase/messaging';
import firebase from '@react-native-firebase/app';
import PushNotification from 'react-native-push-notification';
import * as OdooApi from "../Screen/OdooApi";
import sendPushNotification from '../Component/SendPushNotification'

const RootComponent = () => {
  const [isLogin, setIsLogin] = useState<boolean | null>(null);
  const [customerdata, setcustomerdata] = useState([]);

  useEffect(() => {
    const checkSession = async () => {
      try {
        Loader.isLoading(true);
        const response = await AsyncStorage.getItem("userId");
        console.log("response", response)
        if (response) {
          setIsLogin(true);
        } else {
          setIsLogin(false);
        }
      } catch (error) {
        console.error("Error checking user session:", error);
      } finally {
        Loader.isLoading(false);
      }
    };
    checkSession();
    
  }, []);

  const getFCMToken = async () => {
    const token = await messaging().getToken();
    
    
    console.log('FCM token:', token);
    
  };

  const getFCMTokenRefresh = () => {
    messaging().onTokenRefresh((fcmToken) => {
      console.log('FCM Token refreshed:', fcmToken);
      // Send the refreshed token to your server
    });
  };
  

  const firebaseConfig = {
    apiKey: 'AAAA1TGugZk:APA91bF-8eLI3iM7Lr9vfoXz6IqoxG7X2rOur5GyVrPakVj7qOlC36iiFVp7maAHXXRB_ulE_ViopCatsIjcSinn17UmiJzKdFrocXP1ex0WW-yGnzgjhsz38ik7Iijlc-m0mfPhSd0c',
    authDomain: 'kgminichem.firebaseapp.com',
    projectId: 'kgminichem',
    storageBucket: 'kgminichem.appspot.com',
    messagingSenderId: '915661554073',
    appId: '1:915661554073:android:7e30c6906462072411d308',
  };

  useEffect(() => {
    firebase.initializeApp(firebaseConfig)
    getFCMToken();
    getFCMTokenRefresh();
    sendPushNotification();
  }, []);

  // useEffect(() => {
  //   // Initialize PushNotification
  //   PushNotification.configure({
  //     onRegister: function(token) {
  //       console.log('TOKEN:', token);
  //     },
  
  //     // (required) Called when a remote or local notification is opened or received
  //     onNotification: function(notification) {
  //       console.log('NOTIFICATION:', notification);
  //       // displayNotification(notification.message, notification.message)
  //     },
  
  //     permissions: {
  //       alert: true,
  //       badge: true,
  //       sound: true,
  //     },
  
  //     // Should the initial notification be popped automatically
  //     // default: true
  //     popInitialNotification: true,
  
  //     // (optional) default: true
  //     requestPermissions: Platform.OS === 'ios',
  //   });
  
  //   return () => {
  //     // Cleanup
  //     PushNotification.unregister();
  //   };
  // }, []);  

  return (
    <View style={styles.container}>
      {isLogin !== null && <Routes data={isLogin} />}
      <FlashMessage position="top" />
    </View>
  )
}

export default RootComponent

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
})
