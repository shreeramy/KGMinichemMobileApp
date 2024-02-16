import moment from 'moment-timezone';
import React, { useState,useEffect } from "react";
import {
  FlatList,
  Image,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  AppContainer
} from "../../Component";
import {
  Color,
  Const,
  Images,
  Loader,
  Responsive,
  Screen
} from "../../Helper";
import styles from "./AttendanceHistoryScreenstyle";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ApiEndPoints } from "../../NetworkCall";
interface AttendanceHistoryScreenProps {
  navigation?: any;
  text?: any;
  commonActions?: any;
}

const AttendanceHistoryScreen = (props: AttendanceHistoryScreenProps) => {
  const { navigation, text, commonActions } = props;
  const [customerdata, setcustomerdata] = useState([]);

  useEffect(() => {
    searchRead();
    const backScreen = navigation.addListener("focus", () => {
      searchRead();
    });
    return backScreen;
  }, []);

  async function searchRead() {
    const uid = await AsyncStorage.getItem("userId");
    const odooPassword = await AsyncStorage.getItem("@odopassword");
    Loader.isLoading(true);

    if (uid) {
      const searchCriteria = [["id", "!=", 0]];
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
              "hr.attendance", // Replace with the desired model name
              "search_read",
              [searchCriteria],
              {},
            ],
          },
        }),
      });

      const responseData = await response.json();
      if (responseData.result) {
        Loader.isLoading(false);
        const customdata = responseData.result;
        setcustomerdata(customdata);
      } else {
        console.error("search_read error://..", responseData.error);
        return null;
      }
    }

    return null;
  }

  const getLocationData = async (item) => {
    Loader.isLoading(true);
    const uid = await AsyncStorage.getItem("userId");
    const odooPassword = await AsyncStorage.getItem("@odopassword");


    if (uid) {
      const searchCriteria = [
        ["attendance_id", "=", item.id]
      ];

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
              "hrm.location", // Replace with the desired model name
              "search_read",
              [searchCriteria],
              {},
            ],
          },
        }),
      });

      const responseData = await response.json();
      if (responseData.result) {
        Loader.isLoading(false);
        navigation.navigate(Screen.LiveLocationScreen, { attendanceData: responseData.result })
      } else {
        console.error("search_read error://..", responseData.error);
        return null;
      }
    }


    return null;
  }

  return (
    <AppContainer>
      <View style={styles.container}>
        <View style={styles.headerview}>
          <View style={styles.headerview1}>
            <TouchableOpacity onPress={() => navigation.goBack(null)}>
              <Image
                style={{
                  width: Responsive.widthPx(10),
                  height: Responsive.heightPx(8),
                }}
                resizeMode="contain"
                source={Images.blackbacicon}
              />
            </TouchableOpacity>
            <Text style={{ fontSize: 20, marginLeft: 5, color: Color.black }}>
              Attendance History
            </Text>
          </View>
        </View>
        <FlatList
          data={customerdata}
          keyExtractor={(item: any) => item.id}
          renderItem={({ item }) => {

            return (
              <TouchableOpacity
                onPress={
                  () => { getLocationData(item) }
              
                }
                style={{}}
              >
                <View style={styles.item}>
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "space-around",
                      width: Responsive.widthPx(85),
                    }}
                  >
                    <View style={styles.attendanceview}>
                      <Image
                        resizeMode="contain"
                        style={{ width: Responsive.widthPx(10) }}
                        source={Images.checkin}
                      />
                      <View>
                        <Text style={styles.listheadingtext}>Check In</Text>
                        {
                          item.check_in ?
                            <Text style={styles.listtext}>{moment(item.check_in).add({ hours: 5, minutes: 30 }).format('YY-MM-DD hh:mm:ss')}</Text>
                            :
                            null
                        }
                      </View>
                    </View>
                    <View style={styles.attendanceview}>
                      <Image
                        resizeMode="contain"
                        style={{ width: Responsive.widthPx(10) }}
                        source={Images.checkin}
                      />
                      <View>
                        <Text style={styles.listheadingtext}>Check out</Text>
                        {
                          item.check_out ?
                            <Text style={styles.listtext}>{moment(item.check_out).add({ hours: 5, minutes: 30 }).format('YY-MM-DD hh:mm:ss')}</Text>
                            :
                            null
                        }

                      </View>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            )
          }}
        />
      </View>
    </AppContainer>
  );
};

function mapDispatchToProps(dispatch: any) {
  return {
    commonActions: bindActionCreators(Const.commonActions, dispatch),
  };
}

export default connect(null, mapDispatchToProps)(AttendanceHistoryScreen);
