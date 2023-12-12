import {
  Text,
  StyleSheet,
  View,
  Image,
  FlatList,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
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
import * as OdooApi from "../OdooApi";
import {
  AppButton,
  AppContainer,
  AppHeader,
  AppScrollview,
  AppTextInput,
} from "../../Component";
import _ from "lodash";
import { useEffect } from "react";
import styles from "./CustomerScreenstyle";
// import { getData } from "../OdooApi";
import axios from "axios";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { ApiEndPoints } from "../../NetworkCall";
interface CustomerScreenProps {
  navigation?: any;
  text?: any;
  commonActions?: any;
}

const CustomerScreen = (props: CustomerScreenProps) => {
  const { navigation, text, commonActions } = props;
  const [customerdata, setcustomerdata] = useState([]);
  const [prosearch, setprosearch] = useState("");
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [noMoreData, setNoMoreData] = useState(false);
  const [apiCall, setApicall] = useState(false);

  React.useEffect(() => {
    console.log('useEffect-->','searchReadData');
    searchReadData();
  //  retrieveData();
  }, []);

  async function searchRead1(e: any) {
    console.log('searchRead1-->','searchRead1');
    const uid = await AsyncStorage.getItem("userId");
    // Loader.isLoading(true);

    if (uid) {
      const searchCriteria = [["name", "ilike", e]];
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
              "admin",
              "res.partner", // Replace with the desired model name
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
        //console.log("search_read result:::::", responseData.result);
      } else {
        console.error("search_read error://..", responseData.error);
        return null;
      }

      // return responseData.result;
    }

    return null;
  }

  const retrieveData = async (key) => {
    try {
      const value = await AsyncStorage.getItem("userId");
      if (value !== null) {
      //  console.log("Retrieved data: ", value);
      } else {
        console.log("No data found.");
      }
    } catch (error) {
      console.log("Error retrieving data: ", error);
    }
  };

  const searchReadData = async (pageNumber) => {
    console.log('searchReadData-->','searchReadData');
    try {
      setLoading(true);
      // Loader.isLoading(true);
      const uid = await AsyncStorage.getItem("userId");

      if (uid && !noMoreData) {
        const searchCriteria = [["id", "!=", 0]];
        const list = ["id"];

        const limit = 10;
        const offset = (pageNumber - 1) * 10;
       
        const searchData = await OdooApi.searchRead(
          uid,
          "res.partner",
          searchCriteria,
          limit,
          offset
        );

        if (searchData) {
        //  console.log('searchData-->',searchData);
          setcustomerdata((prevData) => {
            if (pageNumber === 1) {
              return [...searchData];
            } else {
              const uniqueData = searchData.filter(
                (item) =>
                  !prevData.some((existingItem) => existingItem.id === item.id)
              );
              return [...prevData, ...uniqueData];
            }
          });
        } else {
          console.error("searchRead error://..");
        }
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
      // Loader.isLoading(false);
    }
  };

  const onendreached = () => {
    console.log('onendreached','onendreached');
    // Assuming you want to load more data only if not already loading
  if(apiCall){
   // searchRead1(prosearch);
  }else{
    if (!loading && !noMoreData) {
      setPage((prevPage) => prevPage + 1);
      searchReadData(page + 1);
    }
  }
 
  };

  useEffect(() => {
    // Check if there is cached data, if not fetch from the API
    const fetchCachedData = async () => {
      const cachedData = await AsyncStorage.getItem("cachedCustomerData");

      if (cachedData) {
        //setcustomerdata(JSON.parse(cachedData));
      } else {
        searchReadData(page);
      }
    };

    fetchCachedData();
  }, []); // Fetch data on initial mount

  useEffect(() => {
    // Cache the data whenever it changes
    AsyncStorage.setItem("cachedCustomerData", JSON.stringify(customerdata));
  }, [customerdata]);

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
              Customer
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
        <View style={styles.item1}>
          <View>
            <TouchableOpacity
              onPress={() => {
                // searchcustomerdata(prosearch);
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
                setApicall(true);
                // searchcustomerdata(prosearch);
                
              //  searchRead1(prosearch);
              }}
              // onChangeText={handleSearchChange}
              placeholderTextColor={Color.text_color}
              placeholder="Search"
            />
          </View>
          {prosearch.length > 0 ? (
            <View>
              <TouchableOpacity
                onPress={() => {
                  setprosearch("");
                  setApicall(false);
                  searchReadData();
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
        </View>
        <FlatList
          data={customerdata}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate(Screen.EditProfile, { user: item })
              }
              style={{}}
            >
              <View style={styles.item}>
                <View>
                  <Image
                    style={{
                      width: Responsive.widthPx(5),
                      height: Responsive.heightPx(5),
                    }}
                    resizeMode="contain"
                    // source={{ uri: `data:image/png;base64,${barcodeData}` }}
                    source={{
                      uri: `data:image/png;base64,${item?.image_512}`,
                    }}
                  />
                </View>
                <View style={{ marginLeft: 15 }}>
                  <Text style={styles.listtext}>{item.name}</Text>
                  <View style={{ alignItems: "center", flexDirection: "row" }}>
                    <Image resizeMode="contain" source={Images.Call} />
                    <View style={{ marginLeft: 5 }}>
                      <Text style={styles.listtext}>{item.phone}</Text>
                    </View>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          )}
         onEndReached={onendreached}
          onEndReachedThreshold={0.1} // Adjust as needed
          ListFooterComponent={() =>
            loading ? <ActivityIndicator size="large" color="#0000ff" /> : null
          }
        />
        <View
          style={{
            width: Responsive.widthPx(90),
            justifyContent: "flex-end",
            alignItems: "flex-end",
          }}
        >
          <TouchableOpacity onPress={() => navigation.navigate(Screen.Profile)}>
            <View
              style={{
                backgroundColor: Color.botton_Color,
                borderRadius: Responsive.widthPx(20),
                width: Responsive.widthPx(10),
                height: Responsive.heightPx(5),
                justifyContent: "center",
                alignItems: "center",
                padding: 25,
                bottom: Responsive.heightPx(3),
              }}
            >
              <Image
                style={{
                  width: Responsive.widthPx(8),
                  height: Responsive.heightPx(8),
                }}
                resizeMode="contain"
                source={Images.Plus}
              />
            </View>
          </TouchableOpacity>
        </View>
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

export default connect(null, mapDispatchToProps)(CustomerScreen);
