// Import the push notification library
import PushNotification from "react-native-push-notification";

const displayNotification = (title, message) => {
  try {
    PushNotification.createChannel(
      {
        channelId: "channel-id",
        channelName: "My channel",
        channelDescription: "A channel to categorise your notifications",
        playSound: false,
        soundName: "default",
        importance: 4,
        vibrate: true,
      },
      (created) => console.log(`createChannel returned '${created}'`)
    );
    PushNotification.localNotification({
      title: title,
      message: message,
      channelId: "channel-id",
      vibrate: true,
    });
    console.log("Notification displayed")
  } catch (error) {
    console.error("Notification not working", error)
  }
  
};

export default displayNotification;
