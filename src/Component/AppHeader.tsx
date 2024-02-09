import AsyncStorage from "@react-native-async-storage/async-storage";
import React from "react";
import { Text, StyleSheet, Image, View, TouchableOpacity } from "react-native";
import { Responsive, Images, Color, Fonts } from "../Helper";
import moment from "moment";
import { ApiEndPoints } from "../NetworkCall";

interface AppHeaderProps {
  drawermenu?: boolean;
  title?: string;
  isShowDrawer?: boolean;
  backButton?: any;
  isBackBtn?: boolean;
  isShowBgColor?: boolean;
  onPressRightSecond?: any;
  isRightImage?: any;
  islogo?: any;
  onPressRightImage?: any;
  headerTitle?: Object;
  navigation?: any;
}

const AppHeader = (props: AppHeaderProps) => {
  const {
    title,
    isBackBtn,
    isRightImage,
    islogo,
    headerTitle,
    drawermenu,
    navigation,
  } = props;

  const onPressDrawer = () => navigation.openDrawer();

  const onPressBack = () => navigation?.goBack();
  const [customerdata, setcustomerdata] = React.useState([]);
  React.useEffect(() => {
    searchRead1();
  }, []);

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
                  "login",
                  "name",
                  "last_check_in",
                  "last_check_out",
                  "attendance_id",
                  "employee_id",
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
        AsyncStorage.setItem(
          "checkIn",
          responseData.result[0].last_check_in
            ? responseData.result[0].last_check_in
            : false
        );
        AsyncStorage.setItem("checkOut", responseData.result[0].last_check_out);
        AsyncStorage.setItem(
          "attendanceId",
          responseData.result[0].attendance_id[0].toString()
        );
        AsyncStorage.setItem(
          "employId",
          responseData.result[0].employee_id[0].toString()
        );
      } else {
        console.error("search_read error://..", responseData.error);
        return null;
      }

    }

    return null;
  }
  return (
    <View style={styles.constainer}>
      <View style={styles.leftImg}>
        {isBackBtn && (
          <TouchableOpacity onPress={() => onPressBack()}>
            <Image
              source={Images.white_BackIcon}
              style={styles.backButton}
              resizeMode={"contain"}
            />
          </TouchableOpacity>
        )}
        {drawermenu && (
          <TouchableOpacity onPress={() => onPressDrawer()}>
            <Image
              source={Images.drawermenu}
              style={styles.backButton}
              resizeMode={"contain"}
            />
          </TouchableOpacity>
        )}
      </View>

      <Text style={[styles.headerTitle, headerTitle]}>{title}</Text>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <View style={{ width: Responsive.widthPx(45) }}>
          {islogo && (
         
            <Image
              source={Images.applogo}
              style={styles.applogostle}
              resizeMode={"contain"}
            />
      
          )}
        </View>
        <View style={styles.leftImg}>
          {isRightImage && (
            <View>
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
          )}
        </View>
      </View>
    </View>
  );
};

export default AppHeader;

AppHeader.defaultProps = {
  isBackBtn: true,
  isRightImage: false,
  islogo: false,
  headerTitle: {},
  drawermenu: false,
};

const styles = StyleSheet.create({
  constainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 15,
    height: Responsive.widthPx(15),
    justifyContent: "space-around",
  },
  backButton: {
    width: Responsive.widthPx(7),
    height: Responsive.widthPx(7),
  },
  cross_button: {
    width: Responsive.widthPx(9),
    height: Responsive.widthPx(9),
  },
  leftImg: {
    alignItems: "center",
    width: Responsive.widthPx(15),
  },
  headerTitle: {
    fontSize: Responsive.font(4.5),
    fontFamily: Fonts.Metropolis_SemiBold,
    color: Color.black,
  },
  applogostle: {
    width: Responsive.widthPx(28),
  },
  imageStyle: {
    width: Responsive.widthPx(10),
    height: Responsive.widthPx(10),
    borderRadius: 100,
  },
});
