import React, { useState } from "react";
import {
  Text,
  View,
  Image,
  KeyboardAvoidingView,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SvgIcon } from "../../Component/SvgIcons";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  Const,
  Images,
  Loader,
  Responsive,
  Screen,
  Utility,
} from "../../Helper";
import * as OdooApi from "../OdooApi";
import {
  AppButton,
  AppContainer,
  AppScrollview,
  AppTextInput,
} from "../../Component";
import styles from "./LoginScreenStyle";
import { CommonActions } from '@react-navigation/native';

interface LoginScreenProps {
  navigation?: any;
  text?: any;
  commonActions?: any;
}

const loc_global: any = global;
const LoginScreen = (props: LoginScreenProps) => {
  const { navigation, text, commonActions } = props;
  const [email, setemail] = useState("admin");
  const [userpassword, setuserpassword] = useState("admin");
  const password = userpassword;

  const loginApi = async () => {
    Loader.isLoading(true);
    const authenticationResult = await OdooApi.authenticate(email, password);
    console.log("authenticationResult", authenticationResult)
    if (authenticationResult) {
      const stringValue = JSON.stringify(authenticationResult);
      loc_global.userData = await AsyncStorage.setItem("userId", stringValue);
      await AsyncStorage.setItem("@odopassword", password);
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: Screen.HomeScreen }],
        })
      );
      console.log("Authentication successful");
      Loader.isLoading(false);
    } else {
      Utility.showDangerToast("Authentication failed");
      Loader.isLoading(false);
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
              <SvgIcon Icon={Images.logndots} height={55} width={50} onPress={function () {

              }} />
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