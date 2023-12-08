import {
  Text,
  StyleSheet,
  View,
  Image,
  KeyboardAvoidingView,
  Dimensions,
  Platform,
  ActivityIndicator,
  PermissionsAndroid,
  Button,
  FlatList,
} from "react-native";
import React, { Component, useState } from "react";
import { SvgIcon } from "../../Component/SvgIcons";
import {
  Const,
  Images,
  Loader,
  Responsive,
  Screen,
  Utility,
} from "../../Helper";
// import { login } from "../OdooApi";
import { performCrudOperation } from "../OdooApi";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import {
  AppButton,
  AppContainer,
  AppHeader,
  AppScrollview,
  AppTextInput,
} from "../../Component";
import { useEffect } from "react";
import styles from "./LiveLocationScreenStyle";
import Odoo from "react-native-odoo-promise-based";
import axios from "axios";
import MapView, { Marker } from "react-native-maps";
import MapViewDirections from "react-native-maps-directions";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Geolocation from "@react-native-community/geolocation";
// import Geolocation from "react-native-geolocation-service";

import { PERMISSIONS, request } from "react-native-permissions";
interface LiveLocationScreenProps {
  navigation?: any;
  text?: any;
  commonActions?: any;
}
var { width, height } = Dimensions.get("window");
const loc_global: any = global;
const LiveLocationScreen = (props: LiveLocationScreenProps) => {
  const { navigation, text, commonActions } = props;

  const [email, setemail] = useState("");
  const [locationData, setLocationData] = useState([]);
  const [intervalId, setIntervalId] = useState(null);
  const [userpassword, setuserpassword] = useState("");
  const [eyshow, setEyeshow] = useState(true);
  const [latitude, setLatitude] = React.useState<number>();
  const [longitude, setLongitude] = React.useState<number>();
  // console.log("skdjvb", email, password);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const GOOGLE_MAP_KEY = "AIzaSyAgtv6SaUQGTLXtWrDahpJF44qXXWzCPro";
  // const screen = Dimensions.get("window");
  // const ASPECT_RATIO = screen.width / screen.height;
  // const LATITUDE_DELTA = 0.04;
  // const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
  // ****************Location statets&**************
  // ****************Location statets&**************

  // useEffect(() => {
  //   requestPermissions();
  // }, []);

  // async function requestPermissions() {
  //   var response = await request(PERMISSIONS?.ANDROID?.ACCESS_FINE_LOCATION);
  //   if (response === "granted") {
  //     getOneTimeLocation();
  //   }
  //   if (Platform.OS === "ios") {
  //     var response = await request(PERMISSIONS?.IOS?.LOCATION_ALWAYS);
  //     getOneTimeLocation();
  //   } else if (Platform.OS === "android") {
  //     var response = await request(PERMISSIONS?.ANDROID?.ACCESS_FINE_LOCATION);
  //     if (response === "granted") {
  //       getOneTimeLocation();
  //     }
  //   }
  //   // if (!location) return <ActivityIndicator />;
  // }

  // const getOneTimeLocation = async () => {
  //   // setLocationStatus('Getting Location ...');
  //   await Geolocation.getCurrentPosition(
  //     //Will give you the current location
  //     (position) => {
  //       // setLocationStatus('You are Here');
  //       //getting the Longitude from the location json
  //       const currentLongitude = position?.coords?.longitude;
  //       //getting the Latitude from the location json
  //       const currentLatitude = position?.coords?.latitude;

  //       //Setting Longitude state
  //       // reverseGeocode(currentLatitude, currentLongitude);

  //       setLongitude(currentLongitude);
  //       //Setting Longitude state
  //       setLatitude(currentLatitude);
  //       // handleRestaurantSearch(JSON.stringify(position.coords.latitude), JSON.stringify(position.coords.longitude))
  //       console.log("show position", position?.coords);
  //       // setFinalorigin({ latitude: currentLatitude, longitude: currentLongitude })
  //     },
  //     (error) => {
  //       // setLocationStatus(error.message);
  //     },
  //     {
  //       enableHighAccuracy: false,
  //       timeout: 30000,
  //       maximumAge: 1000,
  //     }
  //   );
  // };

  useEffect(() => {
    requestPermissions();
    startLocationUpdates();
  }, []);

  useEffect(() => {
    const sendLocationDataTimer = setInterval(sendLocationData, 300000);
    return () => {
      // Clear the timer when the component unmounts
      clearInterval(sendLocationDataTimer);
    };
  }, []);

  const getLocation = () => {
    Geolocation.getCurrentPosition(
      (position) => {
        const currentLongitude = position.coords.longitude;
        const currentLatitude = position.coords.latitude;
        // Generate a timestamp
        const timestamp = new Date().toISOString();
        // Log the current location as numbers
        console.log(
          "Timestamp:",
          timestamp,
          "Latitude:",
          currentLatitude,
          "Longitude:",
          currentLongitude
        );

        // Store the location data
        setLocationData((prevData) => [
          ...prevData,
          {
            latitude: currentLatitude,
            longitude: currentLongitude,
          },
        ]);
      },
      (error) => {
        console.error("Location error:", error);
      },
      {
        enableHighAccuracy: true,
        timeout: 50000, // Reduce the timeout for quicker updates
        maximumAge: 0,
      }
    );
  };

  async function requestPermissions() {
    try {
      const granted = await Geolocation.requestAuthorization(); // or 'always'
      if (granted === "granted") {
        startLocationUpdates();
      }
    } catch (error) {
      console.error("Permission request error:", error);
    }
  }

  const startLocationUpdates = () => {
    // Clear any existing interval
    if (intervalId) {
      clearInterval(intervalId);
    }

    // Start a new interval to get location data every 5 seconds
    const id = setInterval(getLocation, 5000);
    setIntervalId(id);
  };

  const stopLocationUpdates = () => {
    // Clear the interval to stop location updates
    if (intervalId) {
      clearInterval(intervalId);
      setIntervalId(null);
    }
  };

  const sendLocationData = () => {
    console.log("locat?>>>>,.///..", locationData);
    // Implement sending the collected location data after 5 minutes.
    // This could involve sending the data to an API or any other storage mechanism.
    // For demonstration purposes, this function is empty.
    // You can implement the data transmission logic here.
  };

  return (
    // <AppContainer>

    <View style={{ flex: 1 }}>
      <MapView
        style={{ flex: 1, width: width, height: height }}
        showsUserLocation={true}
        showsMyLocationButton={false}
        zoomEnabled={true}
        initialRegion={{
          latitude: 37.78825,
          longitude: -122.40641,
          latitudeDelta: 0.002,
          longitudeDelta: 0.002,
        }}
        // region={{
        //   latitude: 37.78825,
        //   longitude: -122.4324,
        //   latitudeDelta: 0.0922,
        //   longitudeDelta: 0.0421,
        // }}
      />
      <Button title="Start Location Updates" onPress={startLocationUpdates} />
      <Button title="Stop Location Updates" onPress={stopLocationUpdates} />
      <Button title="Send Location Data" onPress={sendLocationData} />
      <View style={{ height: Responsive.heightPx(25) }}>
        <FlatList
          data={locationData}
          keyExtractor={(item, index) =>
            `${item.latitude}-${item.longitude}-${index}`
          }
          renderItem={({ item }) => (
            <View>
              <Text>
                Latitude: {item.latitude}, Longitude: {item.longitude}
              </Text>
              <Text>=================</Text>
            </View>
          )}
        />
      </View>
    </View>

    // </AppContainer>
  );
};

function mapDispatchToProps(dispatch: any) {
  return {
    commonActions: bindActionCreators(Const.commonActions, dispatch),
  };
}

export default connect(null, mapDispatchToProps)(LiveLocationScreen);
