import AsyncStorage from "@react-native-async-storage/async-storage";
import { CommonActions } from '@react-navigation/native';
import React, { useState } from "react";
import {
  Alert,
  Image,
  KeyboardAvoidingView,
  Text,
  View,
} from "react-native";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  AppButton,
  AppContainer,
  AppScrollview,
  AppTextInput,
} from "../../Component";
import {
  Const,
  Images,
  Loader,
  Responsive,
  Screen,
  Utility,
} from "../../Helper";
import * as OdooApi from "../OdooApi";
import styles from "./LoginScreenStyle";
import { ApiEndPoints } from "../../NetworkCall";
import messaging from '@react-native-firebase/messaging';

interface LoginScreenProps {
  navigation?: any;
  text?: any;
  commonActions?: any;
}

const loc_global: any = global;
const LoginScreen = (props: LoginScreenProps) => {
  const { navigation, text, commonActions } = props;
  const [email, setemail] = useState("");
  const [userpassword, setuserpassword] = useState("");
  const password = userpassword;

  const loginApi = async () => {
    Loader.isLoading(true);
    const authenticationResult = await OdooApi.authenticate(email, password);
    console.log("authenticationResult", authenticationResult)
    if (authenticationResult === false){
      Utility.showDangerToast("Authentication failed");
      Loader.isLoading(false);
      console.error("Authentication failed");
    }
    else if (authenticationResult) {
      const stringValue = JSON.stringify(authenticationResult);
      loc_global.userData = await AsyncStorage.setItem("userId", stringValue);
      await AsyncStorage.setItem("@odopassword", password);
      const checkMobileAuth = await OdooApi.checkUserAuthenticate(email, password, stringValue);
      if (checkMobileAuth && checkMobileAuth[0].allow_mobile_login) {
        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{ name: Screen.HomeScreen }],
          })
        );
        sendFcmToken()
        console.log("Authentication successful");
      } else {
        Alert.alert(
          "Authorization Error",
          "User is not authorized. Please contact the admin.",
          [
            { text: "OK" }
          ]
        );
      }

      Loader.isLoading(false);
    }
  };

  async function sendFcmToken() {
    try {
      const token = await messaging().getToken();
      const uid = await AsyncStorage.getItem("userId");
      const uidNumber = uid !== null ? parseInt(uid, 10) : console.log("UserId is null");
      console.log("userid", uid)
      const odooPassword = await AsyncStorage.getItem("@odopassword");
      console.log("token", token);
      Loader.isLoading(true);

      if (uid) {
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
              args: [ApiEndPoints.odooDatabase, uid, odooPassword, "res.users", "write", [uidNumber],
              {
                "vals": {
                  "mail_firebase_tokens": [
                    [
                      0,
                      0,
                      {
                        "token": token
                      }
                    ]
                  ]

                }
              }]
            },
          }),
        });

        const responseData = await response.json();

        if (responseData.result) {
          Loader.isLoading(false);
          __DEV__ ?
            Utility.showSuccessToast("Token sent successfully") : console.log("Token sent successfully");
        } else {
          Loader.isLoading(false);
          __DEV__ ?
            Utility.showDangerToast("Token not sent") :
            console.log("Token not sent");
          console.log("create failed:", responseData.error);
        }
      }

    } catch (error) {
      console.error("Error sending token:", error);
      Loader.isLoading(false);
    }
  }


  return (
    <AppContainer>
      <KeyboardAvoidingView>
        <AppScrollview>
          <View style={styles.container}>
            <View style={styles.topcontener}>
              <View>
                <Image
                  source={Images.applogo}
                  style={styles.logoimg}
                  resizeMode={"contain"}
                />
              </View>
            </View>
            <View style={styles.signdot}>
              <Text style={{ fontSize: 22, fontWeight: "bold" }}>Sign In</Text>
              <Image
                source={Images.logndots}
                style={styles.dotimg}
                resizeMode="contain"
              />
            </View>

            <View style={{ marginTop: Responsive.heightPx(2) }}>
              <View style={styles.textinputstyle}>
                <AppTextInput
                  userimg={true}
                  keyboardType={"email-address"}
                  value={email}
                  onChangeText={(email: any) => {
                    setemail(email);
                  }}
                  placeHolder={"Username"}
                />
              </View>
              <View style={styles.textinputstyle}>
                <AppTextInput
                  passimg={true}
                  onChangeText={(userpassword: any) => {
                    setuserpassword(userpassword);
                  }}
                  secureTextEntry={true}
                  value={password}
                  keyboardType={"default"}
                  placeHolder={"Password"}
                />
              </View>
            </View>
            <AppButton
              label={"Sign In"}
              onPress={
                () =>
                  loginApi()
              }
            />
          </View>
        </AppScrollview>
      </KeyboardAvoidingView>
    </AppContainer>
  );
};

function mapDispatchToProps(dispatch: any) {
  return {
    commonActions: bindActionCreators(Const.commonActions, dispatch),
  };
}

export default connect(null, mapDispatchToProps)(LoginScreen);