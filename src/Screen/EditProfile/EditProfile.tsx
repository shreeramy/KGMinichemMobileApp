import { Text, StyleSheet, View, Image, ImageBackground } from "react-native";
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
import styles from "./EditProfilestyle";
import { TouchableOpacity } from "react-native-gesture-handler";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ApiEndPoints } from "../../NetworkCall";

interface EditProfileProps {
  navigation?: any;
  text?: any;
  commonActions?: any;
  route?: any;
}

const EditProfile = (props: EditProfileProps) => {
  const { navigation, text, commonActions, route } = props;
  const [name, setname] = useState("");
  const [Email, setEmail] = useState("");
  const [Mobile, setMobile] = useState("");
  const [Country, setCountry] = useState("");
  const [gstNumber, setgstNumber] = useState("");
  const [Address, setAddress] = useState("");
  const [State, setState] = useState("");
  const [City, setCity] = useState("");
  const [customerdata, setcustomerdata] = useState([]);
  const customer = route?.params?.user;

  console.log("Ed>cus>>>>>.", customer);

  React.useEffect(() => {
    // searchRead();
    const backScreen = navigation.addListener("focus", () => {
      // searchRead();
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

  const odooPassword = "admin";

  async function searchRead(e: any) {
    const uid = await AsyncStorage.getItem("userId");
    Loader.isLoading(true);

    if (uid) {
      const searchCriteria = [["id", "=", customer?.id]];
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
        console.log(">>????", responseData.result);
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
      <AppScrollview>
        <View style={styles.container}>
          <View style={styles.topcontener}>
            {/* <View> */}
            <ImageBackground
              resizeMode="stretch"
              borderBottomLeftRadius={15}
              borderBottomRightRadius={15}
              style={{
                height: Responsive.heightPx(30),
                width: Responsive.widthPx(100),
              }}
              source={Images.drawerbackground}
            >
              <View style={{ marginTop: Responsive.heightPx(5) }}>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    // backgroundColor: "red",
                    width: Responsive.widthPx(90),
                    justifyContent: "space-between",
                  }}
                >
                  <View style={{ marginLeft: 10 }}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                      <Image
                        style={{
                          width: Responsive.widthPx(10),
                          height: Responsive.heightPx(8),
                          tintColor: "#fff",
                        }}
                        resizeMode="contain"
                        source={Images.blackbacicon}
                      />
                    </TouchableOpacity>
                  </View>
                  <Text
                    style={{ color: "#fff", fontWeight: "bold", fontSize: 18 }}
                  >
                    Profile
                  </Text>
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate(Screen.Profile, {
                        useridsend: customer.id,
                        cutname: customer.name,
                        cutemail: customer?.email,
                        custphone: customer?.phone,
                        custaddr: customer?.street,
                        parametrt: 1,
                        usering: customer?.image_1920,

                        // allcustmData: customer,
                      })
                    }
                  >
                    <Image source={Images.Editwhite} />
                  </TouchableOpacity>
                </View>
                <View
                  style={{
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Image
                    resizeMode="cover"
                    style={{
                      height: Responsive.heightPx(9),
                      width: Responsive.widthPx(20),
                      borderRadius: Responsive.widthPx(30),
                    }}
                    source={{
                      uri: `data:image/png;base64,${customer?.image_1920}`,
                    }}
                  />
                  <View style={{ marginTop: 5 }}>
                    <Text style={{ color: Color.white, fontWeight: "bold" }}>
                      {customer?.name}
                    </Text>
                  </View>
                </View>
              </View>
            </ImageBackground>
          </View>
          <View
            style={{
              marginTop: Responsive.heightPx(4),
              width: Responsive.widthPx(90),
            }}
          >
            <View style={styles.emailview}>
              <View>
                <Image
                  style={{
                    width: Responsive.widthPx(8),
                    height: Responsive.heightPx(3),
                  }}
                  resizeMode="contain"
                  source={Images.email}
                />
              </View>
              <View style={{ marginLeft: 15 }}>
                <Text style={styles.headingtext}>Email</Text>
                <Text style={styles.subheadingtext}>{customer?.email}</Text>
              </View>
            </View>
            <View style={styles.emailview1}>
              <View>
                <Image
                  style={{
                    width: Responsive.widthPx(8),
                    height: Responsive.heightPx(3),
                  }}
                  resizeMode="contain"
                  source={Images.callprofile}
                />
              </View>
              <View style={{ marginLeft: 15 }}>
                <Text style={styles.headingtext}>Mobile</Text>
                <Text style={styles.subheadingtext}>{customer?.mobile}</Text>
              </View>
            </View>
            <View style={styles.emailview1}>
              <View>
                <Image
                  style={{
                    width: Responsive.widthPx(8),
                    height: Responsive.heightPx(3),
                  }}
                  resizeMode="contain"
                  source={Images.Location}
                />
              </View>
              <View style={{ marginLeft: 15 }}>
                <Text style={styles.headingtext}>Address</Text>
                <Text style={styles.subheadingtext}>
                  {customer?.street +
                    ", " +
                    customer.city +
                    ", " +
                    customer.state_id[1]}
                </Text>
              </View>
            </View>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate(Screen.ShowOrderScreen, {
                  useridsend: customer?.id,
                  status: "orderhistry",
                })
              }
            >
              <View style={styles.orderview}>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    //   marginLeft: 15,
                  }}
                >
                  <Image
                    style={{
                      width: Responsive.widthPx(8),
                      height: Responsive.heightPx(3),
                    }}
                    resizeMode="contain"
                    source={Images.ordehistry}
                  />
                  <Text
                    style={{
                      marginLeft: 15,
                      color: Color.text_color,
                      fontWeight: "bold",
                    }}
                  >
                    Order history
                  </Text>
                </View>
                <View>
                  <Image
                    style={{
                      width: Responsive.widthPx(8),
                      height: Responsive.heightPx(3),
                    }}
                    resizeMode="contain"
                    source={Images.forwardArrow}
                  />
                </View>
              </View>
            </TouchableOpacity>
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

export default connect(null, mapDispatchToProps)(EditProfile);
