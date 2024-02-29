import messaging from '@react-native-firebase/messaging';
import {PermissionsAndroid} from 'react-native';
import displayNotification from './displayNotification';

const sendPushNotification = async (deviceToken, title, body) => {
  try {
    requestUserPermission();
    messaging().onMessage(async remoteMessage => {
      console.log('Message received!', remoteMessage);
      displayNotification(remoteMessage.notification.title, remoteMessage.notification.body)
    });
    
    // messaging().onNotification(notification => {
    //   console.log('Notification received!', notification);
    //   displayNotification(remoteMessage.notification.title, remoteMessage.notification.body)
    // });
    
    // messaging().onNotificationOpened(notificationOpen => {
    //   console.log('Notification opened!', notificationOpen);
    //   displayNotification(remoteMessage.notification.title, remoteMessage.notification.body)
    // });

    // messaging().setBackgroundMessageHandler(async remoteMessage => {
    //   console.log('Message received from background!', remoteMessage);
    //   displayNotification(remoteMessage.notification.title, remoteMessage.notification.body)
    // });
  } catch (error) {
    console.log('Error sending push notification:', error);
  }
};



async function requestUserPermission() {
  PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS);
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  if (enabled) {
    console.log('Authorization status:', authStatus);
  }

}

export default sendPushNotification;
