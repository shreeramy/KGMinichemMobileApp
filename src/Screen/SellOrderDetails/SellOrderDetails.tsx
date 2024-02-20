import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useState } from "react";
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
  AppContainer,
  AppScrollview
} from "../../Component";
import {
  Color,
  Const,
  Images,
  Loader,
  Responsive,
  Screen
} from "../../Helper";
import { ApiEndPoints } from "../../NetworkCall";
import * as OdooApi from "../OdooApi";
import styles from "./SellOrderDetailsstyle";

interface SellOrderDetailsProps {
  navigation?: any;
  text?: any;
  commonActions?: any;
  route: any;
}

const SellOrderDetails = (props: SellOrderDetailsProps) => {
  const { navigation, text, commonActions, route } = props;
  const saleorederId = route.params.selorederid;
  const [customerdata, setcustomerdata] = useState([]);
  const [prosearch, setorderlilne] = useState([]);
  const [getallorders, setgetallorders] = useState([]);
  const [productdata, setproductdata] = useState([]);

  React.useEffect(() => {
    // ProductCatalogapi();
    fetchUserData();
    fetchOrderlineData();
    const backScreen = navigation.addListener("focus", () => {
      fetchUserData();
      fetchOrderlineData();
      // ProductCatalogapi();
    });
    return backScreen;
  }, []);

  async function ProductCatalogapi() {
    const uid = await AsyncStorage.getItem("userId");
    const odooPassword = await AsyncStorage.getItem("@odopassword");
    Loader.isLoading(true);
    if (uid) {
      const searchCriteria = [
        ["id", "!=", 0],
        ["sale_ok", "=", true],
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
              "product.product", 
              "search_read",
              [searchCriteria],
              {
                "fields": ["id", "uom_id", "display_name"]
              },
            ],
          },
        }),
      });

      const responseData = await response.json();
      console.log("responseData.result::", responseData.result)
      if (responseData.result.length > 0) {
        Loader.isLoading(false);
        const customdata = responseData.result;
        setproductdata(customdata);
      } else {
        console.error("search_read error://..", responseData.error);
        return null;
      }
    }

    return null;
  }

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

  async function fetchUserData() {
    try {
      const uid = await AsyncStorage.getItem("userId");
      if (uid) {
        const searchCriteria = [["id", "=", saleorederId]];
        let fields = ["id", "name", "order_line", "date_order", "state", "user_id", "partner_id", "l10n_in_gst_treatment", "validity_date", "delivery_status", "invoice_status", "payment_mode"]
        const result = await OdooApi.searchRead(
          uid,
          "sale.order",
          searchCriteria,
          1,
          0,
          fields
        );

        if (result) {
          const customdata = result;
          setcustomerdata(customdata);
          const getorderline = result[0].order_line;
          setorderlilne(getorderline);
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
        let fields = ["id", "name", "product_uom_qty", "product_uom", "price_unit", "price_subtotal", "product_id", "order_id"]
        const result = await OdooApi.searchRead(
          uid,
          "sale.order.line",
          searchCriteria,
          0,
          0,
          fields
        );

        if (result) {
          const customdata = result;
          setgetallorders(customdata);
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
            {customerdata[0]?.delivery_status.length > 0 ? (
              <View style={{ marginTop: Responsive.heightPx(2) }}>
                <Text style={styles.listtextheading}>Delivery Status</Text>
                <View style={styles.item1}>
                  <Text style={styles.listtext}>
                    {customerdata[0]?.delivery_status}
                  </Text>
                </View>
              </View>
            ) : null}
            {customerdata[0]?.invoice_status.length > 0 ? (
              <View style={{ marginTop: Responsive.heightPx(2) }}>
                <Text style={styles.listtextheading}>Invoice Status</Text>
                <View style={styles.item1}>
                  <Text style={styles.listtext}>
                    {customerdata[0]?.invoice_status}
                  </Text>
                </View>
              </View>
            ) : null}

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
                  marginTop: Responsive.heightPx(2),
                  borderRadius: Responsive.widthPx(2.5),
                  width: Responsive.widthPx(40),
                  alignItems: "center",
                  justifyContent: "center",
                  padding: Responsive.widthPx(3),
                }}
              >
                <Text
                  style={{ color: "#fff", fontSize: 15, fontWeight: "900" }}
                >
                  Ordered Product
                </Text>
              </View>
            </View>
          </View>

          <View style={styles.orderlineview}>
            <View
              style={{
                flexDirection: "row",
                padding: Responsive.widthPx(1),
                justifyContent: "space-between",
              }}
            >
              <Text style={[styles.listtextCell, { width: "40%" }]}>
                Product
              </Text>
              <Text style={[styles.listtextCell, { width: "20%" }]}>Qty</Text>
              <Text style={[styles.listtextCell, { width: "20%" }]}>Price</Text>
              <Text style={[styles.listtextCell, { width: "20%" }]}>
                Subtotal
              </Text>
            </View>
            <View
              style={{
                height: Responsive.heightPx(25),
              }}
            >
              <FlatList
                data={getallorders}
                keyExtractor={(item) => item.id}
                ItemSeparatorComponent={ItemSeparatorComponent}
                nestedScrollEnabled={true}
                renderItem={({ item }) => {

                  return (
                    <View style={styles.item}>
                      <TouchableOpacity
                        style={{
                          flexDirection: "row",
                          justifyContent: "space-between",
                          padding: Responsive.widthPx(1),
                          alignItems: "center",
                        }}
                        onPress={() => {
                          navigation.navigate(Screen.EditOrderLineScreen, {
                            item: item,
                          });
                        }}
                      >
                        <View
                          style={{
                            width: "40%",
                            alignItems: "center",
                     
                            padding: Responsive.heightPx(1),
                          }}
                        >
                          <Text
                            numberOfLines={2}
                            style={{
                              color: Color.choclatetex,
                              fontSize: 11,
                              fontWeight: "bold",
                            }}
                          >
                            {item.name}
                          </Text>
                        </View>
                        <View style={{ width: "20%", alignItems: "center" }}>
                          <Text
                            numberOfLines={2}
                            style={{
                              color: Color.choclatetex,
                              fontSize: 11,
                              fontWeight: "bold",
                            }}
                          >
                            {item.product_uom_qty +
                              " (" +
                              item.product_uom[1] +
                              ")"}
                          </Text>
                        </View>

                        <View style={{ width: "20%", alignItems: "center" }}>
                          <Text
                            numberOfLines={2}
                            style={{
                              color: Color.choclatetex,
                              fontSize: 11,
                              fontWeight: "bold",
                            }}
                          >
                            {item.price_unit}
                          </Text>
                        </View>
                        <View style={{ width: "20%", alignItems: "center" }}>
                          <Text
                            numberOfLines={2}
                            style={{
                              color: Color.choclatetex,
                              fontSize: 11,
                              fontWeight: "bold",
                            }}
                          >
                            {item.price_subtotal}
                          </Text>
                        </View>
                      </TouchableOpacity>
                    </View>
                  )
                }}
              />
            </View>
          </View>
          <View style={{
            paddingBottom: 20, flexDirection: 'row', alignSelf: 'flex-end',
            paddingRight: 30
          }}>
            <Text
              style={{
                color: Color.black,
                fontSize: 14,
                fontWeight: "bold",
              }}
            >
              Sub total
            </Text>
            <Text
              style={{
                color: Color.choclatetex,
                fontSize: 14,
                fontWeight: "bold",
                paddingLeft: 15
              }}
            >
              {
                getallorders.reduce((acc, next) => {
                  return acc + next.price_subtotal
                }, 0)
              }
            </Text>
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