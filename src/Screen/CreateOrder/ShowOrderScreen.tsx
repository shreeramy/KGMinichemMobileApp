import {
  Text,
  StyleSheet,
  View,
  Image,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  TextInput,
} from "react-native";
import React, { Component, useState } from "react";
import { SvgIcon } from "../../Component/SvgIcons";
import { Color, Const, Images, Loader, Responsive, Screen } from "../../Helper";
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
import styles from "./ShowOrderScreenstyle";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ApiEndPoints } from "../../NetworkCall";
import OrderHistory from "../OrderHistory/OrderHistory";
import { orderBy } from "lodash";
import * as OdooApi from "../OdooApi";
interface ShowOrderScreenProps {
  navigation?: any;
  text?: any;
  commonActions?: any;
  route?: any;
}

const ShowOrderScreen = (props: ShowOrderScreenProps) => {
  const { navigation, text, commonActions, route } = props;
  const [email, setemail] = useState("");
  const [customerdata, setcustomerdata] = useState([]);
  const [search, setSearch] = useState("");
  const [searchVisible, setSearchVisible] = useState(false);
  // const odooPassword = "admin";
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [noMoreData, setNoMoreData] = useState(false);
  const customerid = route?.params?.useridsend;
  const callstatus = route?.params?.status;
  React.useEffect(() => {
    searchRead();
    const backScreen = navigation.addListener("focus", () => {
      searchRead();
      retrieveData();
    });
    return backScreen;
  }, []);
  console.log("callstatus....", callstatus);
  async function searchRead1(e: any) {
    const uid = await AsyncStorage.getItem("userId");
    const odooPassword = await AsyncStorage.getItem("@odopassword");
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
              odooPassword,
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
        console.log("search_read result:::::", responseData.result);
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
        console.log("Retrieved data: ", value);
      } else {
        console.log("No data found.");
      }
    } catch (error) {
      console.log("Error retrieving data: ", error);
    }
  };

  // ....///////////////////////////\\\

  // Function to perform a search_read operation
  // async function searchRead() {
  //   const uid = await AsyncStorage.getItem("userId");
  // const odooPassword = await AsyncStorage.getItem("@odopassword");
  //   Loader.isLoading(true);
  //   if (uid) {
  //     // for quotation
  //     // const searchCriteria = [
  //     //   ["id", "!=", 0],
  //     //   ["state", "in", ["draft", "sent"]],
  //     //   ["user_id", "=", Number(uid)],
  //     // ];
  //     // for OrderHistory
  //     // const searchCriteria = [
  //     //   ["id", "!=", 0],

  //     //   ["user_id", "=", Number(uid)],
  //     //   ["partner_id", "=", Number(customerid)],
  //     // ];

  //     // order's in not in draft,
  //     const searchCriteria = [
  //       ["id", "!=", 0],
  //       ["state", "not in", ["draft", "sent"]],
  //     ];

  //     const response = await fetch(ApiEndPoints.jsonRpcEndpoint, {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({
  //         jsonrpc: "2.0",
  //         method: "call",
  //         params: {
  //           service: "object",
  //           method: "execute_kw",
  //           args: [
  //             ApiEndPoints.odooDatabase,
  //             uid,
  //             odooPassword,
  //             "sale.order", // Replace with the desired model name
  //             "search_read",
  //             [searchCriteria],
  //             {},
  //           ],
  //         },
  //       }),
  //     });

  //     const responseData = await response.json();

  //     if (responseData.result) {
  //       Loader.isLoading(false);
  //       const customdata = responseData.result;
  //       setcustomerdata(customdata);
  //       console.log(
  //         "Get_Order Histroy....",
  //         searchCriteria,
  //         responseData.result
  //       );
  //     } else {
  //       Loader.isLoading(false);
  //       console.error("search_read error://..", responseData.error);
  //       return null;
  //     }

  //     // return responseData.result;
  //   }

  //   return null;
  // }

  const searchRead = async (pageNumber) => {
    try {
      Loader.isLoading(true);
      const uid = await AsyncStorage.getItem("userId");
      if (uid && !noMoreData) {
        const searchCriteria =
          callstatus === "orderhistry"
            ? [
              ["id", "!=", 0],
              ["user_id", "=", Number(uid)],
              ["partner_id", "=", Number(customerid)],
            ]
            : callstatus === "Quotation"
              ? [
                ["id", "!=", 0],
                ["state", "in", ["draft", "sent"]],
                ["user_id", "=", Number(uid)],
              ]
              : callstatus === "Order"
                ? [
                  ["id", "!=", 0],
                  ["state", "not in", ["draft", "sent"]],
                ]
                : []; // Default criteria when the status is not recognized

        const limit = 10;
        const offset = (pageNumber - 1) * 10;

        const searchData = await OdooApi.searchRead(
          uid,
          "sale.order",
          searchCriteria,
          limit,
          offset
        );

        if (searchData) {
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
      Loader.isLoading(false);
    }
  };

  const onendreached = () => {
    // Assuming you want to load more data only if not already loading
    if (!loading && !noMoreData) {
      setPage((prevPage) => prevPage + 1);
      searchRead(page + 1);
    }
  };

  const capitalizeFirstLetter = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

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
            {callstatus === "orderhistry" ? (
              <Text style={{ fontSize: 20, marginLeft: 5, color: Color.black }}>
                Order History
              </Text>
            ) : callstatus === "Quotation" ? (
              <Text style={{ fontSize: 20, marginLeft: 5, color: Color.black }}>
                Quotation
              </Text>
            ) : callstatus === "Order" ? (
              <Text style={{ fontSize: 20, marginLeft: 5, color: Color.black }}>
                Order
              </Text>
            ) : null}
          </View>
          <TouchableOpacity
            style={{ left: 60 }}
            onPress={() => {
              setSearchVisible(!searchVisible);
            }}
          >
            <Image
              style={{
                width: Responsive.widthPx(6),
                height: Responsive.heightPx(4),
              }}
              resizeMode="contain"
              source={Images.Search}
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={{ left: 25 }}
            onPress={() => {
              navigation.navigate("OrderFilterScreen");
            }}
          >
            <Image
              style={{
                width: Responsive.widthPx(6),
                height: Responsive.heightPx(4),
              }}
              resizeMode="contain"
              source={Images.Filter}
            />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.navigate(Screen.NewCreateOrderScreen)}
          >
            <View
              style={{
                backgroundColor: "#4E2F1B",
                width: Responsive.widthPx(20),
                alignItems: "center",
                justifyContent: "center",
                height: Responsive.heightPx(5),
                borderRadius: Responsive.widthPx(3),
              }}
            >
              <Text style={{ fontSize: 20, marginLeft: 5, color: "#fff" }}>
                New
              </Text>
            </View>
          </TouchableOpacity>
        </View>
        {searchVisible ? (
          <TextInput
            style={{
              width: "90%",
              height: 50,
              borderWidth: 1,
              alignSelf: "center",
              borderRadius: 10,
            }}
            placeholder={"Search"}
            value={search}
            onChangeText={(text) => setSearch(text)}
          />
        ) : (
          <></>
        )}
        <FlatList
          data={customerdata}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => {
                navigation.push(Screen.SellOrderDetails, {
                  selorederid: item.id,
                }),
                  console.log(">>?...", item.id);
              }}
            >
              <View style={styles.item}>
                <View
                  style={{
                    flexDirection: "row",
                    width: Responsive.widthPx(80),
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Text
                    style={{
                      color: Color.choclatetex,
                      fontSize: 15,
                      fontWeight: "bold",
                    }}
                  >
                    {console.log("kjvjbv>>", item.id)}
                    Order#
                    {item.name}
                  </Text>
                  <View
                    style={{
                      // marginLeft: 5,
                      backgroundColor:
                        item.state === "draft"
                          ? "#8B8000"
                          : item.state === "sale"
                            ? "#C67C4E"
                            : item.state === "completed"
                              ? "#0DD157"
                              : "gray",
                      padding: Responsive.widthPx(2),
                      borderRadius: Responsive.widthPx(10),
                      width: Responsive.widthPx(32),
                      justifyContent: "center",
                      alignItems: "center",
                      marginTop: 2,
                    }}
                  >
                    <Text style={styles.listtext1}>
                      {capitalizeFirstLetter(item.state)}
                    </Text>
                  </View>
                </View>
                <View
                  style={{
                    // backgroundColor: "red",
                    alignSelf: "center",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    width: Responsive.widthPx(80),
                    marginTop: Responsive.heightPx(2),
                  }}
                >
                  <Text style={styles.listtextheading}>
                    {item.partner_id[1]}
                  </Text>
                  <View
                    style={{
                      // backgroundColor: "blue",
                      alignItems: "center",
                      flexDirection: "row",
                      // justifyContent: "space-between",
                      width: Responsive.widthPx(35),
                    }}
                  >
                    <Text
                      style={{
                        color: Color.text_color,
                        fontWeight: "600",
                        marginLeft: Responsive.widthPx(2),
                        fontSize: 15,
                      }}
                    >
                      Paid via -
                    </Text>
                    <Text
                      style={{
                        color: Color.text_color,
                        fontWeight: "600",
                        marginLeft: Responsive.widthPx(2),
                      }}
                    >
                      {item.payment_mode}
                    </Text>
                  </View>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    width: Responsive.widthPx(80),
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginTop: 10,
                  }}
                >
                  <Text style={styles.listtext}>Delivery estimate</Text>
                  <Text style={styles.listtext}>{item.date_order}</Text>
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

export default connect(null, mapDispatchToProps)(ShowOrderScreen);
