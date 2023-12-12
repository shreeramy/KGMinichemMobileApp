import {
  Text,
  StyleSheet,
  View,
  Image,
  KeyboardAvoidingView,
} from "react-native";
import React, { Component, useState } from "react";
import { SvgIcon } from "../../Component/SvgIcons";
import {
  Const,
  Images,
  Loader,
  Responsive,
  Screen,
  Utility,
} from "../../Helper";
import * as OdooApi from "../OdooApi";
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
import styles from "./LoginScreenStyle";
import Odoo from "react-native-odoo-promise-based";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ApiEndPoints, ApiServices } from "../../NetworkCall";
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
  const [eyshow, setEyeshow] = useState(true);

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const validate_email = (text) => {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (text == "") {
      setemail(text);
    } else if (reg.test(text) === false) {
      setemail(text);
      return false;
    } else {
      setemail(text);
      return true;
    }
  };

  // const username = email;
  const password = userpassword;

  const loginApi = async () => {
    // Call the authenticate function with the provided username and password
    const authenticationResult = await OdooApi.authenticate(email, password);
    Loader.isLoading(true);
    if (authenticationResult) {
      const stringValue = JSON.stringify(authenticationResult);
      console.log('stringValue-->',stringValue);
      loc_global.userData = await AsyncStorage.setItem("userId", stringValue);
      // Handle successful authentication
      navigation.navigate(Screen.HomeScreen);
      console.log("Authentication successful");
      Loader.isLoading(false);
    } else {
      Utility.showDangerToast("Authentication failed");
      Loader.isLoading(false);
      // Handle authentication failure
      console.error("Authentication failed");
    }
  };

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
              <SvgIcon Icon={Images.logndots} height={55} width={50} />
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
                  // onClickShow={() => {
                  //   passwordfunction();
                  // }}
                  // containerStyle={styles.passstyle}
                  secureTextEntry={true}
                  // isShowIcon={true}
                  value={password}
                  keyboardType={"default"}
                  placeHolder={"Password"}
                />
              </View>
            </View>
            <AppButton
              label={"Sign In"}
              // containerStyle={styles.bookmow}
              onPress={
                () =>
                  // () => navigation.navigate(Screen.HomeScreen)
                  loginApi()
                // handleLogin()
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
