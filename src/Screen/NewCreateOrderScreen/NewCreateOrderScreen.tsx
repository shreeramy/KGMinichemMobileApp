import {
  Text,
  StyleSheet,
  View,
  Image,
  FlatList,
  TouchableOpacity,
  TextInput,
  Button,
  KeyboardAvoidingView,
  Platform,
  Alert,
  ActivityIndicator,
} from "react-native";
import React, { Component, useRef, useState } from "react";
import DateTimePicker from "@react-native-community/datetimepicker";
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
import AsyncStorage from "@react-native-async-storage/async-storage";
import RBSheet from "react-native-raw-bottom-sheet";
import Modal from "react-native-modal";
import Geolocation from "@react-native-community/geolocation";
import { PERMISSIONS, request } from "react-native-permissions";
import {
  AppButton,
  AppContainer,
  AppHeader,
  AppScrollview,
  AppTextInput,
} from "../../Component";
import { useEffect } from "react";
import styles from "./NewCreateOrderScreenstyle";
import { ApiEndPoints } from "../../NetworkCall";
import moment from "moment";
import { cos, log } from "react-native-reanimated";
import * as OdooApi from "../OdooApi";

interface NewCreateOrderScreenstyleProps {
  navigation?: any;
  text?: any;
  commonActions?: any;
  route?: any;
}
var arrval = [];
const NewCreateOrderScreenstyle = (props: NewCreateOrderScreenstyleProps) => {
  const { navigation, text, commonActions, route } = props;
  const getcustomeId = route?.params?.sendcustomerId;
  const sendCustomerName = route?.params?.sendcustomerName;
  console.log("sendCustomerName::", sendCustomerName)
  const [orederdate, setorederdate] = useState("");
  const [createorder, setcreateorder] = useState([]);
  const refRBSheet: any = useRef();
  const refRBSheet1: any = useRef();
  const PaymentModesheet: any = useRef();
  const refRBSheet2: any = useRef();
  const refRBSheet3: any = useRef();
  // const [roll, setroll] = React.useState(sendCustomerName || "Select Customer");
  const [roll, setroll] = React.useState("Select Customer");
  const [cutomerId, setcutomerId] = React.useState(getcustomeId);
  const [proname, setproname] = React.useState("Select Product");
  console.log("proname", proname)
  const [gstsendvalue, setgstsendvalue] = React.useState("");
  const [gstinpro, setgstinpro] = React.useState("GSTIN");
  const [PaymentMode, setPaymentMode] = React.useState("Payment Mode");
  const [customerdata, setcustomerdata] = useState([]);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  // console.log("customerdata==>", customerdata)
  const [productdata, setproductdata] = useState([]);
  const regex = /\(([^)]+)\)/;
  // useEffect(() => {
  //   if (sendCustomerName) {
  //     sendCustomerName.map(ele => console.log("ele", ele))
  //   }
  // }, [sendCustomerName])
  const [gstin, setgstin] = useState([
    {
      name: "Registered Business-Regular",
      sendvale: "regular",
    },
    {
      name: "Registered Business-composition",
      sendvale: "composition",
    },
    {
      name: "untered Business",
      sendvale: "unregistered",
    },
    {
      name: "consumer",
      sendvale: "consumer",
    },
    {
      name: "overseas",
      sendvale: "overseas",
    },
    {
      sendvale: "spacial_economic_zone",
      name: "Spacial Economic Zone",
    },
    {
      sendvale: "deemed_export",
      name: "Deemed Exportm",
    },
    {
      sendvale: "uin_holdes",
      name: "UIN Holders",
    },
  ]);
  const [payment, setPayment] = useState([
    {
      id: 1,
      name: "Cash",
    },
    {
      id: 2,
      name: "Credit Card",
    },
    {
      id: 3,
      name: "Google Pay",
    },
    {
      id: 4,
      name: "PhonePe",
    },
    {
      id: 5,
      name: "Debit Card",
    },
    {
      id: 6,
      name: "Net Banking",
    },
    {
      id: 7,
      name: "Other UPI",
    },

    // Add more payment methods as needed
  ]);

  const [isModalVisible, setModalVisible] = useState(false);
  const [text1, setText1] = useState("");
  const [text2, setText2] = useState("");
  const [text3, setText3] = useState("");
  const [SelectUnit, setSelectUnit] = useState("");
  const [SelectUnitid, setSelectUnitid] = useState(Number);
  const [items, setItems] = useState([]);
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [sendorderdata, setsendorderdata] = useState([]);
  const [unitname, setunitname] = useState([]);
  const [orderLines, setOrderLines] = useState([]);
  const [newUnitIds, setNewUnitIds] = useState([]);
  const [generateId, setGenerateId] = useState(false);
  const [newGeneratedIds, setNewGeneratedIds] = useState("");
  const [loading, setLoading] = useState(false);
  const [noMoreData, setNoMoreData] = useState(false);
  console.log("")

  const [addval, setaddval] = useState([]);
  // console.log("addVal::", addval && addval.length)
  React.useEffect(() => {
    retrieveData();
    getmatricunit();
    ProductCatalogapi();
    const backScreen = navigation.addListener("focus", () => {
      retrieveData();
      getmatricunit();
      ProductCatalogapi();
      arrval = [];
    });
    return backScreen;
  }, []);

  // React.useEffect(() => {
  //   getcustomer();
  //   // searchReadData()
  // }, []);

  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowDatePicker(Platform.OS === "ios");
    setDate(currentDate);
  };

  const showDatepicker = () => {
    setShowDatePicker(true);
  };

  const formattedDate = moment(date).format("YYYY-MM-DD");
  // console.log(">>?formattedDate...", formattedDate);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const generateTwoDigitUniqueId = (existingIds: string[]): string => {
    let uniqueId;

    do {
      uniqueId = Math.floor(Math.random() * 90 + 10).toString();
    } while (existingIds.includes(uniqueId));

    return uniqueId;
  };

  const handleUnit = (selectedUnit: string): void => {
    setGenerateId(true);
    setSelectUnit(selectedUnit);

    // const id = generateTwoDigitUniqueId(newUnitIds);
    // setNewGeneratedIds(id);

    // const Unitregex = /\(([^)]+)\)/;
    // const match = selectedUnit.match(Unitregex);

    // if (match) {
    //   const result = match[1];
    //   setSelectUnit(result);
    // } else {
    //   console.log("No match found");
    // }
  };

  // >>>>>>????????????....?????????//////????????????????????

  useEffect(() => {
    console.log("Order Lines updated:>>>", orderLines);
  }, [orderLines]);

  useEffect(() => {
    const customUnitIds = unitname.map((item) => item.id);
    setNewUnitIds(customUnitIds);
  }, [SelectUnit, unitname]);

  const callfinesproduct = async () => {
    // addItem();
    Loader.isLoading(true);
    await setTimeout(() => {
      Loader.isLoading(false);
      createsellorder();
    }, 20000);
  };

  const addItem = () => {
    if (text1 || text2 || text3) {
      const newOrderLine = [
        0,
        0,
        {
          product_id: parseInt(text1),
          product_uom_qty: parseInt(text2),
          price_unit: parseFloat(text3),
          product_uom: generateId
            ? parseInt(newGeneratedIds)
            : parseInt(SelectUnitid),
        },
      ];

      arrval = [...arrval, newOrderLine];
      // const newOrderLine1 = [
      //   0,
      //   0,
      //   { product_name: "adhesive", product_qunt: 5, prod_price: 12 },
      // ];
      // setaddval((prevArr) => [...prevArr, newOrderLine, newOrderLine1]);
      const newOrderLine1 = {
        product_id: 0,
        product_uom_qty: 0,
        price_unit: 0,
        product_uom: 0,
        product_name: proname,
        product_qunt: text2,
        prod_price: text3,
      };

      setaddval((prevArr) => [...prevArr, newOrderLine1]);

      setText1("");
      setText2("");
      setText3("");
      setproname('Select Product')
      console.log("?orde_addv>>?//", addval);
      console.log(">>>???", arrval);
    }
  };

  const removeItem = (index) => {
    const newAddVal = [...addval];
    newAddVal.splice(index, 1);
    setaddval(newAddVal);

    // Remove the corresponding item from arrval
    const newArrVal = [...arrval];
    newArrVal.splice(index, 1);
    arrval = newArrVal;
  };

  async function createsellorder() {
    const uid = await AsyncStorage.getItem("userId");
    const odooPassword = await AsyncStorage.getItem("@odopassword");
    Loader.isLoading(true);
    if (uid) {
      const userData = {
        partner_id: cutomerId,
        payment_mode: PaymentMode,
        l10n_in_gst_treatment: gstsendvalue,
        validity_date: formattedDate,
        order_line: arrval,
      };
      console.log("arrval---------->", arrval);

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
              "sale.order",
              "create",
              [userData],
              {},
            ],
          },
        }),
      });

      const responseData = await response.json();

      if (responseData.result) {
        Loader.isLoading(false);
        Utility.showSuccessToast("sellorder created successfully");
        navigation.navigate(Screen.ShowOrderScreen);
        const customdata = responseData.result;
        // setcustomerdata(customdata);
        // console.log("create salallorder_Suucess:", responseData.result);
      } else {
        Loader.isLoading(false);
        Utility.showDangerToast("sellorder not created");
        console.error("create failed:", responseData.error);
        return null;
      }

      return responseData.result;
    }

    return null;
  }

  // &&&&&&&&&&&&&&&&&&&&&&&&&&&&&******************&&&&&&&&&&&&********

  // async function createsellorder(order) {
  //   const uid = await AsyncStorage.getItem("userId");
  // const odooPassword = await AsyncStorage.getItem("@odopassword");
  //   console.log("createorder=--array", createorder);
  //   // Loader.isLoading(true);
  //   Loader.isLoading(true);
  //   if (uid) {
  //     const searchCriteria = [["id", "!=", 0]];
  //     const userData = {
  //       partner_id: cutomerId,
  //       payment_mode: PaymentMode,
  //       l10n_in_gst_treatment: gstsendvalue,
  //       validity_date: formattedDate, // Use a valid date format (YYYY-MM-DD)

  //       order_line: createorder,
  //     };
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
  //             "create",
  //             [userData],
  //             {},
  //           ],
  //         },
  //       }),
  //     });
  //     console.log("user.????", userData);
  //     const responseData = await response.json();
  //     console.log("??>>>/////...", responseData);
  //     if (responseData.result) {
  //       Loader.isLoading(false);
  //       Utility.showSuccessToast("sellorder created successfully");
  //       navigation.navigate(Screen.ShowOrderScreen);
  //       const customdata = responseData.result;
  //       setcustomerdata(customdata);
  //       console.log("create salallorder_Suucess:", responseData.result);
  //     } else {
  //       Loader.isLoading(false);
  //       Utility.showDangerToast("sellorder not created");
  //       console.error("create faild:>>", responseData.error);
  //       return null;
  //     }

  //     return responseData.result;
  //   }

  //   return null;
  // }

  // const addItem = async () => {
  //   console.log(">>>?.....Items", ...items);
  //   if (text1 || text2 || text3) {
  //     const newOrderLine = [
  //       0,
  //       0,
  //       {
  //         product_id: parseInt(text1),
  //         product_uom_qty: parseInt(text2),
  //         price_unit: parseFloat(text3),
  //         product_uom: parseInt(SelectUnitid),
  //       },
  //     ];

  //     // setsendorderdata([...items, orderLine]);
  //     setOrderLines([...orderLines, newOrderLine]);
  //     // setOrderLines((prevOrderLines) => [...prevOrderLines, newOrderLine]);
  //     console.log("/...//...>>>?///", ...orderLines, ">>>>>", newOrderLine);
  //     console.log("===//..??", newOrderLine);
  //     // setItems([...items, orderLine]);
  //     setText1("");
  //     setText2("");
  //     setText3("");
  //     setcreateorder(items);
  //     console.log(";;<<m>>,///???", ...items);
  //   }
  // };

  useEffect(() => {
    searchRead1()
  }, [])

  async function searchRead1() {
    console.log('searchRead1-->', 'searchRead1');
    const uid = await AsyncStorage.getItem("userId");
    const uIDInt = parseInt(uid)
    console.log("uIDInt", uIDInt)
    const odooPassword = await AsyncStorage.getItem("@odopassword");
    Loader.isLoading(true);

    if (uid) {
      const searchCriteria = [["id", "!=", 0], ["create_uid", "=", uIDInt]];
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
              { "fields": ["id", "name"] },
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


  async function getmatricunit(e: any) {
    const uid = await AsyncStorage.getItem("userId");
    const odooPassword = await AsyncStorage.getItem("@odopassword");
    // Loader.isLoading(true);

    if (uid) {
      const searchCriteria = [];
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
              "uom.uom", // Replace with the desired model name
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
        // console.log("Checing custom", customdata);
        setunitname(customdata);
        // console.log("search_get>>>??", responseData.result);
      } else {
        // console.error("search_read error://..", responseData.error);
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

  // Function to perform a search_read operation
  // async function getcustomer() {
  //   const uid = await AsyncStorage.getItem("userId");
  //   const odooPassword = await AsyncStorage.getItem("@odopassword");
  //   Loader.isLoading(true);

  //   if (uid) {
  //     const searchCriteria = [["id", "!=", 0]];
  //     // if (name){
  //     //   searchCriteria.append(["name", "=", name])
  //     // }
  //     // const searchCriteria = [];
  //     // Replace with your search criteria

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
  //     // console.log("responseData.result in getcustomer", responseData)
  //     if (responseData.result) {

  //       Loader.isLoading(false);
  //       const customdata = responseData.result;
  //       setcustomerdata(customdata);
  //       // console.log("search_read result:::::", responseData.result);
  //     } else {
  //       // console.error("search_read error://..", responseData.error);
  //       Loader.isLoading(false);
  //       return null;
  //     }

  //     // return responseData.result;
  //   }
  //   Loader.isLoading(false);
  //   return null;
  // }

  const Getunitname = () => (
    <View style={{ backgroundColor: "#fff" }}>
      <FlatList
        data={unitname}
        renderItem={({ item }) => (
          <TouchableOpacity
            // onPress={() =>
            //   refRBSheet.current.close(
            //     setroll(item.name),
            //     console.log("sdjcvh", item.name)
            //   )
            // }
            onPress={() =>
              refRBSheet3.current.close(
                // setroll(item?.name),
                console.log("????>...???.>>>", item),
                setSelectUnit(item?.name),
                setSelectUnitid(item?.id)
              )
            }
            style={{
              width: Responsive.widthPx(100),
              height: Responsive.heightPx(10),
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <View
              style={{
                // backgroundColor: "red",
                width: Responsive.widthPx(90),
                justifyContent: "center",
                alignItems: "center",
                // height: Responsive.heightPx(3),
                // borderWidth: 1,
                borderColor: Color.text_input_borderColor,
                marginTop: Responsive.heightPx(3),
                borderRadius: Responsive.widthPx(3),
              }}
            >
              <Text
                style={{
                  color: Color.text_color,
                  // fontSize: 20,
                  marginHorizontal: 12,
                  marginVertical: 5,
                }}
              >
                {item?.name}
              </Text>
            </View>
          </TouchableOpacity>
        )}
        numColumns={1}
      />
    </View>
  );

  const YourOwnComponent = () => (
    <View style={{ backgroundColor: "#fff" }}>
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
      {
        customerdata.length === 0 ?
          <View>
            <ActivityIndicator size="large" color="#0000ff" />
          </View>
          :
          <FlatList
            data={customerdata}
            renderItem={({ item }) => {
              console.log("item::::::", item)
              return (

                <TouchableOpacity
                  // onPress={() =>
                  //   refRBSheet.current.close(
                  //     setroll(item.name),
                  //     console.log("sdjcvh", item.name)
                  //   )
                  // }
                  onPress={() =>
                    refRBSheet.current.close(
                      setroll(item?.name),
                      setcutomerId(item?.id)
                    )
                  }
                  style={{
                    width: Responsive.widthPx(100),
                    height: Responsive.heightPx(10),
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <View
                    style={{
                      // backgroundColor: "red",
                      width: Responsive.widthPx(90),
                      justifyContent: "center",
                      alignItems: "center",
                      // height: Responsive.heightPx(3),
                      // borderWidth: 1,
                      borderColor: Color.text_input_borderColor,
                      marginTop: Responsive.heightPx(3),
                      borderRadius: Responsive.widthPx(3),
                    }}
                  >
                    <Text
                      style={{
                        color: Color.text_color,
                        // fontSize: 20,
                        marginHorizontal: 12,
                        marginVertical: 5,
                      }}
                    >
                      {item.name}
                    </Text>
                  </View>
                </TouchableOpacity>
              )
            }}
            numColumns={1}
          />
      }

    </View>
  );

  const YourOwnComponent1 = () => (
    <View style={{ backgroundColor: "#fff" }}>
      <FlatList
        data={gstin}
        renderItem={({ item }) => (
          <TouchableOpacity
            // onPress={() =>
            //   refRBSheet.current.close(
            //     setroll(item.name),
            //     console.log("sdjcvh", item.name)
            //   )
            // }
            onPress={() =>
              refRBSheet1.current.close(
                setgstinpro(item?.name),
                setgstsendvalue(item?.sendvale)
              )
            }
            style={{
              width: Responsive.widthPx(100),
              // height: Responsive.heightPx(3),
              justifyContent: "center",
              alignItems: "center",
              // backgroundColor: "red",
            }}
          >
            <View
              style={{
                // backgroundColor: "red",
                width: Responsive.widthPx(90),
                justifyContent: "center",
                alignItems: "center",
                // height: Responsive.heightPx(3),
                // borderWidth: 1,
                borderColor: Color.text_input_borderColor,
                marginTop: Responsive.heightPx(1),
                borderRadius: Responsive.widthPx(3),
              }}
            >
              <Text
                style={{
                  color: Color.text_color,
                  // fontSize: 20,
                  marginHorizontal: 12,
                  marginVertical: 5,
                }}
              >
                {item.name}
              </Text>
            </View>
          </TouchableOpacity>
        )}
        numColumns={1}
      />
    </View>
  );
  const PaymentModecomponent = () => (
    <View style={{ backgroundColor: "#fff" }}>
      <FlatList
        data={payment}
        renderItem={({ item }) => (
          <TouchableOpacity
            // onPress={() =>
            //   refRBSheet.current.close(
            //     setroll(item.name),
            //     console.log("sdjcvh", item.name)
            //   )
            // }
            onPress={() =>
              PaymentModesheet.current.close(
                setPaymentMode(item?.name)
                // setgstsendvalue(item?.sendvale)
              )
            }
            style={{
              width: Responsive.widthPx(100),
              // height: Responsive.heightPx(3),
              justifyContent: "center",
              alignItems: "center",
              // backgroundColor: "red",
            }}
          >
            <View
              style={{
                // backgroundColor: "red",
                width: Responsive.widthPx(90),
                justifyContent: "center",
                alignItems: "center",
                // height: Responsive.heightPx(3),
                // borderWidth: 1,
                borderColor: Color.text_input_borderColor,
                marginTop: Responsive.heightPx(1),
                borderRadius: Responsive.widthPx(3),
              }}
            >
              <Text
                style={{
                  color: Color.text_color,
                  // fontSize: 20,
                  marginHorizontal: 12,
                  marginVertical: 5,
                }}
              >
                {item.name}
              </Text>
            </View>
          </TouchableOpacity>
        )}
        numColumns={1}
      />
    </View>
  );

  const YourOwnComponent2 = () => (
    <View style={{ backgroundColor: "#fff" }}>
      <FlatList
        data={productdata}
        renderItem={({ item }) => (
          <TouchableOpacity
            // onPress={() =>
            //   refRBSheet.current.close(
            //     setroll(item.name),
            //     console.log("sdjcvh", item.name)
            //   )
            // }
            onPress={() => {
              // console.log("uomid------------>", item?.uom_id);

              refRBSheet2.current.close(
                setproname(item?.display_name),
                setSelectUnit(item?.uom_id[1]),
                setSelectUnitid(item?.uom_id[0]),
                console.log("Chcking item", item),
                setText1(item?.id)
              );
            }}
            style={{
              width: Responsive.widthPx(100),
              // height: Responsive.heightPx(3),
              justifyContent: "center",
              alignItems: "center",
              // backgroundColor: "red",
            }}
          >
            <View
              style={{
                // backgroundColor: "red",
                width: Responsive.widthPx(90),
                justifyContent: "center",
                alignItems: "center",
                // height: Responsive.heightPx(3),
                // borderWidth: 1,
                borderColor: Color.text_input_borderColor,
                marginTop: Responsive.heightPx(1),
                borderRadius: Responsive.widthPx(3),
              }}
            >
              <Text
                style={{
                  color: Color.text_color,
                  // fontSize: 20,
                  marginHorizontal: 12,
                  marginVertical: 5,
                }}
              >
                {/* {item.name} */}
                {item?.display_name}
              </Text>
            </View>
          </TouchableOpacity>
        )}
        numColumns={1}
      />
    </View>
  );

  async function ProductCatalogapi() {
    const uid = await AsyncStorage.getItem("userId");
    const odooPassword = await AsyncStorage.getItem("@odopassword");
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
              odooPassword,
              "product.product", // Replace with the desired model name
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
      // console.log("responseData.result.length in ProductCatalogapi", responseData)
      if (responseData.result.length > 0) {

        Loader.isLoading(false);
        // if (responseData.result.length == 0) {
        //   setLoading(false);
        // }
        const customdata = responseData.result;
        setproductdata(customdata);
        // setcustomerdata([...customdata, ...responseData.result]);
        // setoffsetdata(offsetdata + 5);
        // console.log("search?>>>>>", responseData.result);
      } else {
        console.error("search_read error://..", responseData.error);
        Loader.isLoading(false);
        return null;
      }

      // return responseData.result;
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

  return (
    <AppContainer>
      {/* <KeyboardAvoidingView> */}
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
              New
            </Text>
          </View>
        </View>

        <View>
          <RBSheet
            ref={refRBSheet}
            height={300}
            openDuration={250}
            customStyles={{
              container: {
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: Color.white,
                borderTopLeftRadius: 10,
              },
            }}
          >
            <YourOwnComponent />
          </RBSheet>
        </View>

        <View>
          <RBSheet
            ref={refRBSheet3}
            height={300}
            openDuration={250}
            customStyles={{
              container: {
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: Color.black,
                borderTopLeftRadius: 10,
              },
            }}
          >
            <Getunitname />
          </RBSheet>
        </View>

        <View>
          <RBSheet
            ref={refRBSheet1}
            height={300}
            openDuration={250}
            customStyles={{
              container: {
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: Color.black,
                borderTopLeftRadius: 10,
              },
            }}
          >
            <YourOwnComponent1 />
          </RBSheet>
        </View>

        <View>
          <RBSheet
            ref={PaymentModesheet}
            height={300}
            openDuration={250}
            customStyles={{
              container: {
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: Color.black,
                borderTopLeftRadius: 10,
              },
            }}
          >
            <PaymentModecomponent />
          </RBSheet>
        </View>
        <View>
          <RBSheet
            ref={refRBSheet2}
            height={300}
            openDuration={250}
            customStyles={{
              container: {
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: Color.black,
                borderTopLeftRadius: 10,
              },
            }}
          >
            <YourOwnComponent2 />
          </RBSheet>
        </View>

        <View style={styles.textinputstyle}>
          <View style={styles.textinputstyle}>
            <Text style={styles.labeltext}>Customer</Text>

            <TouchableOpacity
              onPress={() => {
                refRBSheet.current.open();
              }}
              style={{
                width: Responsive.widthPx(90),
                height: Responsive.widthPx(15),
                borderRadius: Responsive.widthPx(5),
                flexDirection: "row",
                shadowColor: "#000",
                shadowOffset: {
                  width: 0,
                  height: 2,
                },
                shadowOpacity: 0.25,
                shadowRadius: 3.84,
                elevation: 5,
                // borderWidth: 1,
                // borderColor: Color.text_input_borderColor,
                alignItems: "center",
                justifyContent: "space-between",
                alignContent: "center",
                backgroundColor: "#fff",
                marginTop: Responsive.heightPx(2),
              }}
            >
              <Text
                style={{
                  fontSize: 15,
                  color: "#000",
                  marginLeft: Responsive.widthPx(4),
                }}
              >
                {roll}
              </Text>
              <Image
                style={{ marginRight: Responsive.widthPx(4) }}
                source={Images.downig}
              />
            </TouchableOpacity>

          </View>

          <View style={styles.textinputstyle}>
            <Text style={styles.labeltext}>GSTIN</Text>
            <TouchableOpacity
              onPress={() => {
                refRBSheet1.current.open();
              }}
              style={{
                width: Responsive.widthPx(90),
                height: Responsive.widthPx(15),
                borderRadius: Responsive.widthPx(5),
                flexDirection: "row",
                shadowColor: "#000",
                shadowOffset: {
                  width: 0,
                  height: 2,
                },
                shadowOpacity: 0.25,
                shadowRadius: 3.84,
                elevation: 5,
                // borderWidth: 1,
                // borderColor: Color.text_input_borderColor,
                alignItems: "center",
                justifyContent: "space-between",
                alignContent: "center",
                backgroundColor: "#fff",
                marginTop: Responsive.heightPx(2),
              }}
            >
              <Text
                style={{
                  fontSize: 15,
                  color: "#000",
                  marginLeft: Responsive.widthPx(4),
                }}
              >
                {gstinpro}
              </Text>
              <Image
                style={{ marginRight: Responsive.widthPx(4) }}
                source={Images.downig}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.textinputstyle}>
            <Text style={styles.labeltext}>Payment Mode</Text>
            <TouchableOpacity
              onPress={() => {
                PaymentModesheet.current.open();
              }}
              style={{
                width: Responsive.widthPx(90),
                height: Responsive.widthPx(15),
                borderRadius: Responsive.widthPx(5),
                flexDirection: "row",
                shadowColor: "#000",
                shadowOffset: {
                  width: 0,
                  height: 2,
                },
                shadowOpacity: 0.25,
                shadowRadius: 3.84,
                elevation: 5,
                // borderWidth: 1,
                // borderColor: Color.text_input_borderColor,
                alignItems: "center",
                justifyContent: "space-between",
                alignContent: "center",
                backgroundColor: "#fff",
                marginTop: Responsive.heightPx(2),
              }}
            >
              <Text
                style={{
                  fontSize: 15,
                  color: "#000",
                  marginLeft: Responsive.widthPx(4),
                }}
              >
                {PaymentMode}
                {/* {gstinpro} */}
              </Text>
              <Image
                style={{ marginRight: Responsive.widthPx(4) }}
                source={Images.downig}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.textinputstyle}>
            <Text style={styles.labeltext}>Order Date</Text>
            {showDatePicker && (
              <DateTimePicker
                value={date}
                mode="date"
                is24Hour={true}
                display="default"
                onChange={handleDateChange}
              />
            )}

            <TouchableOpacity
              onPress={showDatepicker}
              style={{
                width: Responsive.widthPx(90),
                height: Responsive.widthPx(15),
                borderRadius: Responsive.widthPx(5),
                flexDirection: "row",
                shadowColor: "#000",
                shadowOffset: {
                  width: 0,
                  height: 2,
                },
                shadowOpacity: 0.25,
                shadowRadius: 3.84,
                elevation: 5,
                // borderWidth: 1,
                // borderColor: Color.text_input_borderColor,
                alignItems: "center",
                justifyContent: "space-between",
                alignContent: "center",
                backgroundColor: "#fff",
                marginTop: Responsive.heightPx(2),
              }}
            >
              <Text
                style={{
                  color: Color.text_color,
                  marginLeft: Responsive.widthPx(5),
                }}
              >
                {formattedDate}
              </Text>
              <Image
                style={{ marginRight: Responsive.widthPx(4) }}
                source={Images.downig}
              />
            </TouchableOpacity>

            {/* Optional: Button to manually trigger the date picker */}
            {/* <Button title="Select Date" onPress={showDatepicker} /> */}
          </View>

          <View
            style={{
              width: Responsive.widthPx(90),
              justifyContent: "center",
              alignItems: "center",
              // flexDirection: "row",
            }}
          >
            <AppButton onPress={toggleModal} label={"Add Product"} />
            {/* <TouchableOpacity onPress={toggleModal}>
              <View
                style={{
                  backgroundColor: Color.botton_Color,
                  borderRadius: Responsive.widthPx(2),
                  width: Responsive.widthPx(50),
                  // height: Responsive.heightPx(5),
                  justifyContent: "center",
                  alignItems: "center",
                  bottom: Responsive.heightPx(3),
                  marginTop: Responsive.heightPx(8),
                  padding: Responsive.widthPx(3),
                }}
              >
                <Text style={{ color: "#fff" }}>Add Product</Text>
              </View>
            </TouchableOpacity> */}
          </View>
        </View>
        <View style={{ flex: 1 }}>
          <Modal isVisible={isModalVisible}>
            <View style={styles.modalContainer}>
              <View
                style={{
                  height: Responsive.heightPx(6),
                  justifyContent: "flex-start",
                  alignItems: "flex-end",
                }}
              >
                <View
                  style={{
                    height: Responsive.heightPx(5),
                    width: Responsive.widthPx(5),
                  }}
                >
                  <TouchableOpacity onPress={toggleModal}>
                    <Image
                      style={{
                        width: Responsive.widthPx(5),
                        height: Responsive.heightPx(5),
                      }}
                      resizeMode="contain"
                      source={Images.crossicon}
                    />
                  </TouchableOpacity>
                </View>
              </View>
              {/* <View
                style={{
                  height: Responsive.heightPx(20),
                  borderColor: "red",
                  borderWidth: 1,
                  marginBottom: Responsive.heightPx(4),
                }}
              >
                <FlatList
                  data={addval}
                  keyExtractor={(item, index) => index.toString()}
                  renderItem={({ item, index }) => (
                    <View>
                      <Text>{`Product ID: ${item.product_name}, Quantity: ${item.product_qunt}, prod_price: ${item.prod_price}`}</Text>
                      <Button
                        title="Remove"
                        onPress={() => removeItem(index)}
                      />
                    </View>
                  )}
                />
              </View> */}
              <View style={styles.orderlineview}>
                <View
                  style={{
                    width: Responsive.widthPx(75),
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
                    height: Responsive.heightPx(25),
                  }}
                >
                  <FlatList
                    data={addval}
                    keyExtractor={(item) => item.id}
                    ItemSeparatorComponent={ItemSeparatorComponent}
                    renderItem={({ item, index }) => (
                      <View style={styles.item}>
                        <View
                          style={{
                            flexDirection: "row",
                            width: Responsive.widthPx(70),
                            justifyContent: "space-between",
                            alignItems: "center",
                            // backgroundColor: "red",
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
                              {item.product_name}
                            </Text>
                          </View>
                          <View
                            style={{
                              width: Responsive.widthPx(10),
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
                              {item.product_qunt}
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
                              {item.prod_price}
                            </Text>
                          </View>
                        </View>
                        <TouchableOpacity onPress={() => removeItem(index)}>
                          <View style={{ width: Responsive.widthPx(10) }}>
                            <Image source={Images.Delete} />
                          </View>
                        </TouchableOpacity>
                      </View>
                    )}
                  />
                </View>
              </View>

              <View style={{}}>
                {/* <Text style={styles.labeltext}>Customer</Text> */}
                <TouchableOpacity
                  onPress={() => {
                    refRBSheet2.current.open();
                  }}
                  style={styles.textInput1}
                >
                  <Text
                    style={{
                      fontSize: 15,
                      color: "#000",
                      marginLeft: Responsive.widthPx(4),
                    }}
                  >
                    {proname}
                  </Text>
                  <Image
                    style={{ marginRight: Responsive.widthPx(4) }}
                    source={Images.downig}
                  />
                </TouchableOpacity>
              </View>
              <View
                style={{
                  // padding: 12,
                  flexDirection: "row",
                  alignItems: "center",
                  // backgroundColor: "red",
                  justifyContent: "space-between",
                }}
              >
                <TextInput
                  placeholderTextColor={"#000"}
                  style={{
                    width: Responsive.widthPx(35),
                    borderWidth: 1,
                    borderColor: "gray",
                    marginBottom: 10,
                    padding: 10,
                    borderRadius: 5,
                    color: Color.text_color,
                  }}
                  placeholder="Quantity"
                  value={text2}
                  keyboardType={"number-pad"}
                  onChangeText={(value) => setText2(value)}
                />
                <TouchableOpacity
                  onPress={() => {
                    refRBSheet3.current.open();
                  }}
                  style={{
                    borderWidth: 1,
                    width: Responsive.widthPx(40),
                    borderColor: "gray",
                    marginBottom: 10,
                    paddingVertical: 12,
                    borderRadius: 5,
                    color: Color.text_color,
                    flexDirection: "row",
                    alignItems: "center",
                    // backgroundColor: "red",
                    justifyContent: "space-between",
                  }}
                >
                  <Text
                    style={{
                      fontSize: 15,
                      color: "#000",
                      marginLeft: Responsive.widthPx(4),
                    }}
                  >
                    {SelectUnit}
                  </Text>
                  <Image
                    style={{ marginRight: Responsive.widthPx(4) }}
                    source={Images.downig}
                  />
                </TouchableOpacity>
              </View>
              <TextInput
                style={styles.textInput}
                placeholder="Price"
                placeholderTextColor={"#000"}
                value={text3}
                keyboardType={"number-pad"}
                onChangeText={(value) => setText3(value)}
              />
              {/* <Button
                  title="Add Item"
                  onPress={() => {
                    addItem, setModalVisible(false);
                  }}
                /> */}
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-around",
                }}
              >
                <TouchableOpacity
                  style={{
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                  disabled={proname === "Select Product"}
                  onPress={() => {
                    addItem();
                    // setText1("");
                    // createsellorder();
                  }}
                >
                  <View
                    style={{
                      backgroundColor: proname === "Select Product" ? 'grey' : Color.botton_Color,
                      width: Responsive.widthPx(25),
                      alignItems: "center",
                      justifyContent: "center",
                      padding: Responsive.widthPx(2),
                      borderRadius: Responsive.widthPx(2),
                    }}
                  >
                    <Text style={{ color: "#fff" }}>Add More</Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                  disabled={addval && addval.length == 0}
                  onPress={() => {
                    addItem();
                    callfinesproduct();
                    toggleModal();
                    // setText1("");
                    // setText2("");
                    // setText3("");
                  }}
                >
                  <View
                    style={{
                      backgroundColor: addval && addval.length == 0 ? 'grey' : Color.botton_Color,
                      // backgroundColor: Color.botton_Color,
                      width: Responsive.widthPx(25),
                      alignItems: "center",
                      justifyContent: "center",
                      padding: Responsive.widthPx(2),
                      borderRadius: Responsive.widthPx(2),
                    }}
                  >
                    <Text style={{ color: "#fff" }}>finish</Text>
                  </View>
                </TouchableOpacity>
              </View>

              {/* <Button
                  title="Add More"
                  onPress={() => {
                    addItem(), toggleModal();
                  }}
                /> */}
              {/* <TouchableOpacity onPress={toggleModal}>
                  <Text>Close Modal</Text>
                </TouchableOpacity> */}
            </View>
          </Modal>
        </View>
      </View>
      {/* </AppScrollview> */}
      {/* // </KeyboardAvoidingView> */}
    </AppContainer>
  );
};

function mapDispatchToProps(dispatch: any) {
  return {
    commonActions: bindActionCreators(Const.commonActions, dispatch),
  };
}

export default connect(null, mapDispatchToProps)(NewCreateOrderScreenstyle);
