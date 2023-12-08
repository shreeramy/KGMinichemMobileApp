import {
  Text,
  StyleSheet,
  View,
  Image,
  ImageBackground,
  TouchableOpacity,
  FlatList,
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
import styles from "./EditOrderLineScreenstyle";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ApiEndPoints } from "../../NetworkCall";
import * as OdooApi from "../OdooApi";
import { color } from "react-native-reanimated";

interface EditOrderLineScreenProps {
  navigation?: any;
  text?: any;
  commonActions?: any;
  route?: any;
}

const EditOrderLineScreen = (props: EditOrderLineScreenProps) => {
  const { navigation, text, commonActions, route } = props;
  const [name, setname] = useState("");
  const [Email, setEmail] = useState("");
  const [Mobile, setMobile] = useState("");
  const [Country, setCountry] = useState("");
  const [gstNumber, setgstNumber] = useState("");
  const [Address, setAddress] = useState("");
  const [State, setState] = useState("");
  const [productquanty, setproductquanty] = useState("");
  const [Quantity, setQuantity] = useState(productquanty);
  const [customerdata, setcustomerdata] = useState([]);
  const saleorederId = route?.params?.saleorederId;
  const [getallorders, setgetallorders] = useState([]);
  console.log("productquanty..//.", productquanty);
  React.useEffect(() => {
    fetchOrderlineData();
    const backScreen = navigation.addListener("focus", () => {
      fetchOrderlineData();
      retrieveData();
    });
    return backScreen;
  }, []);
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
          <View style={styles.topcontener}>
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
                <Text
                  style={{ fontSize: 20, marginLeft: 5, color: Color.black }}
                >
                  Edit Order Line
                </Text>
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
                {/* <Text style={styles.listtext}>Subtotal</Text> */}
              </View>
              <View
                style={{
                  // backgroundColor: "red",
                  height: Responsive.heightPx(50),
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
                            {console.log(">>?/...//", item.product_uom_qty)},
                            {setproductquanty(item.product_uom_qty)},{item.name}
                          </Text>
                        </View>
                        <TextInput
                          placeholderTextColor={Color.botton_Color}
                          style={{
                            // width: Responsive.widthPx(35),
                            // borderWidth: 1,
                            borderColor: "gray",
                            marginBottom: 10,
                            padding: 10,
                            borderRadius: 5,
                            color: Color.botton_Color,
                          }}
                          placeholder={`${item.product_uom_qty}`}
                          value={productquanty ? productquanty : Quantity}
                          keyboardType={"number-pad"}
                          onChangeText={() => setQuantity(item.id)}
                        />
                        {/* <View style={{ width: Responsive.widthPx(10) }}>
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
                        </View> */}

                        <TextInput
                          placeholderTextColor={Color.botton_Color}
                          style={{
                            // width: Responsive.widthPx(35),
                            // borderWidth: 1,
                            borderColor: "gray",
                            marginBottom: 10,
                            padding: 10,
                            borderRadius: 5,
                            color: Color.botton_Color,
                          }}
                          placeholder={`${item.price_unit}`}
                          value={Quantity}
                          keyboardType={"number-pad"}
                          onChangeText={() => setQuantity(item.id)}
                        />

                        {/* <View style={{ width: Responsive.widthPx(10) }}>
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
                        </View> */}
                        {/* <View style={{ width: Responsive.widthPx(10) }}>
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
                        </View> */}
                      </View>
                    </View>
                  )}
                />
              </View>
            </View>
          </View>
        </View>
      </AppScrollview>
    </AppContainer>
  );
};

export default EditOrderLineScreen;
