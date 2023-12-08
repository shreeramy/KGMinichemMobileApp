import {
  Text,
  StyleSheet,
  View,
  Image,
  FlatList,
  TouchableOpacity,
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
import {
  AppButton,
  AppContainer,
  AppHeader,
  AppScrollview,
  AppTextInput,
} from "../../Component";
import { useEffect } from "react";
import styles from "./SellOrderDetailsstyle";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ApiEndPoints } from "../../NetworkCall";
import * as OdooApi from "../OdooApi";
interface SellOrderDetailsProps {
  navigation?: any;
  text?: any;
  commonActions?: any;
  route: any;
}

const SellOrderDetails = (props: SellOrderDetailsProps) => {
  const { navigation, text, commonActions, route } = props;
  const [email, setemail] = useState("");
  const saleorederId = route.params.selorederid;
  const [customerdata, setcustomerdata] = useState([]);
  const [prosearch, setorderlilne] = useState([]);
  const [getallorders, setgetallorders] = useState([]);
  const [isModalVisible, setModalVisible] = useState(false);
  const [productdata, setproductdata] = useState([]);

  React.useEffect(() => {
    ProductCatalogapi();
    fetchUserData();
    fetchOrderlineData();
    const backScreen = navigation.addListener("focus", () => {
      fetchUserData();
      fetchOrderlineData();
      retrieveData();
      ProductCatalogapi();
    });
    return backScreen;
  }, []);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  console.log(">>//...", saleorederId);
  // async function searchRead1(e: any) {
  //   const uid = await AsyncStorage.getItem("userId");
  //   // Loader.isLoading(true);

  //   if (uid) {
  //     const searchCriteria = [["order_id", "=", saleorederId]];
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
  //             "sale.order.line", // Replace with the desired model name
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
  //       setgetallorders(customdata);
  //       // setcustomerdata(customdata);
  //       console.log("etorder_line_Data:>:::", responseData.result);
  //     } else {
  //       console.error("search_read error://..", responseData.error);
  //       return null;
  //     }

  //     // return responseData.result;
  //   }

  //   return null;
  // }

  async function ProductCatalogapi() {
    const uid = await AsyncStorage.getItem("userId");
    Loader.isLoading(true);
    // setLoading(true);

    if (uid) {
      const searchCriteria = [["id", "!=", 0]];
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
              "admin",
              "product.product", // Replace with the desired model name
              "search_read",
              [searchCriteria],
              {},
            ],
          },
        }),
      });

      const responseData = await response.json();

      if (responseData.result.length > 0) {
        Loader.isLoading(false);
        // if (responseData.result.length == 0) {
        //   setLoading(false);
        // }
        const customdata = responseData.result;
        setproductdata(customdata);
        // setcustomerdata([...customdata, ...responseData.result]);
        // setoffsetdata(offsetdata + 5);
        console.log("search?>>>>>", responseData.result);
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

  const ItemSeparatorComponent = () => {
    return (
      <View
        style={{
          borderColor: Color.botton_Color,
          borderWidth: 0.3,
          opacity: 0.5,
          marginTop: 5,
        }}
      />
    );
  };
  // ....///////////////////////////\\\

  async function fetchUserData() {
    try {
      const uid = await AsyncStorage.getItem("userId");
      if (uid) {
        const searchCriteria = [["id", "=", saleorederId]];
        const result = await OdooApi.searchRead(
          uid,
          "sale.order",
          searchCriteria
        );

        if (result) {
          const customdata = result;
          setcustomerdata(customdata);
          const getorderline = result[0].order_line;
          setorderlilne(getorderline);
          console.log("get sell_order_details:", result[0].order_line);
        } else {
          console.error("Error fetching data");
        }
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  async function fetchOrderlineData() {
    try {
      const uid = await AsyncStorage.getItem("userId");
      if (uid) {
        const searchCriteria = [["order_id", "=", saleorederId]];
        const result = await OdooApi.searchRead(
          uid,
          "sale.order.line",
          searchCriteria
        );

        if (result) {
          const customdata = result;
          setgetallorders(customdata);
          console.log("get sell_order_details:", result[0].order_line);
        } else {
          console.error("Error fetching data");
        }
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  return (
    <AppContainer>
      <AppScrollview>
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
                Sale Order Details
              </Text>
            </View>
          </View>
          <View style={styles.nameview}>
            <View>
              <Text style={styles.listtextheading}>Customer</Text>
              <View style={styles.item1}>
                <Text style={styles.listtext}>
                  {customerdata[0]?.partner_id[1]}
                </Text>
              </View>
            </View>
            <View style={{ marginTop: Responsive.heightPx(2) }}>
              <Text style={styles.listtextheading}>GSTIN</Text>
              <View style={styles.item1}>
                <Text style={styles.listtext}>
                  {customerdata[0]?.l10n_in_gst_treatment}
                </Text>
              </View>
            </View>
            <View style={{ marginTop: Responsive.heightPx(2) }}>
              <Text style={styles.listtextheading}>Order Date</Text>
              <View style={styles.item1}>
                <Text style={styles.listtext}>
                  {customerdata[0]?.validity_date}
                </Text>
              </View>
            </View>
            <View style={{ marginTop: Responsive.heightPx(2) }}>
              <Text style={styles.listtextheading}>Paid via</Text>
              <View style={styles.item1}>
                <Text style={styles.listtext}>
                  {customerdata[0]?.payment_mode}
                </Text>
              </View>
            </View>
          </View>
          <View
            style={{
              // backgroundColor: "red",
              alignItems: "center",
              flexDirection: "row",
              width: Responsive.widthPx(90),
              justifyContent: "space-between",
            }}
          >
            <View style={{}}>
              <View
                style={{
                  backgroundColor: Color.text_color,
                  marginTop: Responsive.heightPx(5),
                  borderRadius: Responsive.widthPx(2.5),
                  width: Responsive.widthPx(30),
                  alignItems: "center",
                  justifyContent: "center",
                  padding: Responsive.widthPx(3),
                }}
              >
                <Text
                  style={{ color: "#fff", fontSize: 15, fontWeight: "900" }}
                >
                  Order Lines
                </Text>
              </View>
            </View>

            <View style={{}}>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate(Screen.EditOrderLineScreen, {
                    saleorederId: saleorederId,
                  })
                }
                style={{}}
              >
                <View
                  style={{
                    backgroundColor: Color.text_color,
                    marginTop: Responsive.heightPx(5),
                    borderRadius: Responsive.widthPx(2.5),
                    // width: Responsive.widthPx(30),
                    alignItems: "center",
                    justifyContent: "center",
                    padding: Responsive.widthPx(3),
                  }}
                >
                  <Text
                    style={{ color: "#fff", fontSize: 15, fontWeight: "900" }}
                  >
                    Edit Order Lines
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.orderlineview}>
            <View
              style={{
                width: Responsive.widthPx(90),
                flexDirection: "row",
                padding: Responsive.widthPx(1),
                justifyContent: "space-around",
              }}
            >
              <Text style={styles.listtext}>Product</Text>
              <Text style={styles.listtext}>Quantity</Text>
              <Text style={styles.listtext}>Price</Text>
              <Text style={styles.listtext}>Subtotal</Text>
            </View>
            <View
              style={{
                // backgroundColor: "red",
                height: Responsive.heightPx(25),
              }}
            >
              <FlatList
                data={getallorders}
                keyExtractor={(item) => item.id}
                ItemSeparatorComponent={ItemSeparatorComponent}
                renderItem={({ item }) => (
                  <View style={styles.item}>
                    <View
                      style={{
                        flexDirection: "row",
                        width: Responsive.widthPx(80),
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <View
                        style={{
                          width: Responsive.widthPx(20),
                          // backgroundColor: "red",
                          padding: Responsive.heightPx(1),
                        }}
                      >
                        <Text
                          numberOfLines={2}
                          style={{
                            color: Color.choclatetex,
                            fontSize: 15,
                            fontWeight: "bold",
                          }}
                        >
                          {item.name}
                        </Text>
                      </View>
                      <View style={{ width: Responsive.widthPx(10) }}>
                        <Text
                          numberOfLines={2}
                          style={{
                            color: Color.choclatetex,
                            fontSize: 15,
                            fontWeight: "bold",
                          }}
                        >
                          {item.product_uom_qty}
                        </Text>
                      </View>

                      <View style={{ width: Responsive.widthPx(10) }}>
                        <Text
                          numberOfLines={2}
                          style={{
                            color: Color.choclatetex,
                            fontSize: 15,
                            fontWeight: "bold",
                          }}
                        >
                          {item.price_unit}
                        </Text>
                      </View>
                      <View style={{ width: Responsive.widthPx(10) }}>
                        <Text
                          numberOfLines={2}
                          style={{
                            color: Color.choclatetex,
                            fontSize: 15,
                            fontWeight: "bold",
                          }}
                        >
                          {item.price_subtotal}
                        </Text>
                      </View>
                    </View>
                  </View>
                )}
              />
            </View>
          </View>
        </View>
      </AppScrollview>
    </AppContainer>
  );
};

function mapDispatchToProps(dispatch: any) {
  return {
    commonActions: bindActionCreators(Const.commonActions, dispatch),
  };
}

export default connect(null, mapDispatchToProps)(SellOrderDetails);
