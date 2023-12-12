import {
  Text,
  StyleSheet,
  View,
  Image,
  FlatList,
  TouchableOpacity,
  TextInput,
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
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import Odoo from "react-native-odoo-promise-based";
import {
  AppButton,
  AppContainer,
  AppHeader,
  AppScrollview,
  AppTextInput,
} from "../../Component";
import { useEffect } from "react";
import styles from "./AttendanceHistoryScreenstyle";
// import { getData } from "../OdooApi";
import axios from "axios";

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
  const [prosearch, setprosearch] = useState("");

  React.useEffect(() => {
    searchRead();
    const backScreen = navigation.addListener("focus", () => {
      searchRead();
      retrieveData();
    });
    return backScreen;
  }, []);

  const retrieveData = async (key) => {
    try {
      const value = await AsyncStorage.getItem("userId");
      if (value !== null) {
        console.log("Retrieved data: ", value);
      } else {
        console.log("No data found.");
      }
    } catch (error) {
      console.log("Error retrieving data: ", error);
    }
  };

  // ....///////////////////////////\\\

  const odooHost = "http://kg.wangoes.com";
  const odooDatabase = "kg.wangoes.com";
  const jsonRpcEndpoint = `${odooHost}/jsonrpc`;
  const odooPassword = "admin";

  // Function to perform a search_read operation
  async function searchRead() {
    const uid = await AsyncStorage.getItem("userId");
    Loader.isLoading(true);

    if (uid) {
      const searchCriteria = [["id", "!=", 0]];
      // const searchCriteria = [["check_out", "!=", false]];
      // if (name){
      //   searchCriteria.append(["name", "=", name])
      // }
      // const searchCriteria = [];
      // Replace with your search criteria

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
        console.log("?????????????//..", responseData.result);
      } else {
        console.error("search_read error://..", responseData.error);
        return null;
      }

      // return responseData.result;
    }

    return null;
  }

  return (
    <AppContainer>
      {/* <AppScrollview> */}
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
          {/* <View style={styles.headerview1}>
              <TouchableOpacity>
                <Image
                  style={{
                    marginLeft: 10,
                  }}
                  resizeMode="contain"
                  source={Images.Filter}
                />
              </TouchableOpacity>
            </View> */}
        </View>
        {/* <View style={styles.item1}>
          <View>
            <TouchableOpacity
              onPress={() => {
                searchRead1(prosearch);
              }}
            >
              <Image
                style={{ width: Responsive.widthPx(10) }}
                resizeMode="contain"
                source={Images.Search}
              />
            </TouchableOpacity>
          </View>
          <View>
            <TextInput
              style={{
                padding: 2,
                // backgroundColor: "red",
                height: Responsive.heightPx(5),
                width: Responsive.widthPx(65),
                color: Color.text_color,
                marginLeft: 10,
              }}
              value={prosearch}
              onChangeText={(prosearch: any) => {
                setprosearch(prosearch);
                searchRead1(prosearch);
              }}
              placeholderTextColor={Color.text_color}
              placeholder="Search"
            />
          </View>
          {prosearch.length > 0 ? (
            <View>
              <TouchableOpacity
                onPress={() => {
                  setprosearch("");
                  searchRead();
                }}
              >
                <Image
                  style={{
                    width: Responsive.widthPx(5),
                    height: Responsive.heightPx(4),
                    // backgroundColor: "red",
                  }}
                  resizeMode="contain"
                  source={Images.crossicon}
                />
              </TouchableOpacity>
            </View>
          ) : null}
        </View> */}
        <FlatList
          data={customerdata}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={
                () => {}
                // navigation.navigate(Screen.EditProfile, { userid: item.id })
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
                      <Text style={styles.listheadingtext}>Chock In</Text>
                      <Text style={styles.listtext}>{item.check_in}</Text>
                    </View>
                  </View>
                  <View style={styles.attendanceview}>
                    <Image
                      resizeMode="contain"
                      style={{ width: Responsive.widthPx(10) }}
                      source={Images.checkin}
                    />
                    <View>
                      <Text style={styles.listheadingtext}>Chock out</Text>
                      <Text style={styles.listtext}>{item.check_out}</Text>
                    </View>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          )}
        />
      </View>
      {/* </AppScrollview> */}
    </AppContainer>
  );
};

function mapDispatchToProps(dispatch: any) {
  return {
    commonActions: bindActionCreators(Const.commonActions, dispatch),
  };
}

export default connect(null, mapDispatchToProps)(AttendanceHistoryScreen);
