// import {
//   Text,
//   StyleSheet,
//   View,
//   Image,
//   KeyboardAvoidingView,
//   Dimensions,
//   Platform,
//   ActivityIndicator,
//   PermissionsAndroid,
//   Button,
//   FlatList,
//   TouchableOpacity,
// } from "react-native";
// import React, { Component, useState } from "react";
// import { SvgIcon } from "../../Component/SvgIcons";
// import {
//   Const,
//   Images,
//   Loader,
//   Responsive,
//   Screen,
//   Utility,
// } from "../../Helper";
// // import { login } from "../OdooApi";
// import { performCrudOperation } from "../OdooApi";
// import { bindActionCreators } from "redux";
// import { connect } from "react-redux";
// import {
//   AppButton,
//   AppContainer,
//   AppHeader,
//   AppScrollview,
//   AppTextInput,
// } from "../../Component";
// import { useEffect } from "react";
// import styles from "./LiveLocationScreenStyle";
// import Odoo from "react-native-odoo-promise-based";
// import axios from "axios";
// import MapView, { Marker } from "react-native-maps";
// import MapViewDirections from "react-native-maps-directions";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import Geolocation from "@react-native-community/geolocation";
// // import Geolocation from "react-native-geolocation-service";

// import { PERMISSIONS, request } from "react-native-permissions";
// interface LiveLocationScreenProps {
//   navigation?: any;
//   text?: any;
//   commonActions?: any;
//   route?: any
// }
// var { width, height } = Dimensions.get("window");
// const loc_global: any = global;
// const LiveLocationScreen = (props: LiveLocationScreenProps) => {
//   const { navigation, text, commonActions, route } = props;
//   const attendanceData = route?.params?.attendanceData !== undefined ? route?.params?.attendanceData : ''
//   console.log("attendanceData::::", attendanceData)

//   const [email, setemail] = useState("");
//   const [locationData, setLocationData] = useState([]);
//   const [userAttendanceData, setUserAttendanceData] = useState([])
//   const [intervalId, setIntervalId] = useState(null);
//   const [userpassword, setuserpassword] = useState("");
//   const [eyshow, setEyeshow] = useState(true);
//   const [latitude, setLatitude] = React.useState<number>();
//   const [longitude, setLongitude] = React.useState<number>();
//   // console.log("skdjvb", email, password);
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   // const GOOGLE_MAP_KEY = "AIzaSyAgtv6SaUQGTLXtWrDahpJF44qXXWzCPro";
//   const GOOGLE_MAP_KEY = "AIzaSyANPmxhEU-HHIbkdLOD5EWA10MevG5m_6g";

//   useEffect(()=>{
//     if (attendanceData && attendanceData.length>0){
//       setUserAttendanceData(attendanceData)
//     }
//   },[])
//   // const screen = Dimensions.get("window");
//   // const ASPECT_RATIO = screen.width / screen.height;
//   // const LATITUDE_DELTA = 0.04;
//   // const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
//   // ****************Location statets&**************
//   // ****************Location statets&**************

//   // useEffect(() => {
//   //   requestPermissions();
//   // }, []);

//   // async function requestPermissions() {
//   //   var response = await request(PERMISSIONS?.ANDROID?.ACCESS_FINE_LOCATION);
//   //   if (response === "granted") {
//   //     getOneTimeLocation();
//   //   }
//   //   if (Platform.OS === "ios") {
//   //     var response = await request(PERMISSIONS?.IOS?.LOCATION_ALWAYS);
//   //     getOneTimeLocation();
//   //   } else if (Platform.OS === "android") {
//   //     var response = await request(PERMISSIONS?.ANDROID?.ACCESS_FINE_LOCATION);
//   //     if (response === "granted") {
//   //       getOneTimeLocation();
//   //     }
//   //   }
//   //   // if (!location) return <ActivityIndicator />;
//   // }

//   // const getOneTimeLocation = async () => {
//   //   // setLocationStatus('Getting Location ...');
//   //   await Geolocation.getCurrentPosition(
//   //     //Will give you the current location
//   //     (position) => {
//   //       // setLocationStatus('You are Here');
//   //       //getting the Longitude from the location json
//   //       const currentLongitude = position?.coords?.longitude;
//   //       //getting the Latitude from the location json
//   //       const currentLatitude = position?.coords?.latitude;

//   //       //Setting Longitude state
//   //       // reverseGeocode(currentLatitude, currentLongitude);

//   //       setLongitude(currentLongitude);
//   //       //Setting Longitude state
//   //       setLatitude(currentLatitude);
//   //       // handleRestaurantSearch(JSON.stringify(position.coords.latitude), JSON.stringify(position.coords.longitude))
//   //       console.log("show position", position?.coords);
//   //       // setFinalorigin({ latitude: currentLatitude, longitude: currentLongitude })
//   //     },
//   //     (error) => {
//   //       // setLocationStatus(error.message);
//   //     },
//   //     {
//   //       enableHighAccuracy: false,
//   //       timeout: 30000,
//   //       maximumAge: 1000,
//   //     }
//   //   );
//   // };

//   useEffect(() => {
//     requestPermissions();
//     startLocationUpdates();
//   }, []);

//   useEffect(() => {
//     const sendLocationDataTimer = setInterval(sendLocationData, 300000);
//     return () => {
//       // Clear the timer when the component unmounts
//       clearInterval(sendLocationDataTimer);
//     };
//   }, []);

//   // const getLocation = () => {
//   //   Geolocation.getCurrentPosition(
//   //     (position) => {
//   //       const currentLongitude = position.coords.longitude;
//   //       const currentLatitude = position.coords.latitude;
//   //       // Generate a timestamp
//   //       const timestamp = new Date().toISOString();
//   //       // Log the current location as numbers
//   //       // console.log(
//   //       //   "Timestamp:",
//   //       //   timestamp,
//   //       //   "Latitude:",
//   //       //   currentLatitude,
//   //       //   "Longitude:",
//   //       //   currentLongitude
//   //       // );

//   //       // Store the location data
//   //       setLocationData((prevData) => [
//   //         ...prevData,
//   //         {
//   //           latitude: currentLatitude,
//   //           longitude: currentLongitude,
//   //         },
//   //       ]);
//   //     },
//   //     (error) => {
//   //       // console.error("Location error:", error);
//   //     },
//   //     {
//   //       enableHighAccuracy: true,
//   //       timeout: 50000, // Reduce the timeout for quicker updates
//   //       maximumAge: 0,
//   //     }
//   //   );
//   // };

//   // async function requestPermissions() {
//   //   try {
//   //     const granted = await Geolocation.requestAuthorization(); // or 'always'
//   //     if (granted === "granted") {
//   //       startLocationUpdates();
//   //     }
//   //   } catch (error) {
//   //     console.error("Permission request error:", error);
//   //   }
//   // }

//   // const startLocationUpdates = () => {
//   //   // Clear any existing interval
//   //   if (intervalId) {
//   //     clearInterval(intervalId);
//   //   }

//   //   // Start a new interval to get location data every 5 seconds
//   //   const id = setInterval(getLocation, 5000);
//   //   setIntervalId(id);
//   // };

//   const stopLocationUpdates = () => {
//     // Clear the interval to stop location updates
//     if (intervalId) {
//       clearInterval(intervalId);
//       setIntervalId(null);
//     }
//   };

//   const sendLocationData = () => {
//     // console.log("locat?>>>>,.///..", locationData);
//     // Implement sending the collected location data after 5 minutes.
//     // This could involve sending the data to an API or any other storage mechanism.
//     // For demonstration purposes, this function is empty.
//     // You can implement the data transmission logic here.
//   };

//   return (
//     // <AppContainer>

//     <View style={{ flex: 1 }}>
//       <MapView
//         style={{ flex: 1, width: width, height: height }}
//         showsUserLocation={true}
//         showsMyLocationButton={false}
//         zoomEnabled={true}
//         initialRegion={{
//           latitude: 37.78825,
//           longitude: -122.40641,
//           latitudeDelta: 0.002,
//           longitudeDelta: 0.002,
//         }}
//       // region={{
//       //   latitude: 37.78825,
//       //   longitude: -122.4324,
//       //   latitudeDelta: 0.0922,
//       //   longitudeDelta: 0.0421,
//       // }}
//       >
//         {/* {
//         searchRegionArray.map((marker, index) => {
//           return (
//             <Marker
//               draggable
//               coordinate={{
//                 latitude: marker.coordinates?.latitude ?? region.latitude,
//                 longitude: marker.coordinates?.longitude ?? region.longitude,
//               }}
//               // onDragEnd={
//               //     (e) => {
//               //         let tempMapRegion = region;
//               //         tempMapRegion.latitude = e.nativeEvent.coordinate.latitude;
//               //         tempMapRegion.longitude = e.nativeEvent.coordinate.longitude
//               //         mapRef.current?.animateToRegion(tempMapRegion);
//               //     }

//               // }
//               key={index}
//               onPress={() => { Platform.OS === 'android' && onPressListings(index, marker) }}
//               style={{ flex: 1 }}
//               identifier={'index'}
//             >

//               <TouchableOpacity
//                 style={[styles.mapMarker, {
//                   backgroundColor: cardVisible && index === selectedListingIndex ? 'black': 'red',
//                 }]}
//                 onPress={e => onPressListings(index, marker)}
//               >
//                 <Text>1</Text>
//               </TouchableOpacity>


//             </Marker>
//           )
//         })
//       } */}
//       </MapView>
//       {/* <Button title="Start Location Updates" onPress={startLocationUpdates} />
//       <Button title="Stop Location Updates" onPress={stopLocationUpdates} />
//       <Button title="Send Location Data" onPress={sendLocationData} />
//       <View style={{ height: Responsive.heightPx(25) }}>
//         <FlatList
//           data={locationData}
//           keyExtractor={(item, index) =>
//             `${item.latitude}-${item.longitude}-${index}`
//           }
//           renderItem={({ item }) => (
//             <View>
//               <Text>
//                 Latitude: {item.latitude}, Longitude: {item.longitude}
//               </Text>
//               <Text>=================</Text>
//             </View>
//           )}
//         />
//       </View> */}
//     </View>

//     // </AppContainer>
//   );
// };

// function mapDispatchToProps(dispatch: any) {
//   return {
//     commonActions: bindActionCreators(Const.commonActions, dispatch),
//   };
// }

// export default connect(null, mapDispatchToProps)(LiveLocationScreen);


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
  TouchableOpacity,
} from "react-native";
import React, { Component, useState } from "react";
import { SvgIcon } from "../../Component/SvgIcons";
import {
  Color,
  Const,
  Images,
  Loader,
  Responsive,
  Screen,
  Utility,
} from "../../Helper";
// import { login } from "../OdooApi";
// import { performCrudOperation } from "../OdooApi";
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
import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";
import MapViewDirections from "react-native-maps-directions";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Geolocation from "@react-native-community/geolocation";
// import Geolocation from "react-native-geolocation-service";

import { PERMISSIONS, request } from "react-native-permissions";
interface LiveLocationScreenProps {
  navigation?: any;
  text?: any;
  commonActions?: any;
  route?: any
}
var { width, height } = Dimensions.get("window");
const loc_global: any = global;
const LiveLocationScreen = (props: LiveLocationScreenProps) => {
  const { navigation, text, commonActions, route } = props;
  const attendanceData = route?.params?.attendanceData !== undefined ? route?.params?.attendanceData : ''
  // console.log("attendanceData::::", attendanceData)

  const [email, setemail] = useState("");
  const [locationData, setLocationData] = useState([]);
  const [userAttendanceData, setUserAttendanceData] = useState([attendanceData])
  // console.log("userAttendanceData::::", userAttendanceData)
  const [intervalId, setIntervalId] = useState(null);
  const [userpassword, setuserpassword] = useState("");
  const [eyshow, setEyeshow] = useState(true);
  const [latitude, setLatitude] = React.useState<number>();
  const [longitude, setLongitude] = React.useState<number>();
  const [region, setRegion] = useState({
    latitude: 0,
    longitude: 0,
    latitudeDelta: 0.002,
    longitudeDelta: 0.002,
  })
  // console.log("latitude::", latitude)
  // console.log("skdjvb", email, password);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  // const GOOGLE_MAP_KEY = "AIzaSyAgtv6SaUQGTLXtWrDahpJF44qXXWzCPro";
  const GOOGLE_MAP_KEY = "AIzaSyANPmxhEU-HHIbkdLOD5EWA10MevG5m_6g";

  // useEffect(() => {
  //   if (attendanceData && attendanceData.length > 0) {
  //     setUserAttendanceData(attendanceData)
  //   }
  // }, [])
  const getOneTimeLocation = async () => {
    // console.log("getOneTimeLocation::")
    // Loader.isLoading(true);
    // setLocationStatus('Getting Location ...');
    Geolocation.getCurrentPosition(
      //Will give you the current location
      (position) => {
        // setLocationStatus('You are Here');
        //getting the Longitude from the location json
        // Loader.isLoading(false);
        const currentLongitude = position.coords.longitude;
        const currentLatitude = position.coords.latitude;


        //Setting Longitude state
        // reverseGeocode(currentLatitude, currentLongitude);
        setRegion({
          latitude: currentLatitude,
          longitude: currentLongitude,
          latitudeDelta: 0.002,
          longitudeDelta: 0.002,
        })
        setLongitude(currentLongitude);
        //Setting Longitude state
        setLatitude(currentLatitude);
        // handleRestaurantSearch(JSON.stringify(position.coords.latitude), JSON.stringify(position.coords.longitude))
        // console.log("show position", position?.coords);
        // setFinalorigin({ latitude: currentLatitude, longitude: currentLongitude })
      },
      (error) => {
        console.log("error:", error)
        // setLocationStatus(error.message);
      },
      {
        enableHighAccuracy: false,
        timeout: 30000,
        maximumAge: 1000,
      }
    );
  };
  async function requestPermissions() {
    var response = await request(PERMISSIONS?.ANDROID?.ACCESS_FINE_LOCATION);
    if (response === "granted") {
      getOneTimeLocation();
    }
    if (Platform.OS === "ios") {
      var response = await request(PERMISSIONS?.IOS?.LOCATION_ALWAYS);
      getOneTimeLocation();
    } else if (Platform.OS === "android") {
      var response = await request(PERMISSIONS?.ANDROID?.ACCESS_FINE_LOCATION);
      if (response === "granted") {
        getOneTimeLocation();
      }
    }
    if (!region) return <ActivityIndicator />;
  }

  useEffect(() => {
    requestPermissions();
  }, []);


  // const getLocation = () => {
  //     Geolocation.getCurrentPosition(
  //       (position) => {
  //         const currentLongitude = position.coords.longitude;
  //         const currentLatitude = position.coords.latitude;
  //         // Generate a timestamp
  //         // const timestamp = new Date().toISOString();
  //         // Store the location data
  //         setLocationData((prevData) => [
  //           ...prevData,
  //           {
  //             latitude: currentLatitude,
  //             longitude: currentLongitude,
  //           },
  //         ]);
  //       },
  //       (error) => {
  //         // console.error("Location error:", error);
  //       },
  //       {
  //         enableHighAccuracy: true,
  //         timeout: 50000, // Reduce the timeout for quicker updates
  //         maximumAge: 0,
  //       }
  //     );
  //   };

  return (

    <View style={style.container}>
      {
        latitude === undefined && longitude === undefined ?
          <View style={{
            justifyContent: 'center', alignItems: 'center', width: 70, height: 70, backgroundColor: 'white', zIndex: 1,
            borderRadius: 8
          }}>

            <ActivityIndicator color={Color.greenShade5A} size={'large'} />
          </View>
          :
          <MapView
            // provider={PROVIDER_GOOGLE} // remove if not using Google Maps
            style={style.map}
            initialRegion={{
              latitude: region.latitude,
              longitude: region.longitude,
              latitudeDelta: 0.0012,
              longitudeDelta: 0.0011,
            }}
          >

            {attendanceData?.map((marker, index) => {
              console.log("marker latitue::", parseFloat((marker.lat)))
              console.log("marker longitude::", parseFloat(marker.log))
              const latitudeNumber = parseFloat((marker.lat))
              const longitudeNumber = parseFloat((marker.log))
              const base64Icon = `data:image/png;base64,${marker.image}`
              try {
                return (
                  <Marker
                    key={index}
                    coordinate={{
                      latitude: !isNaN(latitudeNumber) ? latitudeNumber : region.latitude,
                      longitude: !isNaN(longitudeNumber) ? longitudeNumber : region.longitude,
                    }}
                    draggable
                  >
                    <View>
                      <Image
                        style={{
                          width: 25,
                          height: 25,
                          resizeMode: 'contain',
                          alignSelf: 'center'
                        }}
                        source={Images.Location}
                      />
                      <Image
                        style={{
                          width: 50,
                          height: 50,
                          resizeMode: 'contain',
                        }}
                        source={{ uri: base64Icon }}
                      />
                    </View>
                  </Marker>
                );
              } catch (error) {
                console.error('Error rendering marker:', error);
                return null;
              }
            })}


          </MapView>
      }
    </View>
  )

}
const style = StyleSheet.create({
  container: {
    // ...StyleSheet.absoluteFillObject,
    // height: 400,
    flex: 1,
    // width: 400,
    justifyContent: 'center',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});

function mapDispatchToProps(dispatch: any) {
  return {
    commonActions: bindActionCreators(Const.commonActions, dispatch),
  };
}

export default connect(null, mapDispatchToProps)(LiveLocationScreen);
