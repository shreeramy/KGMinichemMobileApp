import {
  StyleSheet,
  View,
  Image,
  Dimensions,
  Platform,
  ActivityIndicator,
} from "react-native";
import React, { useState } from "react";
import {
  Color,
  Const,
  Images,
} from "../../Helper";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { useEffect } from "react";
import MapView, { Marker } from "react-native-maps";
import Geolocation from "@react-native-community/geolocation";
import { PERMISSIONS, request } from "react-native-permissions";
interface LiveLocationScreenProps {
  navigation?: any;
  text?: any;
  commonActions?: any;
  route?: any
}
const loc_global: any = global;
const LiveLocationScreen = (props: LiveLocationScreenProps) => {
  const { navigation, text, commonActions, route } = props;
  const attendanceData = route?.params?.attendanceData !== undefined ? route?.params?.attendanceData : ''
  const [latitude, setLatitude] = React.useState<number>();
  const [longitude, setLongitude] = React.useState<number>();
  const [region, setRegion] = useState({
    latitude: 0,
    longitude: 0,
    latitudeDelta: 0.002,
    longitudeDelta: 0.002,
  })
  const getOneTimeLocation = async () => {
    Geolocation.getCurrentPosition(
      (position) => {
        const currentLongitude = position.coords.longitude;
        const currentLatitude = position.coords.latitude;
        setRegion({
          latitude: currentLatitude,
          longitude: currentLongitude,
          latitudeDelta: 0.002,
          longitudeDelta: 0.002,
        })
        setLongitude(currentLongitude);
        setLatitude(currentLatitude);
      },
      (error) => {
        console.log("error:", error)
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
    flex: 1,
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
