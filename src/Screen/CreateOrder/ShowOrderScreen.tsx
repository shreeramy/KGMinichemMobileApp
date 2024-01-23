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
import moment from 'moment-timezone';
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
import { useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";
interface ShowOrderScreenProps {
  navigation?: any;
  text?: any;
  commonActions?: any;
  route?: any;
}

const ShowOrderScreen = (props: ShowOrderScreenProps) => {
  const { navigation, text, commonActions, route } = props;
  const [email, setemail] = useState("");

  // console.log("customerdata", customerdata)
  const [customerdataWithoutLimit, setCustomerdataWithoutLimit] = useState([]);
  const [search, setSearch] = useState("");
  console.log("search.length:::::::", search)
  const [searchCustmerName, setSearchCustmerName] = useState("");
  const [searchPhone, setSearchPhone] = useState("");
  const [searchOrder, setSearchOrder] = useState("");
  const [searchVisible, setSearchVisible] = useState(false);
  // const odooPassword = "admin";
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [noMoreData, setNoMoreData] = useState(false);
  const [filteredDataSource, setFilteredDataSource] = useState([]);
  const [uId, setUId] = useState()
  // console.log("customerdataWithoutLimit:::", customerdataWithoutLimit.length)
  // console.log("customerdata:::", customerdata.length)
  // console.log("search:::", search)
  const customerid = route?.params?.useridsend;
  const filterDataFromRoute = route?.params?.filterSearchCriteria !== undefined ? route?.params?.filterSearchCriteria : []
  // console.log("FilterData in order------::::", filterDataFromRoute)
  const [customerdata, setcustomerdata] = useState([]);
  const [customerFilterData, setCustomerFilterData] = useState([]);
  const [noteSetPage, setNotSetPage] = useState(true)
  // const [filterData, setFilterData] = useState([...filterDataFromRoute]);
  const callstatus = route?.params?.status;
  // console.log("callstatus::::", callstatus)

  // const searchRead = async (pageNumber: any, searchName: string) => {
  //   console.log("searchNmae.length", searchName)
  //   try {
  //     Loader.isLoading(true);
  //     const uid = await AsyncStorage.getItem("userId");

  //     if (uid) {
  //       const searchCriteria =
  //         callstatus === "orderhistry"
  //           ? [
  //             "|", "|",
  //             ["partner_id.name", "ilike", `${searchName}`],
  //             ["partner_id.phone", "ilike", `${searchName}`],
  //             ["name", "ilike", `${searchName}`],
  //             ["id", "!=", 0],
  //             ["user_id", "=", Number(uid)],
  //             ["partner_id", "=", Number(customerid)],
  //           ]
  //           : callstatus === "Quotation"
  //             ? [
  //               "|", "|",
  //               ["partner_id.name", "ilike", `${searchName}`],
  //               ["partner_id.phone", "ilike", `${searchName}`],
  //               ["name", "ilike", `${searchName}`],
  //               ["id", "!=", 0],
  //               ["user_id", "=", Number(uid)]
  //             ]
  //             : callstatus === "Order"
  //               ? [
  //                 "|", "|",
  //                 ["partner_id.name", "ilike", `${searchName}`],
  //                 ["partner_id.phone", "ilike", `${searchName}`],
  //                 ["name", "ilike", `${searchName}`],
  //                 ["id", "!=", 0],
  //                 ["user_id", "=", Number(uid)],
  //               ]
  //               : []; // Default criteria when the status is not recognized

  //       console.log("pageNumber::", pageNumber)
  //       const limit = 10;
  //       const offset = (pageNumber - 1) * 10;
  //       // const offset = searchName && searchName.length > 0 ? (pageNumber) * 10 : (pageNumber - 1) * 10;
  //       // let offset;
  //       // if (searchName && searchName.length > 0) {
  //       //   // Calculate offset based on search criteria
  //       //   offset = pageNumber * 10;
  //       // } else {
  //       //   // Calculate default offset when there is no search criteria
  //       //   offset = (pageNumber - 1) * 10;
  //       // }

  //       console.log("offset:::", offset);
  //       // console.log("pageNumber::", pageNumber)

  //       const searchData = await OdooApi.searchRead(
  //         uid,
  //         "sale.order",
  //         searchCriteria,
  //         limit,
  //         offset
  //       );
  //       console.log("searchData===", searchData.length)

  //       if (searchData) {
  //         // if (searchName && searchName.length > 0) {
  //         //   // console.log("searchName && searchName.length > 0 condition==>")

  //         //   if (searchData.length === 0) {
  //         //     setNotSetPage(false)
  //         //     setcustomerdata((prevData: any) => {
  //         //       return [...prevData, ...searchData]
  //         //     })
  //         //   } else {
  //         //     setNotSetPage(true)
  //         //     setcustomerdata((prevData: any) => {
  //         //       if (pageNumber === 1) {

  //         //         return [...searchData];
  //         //       } else {
  //         //         const uniqueData = searchData.filter(
  //         //           (item) =>
  //         //             !prevData.some((existingItem) => existingItem.id === item.id)
  //         //         );
  //         //         // console.log("pageNumber else condition=====>")
  //         //         return [...prevData, ...uniqueData];
  //         //         // return [...uniqueData];
  //         //       }
  //         //     });
  //         //   }
  //         // } else {
  //         //   setcustomerdata((prevData: any) => {
  //         //     if (pageNumber === 1) {

  //         //       return [...searchData];
  //         //     } else {
  //         //       const uniqueData = searchData.filter(
  //         //         (item) =>
  //         //           !prevData.some((existingItem) => existingItem.id === item.id)
  //         //       );
  //         //       // console.log("pageNumber else condition=====>")
  //         //       return [...prevData, ...uniqueData];
  //         //       // return [...uniqueData];
  //         //     }
  //         //   });
  //         // }
  //         setcustomerdata((prevData: any) => {
  //           if (pageNumber === 1) {
  //             console.log("pageNumber ig condition:::")
  //             return [...searchData];
  //           } else {
  //             const uniqueData = searchData.filter(
  //               (item) =>
  //                 !prevData.some((existingItem) => existingItem.id === item.id)
  //             );
  //             console.log("pageNumber else condition=====>")
  //             return [...prevData, ...uniqueData];
  //             // return [...uniqueData];
  //           }
  //         }
  //         )

  //       } else {
  //         console.error("searchRead error://..");
  //       }
  //     }
  //   } catch (error) {
  //     console.error("Error:", error);
  //   } finally {
  //     Loader.isLoading(false);
  //   }
  // };
  const searchRead = async (pageNumber: any, searchName: string) => {
    try {
      Loader.isLoading(true);
      const uid = await AsyncStorage.getItem("userId");

      if (uid) {
        // const searchCriteria =filterDataFromRoute && filterDataFromRoute.length > 0 ? filterDataFromRoute :[]
        const filterDataArr = filterDataFromRoute && filterDataFromRoute.length > 0 ? filterDataFromRoute : []
        const searchDataArr =
          callstatus === "orderhistry" ? [
            "|", "|",
            ["partner_id.name", "ilike", `${searchName}`],
            ["partner_id.phone", "ilike", `${searchName}`],
            ["name", "ilike", `${searchName}`],
            ["id", "!=", 0],
            // ["user_id", "=", Number(uid)],
            // ["partner_id", "=", Number(customerid)],
          ]
            : callstatus === "Quotation"
              ? [
                "|", "|",
                ["partner_id.name", "ilike", `${searchName}`],
                ["partner_id.phone", "ilike", `${searchName}`],
                ["name", "ilike", `${searchName}`],
                ["id", "!=", 0],
                // ["user_id", "=", Number(uid)]
              ]
              : callstatus === "Order"
                ? [
                  "|", "|",
                  ["partner_id.name", "ilike", `${searchName}`],
                  ["partner_id.phone", "ilike", `${searchName}`],
                  ["name", "ilike", `${searchName}`],
                  // ["id", "!=", 0],
                  // ["user_id", "=", Number(uid)],
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
        // console.log("searchData===", searchData)

        if (searchData) {

          setcustomerdata((prevData: any) => {
            if (pageNumber === 1) {
              console.log("pageNumber ig condition:::")
              return [...searchData];
            } else {
              const uniqueData = searchData.filter(
                (item) =>
                  !prevData.some((existingItem) => existingItem.id === item.id)
              );
              console.log("pageNumber else condition=====>")
              return [...prevData, ...uniqueData];
              // return [...uniqueData];
            }
          }
          )

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

  // React.useEffect(() => {
  //   if (filterDataFromRoute && filterDataFromRoute.length > 0) {
  //     console.log("filterDataFromRoute caqlling in useeffect=======>")
  //     searchRead(page, search)
  //     setSearchVisible(false)
  //     setSearch('')
  //   }
  // }, [filterDataFromRoute])
  useFocusEffect(
    React.useCallback(() => {
      if (filterDataFromRoute && filterDataFromRoute.length > 0) {
        searchRead(page, search)
        setSearchVisible(false)
        setSearch('')
        setPage(1)
      }
    }, [filterDataFromRoute])
  );

  // useEffect(() => {
  //   if (filterDataFromRoute && filterDataFromRoute.length > 0) {
  //     searchRead(page, search)
  //     setSearchVisible(false)
  //     setSearch('')
  //   }
  // }, [filterDataFromRoute, page])



  useEffect(() => {
    //  searchRead(page);
    // setSearchFun(search)
    // setSearch(search)
    if (search.length === 0) {
      console.log("useEffect calling ::::")

      searchRead(page, search)
      setPage(1)
    }
    // const backScreen = navigation.addListener("focus", () => {
    //   retrieveData();
    //   searchRead(page, search);

    // });
    // return backScreen;
  }, [search]);

  // async function searchRead1(e: any) {
  //   const uid = await AsyncStorage.getItem("userId");
  //   const odooPassword = await AsyncStorage.getItem("@odopassword");
  //   // Loader.isLoading(true);

  //   if (uid) {
  //     const searchCriteria = [["name", "ilike", e]];
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
  //             "res.partner", // Replace with the desired model name
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
  //       console.log("search_read result:::::", responseData.result);
  //     } else {
  //       console.error("search_read error://..", responseData.error);
  //       return null;
  //     }

  //     // return responseData.result;
  //   }

  //   return null;
  // }

  const retrieveData = async () => {
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


  const onendreached = () => {
    // Assuming you want to load more data only if not already loading
    if (!loading) {
      setPage((prevPage) => prevPage + 1);
      console.log("onendreached fun calling:::")
      searchRead(page + 1, search);
    }

  };



  const capitalizeFirstLetter = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  const searchFilterFunction = (text) => {
    // Check if searched text is not blank
    if (text) {
      // Inserted text is not blank
      // Filter the masterDataSource
      // Update FilteredDataSource
      const newData = customerdataWithoutLimit.filter(
        function (item: any) {
          const itemData =
            (item.name
              ? item.name.toUpperCase()
              : ''.toUpperCase())
              (item.partner_id[1] ? item.partner_id[1].toUpperCase()
                : ''.toUpperCase());
          const textData = text.toUpperCase();
          return itemData.indexOf(textData) > -1;
        });
      setFilteredDataSource(newData);
      setSearch(text);
    } else {
      // Inserted text is blank
      // Update FilteredDataSource with masterDataSource
      setFilteredDataSource(customerdata);
      setSearch(text);
    }
  };

  const searchSetValue = (text) => {
    setSearch(text)
    setPage(1)
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
                // width: "70%",
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
        {/* {
          search.length > 2 ?
            <FlatList
              data={ }

            />
        } */}
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
                    {/* {console.log("kjvjbv>>", item.id)} */}
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
                  {/* <Text style={styles.listtext}>{item.date_order}</Text> */}
                  <Text style={styles.listtext}>{moment(item.date_order).add({ hours: 5, minutes: 30 }).format('YY-MM-DD hh:mm:ss')}</Text>
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
