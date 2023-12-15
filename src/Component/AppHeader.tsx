import AsyncStorage from "@react-native-async-storage/async-storage";
import React from "react";
import { Text, StyleSheet, Image, View, TouchableOpacity } from "react-native";
import { Responsive, Images, Color, Fonts } from "../Helper";
import moment from "moment";

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

  // const retrieveData = async (key) => {
  //   try {
  //     const value = await AsyncStorage.getItem("userId");
  //     if (value !== null) {
  //       console.log("Retrieved data: ", value);
  //     } else {
  //       console.log("No data found.");
  //     }
  //   } catch (error) {
  //     console.log("Error retrieving data: ", error);
  //   }
  // };

  const odooHost = "http://kg.wangoes.com";
  const odooDatabase = "kg.wangoes.com";
  const jsonRpcEndpoint = `${odooHost}/jsonrpc`;
  const odooPassword = "admin";

  async function searchRead1() {
    const uid = await AsyncStorage.getItem("userId");

    if (uid) {
      const searchCriteria = [["id", "=", uid]];
      const response = await fetch(jsonRpcEndpoint, {
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
              odooDatabase,
              uid,
              odooPassword,
              "res.users", // Replace with the desired model name
              "search_read",
              // [searchCriteria],
              [
                searchCriteria,
                [
                  "id",
                  "login",
                  "name",
                  "last_check_in",
                  "last_check_out",
                  "attendance_id",
                  // "image_1920",
                ],
              ],
              {},
            ],
          },
        }),
      });

      const responseData = await response.json();
      // console.log("search_rea>>>", responseData);
      if (responseData.result) {
        const customdata = responseData.result;
        setcustomerdata(customdata);
        console.log("searchRead-------->", responseData.result);

        // const updatedDate = new Date(
        //   initialDate.getTime() + 5 * 60 * 60 * 1000 + 30 * 60 * 1000
        // );
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
        const attendance_id = await AsyncStorage.getItem("attendanceId");
        console.log(
          "SessionData1111",
          attendance_id,
          responseData.result[0].attendance_id[0]
        );
      } else {
        console.error("search_read error://..", responseData.error);
        return null;
      }

      // return responseData.result;
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
            // <TouchableOpacity onPress={() => {}}>
            <Image
              source={Images.applogo}
              style={styles.applogostle}
              resizeMode={"contain"}
            />
            // </TouchableOpacity>
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
    // ...CommonStyles.shadow,
    flexDirection: "row",
    alignItems: "center",
    marginTop: 15,
    height: Responsive.widthPx(15),
    // backgroundColor: "red",
    // width: Responsive.widthPx(100),
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
    // backgroundColor: "skyblue",
  },
  headerTitle: {
    // width: Responsive.widthPx(20),
    fontSize: Responsive.font(4.5),
    fontFamily: Fonts.Metropolis_SemiBold,
    color: Color.black,
    // backgroundColor: "yellow",
  },
  applogostle: {
    width: Responsive.widthPx(28),
    // backgroundColor: "yellow",
  },
  imageStyle: {
    width: Responsive.widthPx(10),
    height: Responsive.widthPx(10),
    borderRadius: 100,
    // backgroundColor: "red"
  },
});
