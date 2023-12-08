import {
  Text,
  StyleSheet,
  View,
  Image,
  ImageBackground,
  Alert,
  FlatList,
  TouchableOpacity,
  PermissionsAndroid,
} from "react-native";
import React, { Component, useRef, useState } from "react";
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
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
// import { launchImageLibrary } from "react-native-image-picker";
import { launchImageLibrary } from "react-native-image-picker";
import ImagePicker from "react-native-image-crop-picker";
import BottomSheet from "react-native-bottomsheet";
import CountryPicker from "react-native-country-picker-modal";
import RBSheet from "react-native-raw-bottom-sheet";
import RNFetchBlob from "rn-fetch-blob"; // Import RNFetchBlob for handling file operations
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ApiEndPoints } from "../../NetworkCall";
import Geolocation from "@react-native-community/geolocation";
// import Geolocation from "react-native-geolocation-service";

import {
  AppButton,
  AppContainer,
  AppHeader,
  AppScrollview,
  AppTextInput,
} from "../../Component";
import { useEffect } from "react";
import styles from "./Locationsendscreenstyle";
import { callOdooMethod } from "../OdooApi";

interface LocationsendscreenProps {
  navigation?: any;
  text?: any;
  commonActions?: any;
  route?: any;
}
var userid = "";
const Locationsendscreen = (props: LocationsendscreenProps) => {
  const { navigation, text, commonActions, route } = props;
  const [locationData, setLocationData] = useState([]);
  const [longitude, setLongitude] = useState("");
  const [latitude, setLatitude] = useState("");
  const [error, setError] = useState(null);
  const [imagepath, setIMagespath] = React.useState(null);
  const [baseimg, setbaseimg] = useState();
  const [value, setValue] = useState(null);
  const [customerdata, setcustomerdata] = useState([]);
  const imageFilePath = imagepath?.path;
  const [somtext, setsomtext] = useState("");
  // const onPickImage = () => {
  //   BottomSheet.showBottomSheetWithOptions(
  //     {
  //       options: ["Open Camera", "Cancel"],
  //       cancelButtonIndex: 3,
  //     },
  //     (value) => {
  //       if (value === 0) {
  //         ImagePicker.openCamera({
  //           mediaType: "photo",
  //           width: 300,
  //           height: 400,
  //           cropping: true,
  //         }).then((imagepath) => {
  //           setIMagespath(imagepath);
  //         });
  //       } else if (value === 1) {
  //         // launchImageLibrary(
  //         //   {
  //         //     mediaType: "photo",
  //         //     includeBase64: false,
  //         //   },
  //         (response) => {
  //           if (response) {
  //             if (response.didCancel) {
  //               // User canceled the image selection
  //             } else {
  //               const imagedata = response.assets[0];
  //               setIMagespath({
  //                 path: imagedata?.uri,
  //                 ...imagedata,
  //               });
  //               // Imageuploade(imagedata);
  //             }
  //           }
  //         };
  //         // );
  //       }
  //     }
  //   );
  // };

  React.useEffect(() => {
    onPickImage();
    const backScreen = navigation.addListener("focus", () => {
      onPickImage();
    });
    return backScreen;
  }, []);

  const onPickImage = () => {
    ImagePicker.openCamera({
      mediaType: "photo",
      width: 300,
      height: 400,
      cropping: true,
    }).then((imagepath) => {
      setIMagespath(imagepath);
      // Handle the image path
      // sentuserlocationdata();
      console.log("Image Path:", imagepath);
    });
  };

  const sentuserlocationdata = () => {
    // if (!imagepath) {
    //   Alert.alert("KG-Minichem", "Please take picture");
    //   return;
    // }
    Loader.isLoading(true);
    setTimeout(() => {
      Loader.isLoading(false);
      sendlatlong();
    }, 10000);
  };

  useEffect(() => {
    const getLocation = () => {
      Geolocation.getCurrentPosition(
        (position) => {
          const currentLongitude = position.coords.longitude;
          const currentLatitude = position.coords.latitude;
          console.log(currentLongitude, currentLatitude);
          setLongitude(currentLongitude);
          setLatitude(currentLatitude);
        },
        (error) => {
          setError(error.message);
        },
        { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
      );
    };

    // Get location initially
    getLocation();

    // Set up an interval to get location every 3 seconds
    const locationInterval = setInterval(() => {
      getLocation();
    }, 3000);

    // Clean up the interval when the component unmounts
    return () => clearInterval(locationInterval);
  }, []); // The empty dependency array ensures that the effect runs only once

  useEffect(() => {
    const requestLocationPermission = async () => {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
        );

        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          // getCurrentLocation();
          getLocation();
        } else {
          setError("Location permission denied");
        }
      } catch (error) {
        console.error("Error requesting location permission:", error);
      }
    };

    requestLocationPermission();
  }, []);

  const sendlatlong = async () => {
    const uid = await AsyncStorage.getItem("userId");
    const imageResponse = await RNFetchBlob.fs.readFile(
      imageFilePath,
      "base64"
    );
    const atendpassid = await AsyncStorage.getItem("attendata");
    Loader.isLoading(true);
    if (uid) {
      const methodName = "create_location";
      const model = "hr.attendance"; // Replace with the desired model name
      const params = [1, locationData];
      // const responseData = await callOdooMethod(uid, model, methodName, params);
      const createLocationResult = await callOdooMethod(
        uid,
        "hr.attendance",
        "create_location",
        [
          1,
          [
            {
              name: somtext,
              lat: latitude,
              log: longitude,
              user_id: uid,
              attendance_id: atendpassid,
              image: imageResponse,
            },
          ],
        ]
      );
      console.log(">>>>>>>", createLocationResult);
      console.log("uselocationData.....", locationData);
      navigation.navigate(Screen.HomeScreen);
      if (createLocationResult) {
        Loader.isLoading(false);
        const customdata = createLocationResult;
        console.log("customdata.../...", customdata);
        // console.log("create salallorder_Suucess:", createLocationResult);
      } else {
        Loader.isLoading(false);
        console.error("create failed:", createLocationResult.error);
        return null;
      }
    }

    return null;
  };

  return (
    <AppContainer>
      <AppScrollview>
        <View style={styles.container}>
          <View style={styles.topcontener}>
            <View style={{ justifyContent: "center" }}>
              <View
                style={{
                  // height: Responsive.heightPx(9),
                  justifyContent: "center",
                  alignItems: "center",
                  width: Responsive.widthPx(100),
                  // backgroundColor: "red",
                }}
              >
                <Image
                  resizeMode="contain"
                  style={{
                    height: Responsive.heightPx(70),
                    width: Responsive.widthPx(98),
                  }}
                  source={imagepath ? { uri: imagepath?.path } : Images.noimg}
                />
                <TouchableOpacity
                  onPress={() => {
                    onPickImage();
                  }}
                >
                  <View
                    style={{
                      height: Responsive.heightPx(9),
                      justifyContent: "center",
                      alignItems: "center",
                      width: Responsive.widthPx(100),
                      // backgroundColor: "red",
                    }}
                  >
                    <Image
                      style={{
                        height: Responsive.heightPx(9),
                        justifyContent: "center",
                        alignItems: "center",
                        width: Responsive.widthPx(22),
                      }}
                      resizeMode="contain"
                      source={Images.camera}
                    />
                  </View>
                </TouchableOpacity>
              </View>
              <View style={styles.textinputstyle}>
                <Text style={styles.labeltext}>Type here</Text>
                <AppTextInput
                  // userimg={true}
                  value={somtext}
                  // keyboardType={"defalt"}
                  onChangeText={(somtext: any) => {
                    setsomtext(somtext);
                  }}
                  placeHolder={"Send location name"}
                />
              </View>
            </View>
          </View>

          <AppButton
            label={"Send location"}
            // containerStyle={styles.btnsyle}
            onPress={() => sentuserlocationdata()}
            // onPress={() => sendlatlong()}
          />
        </View>
      </AppScrollview>
    </AppContainer>
  );
};

export default Locationsendscreen;
