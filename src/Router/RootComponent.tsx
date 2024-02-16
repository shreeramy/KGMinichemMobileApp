import React, { useEffect, useState } from 'react'
import { View, StyleSheet, PermissionsAndroid , Alert} from 'react-native'
import { Loader, Storage } from '../Helper'
import Routes from './Routes'
import FlashMessage from 'react-native-flash-message'
import AsyncStorage from "@react-native-async-storage/async-storage";
// import messaging from '@react-native-firebase/messaging';

const RootComponent = () => {
  const [isLogin, setIsLogin] = useState<boolean | null>(null);

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

  // async function requestUserPermission() {
  //   const authStatus = await messaging().requestPermission();
  //   const enabled =
  //     authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
  //     authStatus === messaging.AuthorizationStatus.PROVISIONAL;
  //     PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS);
  //   if (enabled) {
  //     console.log('Authorization status:', authStatus);
  //   }
  // }

  // useEffect(() => {
  //   const unsubscribe = messaging().onMessage(async remoteMessage => {
  //     Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
  //   });

  //   return unsubscribe;
  // }, []);

  // async function registerForPushNotifications() {
  //   const token = await messaging().getToken();
  //   console.log('Push notification token:', token);
  // }  

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
