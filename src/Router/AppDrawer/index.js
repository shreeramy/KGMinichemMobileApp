import AsyncStorage from "@react-native-async-storage/async-storage";
import * as React from "react";
import {
  FlatList,
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import {
  Color,
  Fonts,
  Images,
  Responsive,
  Screen,
  Utility
} from "../../Helper";
import { ApiEndPoints, ApiServices } from "../../NetworkCall";
import messaging from '@react-native-firebase/messaging';

const drawerList = [
  {
    key: Screen.CustomerScreen,
    name: "Customer",
    headingicon: Images.DrawerCustomer,
  },
  {
    key: Screen.ProductCatalog,
    name: "Product catalog",
    headingicon: Images.Productcatalog,
  },
  {
    key: Screen.AttendanceHistoryScreen,
    name: "Attendance",
    headingicon: Images.Attendance,
  },
  {
    key: Screen.ShowOrderScreen,
    name: "Order",
    headingicon: Images.Order,
  },
  {
    key: Screen.NotificationScreen,
    name: "Order status & notification",
    headingicon: Images.Orderstatus,
  },
];
const AppDrawer = ({ ...props }) => {
  const [profiledata, setProfiledata] = React.useState("");
  const [customerdata, setcustomerdata] = React.useState([]);

  async function searchRead1() {
    const uid = await AsyncStorage.getItem("userId");
    const odooPassword = await AsyncStorage.getItem("@odopassword");

    if (uid) {
      const searchCriteria = [["id", "=", uid]];
      const response = await fetch(ApiEndPoints.jsonRpcEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          jsonrpc: "2.0",
          method: "call",
          params: {
            service: "object",
            method: "execute_kw",
            args: [
              ApiEndPoints.odooDatabase,
              uid,
              odooPassword,
              "res.users", 
              "search_read",
              [
                searchCriteria,
                [
                  "id",
                  "email",
                  "name",
                  "image_1920",
                ],
              ],
              {},
            ],
          },
        }),
      });

      const responseData = await response.json();
      if (responseData.result) {
        const customdata = responseData.result;
        setcustomerdata(customdata);

      } else {
        console.error("search_read error://..", responseData.error);
        return null;
      }
    }

    return null;
  }
  React.useEffect(() => {
    searchRead1()
  }, [])
  React.useEffect(() => {
    const abortController = new AbortController();
    props.navigation.addListener("focus", () => {
    });
    return () => {
      abortController.abort();
    };
  }, []);

  const userinfo = () => {
    ApiServices("get", false, ApiEndPoints.user_info).then((response) => {
      if (response.data.success == true) {
        setProfiledata(response.data.result);
      }
    });
  };
  const onPressDrawer = (key) => {
    props.navigation.push(key);
  };

  const renderItem = ({ item }) => {
    return (
      <View>
        <TouchableOpacity
          style={styles.listContainer}
          onPress={() => {
            onPressDrawer(item.key);
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              height: Responsive.heightPx(6),
            }}
          >
            <Image
              source={item.headingicon}
              style={{
                width: Responsive.widthPx(7),
                height: Responsive.widthPx(7),
              }}
              resizeMode={"contain"}
            />
            <Text style={styles.textStyle}>{item.name}</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  const clearFCMToken = async () => {
    try {
      await messaging().deleteToken();
      console.log('FCM token cleared successfully');
    } catch (error) {
      console.error('Error clearing FCM token:', error);
    }
  };

  async function deleteFcmToken() {
    try {
      const token = await messaging().getToken();
      const uid = await AsyncStorage.getItem("userId");
      const uidNumber = uid !== null ? parseInt(uid, 10) : console.log("UserId is null");
      console.log("userid" , uid)
      const odooPassword = await AsyncStorage.getItem("@odopassword");
      console.log("token", token);

      if (uid) {
        const response = await fetch(ApiEndPoints.jsonRpcEndpoint, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            jsonrpc: "2.0",
            method: "call",
            params: {
              service: "object",
              method: "execute_kw",
              args: [ApiEndPoints.odooDatabase, uid, odooPassword, "res.users", "delete_token_logout", [uidNumber,{
                "token": token
                }], {}]
            },
          }),
        });

        const responseData = await response.json();

        if (responseData.id === null) {
          __DEV__ ?
          Utility.showSuccessToast("Token removed successfully") :
          console.log("Token removed successfully");
        } else {
          __DEV__ ?
          Utility.showDangerToast("Token not removed") :
          console.log("Token not removed");
          console.error("create failed:", responseData.error);
        }
      }
    } catch (error) {
      console.error("Error sending token:", error);
    }
  }

  const logout = async () => {
    try {

      const token = await messaging().getToken();
      console.log("logout token" , token);
      await deleteFcmToken();
      await clearFCMToken();
      await AsyncStorage.removeItem("userId");
      await AsyncStorage.removeItem("token");
      props.navigation.replace("LoginScreen");
    } catch (error) {
      console.error("Error clearing user session:", error);
    }
  };
  return (
    <ImageBackground source={Images.profilebgsummary} style={styles.container}>
      <ImageBackground
        resizeMode="cover"
        borderBottomLeftRadius={15}
        borderBottomRightRadius={15}
        style={{ height: Responsive.heightPx(20) }}
        source={Images.drawerbackground}
      >
        <View style={styles.profileNameview}>
          <View style={styles.imagenameView}>
            <View style={styles.imageView}>
              {customerdata[0]?.image_1920 ? (
                <Image
                  source={{
                    uri: `data:image/png;base64,${customerdata[0]?.image_1920}`,
                  }}
                  style={styles.imageStyle}
                />
              ) : (
                <Image source={Images.draweruser} style={styles.imageStyle} />
              )}
            </View>
            <View style={{ marginLeft: 5 }}>
              <Text style={styles.nameTitlestyle}>
                {customerdata[0]?.name}
              </Text>
              <Text style={{ color: "#fff" }}>
                {customerdata[0]?.email}
              </Text>
            </View>
          </View>
        </View>
      </ImageBackground>
      <View style={styles.profileDetails}>
        <View style={{}}>
          <FlatList
            data={drawerList}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            renderItem={renderItem}
            ItemSeparatorComponent={() => <View style={styles.separator} />}
            keyExtractor={(_, index) => `drawer${index}`}
          />
          <View>
            <View style={styles.separator} />
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",

                marginTop: 12,
              }}
            >
              <Image source={Images.LogOut} />
              <TouchableOpacity
                style={styles.listContainer}
                onPress={() => logout()}
              >
                <Text style={styles.textStyle}>Logout</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </ImageBackground>
  );
};

export default AppDrawer;

const styles = StyleSheet.create({
  listContainer: {
  },
  listContainer1: {
    backgroundColor: "red",
  },
  container: {
    height: Responsive.heightPx(100),
  },
  profileDetails: {
    marginLeft: Responsive.widthPx(5),
    height: Responsive.widthPx(116),
    marginTop: Responsive.heightPx(4),
  },
  viewline: {
    height: Responsive.widthPx(13),
  },
  profileNameview: {
    height: Responsive.widthPx(30),
  },
  imageStyle: {
    width: Responsive.widthPx(20),
    height: Responsive.widthPx(20),
    borderRadius: 100,
  },
  imageView: {
    width: Responsive.widthPx(22),
  },
  separator: {
    height: 1,
    backgroundColor: "#ddd",
  },
  imagenameView: {
    flexDirection: "row",
    alignItems: "center",
    padding: 8,
    height: Responsive.heightPx(18),
  },
  nameTitlestyle: {
    color: Color.white,
    fontFamily: Fonts.Poppins_SemiBold,
    fontSize: Responsive.font(4.5),
    width: Responsive.widthPx(40),
  },
  textStyle: {
    fontSize: Responsive.font(4),
    color: Color.text_color,
    fontFamily: Fonts.Poppins_Medium,
    marginLeft: 10,
  },
});
