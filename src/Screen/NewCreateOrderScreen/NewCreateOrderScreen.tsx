import AsyncStorage from "@react-native-async-storage/async-storage";
import DateTimePicker from "@react-native-community/datetimepicker";
import moment from "moment";
import React, { useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  Platform,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";
import Modal from "react-native-modal";
import RBSheet from "react-native-raw-bottom-sheet";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  AppButton,
  AppContainer
} from "../../Component";
import {
  Color,
  Const,
  Images,
  Loader,
  Responsive,
  Screen,
  Utility,
} from "../../Helper";
import { ApiEndPoints } from "../../NetworkCall";
import styles from "./NewCreateOrderScreenstyle";

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
  const [orederdate, setorederdate] = useState("");
  const [createorder, setcreateorder] = useState([]);
  const refRBSheet: any = useRef();
  const refRBSheet1: any = useRef();
  const PaymentModesheet: any = useRef();
  const refRBSheet2: any = useRef();
  const refRBSheet3: any = useRef();
  const [roll, setroll] = React.useState(sendCustomerName || "Select Customer");
  const [cutomerId, setcutomerId] = React.useState(getcustomeId);
  const [proname, setproname] = React.useState("Select Product");
  const [gstsendvalue, setgstsendvalue] = React.useState("");
  const [gstinpro, setgstinpro] = React.useState("GSTIN");
  const [PaymentMode, setPaymentMode] = React.useState("Payment Mode");
  const [customerdata, setcustomerdata] = useState([]);
  const [productdata, setproductdata] = useState([]);
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

  ]);

  const [isModalVisible, setModalVisible] = useState(false);
  const [text1, setText1] = useState("");
  const [text2, setText2] = useState("");
  const [text3, setText3] = useState("");
  const [SelectUnit, setSelectUnit] = useState("");
  const [SelectUnitid, setSelectUnitid] = useState(Number);
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [unitname, setunitname] = useState([]);
  const [orderLines, setOrderLines] = useState([]);
  const [newUnitIds, setNewUnitIds] = useState([]);
  const [generateId, setGenerateId] = useState(false);
  const [newGeneratedIds, setNewGeneratedIds] = useState("");

  const [addval, setaddval] = useState([]);
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

  React.useEffect(() => {
    getcustomer();
  }, []);

  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowDatePicker(Platform.OS === "ios");
    setDate(currentDate);
  };

  const showDatepicker = () => {
    setShowDatePicker(true);
  };

  const formattedDate = moment(date).format("YYYY-MM-DD");

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  useEffect(() => {
    console.log("Order Lines updated:>>>", orderLines);
  }, [orderLines]);

  useEffect(() => {
    const customUnitIds = unitname.map((item) => item.id);
    setNewUnitIds(customUnitIds);
  }, [SelectUnit, unitname]);

  const callfinesproduct = async () => {
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
    }
  };

  const removeItem = (index) => {
    const newAddVal = [...addval];
    newAddVal.splice(index, 1);
    setaddval(newAddVal);
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
        setcustomerdata(customdata);
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

  async function getmatricunit() {
    const uid = await AsyncStorage.getItem("userId");
    const odooPassword = await AsyncStorage.getItem("@odopassword");

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
              "uom.uom", 
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
        setunitname(customdata);

      } else {
        return null;
      }

    }

    return null;
  }

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

  async function getcustomer() {
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
              "res.partner", 
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
        Loader.isLoading(false);
        return null;
      }

    }
    Loader.isLoading(false);
    return null;
  }

  const Getunitname = () => (
    <View style={{ backgroundColor: "#fff" }}>
      <FlatList
        data={unitname}
        renderItem={({ item }) => (
          <TouchableOpacity
          
            onPress={() =>
              refRBSheet3.current.close(
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

                width: Responsive.widthPx(90),
                justifyContent: "center",
                alignItems: "center",
                borderColor: Color.text_input_borderColor,
                marginTop: Responsive.heightPx(3),
                borderRadius: Responsive.widthPx(3),
              }}
            >
              <Text
                style={{
                  color: Color.text_color,
      
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
      {
        customerdata.length === 0 ?
          <View>
            <ActivityIndicator size="large" color="#0000ff" />
          </View>
          :
          <FlatList
            data={customerdata}
            renderItem={({ item }) => {
              return (

                <TouchableOpacity
              
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
                      width: Responsive.widthPx(90),
                      justifyContent: "center",
                      alignItems: "center",
                      borderColor: Color.text_input_borderColor,
                      marginTop: Responsive.heightPx(3),
                      borderRadius: Responsive.widthPx(3),
                    }}
                  >
                    <Text
                      style={{
                        color: Color.text_color,
       
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
         
            onPress={() =>
              refRBSheet1.current.close(
                setgstinpro(item?.name),
                setgstsendvalue(item?.sendvale)
              )
            }
            style={{
              width: Responsive.widthPx(100),
      
              justifyContent: "center",
              alignItems: "center",
        
            }}
          >
            <View
              style={{
      
                width: Responsive.widthPx(90),
                justifyContent: "center",
                alignItems: "center",
    
  
                borderColor: Color.text_input_borderColor,
                marginTop: Responsive.heightPx(1),
                borderRadius: Responsive.widthPx(3),
              }}
            >
              <Text
                style={{
                  color: Color.text_color,
  
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
         
            onPress={() =>
              PaymentModesheet.current.close(
                setPaymentMode(item?.name)

              )
            }
            style={{
              width: Responsive.widthPx(100),
 
              justifyContent: "center",
              alignItems: "center",

            }}
          >
            <View
              style={{

                width: Responsive.widthPx(90),
                justifyContent: "center",
                alignItems: "center",

                borderColor: Color.text_input_borderColor,
                marginTop: Responsive.heightPx(1),
                borderRadius: Responsive.widthPx(3),
              }}
            >
              <Text
                style={{
                  color: Color.text_color,
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

            onPress={() => {

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
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <View
              style={{
                width: Responsive.widthPx(90),
                justifyContent: "center",
                alignItems: "center",
                borderColor: Color.text_input_borderColor,
                marginTop: Responsive.heightPx(1),
                borderRadius: Responsive.widthPx(3),
              }}
            >
              <Text
                style={{
                  color: Color.text_color,
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
              "product.product", 
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
        const customdata = responseData.result;
        setproductdata(customdata);
      } else {
        console.error("search_read error://..", responseData.error);
        Loader.isLoading(false);
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

          </View>

          <View
            style={{
              width: Responsive.widthPx(90),
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <AppButton onPress={toggleModal} label={"Add Product"} />
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
                </View>
                <View
                  style={{
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
                          }}
                        >
                          <View
                            style={{
                              width: Responsive.widthPx(20),
      
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
                  flexDirection: "row",
                  alignItems: "center",
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
                  onPress={() => {
                    addItem();
                  }}
                >
                  <View
                    style={{
                      backgroundColor: Color.botton_Color,
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
                  onPress={() => {
                    addItem();
                    callfinesproduct();
                    toggleModal();
                  }}
                >
                  <View
                    style={{
                      backgroundColor: Color.botton_Color,
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
            </View>
          </Modal>
        </View>
      </View>

    </AppContainer>
  );
};

function mapDispatchToProps(dispatch: any) {
  return {
    commonActions: bindActionCreators(Const.commonActions, dispatch),
  };
}

export default connect(null, mapDispatchToProps)(NewCreateOrderScreenstyle);
