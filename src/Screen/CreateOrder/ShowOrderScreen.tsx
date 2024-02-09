import {
  Text,
  View,
  Image,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  TextInput,
} from "react-native";
import React, { useState, useCallback } from "react";
import { Color, Const, Images, Loader, Responsive, Screen } from "../../Helper";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import moment from 'moment-timezone';
import {
  AppContainer,
} from "../../Component";
import { useEffect } from "react";
import styles from "./ShowOrderScreenstyle";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as OdooApi from "../OdooApi";
import { useFocusEffect } from "@react-navigation/native";
interface ShowOrderScreenProps {
  navigation?: any;
  text?: any;
  commonActions?: any;
  route?: any;
}

const ShowOrderScreen = (props: ShowOrderScreenProps) => {
  const { navigation, text, commonActions, route } = props;

  const [search, setSearch] = useState("");
  const [searchVisible, setSearchVisible] = useState(false);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const customerid = route?.params?.useridsend;
  const filterDataFromRoute = route?.params?.filterSearchCriteria !== undefined ? route?.params?.filterSearchCriteria : []
  const [customerdata, setcustomerdata] = useState([]);
  const callstatus = route?.params?.status;

  const searchRead = async (pageNumber: any, searchName: string) => {
    try {
      Loader.isLoading(true);
      const uid = await AsyncStorage.getItem("userId");

      if (uid) {
        const filterDataArr = filterDataFromRoute && filterDataFromRoute.length > 0 ? filterDataFromRoute : []
        const searchDataArr =
          callstatus === "orderhistry" ? [
            "|", "|",
            ["partner_id.name", "ilike", `${searchName}`],
            ["partner_id.phone", "ilike", `${searchName}`],
            ["name", "ilike", `${searchName}`],
            ["id", "!=", 0],
          ]
            : callstatus === "Quotation"
              ? [
                "|", "|",
                ["partner_id.name", "ilike", `${searchName}`],
                ["partner_id.phone", "ilike", `${searchName}`],
                ["name", "ilike", `${searchName}`],
                ["id", "!=", 0],
              ]
              : callstatus === "Order"
                ? [
                  "|", "|",
                  ["partner_id.name", "ilike", `${searchName}`],
                  ["partner_id.phone", "ilike", `${searchName}`],
                  ["name", "ilike", `${searchName}`],
                ]
                : []
        const criteraArr = filterDataArr && filterDataArr.length > 0 ? [
          "|", "|",
          ["partner_id.name", "ilike", `${searchName}`],
          ["partner_id.phone", "ilike", `${searchName}`],
          ["name", "ilike", `${searchName}`],
        ] : []
        const concatArray = filterDataArr.concat(criteraArr)
        const searchCriteria = filterDataArr.length > 0 ? [...concatArray] : callstatus === undefined ? [
          "|", "|",
          ["partner_id.name", "ilike", `${searchName}`],
          ["partner_id.phone", "ilike", `${searchName}`],
          ["name", "ilike", `${searchName}`],
          ["id", "!=", 0],
          ["user_id", "=", Number(uid)],
        ] : searchDataArr

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

          setcustomerdata((prevData: any) => {
            if (pageNumber === 1) {
              return [...searchData];
            } else {
              const uniqueData = searchData.filter(
                (item) =>
                  !prevData.some((existingItem) => existingItem.id === item.id)
              );
              return [...prevData, ...uniqueData];
            }
          }
          )

        } else {
   
        }
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      Loader.isLoading(false);
    }
  };


  useFocusEffect(
    useCallback(() => {
      if (filterDataFromRoute && filterDataFromRoute.length > 0) {
        searchRead(page, search)
        setSearchVisible(false)
        setSearch('')
        setPage(1)
      }
    }, [filterDataFromRoute])
  );

  useEffect(() => {
    if (search.length === 0) {
      console.log("useEffect calling ::::")

      searchRead(page, search)
      setPage(1)
    }
  }, [search]);

  const onendreached = () => {
    if (!loading) {
      setPage((prevPage) => prevPage + 1);
      searchRead(page + 1, search);
    }

  };

  const capitalizeFirstLetter = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  const searchSetValue = (text) => {
    setSearch(text)
    setPage(1)
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
            style={{ left: Responsive.widthPx(5) }}
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
            style={{ left: Responsive.widthPx(3) }}
            onPress={() => {
              navigation.navigate("OrderFilterScreen", { customerid: customerid, callstatus: callstatus });
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
          <View style={{ flexDirection: 'row', paddingHorizontal: 20 }}>
            <TextInput
              style={{
                flex: 1,
                height: 50,
                borderWidth: 1,
                alignSelf: "center",
                borderRadius: 10,
              }}
              placeholder={"Search"}
              value={search}
              onChangeText={(text) => searchSetValue(text)}
            />
            <TouchableOpacity onPress={() => searchRead(page, search)} style={{
              marginLeft: 10,
              backgroundColor: Color.botton_Color,
              alignItems: 'center',
              justifyContent: 'center',
              paddingVertical: 8,
              paddingHorizontal: 10,
              borderRadius: 10
            }}>
              <Text style={{ color: '#fff', fontWeight: '500' }}>Search</Text>
            </TouchableOpacity>
          </View>
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

                    Order#
                    {item.name}
                  </Text>
                  <View
                    style={{

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

                      alignItems: "center",
                      flexDirection: "row",

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
                      {item.payment_mode && item.payment_mode.length > 6 ? item.payment_mode.substring(0, item.payment_mode.length - 3) + "..."
                        : item.payment_mode}

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

                  <Text style={styles.listtext}>{moment(item.date_order).add({ hours: 5, minutes: 30 }).format('YY-MM-DD hh:mm:ss')}</Text>
                </View>
              </View>
            </TouchableOpacity>
          )}
          onEndReached={onendreached}
          onEndReachedThreshold={0.1}
          ListFooterComponent={() =>
            loading ? <ActivityIndicator size="large" color="#0000ff" /> : null
          }
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

export default connect(null, mapDispatchToProps)(ShowOrderScreen);
