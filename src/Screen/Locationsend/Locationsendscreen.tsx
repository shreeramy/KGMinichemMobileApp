import React, { useState } from "react";
import {
  Image,
  PermissionsAndroid,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import {
  Images,
  Loader,
  Responsive,
  Screen
} from "../../Helper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Geolocation from "@react-native-community/geolocation";
import ImagePicker from "react-native-image-crop-picker";
import RNFetchBlob from "rn-fetch-blob";

import { useEffect } from "react";
import {
  AppButton,
  AppContainer,
  AppScrollview,
  AppTextInput
} from "../../Component";
import { callOdooMethod } from "../OdooApi";
import styles from "./Locationsendscreenstyle";

interface LocationsendscreenProps {
  navigation?: any;
  text?: any;
  commonActions?: any;
  route?: any;
}
const Locationsendscreen = (props: LocationsendscreenProps) => {
  const { navigation, text, commonActions, route } = props;
  const [locationData, setLocationData] = useState([]);
  const [longitude, setLongitude] = useState("");
  const [latitude, setLatitude] = useState("");
  const [error, setError] = useState(null);
  const [imagepath, setIMagespath] = React.useState(null);
  const imageFilePath = imagepath?.path;
  const [somtext, setsomtext] = useState("");

  useEffect(() => {
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
      console.log("Image Path:", imagepath);
    });
  };

  const sentuserlocationdata = () => {
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
          setLongitude(currentLongitude);
          setLatitude(currentLatitude);
        },
        (error) => {
          setError(error.message);
        },
        { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
      );
    };
    getLocation();
    const locationInterval = setInterval(() => {
      getLocation();
    }, 3000);
    return () => clearInterval(locationInterval);
  }, []);

  useEffect(() => {
    const requestLocationPermission = async () => {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
        );

        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
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
    )
    const atendpassid = await AsyncStorage.getItem("attendanceId");
    Loader.isLoading(true);
    if (uid) {
      const methodName = "create_location";
      const model = "hr.attendance"; 
      const params = [1, locationData];
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
        ], {}
      );
      navigation.navigate(Screen.HomeScreen);
      if (createLocationResult) {
        Loader.isLoading(false);
        const customdata = createLocationResult;
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
                  justifyContent: "center",
                  alignItems: "center",
                  width: Responsive.widthPx(100),
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
                  value={somtext}
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
            onPress={() => sentuserlocationdata()}
          />
        </View>
      </AppScrollview>
    </AppContainer>
  );
};

export default Locationsendscreen;
